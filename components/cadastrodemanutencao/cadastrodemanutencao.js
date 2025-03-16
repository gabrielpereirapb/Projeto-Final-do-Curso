import validarToken from "../auth/auth.js";




document.addEventListener('DOMContentLoaded', function() {
    const valido = validarToken();

    console.log(valido)


    if(!valido){
        window.location.href = "/components/exceptions/NaoAutorizadoException.html";

    }
    carregarChamadosPendentes();
    carregarTecnicosCadastrados();
});

// Função para buscar e preencher os chamados pendentes
function carregarChamadosPendentes() {
    fetch('http://localhost:3000/api/cadastroManutencao/pendente', {
        method: 'GET',  // O método que você deseja (GET, POST, PUT, etc.)
        headers: {
            'Content-Type': 'application/json',  // Define o tipo de conteúdo como JSON
            'Authorization': `Bearer ${localStorage.getItem('token')}`  // Adiciona o token no header Authorization
        }
    })
    .then(response => response.json())
    .then(data => {
        const selectChamado = document.getElementById('titulo_do_chamado');
        data.forEach(chamado => {
            const option = document.createElement('option');
            option.value = chamado.id;
            option.textContent = chamado.titulo_do_chamado;
            selectChamado.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar os chamados pendentes:', error);
    });
}

// Função para buscar e preencher os técnicos cadastrados
function carregarTecnicosCadastrados() {
    fetch('http://localhost:3000/api/cadastroManutencao/tecnicocadastrado', {
        method: 'GET',  // O método que você deseja (GET, POST, PUT, etc.)
        headers: {
            'Content-Type': 'application/json',  // Define o tipo de conteúdo como JSON
            'Authorization': `Bearer ${localStorage.getItem('token')}`  // Adiciona o token no header Authorization
        }
    })
    .then(response => response.json())
    .then(data => {
        const selectTecnico = document.getElementById('tecnico_responsavel');
        data.forEach(tecnico => {
            const option = document.createElement('option');
            option.value = tecnico.cpf;
            option.textContent = tecnico.nome;
            selectTecnico.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar os técnicos cadastrados:', error);
    });
}

// Função para exibir o pop-up
function mostrarPopup(mensagem, tipo) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');
    const popupIcon = document.getElementById('popupIcon');

    popupMessage.textContent = mensagem;
    if (tipo === 'success') {
        popup.className = 'popup popup-success show';
        popupIcon.textContent = '✔️';
    } else if (tipo === 'error') {
        popup.className = 'popup popup-error show';
        popupIcon.textContent = '❌';
    }

    setTimeout(fecharPopup, 4000);
}

// Função para fechar o pop-up
function fecharPopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
}

// Função para validar e enviar o formulário
function validarFormulario() {
    let id = document.getElementById('titulo_do_chamado').value;
    let cpf_tecnico = document.getElementById('tecnico_responsavel').value;
    let mensagem_solucao = document.getElementById('mensagem_solucao').value.trim();

    if (id === "" || cpf_tecnico === "" || mensagem_solucao === "") {
        mostrarPopup("Por favor, preencha todos os campos obrigatórios.", "error");
    } else {
        const dadosManutencao = { id, cpf_tecnico, mensagem_solucao };
        enviarDados(dadosManutencao);
    }
}

// Função para enviar os dados via fetch
function enviarDados(dadosManutencao) {
    const url = 'http://localhost:3000/api/cadastroManutencao';

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' ,
                     'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dadosManutencao),
    })
    .then(response => {
        if (response.ok) {
            mostrarPopup("Cadastro realizado com sucesso!", "success");
            setTimeout(() => window.location.href = "../home/home.html", 2000);
        } else {
            return response.text().then(text => { throw new Error(text); });
        }
    })
    .catch(error => {
        console.error('Erro ao cadastrar manutenção:', error);
        mostrarPopup("Ocorreu um erro ao enviar os dados. Tente novamente.", "error");
    });
}
// Expondo as funções para o HTML
window.validarFormulario = validarFormulario;
window.cancelar = cancelar;

// Função para cancelar e redirecionar
function cancelar() {
    window.location.href = "../home/home.html";
}
