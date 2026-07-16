// Sidebar toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  
  if (sidebarToggle && sidebar) {
    // Load saved state from localStorage
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed) {
      sidebar.classList.add('collapsed');
    }
    
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      // Save state to localStorage
      const collapsed = sidebar.classList.contains('collapsed');
      localStorage.setItem('sidebarCollapsed', collapsed);
    });
  }

  // User profile dropdown functionality
  const userProfileBtn = document.getElementById('userProfileBtn');
  const userDropdown = document.getElementById('userDropdown');

  if (userProfileBtn && userDropdown) {
    let logoutConfirmModal = null;

    const createLogoutConfirmModal = () => {
      const modal = document.createElement('div');
      modal.className = 'logout-confirm-overlay';
      modal.innerHTML = `
        <div class="logout-confirm-inner">
          <h2>Confirm logout</h2>
          <p>Are you sure you want to log out?</p>
          <div class="logout-confirm-actions">
            <button type="button" class="logout-confirm-btn logout-cancel">Cancel</button>
            <button type="button" class="logout-confirm-btn logout-confirm danger">Logout</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.classList.contains('logout-cancel')) {
          modal.style.display = 'none';
        }
      });

      const confirmButton = modal.querySelector('.logout-confirm');
      if (confirmButton) {
        confirmButton.addEventListener('click', () => {
          window.location.href = '../index.html';
        });
      }

      return modal;
    };

    const openLogoutConfirmModal = () => {
      if (!logoutConfirmModal) {
        logoutConfirmModal = createLogoutConfirmModal();
      }
      logoutConfirmModal.style.display = 'flex';
    };

    userProfileBtn.addEventListener('click', () => {
      userDropdown.classList.toggle('open');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      if (!userProfileBtn.contains(event.target) && !userDropdown.contains(event.target)) {
        userDropdown.classList.remove('open');
      }
    });

    // Close dropdown when clicking a link
    userDropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (event) => {
        if (link.classList.contains('logout-link')) {
          event.preventDefault();
          userDropdown.classList.remove('open');
          openLogoutConfirmModal();
          return;
        }
        userDropdown.classList.remove('open');
      });
    });
  }

  const inventoryFilterToggle = document.getElementById('inventoryFilterToggle');
  const inventoryFilterPanel = document.getElementById('inventoryFilterPanel');
  let refreshInventory = null;
  let refreshActivity = null;

  if (inventoryFilterToggle && inventoryFilterPanel) {
    inventoryFilterToggle.addEventListener('click', () => {
      const isExpanded = inventoryFilterToggle.getAttribute('aria-expanded') === 'true';
      inventoryFilterToggle.setAttribute('aria-expanded', String(!isExpanded));
      inventoryFilterPanel.classList.toggle('open', !isExpanded);
      inventoryFilterPanel.setAttribute('aria-hidden', String(isExpanded));
    });
  }

  const inventoryClearFilters = document.getElementById('inventoryClearFilters');
  const inventoryLocation = document.getElementById('inventory-location');
  const inventoryTransaction = document.getElementById('inventory-transaction');
  const inventoryStatus = document.getElementById('inventory-status');

  if (inventoryClearFilters && inventoryLocation && inventoryTransaction && inventoryStatus) {
    inventoryClearFilters.addEventListener('click', () => {
      inventoryLocation.selectedIndex = 0;
      inventoryTransaction.selectedIndex = 0;
      inventoryStatus.selectedIndex = 0;
      if (typeof refreshInventory === 'function') {
        refreshInventory();
      }
    });
  }

  const activityFilterToggle = document.getElementById('activityFilterToggle');
  const activityFilterPanel = document.getElementById('activityFilterPanel');

  if (activityFilterToggle && activityFilterPanel) {
    activityFilterToggle.addEventListener('click', () => {
      const isExpanded = activityFilterToggle.getAttribute('aria-expanded') === 'true';
      activityFilterToggle.setAttribute('aria-expanded', String(!isExpanded));
      activityFilterPanel.classList.toggle('open', !isExpanded);
      activityFilterPanel.setAttribute('aria-hidden', String(isExpanded));
    });
  }

  const activityTableBody = document.getElementById('activityTableBody');
  const activityPagination = document.getElementById('activityPagination');

  if (activityTableBody && activityPagination) {
    const activityData = Array.from({ length: 25 }, (_, index) => {
      const months = ['Jul 2026', 'Jun 2026', 'May 2026'];
      const clients = ['YAZAKI ORD', 'TOYOTA TSUSHO', 'DENSO PHIL.', 'NIPPON EXPRESS', 'KURASHIKI CORP'];
      const maws = ['SPSF-26A-030', '418650', 'TYC0018-26A', '5533899552', 'ICL-07-126'];
      const hawbs = ['YPH-04800983', 'YPH-04807585', 'YPH-04808204', 'YMY-05298532', 'YPH-63792105'];
      const statuses = ['RECEIVED', 'RELEASED', 'PARTIAL', 'WAITING FOR CONFIRMATION'];
      const locations = ['Aisle A', 'Aisle B', 'Aisle C', 'Aisle A', 'Aisle B'];
      const dateIns = ['2026-07-01', '2026-06-27', '2026-05-11', '2026-07-03', '2026-06-20'];
      const dateOuts = ['2026-07-05', '2026-06-29', '2026-05-14', '2026-07-06', '2026-06-23'];
      const quantityIns = [12, 18, 9, 14, 21];
      const quantityOuts = [8, 10, 5, 7, 11];

      return {
        month: months[index % months.length],
        client: clients[index % clients.length],
        mawb: maws[index % maws.length],
        hawb: hawbs[index % hawbs.length],
        location: locations[index % locations.length],
        dateIn: dateIns[index % dateIns.length],
        qtyIn: quantityIns[index % quantityIns.length],
        dateOut: dateOuts[index % dateOuts.length],
        qtyOut: quantityOuts[index % quantityOuts.length],
        status: statuses[index % statuses.length],
        badgeClass: {
          RECEIVED: 'badge-green',
          RELEASED: 'badge-blue',
          PARTIAL: 'badge-orange',
          'WAITING FOR CONFIRMATION': 'badge-blue'
        }[statuses[index % statuses.length]]
      };
    });

    const activitySearchInput = document.getElementById('activitySearchInput');
    const activityMonthSelect = document.getElementById('activity-month');
    const activityStatusSelect = document.getElementById('activity-status');
    const activityLocationSelect = document.getElementById('activity-location');
    const activityPageSizeButtons = document.querySelectorAll('.page-size-button');

    const getActivityRowsPerPage = () => {
      const activeButton = document.querySelector('.page-size-button.active');
      const selected = activeButton?.dataset.size || '10';
      return selected === 'all' ? activityData.length : Number(selected);
    };

    const getFilteredActivityData = () => {
      const query = activitySearchInput?.value.trim().toLowerCase() || '';
      const month = activityMonthSelect?.value || '';
      const status = activityStatusSelect?.value || '';
      const location = activityLocationSelect?.value || '';

      return activityData.filter((item) => {
        const queryMatch = !query || [item.month, item.client, item.mawb, item.hawb].some((field) => field.toLowerCase().includes(query));
        const monthMatch = !month || item.month.toLowerCase() === month.toLowerCase();
        const statusMatch = !status || item.status.toLowerCase() === status.toLowerCase();
        const locationMatch = !location || item.location.toLowerCase() === location.toLowerCase();
        return queryMatch && monthMatch && statusMatch && locationMatch;
      });
    };

    const renderActivityPage = (pageNumber) => {
      const filteredData = getFilteredActivityData();
      const currentRowsPerPage = getActivityRowsPerPage();
      const totalPages = currentRowsPerPage === filteredData.length ? 1 : Math.ceil(filteredData.length / currentRowsPerPage);
      const currentPage = Math.min(Math.max(pageNumber, 1), totalPages || 1);
      const start = (currentPage - 1) * currentRowsPerPage;
      const items = filteredData.slice(start, start + currentRowsPerPage);

      activityTableBody.innerHTML = items.map((item) => `
        <tr>
          <td>${item.month}</td>
          <td>${item.client}</td>
          <td>${item.mawb}</td>
          <td>${item.hawb}</td>
          <td>${item.dateIn}</td>
          <td>${item.qtyIn}</td>
          <td>${item.dateOut}</td>
          <td>${item.qtyOut}</td>
          <td><span class="${item.badgeClass}">${item.status}</span></td>
        </tr>
      `).join('');

      activityPagination.innerHTML = '';
      for (let page = 1; page <= totalPages; page += 1) {
        const pageButton = document.createElement('button');
        pageButton.type = 'button';
        pageButton.className = 'page-box';
        pageButton.dataset.page = String(page);
        pageButton.textContent = String(page);
        if (page === currentPage) {
          pageButton.classList.add('active');
        }
        activityPagination.appendChild(pageButton);
      }
    };

    refreshActivity = () => renderActivityPage(1);

    activitySearchInput?.addEventListener('input', refreshActivity);
    activityMonthSelect?.addEventListener('change', refreshActivity);
    activityStatusSelect?.addEventListener('change', refreshActivity);
    activityLocationSelect?.addEventListener('change', refreshActivity);

    activityPageSizeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activityPageSizeButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        renderActivityPage(1);
      });
    });

    activityPagination.addEventListener('click', (event) => {
      const targetButton = event.target.closest('.page-box');
      if (!targetButton) return;
      renderActivityPage(Number(targetButton.dataset.page));
    });

    renderActivityPage(1);
  }

  const inventoryTableBody = document.getElementById('inventoryTableBody');
  const inventoryPagination = document.getElementById('inventoryPagination');

  if (inventoryTableBody && inventoryPagination) {
    const inventoryData = Array.from({ length: 50 }, (_, index) => {
      const clients = ['YAZAKI', 'DAIHO', 'TY COMPOSITE', 'FUJIFILM OPTICS', 'TI CLARK'];
      const hawbs = ['YPH-04800983', 'YPH-04807585', 'YPH-04808204', 'YMY-05298532', 'YPH-63792105'];
      const maws = ['SPSF-26A-030', '418650', 'TYC0018-26A', 'N/A', '5533899552'];
      const transactionTypes = ['OFF EXPORT', 'AFF EXPORT', 'OFF EXPORT', 'OFF IMPORT', 'AFF EXPORT'];
      const locations = ['Aisle A', 'Aisle B', 'Aisle A', 'Aisle A', 'Aisle A'];
      const quantities = ['5 CTN', '11 CTN', '1 CRT', '11 PLT', '7 CTN'];
      const statuses = ['WAITING FOR CONFIRMATION', 'HOLD', 'RETURN', 'WAITING FOR CONFIRMATION', 'HOLD'];
      const destinations = ['Manila', 'Cebu', 'Davao', 'Clark', 'Iloilo'];
      const invoices = ['INV-001', 'INV-002', 'INV-003', 'INV-004', 'INV-005'];
      const modules = ['M1', 'M2', 'M3', 'M4', 'M5'];
      const flights = ['PR 123', '5J 788', 'QR 456', 'TG 090', 'CX 321'];
      const receivedDates = ['2025-09-10', '2025-09-11', '2025-09-12', '2025-09-13', '2025-09-14'];
      const receivedTimes = ['08:45', '09:15', '10:00', '11:30', '13:20'];
      const receivedBys = ['Anna', 'Ben', 'Cara', 'Dave', 'Elena'];
      const receivingPlates = ['ABC-1234', 'DEF-5678', 'GHI-9012', 'JKL-3456', 'MNO-7890'];
      const truckers = ['Lima Transport', 'Nova Cargo', 'Prime Haul', 'Echo Logistics', 'Delta Trucking'];
      const drivers = ['Ramon', 'Maria', 'Jasper', 'Nina', 'Oscar'];
      const cargoConditions = ['Good', 'Damaged', 'Inspected', 'Refrigerated', 'Secure'];
      const cargoHandlings = ['Palletized', 'Loose', 'Fragile', 'Heavy', 'Standard'];
      const partialFulls = ['Full', 'Partial', 'Full', 'Partial', 'Full'];
      const units = ['CTN', 'PLT', 'CRT', 'PCS', 'BOX'];
      const releaseDates = ['2025-09-15', '2025-09-16', '2025-09-17', '2025-09-18', '2025-09-19'];
      const releaseTimes = ['14:00', '15:30', '16:45', '17:20', '18:05'];
      const releasePlates = ['PQR-1122', 'STU-3344', 'VWX-5566', 'YZA-7788', 'BCD-9900'];
      const releaseDrivers = ['Paul', 'Rita', 'Sam', 'Tina', 'Umar'];
      const remarks = ['Ready for release', 'Pending inspection', 'Awaiting docs', 'Hold for customs', 'Cleared'];
      const badgeClass = {
        'WAITING FOR CONFIRMATION': 'badge-blue',
        HOLD: 'badge-green',
        RETURN: 'badge-orange'
      }[statuses[index % statuses.length]];

      return {
        client: clients[index % clients.length],
        destination: destinations[index % destinations.length],
        hawb: hawbs[index % hawbs.length],
        mawb: maws[index % maws.length],
        invoice: invoices[index % invoices.length],
        transactionType: transactionTypes[index % transactionTypes.length],
        module: modules[index % modules.length],
        flight: flights[index % flights.length],
        date: receivedDates[index % receivedDates.length],
        time: receivedTimes[index % receivedTimes.length],
        receivedBy: receivedBys[index % receivedBys.length],
        receivingPlate: receivingPlates[index % receivingPlates.length],
        trucker: truckers[index % truckers.length],
        driver: drivers[index % drivers.length],
        cargoCondition: cargoConditions[index % cargoConditions.length],
        location: locations[index % locations.length],
        cargoHandling: cargoHandlings[index % cargoHandlings.length],
        status: statuses[index % statuses.length],
        partialFull: partialFulls[index % partialFulls.length],
        quantity: quantities[index % quantities.length],
        unit: units[index % units.length],
        remainingQuantity: quantities[index % quantities.length],
        releaseDate: releaseDates[index % releaseDates.length],
        releaseTime: releaseTimes[index % releaseTimes.length],
        releasePlate: releasePlates[index % releasePlates.length],
        releaseDriver: releaseDrivers[index % releaseDrivers.length],
        remarks: remarks[index % remarks.length],
        badgeClass
      };
    });

    const inventorySearchInput = document.getElementById('inventorySearchInput');
    const inventoryLocationSelect = document.getElementById('inventory-location');
    const inventoryTransactionSelect = document.getElementById('inventory-transaction');
    const inventoryStatusSelect = document.getElementById('inventory-status');
    const inventoryPageSizeButtons = document.querySelectorAll('.page-size-button');

    const getRowsPerPage = () => {
      const activeButton = document.querySelector('.page-size-button.active');
      const selected = activeButton?.dataset.size || '10';
      return selected === 'all' ? inventoryData.length : Number(selected);
    };

    const getFilteredInventoryData = () => {
      const query = inventorySearchInput?.value.trim().toLowerCase() || '';
      const location = inventoryLocationSelect?.value || '';
      const transactionType = inventoryTransactionSelect?.value || '';
      const status = inventoryStatusSelect?.value || '';

      return inventoryData.filter((item) => {
        const queryMatch = !query || [item.client, item.hawb, item.mawb].some((field) => field.toLowerCase().includes(query));
        const locationMatch = !location || item.location.toLowerCase() === location.toLowerCase();
        const transactionMatch = !transactionType || item.transactionType.toLowerCase() === transactionType.toLowerCase();
        const statusMatch = !status || item.status.toLowerCase() === status.toLowerCase();
        return queryMatch && locationMatch && transactionMatch && statusMatch;
      });
    };

    const renderInventoryPage = (pageNumber) => {
      const filteredData = getFilteredInventoryData();
      const currentRowsPerPage = getRowsPerPage();
      const totalPages = currentRowsPerPage === filteredData.length ? 1 : Math.ceil(filteredData.length / currentRowsPerPage);
      const currentPage = Math.min(Math.max(pageNumber, 1), totalPages || 1);
      const start = (currentPage - 1) * currentRowsPerPage;
      const items = filteredData.slice(start, start + currentRowsPerPage);

      inventoryTableBody.innerHTML = items.map((item, index) => `
        <tr>
          <td>${item.client}</td>
          <td>${item.hawb}</td>
          <td>${item.mawb}</td>
          <td>${item.transactionType}</td>
          <td>${item.location}</td>
          <td>${item.quantity}</td>
          <td><span class="${item.badgeClass}">${item.status}</span></td>
          <td><button type="button" class="view-details-btn" data-index="${start + index}">View</button></td>
        </tr>
      `).join('');

      inventoryPagination.innerHTML = '';
      for (let page = 1; page <= totalPages; page += 1) {
        const pageButton = document.createElement('button');
        pageButton.type = 'button';
        pageButton.className = 'page-box';
        pageButton.dataset.page = String(page);
        pageButton.textContent = String(page);
        if (page === currentPage) {
          pageButton.classList.add('active');
        }
        inventoryPagination.appendChild(pageButton);
      }
    };

    refreshInventory = () => renderInventoryPage(1);

    inventorySearchInput?.addEventListener('input', refreshInventory);
    inventoryLocationSelect?.addEventListener('change', refreshInventory);
    inventoryTransactionSelect?.addEventListener('change', refreshInventory);
    inventoryStatusSelect?.addEventListener('change', refreshInventory);

    inventoryPageSizeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        inventoryPageSizeButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        renderInventoryPage(1);
      });
    });

    inventoryPagination.addEventListener('click', (event) => {
      const targetButton = event.target.closest('.page-box');
      if (!targetButton) return;
      renderInventoryPage(Number(targetButton.dataset.page));
    });

    renderInventoryPage(1);

    const inventoryDrawer = document.getElementById('inventoryDrawer');
    const inventoryDrawerBackdrop = document.getElementById('inventoryDrawerBackdrop');
    const inventoryDrawerClose = document.getElementById('inventoryDrawerClose');
    const drawerClient = document.getElementById('drawerClient');
    const drawerDestination = document.getElementById('drawerDestination');
    const drawerHawb = document.getElementById('drawerHawb');
    const drawerMawb = document.getElementById('drawerMawb');
    const drawerInvoice = document.getElementById('drawerInvoice');
    const drawerTransaction = document.getElementById('drawerTransaction');
    const drawerModule = document.getElementById('drawerModule');
    const drawerFlight = document.getElementById('drawerFlight');
    const drawerDate = document.getElementById('drawerDate');
    const drawerTime = document.getElementById('drawerTime');
    const drawerReceivedBy = document.getElementById('drawerReceivedBy');
    const drawerReceivingPlate = document.getElementById('drawerReceivingPlate');
    const drawerTrucker = document.getElementById('drawerTrucker');
    const drawerDriver = document.getElementById('drawerDriver');
    const drawerCargoCondition = document.getElementById('drawerCargoCondition');
    const drawerLocation = document.getElementById('drawerLocation');
    const drawerCargoHandling = document.getElementById('drawerCargoHandling');
    const drawerStatus = document.getElementById('drawerStatus');
    const drawerPartialFull = document.getElementById('drawerPartialFull');
    const drawerQty = document.getElementById('drawerQty');
    const drawerUnit = document.getElementById('drawerUnit');
    const drawerRemainingQuantity = document.getElementById('drawerRemainingQuantity');
    const drawerReleaseDate = document.getElementById('drawerReleaseDate');
    const drawerReleaseTime = document.getElementById('drawerReleaseTime');
    const drawerReleasePlate = document.getElementById('drawerReleasePlate');
    const drawerReleaseDriver = document.getElementById('drawerReleaseDriver');
    const drawerRemarks = document.getElementById('drawerRemarks');

    const openInventoryDrawer = (item) => {
      if (!inventoryDrawer) return;
      drawerClient.textContent = item.client;
      drawerDestination.textContent = item.destination;
      drawerHawb.textContent = item.hawb;
      drawerMawb.textContent = item.mawb;
      drawerInvoice.textContent = item.invoice;
      drawerTransaction.textContent = item.transactionType;
      drawerModule.textContent = item.module;
      drawerFlight.textContent = item.flight;
      drawerDate.textContent = item.date;
      drawerTime.textContent = item.time;
      drawerReceivedBy.textContent = item.receivedBy;
      drawerReceivingPlate.textContent = item.receivingPlate;
      drawerTrucker.textContent = item.trucker;
      drawerDriver.textContent = item.driver;
      drawerCargoCondition.textContent = item.cargoCondition;
      drawerLocation.textContent = item.location;
      drawerCargoHandling.textContent = item.cargoHandling;
      drawerStatus.textContent = item.status;
      drawerPartialFull.textContent = item.partialFull;
      drawerQty.textContent = item.quantity;
      drawerUnit.textContent = item.unit;
      drawerRemainingQuantity.textContent = item.remainingQuantity;
      drawerReleaseDate.textContent = item.releaseDate;
      drawerReleaseTime.textContent = item.releaseTime;
      drawerReleasePlate.textContent = item.releasePlate;
      drawerReleaseDriver.textContent = item.releaseDriver;
      drawerRemarks.textContent = item.remarks;

      inventoryDrawer.classList.add('open');
      inventoryDrawerBackdrop.classList.add('open');
      inventoryDrawer.setAttribute('aria-hidden', 'false');
      inventoryDrawerBackdrop.hidden = false;
    };

    const closeInventoryDrawer = () => {
      if (!inventoryDrawer) return;
      inventoryDrawer.classList.remove('open');
      inventoryDrawerBackdrop.classList.remove('open');
      inventoryDrawer.setAttribute('aria-hidden', 'true');
      inventoryDrawerBackdrop.hidden = true;
    };

    inventoryTableBody.addEventListener('click', (event) => {
      const button = event.target.closest('.view-details-btn');
      if (!button) return;
      const index = Number(button.dataset.index);
      const item = inventoryData[index];
      if (item) {
        openInventoryDrawer(item);
      }
    });

    if (inventoryDrawerClose) {
      inventoryDrawerClose.addEventListener('click', closeInventoryDrawer);
    }

    if (inventoryDrawerBackdrop) {
      inventoryDrawerBackdrop.addEventListener('click', closeInventoryDrawer);
    }
  }

  // Tab switching functionality
  const tabs = document.querySelectorAll('.tab[data-tab]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Hide all tab contents
      document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
      });
      
      // Show the selected tab content
      const content = document.getElementById(tabName + '-content');
      if (content) {
        content.style.display = 'block';
        content.classList.add('active');
      }
    });
  });
});

// Basic UI interactions: scan modal and dynamic quantity rows
let cameraStream = null

document.addEventListener('click', async (e)=>{
  const scanTrigger = e.target.closest('.scan-btn, .inline-scan-btn')
  if(scanTrigger){
    e.preventDefault()
    const id = scanTrigger.getAttribute('data-target') || 'scanModal'
    const modal = document.getElementById(id)
    if(modal){
      const isOutbound = Boolean(scanTrigger.closest('#outbound-content'))
      modal.classList.toggle('outbound', isOutbound)
      modal.classList.toggle('inbound', !isOutbound)
      modal.style.display = 'flex'
      const video = modal.querySelector('video#cameraPreview')
      const cameraBox = modal.querySelector('.scan-camera')
      const fallback = modal.querySelector('.camera-fallback')
      if(video && navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        try {
          if(cameraStream){
            cameraStream.getTracks().forEach((track) => track.stop())
            cameraStream = null
          }
          cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false })
          video.srcObject = cameraStream
          video.play().catch(() => {})
          if(cameraBox) cameraBox.classList.add('active')
          if(fallback) fallback.textContent = ''
        } catch (err) {
          if(fallback) fallback.textContent = 'Unable to access camera. Please allow camera permission or use a compatible device.'
          console.error('Camera access failed', err)
        }
      } else if(fallback){
        fallback.textContent = 'Camera not supported on this device or browser.'
      }
    }
  }
  if(e.target.matches('.scan-close')){
    const modal = e.target.closest('.scan-modal')
    if(modal){
      modal.style.display = 'none'
      modal.classList.remove('outbound', 'inbound')
      const video = modal.querySelector('video#cameraPreview')
      const cameraBox = modal.querySelector('.scan-camera')
      const fallback = modal.querySelector('.camera-fallback')
      if(video){
        video.srcObject = null
      }
      if(cameraBox) cameraBox.classList.remove('active')
      if(fallback) fallback.textContent = 'Camera preview will appear here'
      if(cameraStream){
        cameraStream.getTracks().forEach((track) => track.stop())
        cameraStream = null
      }
    }
  }
  if(e.target.matches('.add-qty')){
    e.preventDefault()
    const quantitySection = e.target.closest('.quantity-section')
    const list = quantitySection.querySelector('.quantity-list')
    if(list){
      const row = document.createElement('div')
      row.className = 'qty-row'
      row.innerHTML = '<input type="number" min="1" value="1" placeholder="Quantity"/><select><option value="" disabled selected>Select unit</option><option>Carton</option><option>Pallet</option><option>Barrel</option><option>Box</option><option>Crate</option></select><button type="button" class="btn-delete" aria-label="Delete quantity"><i class="bi bi-trash3-fill"></i></button>'
      list.appendChild(row)
    }
  }
  if(e.target.matches('.btn-delete')){
    e.preventDefault()
    const row = e.target.closest('.qty-row')
    if(row) row.remove()
  }
  if(e.target.matches('.remove-qty')){
    const row = e.target.closest('.qty-row')
    if(row) row.remove()
  }
})
