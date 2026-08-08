# LIMO Warehouse Inventory Management System
## User Manual

## Revision History

| Version | Date | Author | Description |
|---|---|---|---|
| 1.0 | July 28, 2026 | Phauline Racel Callejo | Initial Release |

## Table of Contents

1. Introduction
2. System Requirements
3. Accessing the System
4. Login
5. Dashboard
6. Inbound Module
7. Outbound Module
8. Inventory
9. QR Scanner
10. Notifications
11. Profile Module
12. Change Password Module
13. User Management (Admin Only)
14. Troubleshooting
15. Best Practices
16. Logout
17. User Roles
18. Default Accounts (Testing Only)

---

## 1. Introduction

### Overview
The LIMO Warehouse Inventory Management System is a secure web application for warehouse employees and administrators. It supports inbound and outbound shipment processing, inventory tracking, activity reporting, and user account management.

### Manual Style
This document uses a clean, professional layout with Yusen Logistics brand colors. It is designed for official use and includes separate figure placeholders for desktop and mobile views.

### How to Use
- Open the system in a web browser.
- Sign in with your assigned credentials.
- Use the sidebar to navigate between pages.
- Start with the Dashboard to review current warehouse activity.

### Notes
- Keep login credentials confidential.
- Contact your administrator if you do not have access.

### Tips
- Use the same browser session for repeat visits.

---

## 2. System Requirements

### Overview
The system works best on desktop, laptop, tablet, and mobile devices using a modern browser and stable internet connection.

### Recommended Setup
- Browser: Chrome, Edge, or Firefox
- Internet: Stable connection
- Camera: Required for QR scanning
- Screen: Adequate display size for forms and tables

### Notes
- Refresh the page if content fails to load.
- Allow camera permission when using the QR scanner.

---

## 3. Accessing the System

### Overview
Access the system using the company-approved web address. The login page displays first unless an active session already exists.

### How to Use
1. Open your browser.
2. Enter the system URL provided by your administrator.
3. If prompted, sign in with your username and password.

### Notes
- Bookmark the login page for faster access.
- Sign out before leaving a shared computer.

---

## 4. Login

### Overview
Use the Login page to securely access the warehouse system.

![Figure 4.1 Login Page - Desktop](Figure%204.1%20Login%20Page%20-%20Desktop)

*Figure 4.1 Login Page - Desktop*

![Figure 4.2 Login Page - Mobile](Figure%204.2%20Login%20Page%20-%20Mobile)

*Figure 4.2 Login Page - Mobile*

### How to Use
1. Enter your username.
2. Enter your password.
3. Click Sign In.

### Notes
- Verify credentials if the login fails.
- Contact your administrator for access issues.

> ⚠ Important
> Never share your password.

### Tips
- Turn off Caps Lock when entering your password.

---

## 5. Dashboard

### Overview
The Dashboard provides a top-level summary of warehouse operations, including shipment totals, current warehouse stock, outgoing shipments for the day, and recent activity.

![Figure 5.1 Dashboard - Desktop](Figure%205.1%20Dashboard%20-%20Desktop)

*Figure 5.1 Dashboard - Desktop*

![Figure 5.2 Dashboard - Mobile](Figure%205.2%20Dashboard%20-%20Mobile)

*Figure 5.2 Dashboard - Mobile*

### How to Use
- Review the summary cards for:
  - Total shipments
  - Cargo currently in the warehouse (how many remain in stock)
  - Outgoing shipments for the day
- Click any card to filter the activity report by that metric.
- Use the search field or the QR scan button inside the search bar to locate records by HAWB, MAWB, or Client.
  - Refer to Section 9: QR Scanner for the full scanning steps.
- Use the Date Range selector to choose:
  - All
  - Today
  - Yesterday
  - Last 7 Days
  - Last 30 Days
  - This Month
  - Last Month
  - Custom Date Range
- Filter the activity report by Transaction Type and Warehouse Location.
- Choose how many records to display per page: 5, 10, 20, or All.
- Use Export Excel, Export PDF, or Print to download or print the report.

### Notes
- Dashboard data updates as shipment records are saved.
- Summary cards provide fast access to key information and quick filtering.
- The activity report includes search, filters, and pagination for easier data review.

### Tips
- Check the Dashboard at the start of each shift to monitor daily activity and stock levels.

---

## 6. Inbound Module

### Overview
The Inbound Module captures incoming cargo details and receiving information.
It includes the WR feature for QR scanning, which can read both HAWB and MAWB codes and automatically populate the shipment fields.
This scan feature is available on search-enabled pages throughout the system and can also be used on any page that shows the QR scan button.
Manual entry is optional and used only when information needs to be corrected or adjusted.

![Figure 6.1 Inbound Module - Desktop](Figure%206.1%20Inbound%20Module%20-%20Desktop)

*Figure 6.1 Inbound Module - Desktop*

![Figure 6.2 Inbound Module - Mobile](Figure%206.2%20Inbound%20Module%20-%20Mobile)

*Figure 6.2 Inbound Module - Mobile*

### How to Use
1. Open the Inbound & Outbound page.
2. Select the Inbound tab.
3. Use the QR scan feature first, when available, to read the HAWB or MAWB code and automatically fill in information.
- Refer to Section 9: QR Scanner for the full scanning steps.
4. Under "Received by", select the warehouseman who received the cargo.
5. If needed, adjust the pre-filled details manually.
6. Click Save when complete.
7. Use Clear to reset the form if needed.

### Notes
- The QR feature can scan both HAWB and MAWB and auto-enter shipment data.
- Manual entry is available only for corrections or additional edits.
- Confirm reference numbers before saving.
- Accurate data prevents duplicate records.

> ⚠ Important
> Incorrect HAWB or MAWB values can cause mismatched records.

---

## 7. Outbound Module

### Overview
The Outbound Module records outgoing cargo and release details.

![Figure 7.1 Outbound Module - Desktop](Figure%207.1%20Outbound%20Module%20-%20Desktop)

*Figure 7.1 Outbound Module - Desktop*

![Figure 7.2 Outbound Module - Mobile](Figure%207.2%20Outbound%20Module%20-%20Mobile)

*Figure 7.2 Outbound Module - Mobile*

### How to Use
1. Open the Inbound & Outbound page.
2. Select the Outbound tab.
3. Use the QR scan feature first, when available, to read the HAWB or MAWB code and automatically fill in information.
- Refer to Section 9: QR Scanner for the full scanning steps.
4. Under "Released by", select the warehouseman who received the cargo.
5. If needed, adjust the pre-filled details manually.
6. Click Save when complete.
7. Use Clear to reset the form if needed.

### Notes
- Verify stock levels before releasing cargo.
- Review release details carefully.

> ⚠ Important
> Do not release cargo unless inventory is verified.

---

## 8. Inventory

### Overview
The Inventory page displays current stock, quantities, and shipment details.

![Figure 8.1 Inventory Page - Desktop](Figure%208.1%20Inventory%20Page%20-%20Desktop)

*Figure 8.1 Inventory Page - Desktop*

![Figure 8.2 Inventory Page - Mobile](Figure%208.2%20Inventory%20Page%20-%20Mobile)

*Figure 8.2 Inventory Page - Mobile*

### How to Use
- Search records by HAWB, MAWB, or Client, or scan a QR code using the search bar QR scan button for fast lookup.
  - Refer to Section 9: QR Scanner for the full scanning steps.
- Apply filters by location or transaction type.
- Sort inventory by remaining quantity, either lowest to highest or highest to lowest.
- Clear filters when you want to reset the list.
- Choose how many records to display per page: 5, 10, 20, or All.
- Review table rows and click View to view shipment details.

### Notes
- Filters improve search efficiency.
- Accurate inventory data supports warehouse decisions.

---

## 9. QR Scanner

### Overview
QR scanning is embedded in the system's search workflows and is available on any page that includes a scan button. Use the scan button directly on the form or search interface to read shipment QR codes and populate fields automatically.

![Figure 9.1 QR Scanner - Desktop](Figure%209.1%20QR%20Scanner%20-%20Desktop)

*Figure 9.1 QR Scanner - Desktop*

![Figure 9.2 QR Scanner - Mobile](Figure%209.2%20QR%20Scanner%20-%20Mobile)

*Figure 9.2 QR Scanner - Mobile*

### How to Use
1. On any page or search interface with a scan button, tap QR Scan button.
2. Point the camera at the QR code.
3. Wait for the code to be recognized.
4. Confirm the scanned data.
5. Continue with the normal form or search workflow.

### Notes
- Allow camera permission for scanning.
- Use good lighting for best results.

---

## 10. Notifications and Search Bar

### Overview
Notifications inform users about updates, alerts, and system activity.

![Figure 10.1 Notifications Panel - Desktop](Figure%2010.1%20Notifications%20Panel%20-%20Desktop)

*Figure 10.1 Notifications Panel - Desktop*

![Figure 10.2 Notifications Panel - Mobile](Figure%2010.2%20Notifications%20Panel%20-%20Mobile)

*Figure 10.2 Notifications Panel - Mobile*

### How to Use
- Click the notification icon in the top bar to view new alerts and updates.
- Review recent notifications.
- Open notifications for details.
- Use the double-check icon to mark all notifications as read.
- Click the View All Notifications button at the bottom to open the full notification list.
- Use the search bar in the top bar to look up records by HAWB, MAWB, or Client.
- The search results can be viewed from the Activity Report or Inventory page, depending on the selected data view.

### Notes
- Check notifications regularly during busy shifts.
- Use the mark-all-read icon when you have reviewed all alerts for faster cleanup.

---

## 11. Profile Module

### Overview
The Profile module allows users to review and update personal details such as name, email, phone number, and profile photo.

![Figure 11.1 Profile Page - Desktop](Figure%2011.1%20Profile%20Page%20-%20Desktop)

*Figure 11.1 Profile Page - Desktop*

![Figure 11.2 Profile Page - Mobile](Figure%2011.2%20Profile%20Page%20-%20Mobile)

*Figure 11.2 Profile Page - Mobile*

### How to Use
1. Open the Profile page.
2. Review your personal details in the Profile module.
3. Click the Edit Profile button to update profile fields.
4. Change your profile picture by clicking the camera icon.
5. Save changes.

### Notes
- Keep your profile details current.
- Use a professional profile photo if available.

---

## 12. Change Password Module

### Overview
The Change Password module is a separate section on the Profile page for updating your account password securely.

### How to Use
1. Open the Profile page.
2. Select the Change Password module.
3. Enter your current password.
4. Enter and confirm a new password.
5. Save changes to update your password.

### Notes
- Choose a strong password that meets your company security requirements.
- Do not share your password with others.

---

## 13. User Management (Admin Only)

### Overview
The User Management screen is for administrators to manage user accounts.

![Figure 12.1 User Management - Desktop](Figure%2012.1%20User%20Management%20-%20Desktop)

*Figure 12.1 User Management - Desktop*

![Figure 12.2 User Management - Mobile](Figure%2012.2%20User%20Management%20-%20Mobile)

*Figure 12.2 User Management - Mobile*

### How to Use
- Open the User Management page.
- Search users by employee ID, name, or username.
- Filter by role.
- Add new accounts.
- View and edit account details.
- Reset passwords to the default password.
- Deactivate an account when access should be temporarily removed.
- Delete an account when it is no longer required.

### Notes
- Only administrators should use this section.
- Review access levels before making account changes.
- Confirm account actions carefully, especially for deactivation or deletion.

---

## 14. Troubleshooting

### Overview
This section describes common steps to resolve system issues.

### How to Resolve
1. Refresh the page.
2. Check your internet connection.
3. Confirm login credentials.
4. Check camera permissions for scanning.
5. Contact the administrator if needed.

---

## 15. Best Practices

### Overview
Following best practices reduces errors and improves workflow.

### What to Do
- Double-check shipment information before saving.
- Use correct quantities and units.
- Review filters before exporting.
- Keep profile information up to date.
- Log out on shared devices.

### Notes
- Consistent practices reduce duplicate entries and mistakes.

---

## 16. Logout

### Overview
Logging out ends your session and secures your account.

![Figure 18.1 Logout - Desktop](Figure%2018.1%20Logout%20-%20Desktop)

*Figure 18.1 Logout - Desktop*

![Figure 18.2 Logout - Mobile](Figure%2018.2%20Logout%20-%20Mobile)

*Figure 18.2 Logout - Mobile*

### How to Use
1. Open the profile menu.
2. Click Logout.
3. Confirm the logout prompt by clicking Logout button.

### Notes
- Always log out on shared devices.

---

## 17. User Roles

### Overview
The system supports specific user roles so staff access functions appropriate to their responsibilities.

![Figure 20.1 User Roles - Desktop](Figure%2020.1%20User%20Roles%20-%20Desktop)

*Figure 20.1 User Roles - Desktop*

![Figure 20.2 User Roles - Mobile](Figure%2020.2%20User%20Roles%20-%20Mobile)

*Figure 20.2 User Roles - Mobile*

### Role Summary
- Employee: Sign in, view dashboard, record shipments, review inventory, update profile.
- Administrator: All employee functions plus user management.

---

## 18. Default Accounts (Testing Only)

### Overview
Default accounts are provided for training and initial setup only.

### Notes
- Use default accounts only in test or setup environments.
- Change passwords before production use.

> ⚠ Important
> These default credentials are for testing only.

### Default Accounts

| Role | Username | Password |
|---|---|---|
| Administrator | admin001 | Admin@123 |
| Employee | emp001 | Employee@123 |
