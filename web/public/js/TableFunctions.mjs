export const fillHeader = (selector, labels) => {
    let tableHeader = window.document.getElementById(`${selector}-header`);
    let result = "";
    result += "<tr>";
    for (const label of labels) {
        result += `<th>${label}</th>`;
    }
    result += "</tr>";
    tableHeader.innerHTML = result;
}

export const fillBody = (selector, entries) => {
    let tableBody = window.document.getElementById(`${selector}-body`);
    let result = "";
    for (const entry of entries) {
        result += "<tr>";
        for (const value of entry) {
            result += `<td>${value}</td>`;
        }
        result += "</tr>";
    }
    tableBody.innerHTML = result;
}