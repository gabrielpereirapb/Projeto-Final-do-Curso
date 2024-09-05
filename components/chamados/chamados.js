const chamados = [
    {
        id: 101,
        data: "2024-09-01T14:30:00",
        tecnico: "Carlos Silva",
        descricao: "Problema no servidor de banco de dados. Requer reinicialização e análise de logs."
    },
    {
        id: 102,
        data: "2024-09-03T09:15:00",
        tecnico: "Ana Pereira",
        descricao: "Configuração de novos roteadores para a rede interna do escritório."
    }
];

// Número máximo de caracteres que será exibido na tabela
const MAX_DESC_LENGTH = 50;

// Função para atualizar os chamados
function atualizarChamados() {
    const tabelaChamados = document.getElementById('chamados-tabela');
    tabelaChamados.innerHTML = ''; // Limpa a tabela antes de atualizar

    chamados.forEach(chamado => {
        const row = document.createElement('tr');
        
        const dataFormatada = new Date(chamado.data).toLocaleDateString('pt-BR');

        // Limita a descrição para ser exibida na tabela
        const descricaoResumida = chamado.descricao.length > MAX_DESC_LENGTH 
            ? chamado.descricao.substring(0, MAX_DESC_LENGTH) + '...' 
            : chamado.descricao;

        row.innerHTML = `
            <td>${chamado.id}</td>
            <td>${dataFormatada}</td>
            <td>${chamado.tecnico}</td>
            <td>${descricaoResumida}</td>
        `;
        
        row.classList.add('chamado');
        row.dataset.id = chamado.id;
        row.dataset.data = dataFormatada;
        row.dataset.tecnico = chamado.tecnico;
        row.dataset.descricao = chamado.descricao;

        tabelaChamados.appendChild(row);

        // Adiciona o evento de clique para abrir o modal
        row.addEventListener('click', function() {
            abrirModal(chamado);
        });
    });
}

// Função para abrir o modal
function abrirModal(chamado) {
    const modal = document.getElementById('modal');
    document.getElementById('modal-id').textContent = chamado.id;
    document.getElementById('modal-data').textContent = new Date(chamado.data).toLocaleDateString('pt-BR');
    document.getElementById('modal-tecnico').textContent = chamado.tecnico;
    document.getElementById('modal-descricao').textContent = chamado.descricao;
    modal.classList.add('show');
}

// Função para fechar o modal
document.querySelector('.fechar').addEventListener('click', function() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
});

// Fecha o modal se clicar fora do conteúdo
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

// Atualiza os chamados simulados ao carregar a página
window.onload = atualizarChamados;

