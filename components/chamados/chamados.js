import validarToken from "../auth/auth.js";




document.addEventListener('DOMContentLoaded', function() {
    const valido = validarToken();

    console.log(valido)


    if(!valido){
        window.location.href = "/components/exceptions/NaoAutorizadoException.html";

    }

});

// Constante para limitar o tamanho da descrição
const MAX_DESC_LENGTH = 50;

// Função para buscar os chamados do servidor
async function buscarChamados() {
    try {
        const response = await fetch('http://localhost:3000/api/novoChamado', {
            method: 'GET', // Ajuste o método conforme necessário (GET, POST, etc.)
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            // Redireciona para página de não autorizado se a resposta não for ok
            window.location.href = "/components/exceptions/NaoAutorizadoException.html";
            return; // Finaliza a execução para evitar erros posteriores
        }

        const data = await response.json();
        atualizarChamados(data); // Atualiza a tabela com os dados do back-end
    } catch (error) {
        console.error('Erro ao buscar chamados:', error);
    }
}


// Atualiza os chamados no DOM com os dados recebidos do back-end
function atualizarChamados(chamados) {
    const tabelaChamados = document.getElementById('chamados-tabela');
    tabelaChamados.innerHTML = ''; // Limpa a tabela antes de atualizar

    chamados.forEach(chamado => {
        const row = document.createElement('tr');
        const dataFormatada = new Date(chamado.data).toLocaleDateString('pt-BR');

        // Limita a descrição para ser exibida na tabela
        const descricaoResumida = chamado.mensagem_problema.length > MAX_DESC_LENGTH 
            ? chamado.mensagem_problema.substring(0, MAX_DESC_LENGTH) + '...' 
            : chamado.mensagem_problema;

        row.innerHTML = `   
            <td>${chamado.titulo_do_chamado} </td>
            <td>${dataFormatada}</td>
            <td>${chamado.tipo_manutencao}</td>
            <td>${descricaoResumida}</td>
        `;
        
        row.classList.add('chamado');
        row.dataset.titulo = chamado.titulo_do_chamado;
        row.dataset.data = dataFormatada;
        row.dataset.tecnico = chamado.tipo_manutencao;
        row.dataset.descricao = chamado.mensagem_problema;

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
    /**document.getElementById('modal-id').textContent = chamado.chamado_id;
    document.getElementById('modal-data').textContent = new Date(chamado.data_abertura).toLocaleDateString('pt-BR');
    document.getElementById('modal-tecnico').textContent = chamado.tipo_manutencao;**/
    document.getElementById('modal-descricao').textContent = chamado.mensagem_problema;
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
