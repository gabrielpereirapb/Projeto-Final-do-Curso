// Aguarde o DOM ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    validarToken(); // Valida o token após o carregamento do DOM
});

export default function validarToken() {
    const token = localStorage.getItem('token');
    console.log('Verificando o token');

    if (!token) {
        // Se o token não estiver presente no localStorage, redireciona para login
        mostrarPopup("Token não encontrado. Redirecionando para o login...", 'error');
        setTimeout(() => {
            window.location.href = "../login/login.html";  // Ajuste o caminho para o login conforme necessário
        }, 4000);
        return false;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload
        const expDate = new Date(payload.exp * 1000); // Converte a data de expiração para o formato de data
        const currentDate = new Date();

        // Verifica se o token expirou
        if (currentDate > expDate) {
            mostrarPopup("Sessão expirada. Por favor, faça login novamente.", 'error');
            setTimeout(() => {
                window.location.href = "../login/login.html"; // Redireciona para a página de login
            }, 4000);
            return false;
        }
    } catch (error) {
        console.error("Erro ao validar o token:", error);
        mostrarPopup("Token inválido. Por favor, faça login novamente.", 'error');
        setTimeout(() => {
            window.location.href = "../login/login.html"; // Redireciona para a página de login
        }, 4000);
        return false;
    }

    return true; // O token é válido
}

// Função para exibir o pop-up
function mostrarPopup(mensagem, tipo) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');
    const popupIcon = document.getElementById('popupIcon');

    if (!popup || !popupMessage || !popupIcon) {
        console.error("Elementos do pop-up não encontrados no DOM.");
        return;
    }

    popupMessage.textContent = mensagem;
    if (tipo === 'success') {
        popup.className = 'popup popup-success show';
        popupIcon.textContent = '✔️'; // Ícone de sucesso
    } else if (tipo === 'error') {
        popup.className = 'popup popup-error show';
        popupIcon.textContent = '❌'; // Ícone de erro
    }

    // Exibe o pop-up por 4 segundos e depois o fecha
    setTimeout(fecharPopup, 4000);
}

// Função para fechar o pop-up
function fecharPopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.classList.remove('show');
    }
}

