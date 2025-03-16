// Importação para validação de token
import validarToken from "../auth/auth.js";

// Verifica o token na inicialização
document.addEventListener("DOMContentLoaded", function () {
    const valido = validarToken();

    if (!valido) {
        // Redireciona para a página de não autorizado se o token for inválido
        window.location.href = "/components/exceptions/NaoAutorizadoException.html";
    }
});

// Função para validar os dados do formulário e capturar os dados
function validarFormulario() {
    const titulo_do_chamado = document.getElementById("titulo_do_chamado").value.trim();
    const local = document.getElementById("local").value;
    const tipo_manutencao = document.getElementById("tipo_manutencao").value;
    const urgencia = document.getElementById("urgencia").value;
    const mensagem_problema = document.getElementById("mensagem_problema").value.trim();

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!titulo_do_chamado) {
        mostrarPopup("O campo 'Título do Chamado' é obrigatório.", "error");
        return false;
    }
    if (!local) {
        mostrarPopup("O campo 'Local' é obrigatório.", "error");
        return false;
    }
    if (!tipo_manutencao) {
        mostrarPopup("O campo 'Tipo de Manutenção' é obrigatório.", "error");
        return false;
    }
    if (!urgencia) {
        mostrarPopup("O campo 'Urgência' é obrigatório.", "error");
        return false;
    }
    if (!mensagem_problema) {
        mostrarPopup("O campo 'Mensagem do Problema' é obrigatório.", "error");
        return false;
    }

    const dadosChamado = {
        titulo_do_chamado,
        local,
        tipo_manutencao,
        urgencia,
        mensagem_problema
    };

    // Envia os dados para o servidor
    enviarDados(dadosChamado);
    return true;
}

// Função para exibir um pop-up com mensagem e tipo (sucesso ou erro)
function mostrarPopup(mensagem, tipo) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popupMessage");
    const popupIcon = document.getElementById("popupIcon");

    if (!popup || !popupMessage || !popupIcon) {
        console.error("Elementos do pop-up não encontrados no DOM.");
        return;
    }

    popupMessage.textContent = mensagem;
    if (tipo === "success") {
        popup.className = "popup popup-success show";
        popupIcon.textContent = "✔️";
    } else if (tipo === "error") {
        popup.className = "popup popup-error show";
        popupIcon.textContent = "❌";
    }

    setTimeout(() => {
        popup.className = "popup"; // Remove as classes adicionais para ocultar
    }, 3000);
}

// Função para enviar os dados para o servidor
async function enviarDados(dadosChamado) {
    try {
        const resposta = await fetch("http://localhost:3000/api/relatarProblema", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(dadosChamado)
        });

        if (resposta.ok) {
            mostrarPopup("Chamado cadastrado com sucesso!", "success");
            setTimeout(() => {
                window.location.href = "../home/home.html"; // Redireciona para a página inicial
            }, 2000);
        } else if (resposta.status === 409) {
            mostrarPopup("Título do chamado já existe. Escolha outro.", "error");
        } else {
            mostrarPopup("Erro ao cadastrar chamado. Tente novamente.", "error");
        }
    } catch (erro) {
        console.error("Erro ao enviar os dados do chamado:", erro);
        mostrarPopup("Erro de conexão com o servidor. Tente novamente mais tarde.", "error");
    }
}

// Função para cancelar o formulário e redirecionar
function cancelar() {
    window.location.href = "../home/home.html"; // Redireciona ao cancelar
}

// Expondo as funções para o HTML
window.validarFormulario = validarFormulario;
window.cancelar = cancelar;
