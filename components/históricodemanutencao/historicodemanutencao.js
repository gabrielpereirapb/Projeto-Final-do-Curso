document.addEventListener('DOMContentLoaded', () => {
    const openSidebarBtn = document.getElementById('openSidebarBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const mySidebar = document.getElementById('mySidebar');
    const confirmBtn = document.getElementById('confirmBtn');
    const clearBtn = document.getElementById('clearBtn');
    const tableBody = document.querySelector('#maintenance-table tbody');
    let dadosChamados = [];

    openSidebarBtn.addEventListener('click', () => {
        mySidebar.classList.toggle('active');
    });

    closeSidebarBtn.addEventListener('click', () => {
        mySidebar.classList.remove('active');
    });

    clearBtn.addEventListener('click', () => {
        document.getElementById('data-sidebar').value = '';
        document.getElementById('local-sidebar').value = '';
        document.getElementById('tipo-sidebar').value = '';
        document.getElementById('tecnico-sidebar').value = '';
        fetchChamados(); // Recarrega todos os chamados
    });

    confirmBtn.addEventListener('click', () => {
        fetchChamadosFiltrados();
    });

    function preencherTabela(manutencoes) {
        tableBody.innerHTML = '';
        manutencoes.forEach(manutencao => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${formatDate(manutencao.data_abertura)}</td>
                <td>${manutencao.local}</td>
                <td>${manutencao.tipo_manutencao}</td>
                <td>${manutencao.nome}</td>
                <td>${manutencao.mensagem_problema}</td>
                <td>${manutencao.mensagem_manutencao}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getUTCDate();
        const month = date.getUTCMonth();
        const year = date.getUTCFullYear();

        const months = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        
        return `${day} - ${months[month]} - ${year}`;
    }

    function fetchChamados() {
        fetch('http://localhost:3000/api/historicoManutencao')
            .then(response => {
                if (!response.ok) throw new Error('Erro ao carregar dados');
                return response.json();
            })
            .then(data => {
                dadosChamados = data;
                preencherTabela(data);
            })
            .catch(err => console.error('Erro ao carregar dados:', err));
    }

    function fetchChamadosFiltrados() {
        const local = document.getElementById('local-sidebar').value;
        const tipo = document.getElementById('tipo-sidebar').value;
        const tecnico = document.getElementById('tecnico-sidebar').value;
        
        let dadosFiltrados = dadosChamados.filter(manutencao => {
            return (!local || manutencao.local === local) &&
                   (!tipo || manutencao.tipo_manutencao === tipo) &&
                   (!tecnico || manutencao.nome === tecnico);
        });
        
        preencherTabela(dadosFiltrados);
    }

    function popularSelect(idSelect, dados, campoTexto, campoValor) {
        const select = document.getElementById(idSelect);
        select.innerHTML = '';
        const optionVazia = document.createElement('option');
        optionVazia.value = '';
        optionVazia.text = 'Selecione';
        select.appendChild(optionVazia);

        dados.forEach(item => {
            const option = document.createElement('option');
            option.value = item[campoValor];
            option.text = item[campoTexto];
            select.appendChild(option);
        });
    }

    // Preencher listas suspensas
    fetch('http://localhost:3000/api/historicoManutencao/locais')
        .then(response => {
            if (!response.ok) throw new Error('Erro ao buscar locais');
            return response.json();
        })
        .then(dados => popularSelect('local-sidebar', dados, 'local', 'local'))
        .catch(err => console.error('Erro ao buscar locais:', err));

    fetch('http://localhost:3000/api/historicoManutencao/tipos-manutencao')
        .then(response => {
            if (!response.ok) throw new Error('Erro ao buscar tipos de manutenção');
            return response.json();
        })
        .then(dados => popularSelect('tipo-sidebar', dados, 'tipo_manutencao', 'tipo_manutencao'))
        .catch(err => console.error('Erro ao buscar tipos de manutenção:', err));

    fetch('http://localhost:3000/api/historicoManutencao/tecnicos')
        .then(response => {
            if (!response.ok) throw new Error('Erro ao buscar técnicos');
            return response.json();
        })
        .then(dados => popularSelect('tecnico-sidebar', dados, 'nome', 'cpf_tecnico'))
        .catch(err => console.error('Erro ao buscar técnicos:', err));

    // Carregar os chamados inicialmente
    fetchChamados();
});
