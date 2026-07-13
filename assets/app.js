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
      const badgeClass = {
        'WAITING FOR CONFIRMATION': 'badge-blue',
        HOLD: 'badge-green',
        RETURN: 'badge-orange'
      }[statuses[index % statuses.length]];

      return {
        client: clients[index % clients.length],
        hawb: hawbs[index % hawbs.length],
        mawb: maws[index % maws.length],
        transactionType: transactionTypes[index % transactionTypes.length],
        location: locations[index % locations.length],
        quantity: quantities[index % quantities.length],
        status: statuses[index % statuses.length],
        badgeClass
      };
    });

    const rowsPerPage = 5;
    const totalPages = Math.ceil(inventoryData.length / rowsPerPage);

    const renderInventoryPage = (pageNumber) => {
      const start = (pageNumber - 1) * rowsPerPage;
      const items = inventoryData.slice(start, start + rowsPerPage);

      inventoryTableBody.innerHTML = items.map((item) => `
        <tr>
          <td>${item.client}</td>
          <td>${item.hawb}</td>
          <td>${item.mawb}</td>
          <td>${item.transactionType}</td>
          <td>${item.location}</td>
          <td>${item.quantity}</td>
          <td><span class="${item.badgeClass}">${item.status}</span></td>
          <td><a href="shipment-details.html">View</a></td>
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
  if(e.target.matches('.scan-btn')){
    const id = e.target.getAttribute('data-target') || 'scanModal'
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
      row.innerHTML = '<input type="number" min="1" value="1" placeholder="Quantity"/><select><option value="" disabled selected>Select unit</option><option>Carton</option><option>Pallet</option><option>Barrel</option><option>Box</option><option>Crate</option></select><button type="button" class="btn-delete">🗑</button>'
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
