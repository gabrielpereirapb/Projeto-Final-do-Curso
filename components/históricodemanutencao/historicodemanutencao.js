document.addEventListener('DOMContentLoaded', () => {
    const openSidebarBtn = document.getElementById('openSidebarBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn'); // Botão de "X"
    const mySidebar = document.getElementById('mySidebar');
    const confirmBtn = document.getElementById('confirmBtn');
    const clearBtn = document.getElementById('clearBtn'); // Botão de Limpar Filtros

    // Abrir a sidebar
    openSidebarBtn.addEventListener('click', () => {
        mySidebar.classList.toggle('active');
    });

    // Fechar a sidebar com o "X"
    closeSidebarBtn.addEventListener('click', () => {
        mySidebar.classList.remove('active');
    });

    // Função de limpar filtros
    clearBtn.addEventListener('click', () => {
        document.getElementById('data-sidebar').value = '';
        document.getElementById('local-sidebar').value = '';
        document.getElementById('tipo-sidebar').value = '';
        document.getElementById('tecnico-sidebar').value = '';

        // Mostra todas as linhas da tabela novamente
        const rows = document.querySelectorAll('#maintenance-table tbody tr');
        rows.forEach(row => {
            row.style.display = '';
        });
    });

    // Confirmar a filtragem
    confirmBtn.addEventListener('click', () => {
        const dataValue = formatDate(document.getElementById('data-sidebar').value);
        const localValue = document.getElementById('local-sidebar').value.toLowerCase();
        const tipoValue = document.getElementById('tipo-sidebar').value.toLowerCase();
        const tecnicoValue = document.getElementById('tecnico-sidebar').value.toLowerCase();

        const table = document.getElementById('maintenance-table');
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const data = cells[0].textContent.toLowerCase();
            const local = cells[1].textContent.toLowerCase();
            const tipo = cells[2].textContent.toLowerCase();
            const tecnico = cells[3].textContent.toLowerCase();

            const isVisible =
                (data.includes(dataValue) || !dataValue) &&
                (local.includes(localValue) || !localValue) &&
                (tipo.includes(tipoValue) || !tipoValue) &&
                (tecnico.includes(tecnicoValue) || !tecnicoValue);

            row.style.display = isVisible ? '' : 'none';
        });

        mySidebar.classList.remove('active'); // Fecha a sidebar após a filtragem
    });
});
