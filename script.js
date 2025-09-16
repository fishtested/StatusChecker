function getStatus() {
    fetch('/status')
      .then(response => response.json())
      .then(data => {
        createCards(data);
        filterCards('all');
        getLastUpdatedTime();
      });
}
  
function createCards(data) {
    const container = document.getElementById('statusCards');
    container.innerHTML = '';
  
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
  
    const fields = [
        { label: 'Name', value: item.name },
        { label: 'Host', value: item.host },
        { label: 'Port', value: item.port },
        { label: 'Service', value: item.service },
        { label: 'Status', value: item.status }
    ];
  
    fields.forEach(f => {
        if (!f.value) return;
        const row = document.createElement('div');
        row.className = 'row';
  
        const label = document.createElement('span');
        label.className = 'label';
        label.textContent = f.label;
  
        const value = document.createElement('span');
        value.textContent = f.value;

        if (f.label === 'Status') {
            value.classList.add(f.value.toLowerCase());
            if (f.value === 'Online' || f.value === 'Active') {
                card.classList.add('active', 'online');
                value.classList.add('online');
            } else if (f.value === 'Offline' || f.value === 'Inactive') {
                card.classList.add('inactive', 'offline');
                value.classList.add('offline');
            }
        }

        row.appendChild(label);
        row.appendChild(value);
        card.appendChild(row);
    });
  
    container.appendChild(card);
    });
}
  
function filterCards(type) {
    const cards = document.querySelectorAll('#statusCards .card');
    cards.forEach(card => {
      if (type === 'all') {
        card.style.display = 'block';
      } else if (type === 'active') {
        card.style.display = card.classList.contains('active') ? 'block' : 'none';
      } else if (type === 'inactive') {
        card.style.display = card.classList.contains('inactive') ? 'block' : 'none';
      }
    });
}
  
document.getElementById('filter').addEventListener('click', e => {
    const btn = e.target.closest('.filter-button');
    if (!btn) return;
    document.querySelectorAll('.filter-button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterCards(btn.dataset.filter);
});

function getLastUpdatedTime() {
    const lastUpdated = document.getElementById('lastUpdated');
    const updated = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];
    const month = monthNames[updated.getMonth()];
    const day = updated.getDate();
    const year = updated.getFullYear();
    const hours = String(updated.getHours()).padStart(2, '0');
    const minutes = String(updated.getMinutes()).padStart(2, '0');
    const seconds = String(updated.getSeconds()).padStart(2, '0');
    lastUpdated.textContent = `Last updated: ${month} ${day}, ${year} at ${hours}:${minutes}:${seconds}`;
}

getStatus();
