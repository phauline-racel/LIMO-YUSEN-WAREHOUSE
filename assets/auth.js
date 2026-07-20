(function (global) {
  const AUTH_STORAGE_KEY = 'warehouseAuthAccounts';
  const SESSION_STORAGE_KEY = 'warehouseAuthSession';
  const fallbackStorage = {
    getItem() { return null; },
    setItem() {},
    removeItem() {}
  };
  const getStorage = () => {
    const candidate = (typeof globalThis !== 'undefined' && globalThis.localStorage)
      || (global && global.localStorage)
      || fallbackStorage;
    return candidate || fallbackStorage;
  };

  const seededAccounts = [
    {
      userId: 'admin001',
      password: 'Admin@123',
      role: 'admin',
      name: 'Juan Cruz',
      employeeId: 'ADM-001',
      position: 'Administrator'
    },
    {
      userId: 'emp001',
      password: 'Employee@123',
      role: 'employee',
      name: 'Joseph Dela Cruz',
      employeeId: 'EMP-001',
      position: 'Warehouseman'
    }
  ];

  const readAccounts = () => {
    const storage = getStorage();
    try {
      const storedValue = storage.getItem(AUTH_STORAGE_KEY);
      if (!storedValue) {
        return seededAccounts.map((account) => ({ ...account }));
      }

      const parsed = JSON.parse(storedValue);
      return Array.isArray(parsed) && parsed.length ? parsed : seededAccounts.map((account) => ({ ...account }));
    } catch (error) {
      console.warn('Unable to read auth storage.', error);
      return seededAccounts.map((account) => ({ ...account }));
    }
  };

  const persistAccounts = (accounts) => {
    const storage = getStorage();
    try {
      storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(accounts));
    } catch (error) {
      console.warn('Unable to persist auth storage.', error);
    }
  };

  const normalizeAccount = (account) => ({
    userId: String(account?.userId || '').trim(),
    password: String(account?.password || ''),
    role: String(account?.role || 'employee').toLowerCase(),
    name: String(account?.name || ''),
    employeeId: String(account?.employeeId || ''),
    position: String(account?.position || 'Warehouseman')
  });

  const readSession = () => {
    const storage = getStorage();
    try {
      const storedValue = storage.getItem(SESSION_STORAGE_KEY);
      if (!storedValue) return null;
      const parsed = JSON.parse(storedValue);
      return parsed && parsed.userId ? parsed : null;
    } catch (error) {
      console.warn('Unable to read auth session.', error);
      return null;
    }
  };

  const persistSession = (session) => {
    const storage = getStorage();
    try {
      storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch (error) {
      console.warn('Unable to persist auth session.', error);
    }
  };

  const clearSession = () => {
    const storage = getStorage();
    try {
      storage.removeItem(SESSION_STORAGE_KEY);
    } catch (error) {
      console.warn('Unable to clear auth session.', error);
    }
  };

  const AuthService = {
    initializeAuth() {
      const existingAccounts = readAccounts();
      if (existingAccounts.length) {
        return existingAccounts.map((account) => normalizeAccount(account));
      }

      const accounts = seededAccounts.map((account) => normalizeAccount(account));
      persistAccounts(accounts);
      return accounts;
    },

    getAccounts() {
      return readAccounts().map((account) => normalizeAccount(account));
    },

    changePassword(currentPassword, newPassword, confirmPassword) {
      const session = readSession();
      if (!session?.userId) {
        return { success: false, message: 'Please log in to change your password.' };
      }

      const trimmedCurrentPassword = String(currentPassword || '').trim();
      const trimmedNewPassword = String(newPassword || '').trim();
      const trimmedConfirmPassword = String(confirmPassword ?? newPassword ?? '').trim();

      if (!trimmedCurrentPassword || !trimmedNewPassword || !trimmedConfirmPassword) {
        return { success: false, message: 'Please complete all password fields.' };
      }

      const accounts = this.getAccounts();
      const accountIndex = accounts.findIndex((entry) => entry.userId === session.userId);
      if (accountIndex === -1) {
        return { success: false, message: 'Unable to locate your account.' };
      }

      if (accounts[accountIndex].password !== trimmedCurrentPassword) {
        return { success: false, message: 'Incorrect current password.' };
      }

      if (trimmedNewPassword !== trimmedConfirmPassword) {
        return { success: false, message: 'New passwords do not match.' };
      }

      accounts[accountIndex] = {
        ...accounts[accountIndex],
        password: trimmedNewPassword
      };

      persistAccounts(accounts.map((account) => normalizeAccount(account)));
      return { success: true, message: 'Password updated successfully.' };
    },

    createUser(userData = {}) {
      const currentUser = this.getCurrentUser();
      if (!currentUser || currentUser.role !== 'admin') {
        return { success: false, message: 'Only admins can create users.' };
      }

      const employeeId = String(userData.employeeId || '').trim();
      const name = String(userData.name || '').trim();
      const userId = String(userData.userId || '').trim();
      const password = String(userData.password || '').trim();
      const role = String(userData.role || 'employee').toLowerCase();
      const status = String(userData.status || 'active').toLowerCase();

      if (!employeeId || !name || !userId || !password) {
        return { success: false, message: 'Please complete all required fields.' };
      }

      const accounts = this.getAccounts();
      if (accounts.some((entry) => entry.employeeId === employeeId)) {
        return { success: false, message: 'Employee ID must be unique.' };
      }

      if (accounts.some((entry) => entry.userId === userId)) {
        return { success: false, message: 'Username must be unique.' };
      }

      const newAccount = normalizeAccount({
        userId,
        password,
        role: role === 'admin' ? 'admin' : 'employee',
        name,
        employeeId,
        position: role === 'admin' ? 'Administrator' : 'Warehouseman',
        status
      });

      accounts.push(newAccount);
      persistAccounts(accounts.map((account) => normalizeAccount(account)));
      return { success: true, user: newAccount };
    },

    updateUser(userId, updates = {}) {
      const currentUser = this.getCurrentUser();
      if (!currentUser || currentUser.role !== 'admin') {
        return { success: false, message: 'Only admins can update users.' };
      }

      const accounts = this.getAccounts();
      const targetIndex = accounts.findIndex((entry) => entry.userId === userId);
      if (targetIndex === -1) {
        return { success: false, message: 'User not found.' };
      }

      const nextAccount = normalizeAccount({
        ...accounts[targetIndex],
        ...updates,
        userId: String(updates.userId || accounts[targetIndex].userId).trim(),
        employeeId: String(updates.employeeId || accounts[targetIndex].employeeId).trim(),
        name: String(updates.name || accounts[targetIndex].name).trim(),
        password: String(updates.password || accounts[targetIndex].password).trim(),
        role: String(updates.role || accounts[targetIndex].role).toLowerCase(),
        status: String(updates.status || accounts[targetIndex].status || 'active').toLowerCase()
      });

      accounts[targetIndex] = nextAccount;
      persistAccounts(accounts.map((account) => normalizeAccount(account)));
      return { success: true, user: nextAccount };
    },

    deleteUser(userId) {
      const currentUser = this.getCurrentUser();
      if (!currentUser || currentUser.role !== 'admin') {
        return { success: false, message: 'Only admins can delete users.' };
      }

      const accounts = this.getAccounts();
      const nextAccounts = accounts.filter((entry) => entry.userId !== userId);
      if (nextAccounts.length === accounts.length) {
        return { success: false, message: 'User not found.' };
      }

      persistAccounts(nextAccounts.map((account) => normalizeAccount(account)));
      return { success: true, message: 'User deleted successfully.' };
    },

    getUserManagementList() {
      return this.getAccounts().map((account) => ({
        ...account,
        status: String(account.status || 'active').toLowerCase()
      }));
    },

    authenticateUser(userId, password) {
      const trimmedUserId = String(userId || '').trim();
      const trimmedPassword = String(password || '').trim();

      if (!trimmedUserId && !trimmedPassword) {
        return { success: false, message: 'Please enter your User ID and Password.' };
      }

      if (!trimmedUserId) {
        return { success: false, message: 'Invalid User ID.' };
      }

      if (!trimmedPassword) {
        return { success: false, message: 'Incorrect password.' };
      }

      const account = this.getAccounts().find((entry) => entry.userId === trimmedUserId);
      if (!account) {
        return { success: false, message: 'Invalid User ID.' };
      }

      if (account.password !== trimmedPassword) {
        return { success: false, message: 'Incorrect password.' };
      }

      const session = {
        userId: account.userId,
        role: account.role,
        name: account.name,
        employeeId: account.employeeId,
        position: account.position
      };
      persistSession(session);
      return { success: true, user: session };
    },

    isAuthenticated() {
      return Boolean(readSession());
    },

    getCurrentUser() {
      const session = readSession();
      if (!session) return null;
      return { ...session };
    },

    logout() {
      clearSession();
      return true;
    }
  };

  AuthService.initializeAuth();
  global.AuthService = AuthService;
})(typeof window !== 'undefined' ? window : globalThis);
