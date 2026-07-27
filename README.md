# LIMO Warehouse System - Developer Documentation

## 1. Project Overview

**Project Name**
- LIMO Warehouse System

**Purpose of the system**
- A browser-based warehouse management system for inbound and outbound cargo.
- Designed to help operations teams capture shipment details, monitor inventory, and review activity from a static front-end app.
- Includes QR-assisted form entry and browser-side persistence for rapid development.

**Objectives**
- Provide a role-aware warehouse dashboard for administrators and employees.
- Allow inbound receiving and outbound release entry workflows.
- Enable inventory lookups, activity reporting, and user management.
- Keep the solution deployable as a static website with minimal setup.

**Main features**
- Client-side authentication with seeded admin and employee accounts.
- Role-based admin access for user management.
- Dashboard with shipment and warehouse metrics.
- Inventory table with filters, sorting, pagination, and shipment detail drawer.
- Inbound and outbound shipment forms.
- QR scanning support via camera preview and `jsQR`.
- Profile editing and profile picture upload.
- Local Storage persistence for users, sessions, shipments, profiles, and notifications.

**Intended users**
- Admin: manages users, reviews reports, and oversees system behavior.
- Employee: performs inbound/outbound processing, inventory checks, and profile tasks.

---

## 2. Technology Stack

| Technology | Role | Why Used |
|---|---|---|
| HTML5 | Page structure | Static page templates for login and authenticated views |
| CSS3 | Styling | UI layout, responsive behavior, and component appearance |
| Vanilla JavaScript | Application logic | Handles auth, persistence, rendering, and UI interactions |
| Bootstrap Icons | Icons | Iconography for buttons, navigation, and UI affordances |
| Material Symbols | Icons | Additional symbol icons used in the UI |
| Local Storage | Data persistence | Stores auth, sessions, shipments, profiles, notifications |
| jsQR | QR scanning | Decodes QR payloads from camera frames |
| Camera API | Camera access | Enables live scanning using device camera |
| xlsx | Excel export | Exports activity report data as `.xlsx` files |
| jsPDF + jsPDF-AutoTable | PDF export | Generates printable PDF reports from activity data |

**Notes**
- The app is fully client-side. No backend or server-side code is included.
- External libraries are loaded via CDN links in HTML pages.

---

## 3. Folder Structure

```
/ (root)
  index.html
  README.md
  styles.css
  assets/
    app.css
    app.js
    auth.js
    login.js
    login_bg.png
    logo-YL.png
    logo.svg
  pages/
    dashboard.html
    inbound-outbound.html
    inventory.html
    profile.html
    user-management.html
  tests/
    auth.test.js
```

**File and folder purpose**
- `index.html`: Login page and application entry point.
- `README.md`: Developer handover documentation.
- `styles.css`: Login screen styles and branding layout.
- `assets/app.css`: Shared authenticated UI styling for pages.
- `assets/app.js`: Main application logic, including page initialization, data handling, and UI interactions.
- `assets/auth.js`: Authentication service, user account management, and admin operations.
- `assets/login.js`: Login form behavior, user validation, and redirects.
- `assets/login_bg.png`, `assets/logo-YL.png`, `assets/logo.svg`: Visual branding assets.
- `pages/dashboard.html`: Dashboard and activity report interface.
- `pages/inbound-outbound.html`: Inbound/outbound shipment entry interface.
- `pages/inventory.html`: Inventory table and shipment details drawer.
- `pages/profile.html`: User profile and picture management interface.
- `pages/user-management.html`: Admin-only user management interface.
- `tests/auth.test.js`: Node.js unit-style tests for auth logic.

---

## 4. System Architecture

### Login flow
1. Open `index.html`.
2. `assets/login.js` checks `AuthService.isAuthenticated()`.
3. If authenticated, the user is redirected to `pages/dashboard.html`.
4. On submit, `AuthService.authenticateUser()` verifies credentials.
5. Successful login persists session data and redirects to dashboard.
6. Failure displays an error message on the login page.

### User authentication
- `assets/auth.js` stores accounts in Local Storage under `warehouseAuthAccounts`.
- Default admin and employee accounts are seeded if none exist.
- Session state is saved under `warehouseAuthSession`.
- `AuthService` exposes methods for authentication, session access, and user management.

### Admin role
- Admin users can access `pages/user-management.html`.
- Admin-only navigation items use `.admin-only-nav` and are conditionally visible.
- The app prevents non-admin users from opening admin routes.
- Admin APIs include create, update, delete, reset password, and status toggle.

### Employee role
- Employee users can access dashboard, inbound/outbound, inventory, and profile pages.
- Employees cannot access the user management page.
- Role is determined from the current session.

### Navigation flow
- Authenticated pages share a sidebar and topbar.
- Sidebar contains links to Dashboard, Inbound/Outbound, and Inventory.
- Topbar includes search, notifications, and profile dropdown.
- Logged-in users can logout from the profile menu.

### Data flow
- Shipments are loaded from Local Storage and aggregated for inventory and activity.
- The inventory page consumes normalized shipment aggregates.
- The activity page uses the same aggregated data with a separate normalization.
- Notifications are generated from recent shipment activity and stored locally.
- Profile information is stored and retrieved separately.

---

## 5. Features Implemented

### Dashboard
- Total Shipments: unique shipment references count.
- Cargo in Warehouse: sum of remaining quantities.
- Outgoing Today: shipments with outbound activity today.
- Recent shipments section listing latest saved records.
- Dashboard cards serve as filters for the activity page.

### Inventory
- Search by HAWB, MAWB, or client.
- Filters for warehouse location and transaction type.
- Sort by remaining quantity.
- Pagination controls for rows per page.
- QR scan button to link search or form input.
- Drawer shows shipment detail metadata and outbound history.

### Inbound / Outbound
- Tabbed forms for inbound and outbound operations.
- Shipment information fields: client, destination, HAWB, MAWB, invoice, transaction type.
- Receiving and release information fields: date, time, received/released by, plate number, trucker, driver, cargo condition, location.
- Quantity section supports multiple quantity rows.
- Save button persists each shipment record.
- Inbound/outbound form entries are stored under `warehouseShipments`.

### Profile
- Displays current user profile metadata.
- Inline edit mode for name, username, and email.
- Profile picture modal supports upload, preview, zoom, rotate, and save.
- Profile data and picture persist in Local Storage.

### User Management
- Admin-only user table with search and filter.
- Add user modal with required fields.
- View and edit user records.
- Reset password to default `Password123`.
- Toggle user active/inactive status.
- Delete user accounts with safeguards for critical admin accounts.

### Notifications
- Notification bell with unread badge.
- Panel shows generated shipment activity messages.
- Mark all as read or read individual items.
- Notification state saves under `warehouseNotificationState`.

---

## 6. QR Code Module

### Camera API
- Uses `navigator.mediaDevices.getUserMedia()` to request camera access.
- The live camera preview is displayed in `#scanModal`.
- The module handles camera permission failures and unsupported devices gracefully.

### jsQR scanning process
- The app imports `jsQR` from CDN.
- Each animation frame draws the camera image to a temporary canvas.
- `jsQR` decodes the image data and returns QR text if found.
- On decode, the payload is passed to payload handling routines.

### JSON payload format
- The scanner accepts JSON payloads with shipping fields.
- Supported payload property names include:
  - `hawb`, `HAWB`, `hawbNumber`
  - `mawb`, `MAWB`, `mawbNumber`
  - `client`, `Client`, `shipmentClient`
  - `invoice`, `invoiceNumber`, `markings`
  - `transactionType`, `transactionTypeName`, `transaction_type`, `transaction`
  - `plateNo`, `plateNumber`, `vehiclePlate`, `vehiclePlateNo`
  - `date`, `time`

### Parsing
- `normalizeShipmentPayload()` maps alias fields to the expected form field names.
- If the QR text is plain text, the app will attempt to use it as a HAWB/MAWB search term.
- Scanned data can populate the current active shipment form or filter the inventory/activity page.

### Auto-filling form fields
- `populateShipmentForm()` writes normalized values to form fields using `data-field` selectors.
- If an existing shipment match is found, related fields such as location and unit may be auto-filled.
- Date and time fields fall back to the current Philippine date/time when missing.

### Future improvement
- Current QR handling may rely on full shipment payloads.
- Recommended: store only the shipment identifier (HAWB/MAWB) in the QR code.
- Then fetch full details from a backend database by identifier.

---

## 7. Data Storage

### Local Storage structure
- `warehouseAuthAccounts`: user account array.
- `warehouseAuthSession`: current logged-in session.
- `warehouseShipments`: saved shipment records.
- `warehouseProfile`: current profile metadata.
- `warehouseProfilePictures`: mapping of userId to image data URL.
- `warehouseNotificationState`: notifications and read/unread status.
- `sidebarCollapsed`: sidebar collapse preference.
- `warehouseLiveSearchSelection`: temporary search selection state.

### Objects and arrays
- User account object:
  - `userId`, `password`, `role`, `name`, `employeeId`, `position`, `status`, `lastLogin`, `createdAt`
- Shipment record object:
  - `client`, `destination`, `hawb`, `mawb`, `invoice`, `transactionType`, `location`, `status`, `entryType`, `savedAt`
  - `date`, `time`, `receivedBy`, `plateNo`, `trucker`, `driver`, `cargoCondition`
  - `releaseDate`, `releaseTime`, `releasePlate`, `releaseDriver`, `releaseQty`, `remarks`
  - `quantity`, `unit`, `qtyIn`, `qtyOut`
- Profile object:
  - `firstName`, `lastName`, `employeeId`, `position`, `email`, `phone`, `username`
- Notification object:
  - `id`, `type`, `title`, `description`, `meta`, `time`, `read`

### Relationships
- Shipments are grouped by HAWB or MAWB to form inventory and activity aggregates.
- Users are separate from shipment records.
- Profile picture storage is keyed by `userId` independently of profile metadata.

### Database migration path
- Replace Local Storage access with a backend API.
- Define tables such as `users`, `sessions`, `shipments`, `profiles`, and `notifications`.
- Store only encrypted password hashes and session tokens.
- Implement server-side validation and authorization.
- Keep UI logic while moving persistence behind API calls.

---

## 8. Business Logic

### Inventory calculation
- `aggregateShipmentsByReference()` groups shipment records by HAWB or MAWB.
- It computes inbound and outbound totals and calculates remaining cargo.
- The aggregated output is used by both inventory and activity reporting.

### Remaining Quantity
- Calculated as `qtyInValue - qtyOutValue`.
- Displayed as `remainingQuantity` in inventory rows.
- Unfilled or malformed quantities are treated as 0.

### Partial outbound
- Outbound entries are treated separately from inbound entries.
- Each outbound event contributes to `qtyOutValue`.
- Multiple outbound events for one reference are preserved in `outboundDetails`.

### Multiple outbound transactions for one HAWB
- The app appends outbound history entries to the same aggregated shipment reference.
- Release details are sorted chronologically.
- The latest outbound detail updates the summary release fields.

### Dashboard statistics
- Total shipments count unique aggregated shipment references.
- Cargo in warehouse is the total remaining cargo across shipments.
- Outgoing today counts shipments with outbound activity on the current date.

### Activity history
- Activity rows include inbound and outbound summary values.
- The activity page supports search, filters, and date range selection.
- Export features use the filtered activity dataset.

### Search algorithm
- Global search matches inventory and activity data by HAWB, MAWB, or client.
- Search suggestions appear in a dropdown and navigate to the relevant page.
- The match is based on lowercase substring comparisons.

### Filters
- Inventory filters: location, transaction type, search query.
- Activity filters: date range, transaction type, location, search query.
- Dashboard card filters: all, remaining cargo, outgoing today.

### Sorting
- Inventory table sorts by remaining quantity.
- User table sorts by column headers (employee ID, name, username, role, status, last login).

---

## 9. UI Components

### Reusable components
- Sidebar navigation with collapse state.
- Topbar search, notifications, and profile dropdown.
- Notification panel overlay.
- Search suggestion dropdown.
- QR scan modal with camera preview.
- Tabbed interfaces for inbound/outbound and profile sections.
- Filter panels and date-range picker.
- Tables for inventory, activity, and user management.
- Pagination controls.
- Inventory detail drawer.
- Profile picture management modal.
- Confirm modal overlays for logout and user management actions.
- Toast notices for shipment save confirmation.

### Components not used
- No component library or framework is used.
- Modals and UI behaviors are custom-coded in `assets/app.js`.

---

## 10. Responsive Design

### Desktop layout
- Wide sidebar and topbar.
- Content area uses responsive card and table layouts.
- Drawer and modals display comfortably within larger screens.

### Tablet layout
- Sidebar collapses and filter panels stack vertically.
- Search and button groups wrap.
- The date picker and modals adapt to narrower widths.

### Mobile layout
- Sidebar hides text labels when collapsed.
- Filter panels and inputs stack.
- The app remains usable, though mainly optimized for tablet/desktop.

### Breakpoints
- `@media (max-width: 900px)` for medium screens.
- `@media (max-width: 640px)` for small screens.

### Navigation changes
- Sidebar becomes more compact.
- Filter panels and popovers become full-width.
- UI elements use wrapping and stacked spacing.

---

## 11. Future Improvements

### Recommended improvements
- Replace Local Storage with a real database and backend API.
- Add server-side role-based permissions.
- Support barcode scanning in addition to QR.
- Add audit logs for user and shipment actions.
- Add Excel import for bulk shipment data.
- Improve PDF export formatting.
- Build a real-time dashboard with live updates.
- Add API integration with carriers and shipment systems.
- Deploy as a secure cloud application.
- Add automatic backup and restoration.
- Introduce secure password hashing and token-based auth.
- Separate inbound/outbound into dedicated pages or components.

---

## 12. Setup Guide

### Required software
- Modern browser with camera support (Chrome, Edge, Firefox, Safari).
- Optional: Node.js for running tests.

### How to run the project
1. Open the repository in a code editor.
2. Serve the contents with a local web server or open `index.html` directly.
   - Example: `python3 -m http.server 8080`
3. Visit `http://localhost:8080`.

### Browser requirements
- Browser must support `localStorage`.
- Camera scanning requires a secure context (`https://` or `localhost`).

### Dependencies
- No package install needed for runtime.
- Runtime libraries are loaded from CDN.
- For tests, Node.js is used to run `node tests/auth.test.js`.

### How to test QR scanning
1. Log in and open an authenticated page.
2. Click a scan button.
3. Allow camera access.
4. Show a QR code containing JSON shipment data or a plain HAWB/MAWB value.

---

## 13. Code Comments

### Files reviewed
- `assets/auth.js`
- `assets/login.js`
- `assets/app.js`
- `pages/dashboard.html`
- `pages/inbound-outbound.html`
- `pages/inventory.html`
- `pages/profile.html`
- `pages/user-management.html`
- `assets/app.css`

### Comment strategy
- Added file-level and section comments.
- Documented auth, data persistence, rendering, and QR scanning flows.
- Preserved current logic while improving readability.

---

## 14. Maintenance Notes

### Files responsible for each feature
- `assets/auth.js`: authentication, user management, session persistence.
- `assets/login.js`: login page behavior.
- `assets/app.js`: authenticated page behavior, data aggregation, scanning, and UI.
- `assets/app.css`: main authenticated styles.
- `styles.css`: login page styles.
- `pages/dashboard.html`: dashboard and activity UI.
- `pages/inbound-outbound.html`: inbound/outbound UI.
- `pages/inventory.html`: inventory and detail drawer.
- `pages/profile.html`: profile and picture UI.
- `pages/user-management.html`: admin user table.

### Key functions
- `AuthService.authenticateUser()`
- `AuthService.initializeAuth()`
- `AuthService.getCurrentUser()`
- `getStoredShipments()`
- `saveStoredShipments()`
- `aggregateShipmentsByReference()`
- `renderDashboardData()`
- `refreshInventory()`
- `refreshActivity()`
- `startQrScanner()`
- `populateShipmentForm()`
- `saveStoredProfile()`

### Global variables
- `STORAGE_KEY`
- `refreshInventory`
- `refreshActivity`
- `inventoryData`
- `activityData`
- `inMemoryShipmentStore`
- `notificationState`

### Event listeners
- `DOMContentLoaded` for app init.
- `warehouse:data-updated` for data refresh.
- click listeners for save, scan, and quantity row actions.
- topbar notification and profile dropdown interactions.
- sidebar collapse toggle.

### Local Storage keys
- `warehouseAuthAccounts`
- `warehouseAuthSession`
- `warehouseShipments`
- `warehouseProfile`
- `warehouseProfilePictures`
- `warehouseNotificationState`
- `sidebarCollapsed`
- `warehouseLiveSearchSelection`

### Components requiring caution
- `aggregateShipmentsByReference()` is central to inventory and activity logic.
- `populateShipmentForm()` connects scanned payloads to form fields.
- `AuthService` method changes affect login and user management.

---

## 15. Known Limitations

### Current limitations
- Local Storage is used instead of a database.
- Plaintext passwords are stored in browser storage.
- Authentication is client-side only.
- No server-side validation or authorization.
- QR codes may carry full shipment payloads instead of identifiers.
- Profile editing is local and not synced back to auth account data.
- Some UI elements are placeholders without advanced validation.

### Recommended enhancements
- Move authentication and storage to a secure backend.
- Store only identifiers in QR codes and use database lookup.
- Hash passwords and use secure tokens.
- Add duplicate shipment and outbound validation.
- Implement backend APIs for search and export.

---

## Final Handover Summary

For a new developer, start with `assets/auth.js` and `assets/app.js`, then inspect the HTML pages in `pages/`. This repo is a static front-end warehouse prototype that uses Local Storage for persistence and includes QR scanning for fast shipment entry.
