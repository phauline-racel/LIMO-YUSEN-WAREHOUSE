const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const storage = {};
const createStorage = () => ({
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : null;
  },
  setItem(key, value) {
    storage[key] = String(value);
  },
  removeItem(key) {
    delete storage[key];
  }
});

const context = {
  console,
  localStorage: createStorage(),
  window: {},
  globalThis: {}
};
context.window = context;
context.globalThis = context;

const authCode = fs.readFileSync(path.join(__dirname, '../assets/auth.js'), 'utf8');
vm.runInContext(authCode, vm.createContext(context));
const AuthService = context.AuthService;

function resetStorage() {
  Object.keys(storage).forEach((key) => delete storage[key]);
  context.localStorage = createStorage();
  context.window.localStorage = context.localStorage;
  context.globalThis.localStorage = context.localStorage;
}

resetStorage();

const seededAccounts = AuthService.initializeAuth();
assert.ok(seededAccounts.some((account) => account.userId === 'admin001'), 'admin account should be seeded');

const validLogin = AuthService.authenticateUser('admin001', 'Admin@123');
assert.strictEqual(validLogin.success, true, 'valid admin credentials should authenticate');
assert.strictEqual(validLogin.user.role, 'admin', 'admin role should be preserved');

const passwordChanged = AuthService.changePassword('Admin@123', 'NewAdmin@123');
assert.strictEqual(passwordChanged.success, true, 'changing the password should succeed');
const updatedLogin = AuthService.authenticateUser('admin001', 'NewAdmin@123');
assert.strictEqual(updatedLogin.success, true, 'the new password should be accepted for login');
const oldPasswordLogin = AuthService.authenticateUser('admin001', 'Admin@123');
assert.strictEqual(oldPasswordLogin.success, false, 'the old password should no longer work');

const reinitialized = AuthService.initializeAuth();
const reloadedAccount = reinitialized.find((account) => account.userId === 'admin001');
assert.strictEqual(reloadedAccount.password, 'NewAdmin@123', 'initialization should preserve the updated password');

const createdUser = AuthService.createUser({
  employeeId: 'EMP-002',
  name: 'Jane Doe',
  userId: 'emp002',
  password: 'Employee@456',
  role: 'employee',
  status: 'active'
});
assert.strictEqual(createdUser.success, true, 'creating a user should succeed');
const createdAccount = AuthService.getAccounts().find((account) => account.userId === 'emp002');
assert.ok(createdAccount, 'the created user should be stored');
assert.strictEqual(createdAccount.role, 'employee', 'the created user should keep the requested role');

const duplicateEmployeeId = AuthService.createUser({
  employeeId: 'EMP-002',
  name: 'Another User',
  userId: 'emp003',
  password: 'Password@123',
  role: 'employee',
  status: 'active'
});
assert.strictEqual(duplicateEmployeeId.success, false, 'duplicate employee IDs should fail');

const invalidUser = AuthService.authenticateUser('unknown', '123');
assert.strictEqual(invalidUser.success, false, 'unknown user should fail');
assert.strictEqual(invalidUser.message, 'Invalid User ID.', 'unknown user should return the expected message');

const badPassword = AuthService.authenticateUser('emp001', 'wrong');
assert.strictEqual(badPassword.success, false, 'wrong password should fail');
assert.strictEqual(badPassword.message, 'Incorrect password.', 'wrong password should return the expected message');

const emptyLogin = AuthService.authenticateUser('', '');
assert.strictEqual(emptyLogin.success, false, 'empty credentials should fail');
assert.strictEqual(emptyLogin.message, 'Please enter your User ID and Password.', 'empty credentials should return the expected message');

assert.ok(AuthService.isAuthenticated(), 'a successful login should create a session');
assert.strictEqual(AuthService.getCurrentUser().userId, 'admin001');

AuthService.logout();
assert.strictEqual(AuthService.isAuthenticated(), false, 'logout should clear the session');

console.log('Auth service tests passed.');
