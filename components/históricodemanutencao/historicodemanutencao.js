document.addEventListener('DOMContentLoaded', () => {
    const openSidebarBtn = document.getElementById('openSidebarBtn');
    const mySidebar = document.getElementById('mySidebar');
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    // Abrir a sidebar
    openSidebarBtn.addEventListener('click', () => {
        mySidebar.classList.toggle('active');
    });

    function formatDate(dateString) {
        const [year, month, day] = dateString.split("-");
        return day+'-'+month+'-'+year;
    }

    // Confirmar a filtragem
    confirmBtn.addEventListener('click', () => {
        const dataValue = formatDate(document.getElementById('data-sidebar').value);
        const localValue = document.getElementById('local-sidebar').value.toLowerCase();
        const tipoValue = document.getElementById('tipo-sidebar').value.toLowerCase();
        const tecnicoValue = document.getElementById('tecnico-sidebar').value.toLowerCase();
        console.log(formatDate(dataValue))
        const table = document.getElementById('maintenance-table');
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const data = cells[0].textContent.toLowerCase();
            const local = cells[1].textContent.toLowerCase();
            const tipo = cells[2].textContent.toLowerCase();
            const tecnico = cells[3].textContent.toLowerCase();

            console.log(data)

            const isVisible =
                (data.includes(dataValue) || !dataValue) &&
                (local.includes(localValue) || !localValue) &&
                (tipo.includes(tipoValue) || !tipoValue) &&
                (tecnico.includes(tecnicoValue) || !tecnicoValue);

            row.style.display = isVisible ? '' : 'none';
        });

        mySidebar.classList.remove('active'); // Fecha a sidebar após a filtragem
    });

    // Cancelar a filtragem e fechar a sidebar
    cancelBtn.addEventListener('click', () => {
        mySidebar.classList.remove('active');
    });
});
