import validarToken from "../auth/auth.js";




document.addEventListener('DOMContentLoaded', function() {
    const valido = validarToken();

    console.log(valido)


    if(!valido){
        window.location.href = "/components/exceptions/NaoAutorizadoException.html";

    }
     
    // Adiciona eventos de formatação aos campos
     const cpf = document.getElementById('cpf');
     const telefone = document.getElementById('telefone');
 
     if (cpf) {
         cpf.addEventListener('input', () => formatarCPF(cpf));
     }
 
     if (telefone) {
         telefone.addEventListener('input', () => formatarTelefone(telefone));
     }

});


// Função para formatar o CPF (xxx.xxx.xxx-xx)
function formatarCPF(cpf) {
    cpf.value = cpf.value
        .replace(/\D/g, '') // Remove tudo que não for dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o ponto após o terceiro dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o ponto após o sexto dígito
        .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca o hífen após o nono dígito
        .replace(/(-\d{2})\d+?$/, '$1'); // Limita a entrada aos 11 dígitos do CPF
}

// Função para exibir o pop-up
function mostrarPopup(mensagem, tipo) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');
    const popupIcon = document.getElementById('popupIcon');

    popupMessage.textContent = mensagem;
    if (tipo === 'success') {
        popup.className = 'popup popup-success show';
        popupIcon.textContent = '✔️'; // Ícone de sucesso
    } else if (tipo === 'error') {
        popup.className = 'popup popup-error show';
        popupIcon.textContent = '❌'; // Ícone de erro
    }

    // Fechar o pop-up após 4 segundos
    setTimeout(fecharPopup, 4000);
}

// Função para fechar o pop-up
function fecharPopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
}

// Função para validar o formulário antes do envio
function validarFormulario(event) {
    event.preventDefault(); // Previne o envio automático do formulário

    let nome = document.getElementById('nome').value.trim();
    let cpf = document.getElementById('cpf').value.trim();
    let telefone = document.getElementById('telefone').value.trim();

    // Verifica se todos os campos estão preenchidos
    if (nome === "" || cpf === "" || telefone === "") {
        mostrarPopup("Por favor, preencha todos os campos obrigatórios.", 'error');
    } else {
        cadastrarTecnico(nome, cpf, telefone);
    }
}

// Função para formatar o telefone (xx) xxxxx-xxxx
function formatarTelefone(telefone) {
    telefone.value = telefone.value
        .replace(/\D/g, '') // Remove tudo que não for dígito
        .replace(/(\d{2})(\d)/, '($1) $2') // Coloca os parênteses no código de área
        .replace(/(\d{5})(\d)/, '$1-$2') // Coloca o hífen após os primeiros 5 dígitos
        .replace(/(-\d{4})\d+?$/, '$1'); // Limita a entrada ao formato (xx) xxxxx-xxxx
}

// Função para enviar os dados do formulário para o servidor usando fetch
async function cadastrarTecnico(nome, cpf, telefone) {
    try {
        const response = await fetch('http://localhost:3000/api/cadastroTecnico', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`  // Adiciona o token no header Authorization
            },
            body: JSON.stringify({ nome, cpf, telefone })
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar técnico');
        }

        const data = await response.text();
        mostrarPopup(data, 'success'); // Exibe o pop-up com a mensagem de sucesso
        setTimeout(() => {
            window.location.href = "../home/home.html"; // Redireciona após 2 segundos
        }, 2000);
    } catch (error) {
        console.error('Erro:', error);
        mostrarPopup('Erro ao cadastrar técnico. Por favor, tente novamente.', 'error');
    }
}

// Adiciona o evento de submit ao formulário
window.onload = function () {
    document.getElementById('cadastroForm').addEventListener('submit', validarFormulario);
}
