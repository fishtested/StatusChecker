function getStatus() {
    fetch('/system/json')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data);
        createCards(data);
        getLastUpdatedTime();
      })
      .catch(err => console.error("Fetch error:", err));
}

function createCards(data) {
    const container = document.getElementById('statusCards');
    container.innerHTML = '';

    let groups;

    groups = {
        CPU: data.cpu,
        RAM: data.ram,
        Disk: data.disk
    };

    const labels = {
        load1: '1m Load',
        load5: '5m Load',
        usage1: 'Used',
        availableGB: 'Available',
        usedPercent: 'Used',
        totalGB: 'Total',
        freeGB: 'Available',
    };

    const end = {
        usage1: '%',
        usedPercent: '%',
        totalGB: ' GB',
        availableGB: ' GB',
        freeGB: ' GB'
    };

    Object.entries(groups).forEach(([groupName, groupData]) => {
        const card = document.createElement('div');
        card.className = 'card';

        const header = document.createElement('h2');
        header.textContent = groupName;
        card.appendChild(header);

        Object.entries(groupData).forEach(([key, value]) => {
            const row = document.createElement('div');
            row.className = 'row';

            const label = document.createElement('span');
            label.className = 'label';
            label.textContent = labels[key] || key;

            const val = document.createElement('span');
            val.textContent = value + (end[key] || '');

            row.appendChild(label);
            row.appendChild(val);
            card.appendChild(row);

            if (groupName === 'CPU' && key === 'usage1') {
                if (value >= 75) {
                    card.classList.add('inactive', 'offline');
                    val.classList.add('offline');
                } else {
                    card.classList.add('active', 'online');
                    val.classList.add('online');
                }
            }

            if (groupName === 'RAM' && key === 'usedPercent') {
                if (value <= 40) {
                    card.classList.add('active', 'online');
                    val.classList.add('online');
                } else if (value >= 80) {
                    card.classList.add('inactive', 'offline');
                    val.classList.add('offline');
                } else {
                    card.classList.add('warn');
                    val.classList.add('warn');
                }
            }

            if (groupName === 'Disk' && key === 'usedPercent') {
                if (value >= 75) {
                    card.classList.add('inactive', 'offline');
                    val.classList.add('offline');
                } else {
                    card.classList.add('active', 'online');
                    val.classList.add('online');
                }
            }
            
        });

        container.appendChild(card);
    });
}

function getLastUpdatedTime() {
    const lastUpdated = document.getElementById('lastUpdated');
    const updated = new Date();
    const monthNames = ["January","February","March","April","May","June",
        "July","August","September","October","November","December"];
    const month = monthNames[updated.getMonth()];
    const day = updated.getDate();
    const year = updated.getFullYear();
    const hours = String(updated.getHours()).padStart(2, '0');
    const minutes = String(updated.getMinutes()).padStart(2, '0');
    const seconds = String(updated.getSeconds()).padStart(2, '0');
    lastUpdated.textContent =
      `Last updated: ${month} ${day}, ${year} at ${hours}:${minutes}:${seconds}`;
}

getStatus();
