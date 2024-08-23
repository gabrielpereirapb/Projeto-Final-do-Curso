// script.js
document.addEventListener('DOMContentLoaded', () => {
    const dataFilter = document.getElementById('data-filter');
    const localFilter = document.getElementById('local-filter');
    const tipoFilter = document.getElementById('tipo-filter');
    const tecnicoFilter = document.getElementById('tecnico-filter');
    const table = document.getElementById('maintenance-table');
    const rows = table.querySelectorAll('tbody tr');

    const filterTable = () => {
        const dataValue = dataFilter.value.toLowerCase();
        const localValue = localFilter.value.toLowerCase();
        const tipoValue = tipoFilter.value.toLowerCase();
        const tecnicoValue = tecnicoFilter.value.toLowerCase();

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const data = cells[0].textContent.toLowerCase();
            const local = cells[1].textContent.toLowerCase();
            const tipo = cells[2].textContent.toLowerCase();
            const tecnico = cells[3].textContent.toLowerCase();

            const isVisible =
                (data.includes(dataValue) || dataValue === '') &&
                (local.includes(localValue) || localValue === '') &&
                (tipo.includes(tipoValue) || tipoValue === '') &&
                (tecnico.includes(tecnicoValue) || tecnicoValue === '');

            row.style.display = isVisible ? '' : 'none';
        });
    };

    dataFilter.addEventListener('input', filterTable);
    localFilter.addEventListener('input', filterTable);
    tipoFilter.addEventListener('input', filterTable);
    tecnicoFilter.addEventListener('input', filterTable);
});
