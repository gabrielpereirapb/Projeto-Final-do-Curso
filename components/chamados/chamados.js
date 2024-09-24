// Constante para limitar o tamanho da descrição
const MAX_DESC_LENGTH = 50;

// Função para buscar os chamados do servidor
async function buscarChamados() {
    try {
        const response = await fetch('http://localhost:3000/api/novoChamado'); // URL do seu back-end

        if (!response.ok) {
            throw new Error('Erro ao buscar chamados');
        }
        const data = await response.json();

        atualizarChamados(data); // Atualiza a tabela com os dados do back-end
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Atualiza os chamados no DOM com os dados recebidos do back-end
function atualizarChamados(chamados) {
    const tabelaChamados = document.getElementById('chamados-tabela');
    tabelaChamados.innerHTML = ''; // Limpa a tabela antes de atualizar

    chamados.forEach(chamado => {
        const row = document.createElement('tr');
        const dataFormatada = new Date(chamado.data_abertura).toLocaleDateString('pt-BR');

        // Limita a descrição para ser exibida na tabela
        const descricaoResumida = chamado.mensagem.length > MAX_DESC_LENGTH 
            ? chamado.mensagem.substring(0, MAX_DESC_LENGTH) + '...' 
            : chamado.mensagem;

        row.innerHTML = `
            <td>${chamado.id}</td>
            <td>${dataFormatada}</td>
            <td>${chamado.tipo_manutencao}</td>
            <td>${descricaoResumida}</td>
        `;
        
        row.classList.add('chamado');
        row.dataset.id = chamado.id;
        row.dataset.data = dataFormatada;
        row.dataset.tecnico = chamado.tipo_manutencao;
        row.dataset.descricao = chamado.mensagem;

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
    document.getElementById('modal-data').textContent = new Date(chamado.chamado.data_abertura).toLocaleDateString('pt-BR');
    document.getElementById('modal-tecnico').textContent = chamado.tipo_manutencao;
    document.getElementById('modal-descricao').textContent = chamado.mensagem;
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

// Atualiza os chamados do servidor ao carregar a página
window.onload = buscarChamados;
