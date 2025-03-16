import validarToken from "../auth/auth.js";


document.addEventListener('DOMContentLoaded', () => {
   
    const valido = validarToken();

    console.log(valido)


    if(!valido){
        window.location.href = "/components/exceptions/NaoAutorizadoException.html";

    }

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
                <td>${formatDate(manutencao.data)}</td>
                <td>${manutencao.titulo_do_chamado}</td>
                <td>${manutencao.local}</td>
                <td>${manutencao.tipo_manutencao}</td>
                <td>${manutencao.tecnico_responsavel}</td>
                <td>${manutencao.mensagem_solucao}</td>
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
            "1", "2", "3", "4", "5", "6",
            "7", "8", "9", "10", "11", "12"
        ];
        
        return `${day}/${months[month]}/${year}`;
    }

    function fetchChamados() {
        fetch('http://localhost:3000/api/historicoManutencao', {
            method: 'GET', // Altere para GET, POST ou outro método, se necessário
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar dados');
            return response.json();
        })
        .then(data => {
            dadosChamados = data;
            console.log(dadosChamados);
            preencherTabela(data); // Atualiza a tabela com os dados recebidos
        })
        .catch(err => console.error('Erro ao carregar dados:', err));
    }
    

    function fetchChamadosFiltrados() {
        const data = document.getElementById('data-sidebar').value;
        const local = document.getElementById('local-sidebar').value;
        const tipo = document.getElementById('tipo-sidebar').value;
        const tecnico = document.getElementById('tecnico-sidebar').value;

        console.log(data)
        console.log()

        
        let dadosFiltrados = dadosChamados.filter(manutencao => {
            return (!data || formatDate(manutencao.data) === formatDate(data)) &&
                   (!local || manutencao.local === local) &&
                   (!tipo || manutencao.tipo_manutencao === tipo) &&
                   (!tecnico || manutencao.tecnico_responsavel === tecnico);
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

    // Fetch para preencher os dados de locais
fetch('http://localhost:3000/api/historicoManutencao/locais', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})
    .then(response => {
        if (!response.ok) throw new Error('Erro ao buscar locais');
        return response.json();
    })
    .then(dados => popularSelect('local-sidebar', dados, 'local', 'local'))
    .catch(err => console.error('Erro ao buscar locais:', err));

// Fetch para preencher os dados de tipos de manutenção
fetch('http://localhost:3000/api/historicoManutencao/tipos-manutencao', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})
    .then(response => {
        if (!response.ok) throw new Error('Erro ao buscar tipos de manutenção');
        return response.json();
    })
    .then(dados => popularSelect('tipo-sidebar', dados, 'tipo_manutencao', 'tipo_manutencao'))
    .catch(err => console.error('Erro ao buscar tipos de manutenção:', err));

// Fetch para preencher os dados de técnicos
fetch('http://localhost:3000/api/historicoManutencao/tecnicos', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})
    .then(response => {
        if (!response.ok) throw new Error('Erro ao buscar técnicos');
        return response.json();
    })
    .then(dados => popularSelect('tecnico-sidebar', dados, 'nome', 'nome'))
    .catch(err => console.error('Erro ao buscar técnicos:', err));

    // Carregar os chamados inicialmente
    fetchChamados();
});
