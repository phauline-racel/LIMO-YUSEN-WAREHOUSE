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
      link.addEventListener('click', () => {
        userDropdown.classList.remove('open');
      });
    });
  }

  const inventoryFilterToggle = document.getElementById('inventoryFilterToggle');
  const inventoryFilterPanel = document.getElementById('inventoryFilterPanel');

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

  const weeklyOverviewTrigger = document.getElementById('weeklyOverviewTrigger');
  const activitySummaryCards = document.getElementById('activitySummaryCards');

  if (weeklyOverviewTrigger && activitySummaryCards) {
    const toggleSummaryCards = () => {
      const isExpanded = weeklyOverviewTrigger.getAttribute('aria-expanded') === 'true';
      weeklyOverviewTrigger.setAttribute('aria-expanded', String(!isExpanded));
      activitySummaryCards.hidden = isExpanded;
    };

    weeklyOverviewTrigger.addEventListener('click', toggleSummaryCards);
    weeklyOverviewTrigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleSummaryCards();
      }
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
      const dateIns = ['2026-07-01', '2026-06-27', '2026-05-11', '2026-07-03', '2026-06-20'];
      const dateOuts = ['2026-07-05', '2026-06-29', '2026-05-14', '2026-07-06', '2026-06-23'];
      const quantityIns = [12, 18, 9, 14, 21];
      const quantityOuts = [8, 10, 5, 7, 11];

      return {
        month: months[index % months.length],
        client: clients[index % clients.length],
        mawb: maws[index % maws.length],
        hawb: hawbs[index % hawbs.length],
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

    const rowsPerPage = 6;
    const totalPages = Math.ceil(activityData.length / rowsPerPage);

    const renderActivityPage = (pageNumber) => {
      const start = (pageNumber - 1) * rowsPerPage;
      const items = activityData.slice(start, start + rowsPerPage);

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

      activityPagination.querySelectorAll('.page-box').forEach((button) => {
        button.classList.toggle('active', Number(button.dataset.page) === pageNumber);
      });
    };

    activityPagination.querySelectorAll('.page-box').forEach((button) => button.remove());

    for (let page = 1; page <= totalPages; page += 1) {
      const pageButton = document.createElement('button');
      pageButton.type = 'button';
      pageButton.className = 'page-box';
      pageButton.dataset.page = String(page);
      pageButton.textContent = String(page);
      activityPagination.appendChild(pageButton);
    }

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

    const rowsPerPage = 5;
    const totalPages = Math.ceil(inventoryData.length / rowsPerPage);

    const renderInventoryPage = (pageNumber) => {
      const start = (pageNumber - 1) * rowsPerPage;
      const items = inventoryData.slice(start, start + rowsPerPage);

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

      inventoryPagination.querySelectorAll('.page-box').forEach((button) => {
        button.classList.toggle('active', Number(button.dataset.page) === pageNumber);
      });
    };

    for (let page = 1; page <= totalPages; page += 1) {
      const pageButton = document.createElement('button');
      pageButton.type = 'button';
      pageButton.className = 'page-box';
      pageButton.dataset.page = String(page);
      pageButton.textContent = String(page);
      inventoryPagination.appendChild(pageButton);
    }

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
document.addEventListener('click', (e)=>{
  const scanTrigger = e.target.closest('.scan-btn, .inline-scan-btn')
  if(scanTrigger){
    e.preventDefault()
    const id = scanTrigger.getAttribute('data-target') || 'scanModal'
    const modal = document.getElementById(id)
    if(modal) modal.style.display = 'flex'
  }
  if(e.target.matches('.scan-close')){
    const modal = e.target.closest('.scan-modal')
    if(modal) modal.style.display = 'none'
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
