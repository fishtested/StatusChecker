function getStatus() {
    fetch('/status')
    .then(response => response.json())
    .then(data => {
      createCards(data);
    })
    .catch(error => console.error('Error:', error));
}

function createCards(data) {
    const cards = document.getElementById('statusCards');
    cards.innerHTML = '';

  
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const fields = [
            { label: 'Name', value: item.name},
            { label: 'Host', value: item.host},
            { label: 'Port', value: item.port},
            { label: 'Service', value: item.service},
            { label: 'Status', value: item.status}
        ];

        fields.forEach(f => {
            if (!f.value) return;
            const row = document.createElement('div');
            row.classList.add('row');

            const label = document.createElement('span');
            label.classList.add('label');
            label.textContent = f.label;

            const value = document.createElement('span');
            value.classList.add('value');
            value.textContent = f.value;

            if (f.label === 'Status') {
                if (f.value === 'Online') {
                    value.classList.add('online');
                    card.classList.add('online');
                } else if (f.value === 'Offline') {
                    value.classList.add('offline');
                    card.classList.add('offline')
                } else if (f.value === 'Active') {
                    value.classList.add('online');
                    card.classList.add('online')
                } else if (f.value === 'Inactive') {
                    value.classList.add('offline');
                    card.classList.add('offline')
                };
            }

            row.appendChild(label);
            row.appendChild(value);
            card.appendChild(row);
        });
    cards.appendChild(card);
    });
}
  
document.addEventListener("DOMContentLoaded", () => {
    getStatus();
});
