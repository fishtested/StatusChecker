function getStatus() {
    fetch('/status')
    .then(response => response.json())
    .then(data => {
      createTable(data);
    })
    .catch(error => console.error('Error:', error));
}

function createTable(data) {
    const tableDiv = document.getElementById('statusTable');
    tableDiv.innerHTML = '';
    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const tableBody = document.createElement('tbody');
  
    table.appendChild(tableHead);
    table.appendChild(tableBody);
  
    let row = tableHead.insertRow();
    const columns = ['Name', 'Host', 'Port', 'Service', 'Status'];
    columns.forEach(col => {
        let th = document.createElement('th');
        th.textContent = col;
        row.appendChild(th);
    });
  
    data.forEach(item => {
      let row = tableBody.insertRow();
      const rowHeadings = [
        item.name || '',
        item.host || '',
        item.port || '',
        item.service || '',
        item.status || ''
    ];
    rowHeadings.forEach((value, index) => {
        const cell = row.insertCell();
        cell.textContent = value;
  
        if (columns[index] === 'Status') {
            if (value === 'Online') cell.classList.add('online');
            else if (value === 'Offline') cell.classList.add('offline');
        }
    });
    });
    tableDiv.appendChild(table)    
}
  
document.addEventListener("DOMContentLoaded", () => {
    getStatus();
});
