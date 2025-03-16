// Listener para o envio do formulário
document.querySelector("#registerForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    // Obtém os valores dos campos
    const nome = document.querySelector("input[name='nome']").value.trim();
    const email = document.querySelector("input[name='email']").value.trim();
    const senha = document.querySelector("input[name='senha']").value.trim();
    const confirmPassword = document.querySelector("input[name='confirm_password']").value.trim();

    // Validações
    const nomeRegex = /^[a-zA-ZÀ-ÿ\s]+(?:\s[a-zA-ZÀ-ÿ\s]+)+$/; // Nome com pelo menos 2 palavras
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // E-mail padrão
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Senha forte

    if (!nomeRegex.test(nome)) {
        exibirPopup("O nome deve conter pelo menos 2 palavras e não pode conter números.", "error");
        return;
    }

    if (!emailRegex.test(email)) {
        exibirPopup("Por favor, insira um e-mail válido.", "error");
        return;
    }

    if (!senhaRegex.test(senha)) {
        exibirPopup(
            "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
            "error"
        );
        return;
    }

    if (senha !== confirmPassword) {
        exibirPopup("As senhas não coincidem. Por favor, verifique.", "error");
        return;
    }

    // Envia os dados para o servidor via fetch
    const data = {
        nome,
        email,
        senha,
    };

    fetch("http://localhost:3000/api/cadastrarusuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                exibirPopup(data.error, "error");
            } else {
                exibirPopup(data.message, "success");
                setTimeout(() => {
                    window.location.href = "../login/login.html"; // Redireciona para a página de login
                }, 3000);
            }
        })
        .catch((error) => {
            console.error("Erro ao cadastrar:", error);
            exibirPopup("Ocorreu um erro. Tente novamente mais tarde.", "error");
        });
});

// Função para exibir o pop-up
function exibirPopup(mensagem, tipo) {
    const popup = document.getElementById("popup");
    const popupIcon = document.getElementById("popupIcon");
    const popupMessage = document.getElementById("popupMessage");

    popupMessage.textContent = mensagem;
    popup.classList.add("show");

    if (tipo === "success") {
        popup.classList.add("popup-success");
        popup.classList.remove("popup-error");
        popupIcon.textContent = "✔️";
    } else if (tipo === "error") {
        popup.classList.add("popup-error");
        popup.classList.remove("popup-success");
        popupIcon.textContent = "❌";
    }

    // Fecha o pop-up automaticamente após 3 segundos
    setTimeout(fecharPopup, 3000);
}

// Função para fechar o pop-up
function fecharPopup() {
    const popup = document.getElementById("popup");
    popup.classList.remove("show");
}

// Validação em tempo real
document.addEventListener("DOMContentLoaded", function () {
    const nomeInput = document.querySelector('input[name="nome"]');
    const emailInput = document.querySelector('input[name="email"]');
    const senhaInput = document.querySelector('input[name="senha"]');
    const confirmPasswordInput = document.querySelector('input[name="confirm_password"]');

    const nomeError = document.querySelector(".nome-error");
    const emailError = document.querySelector(".email-error");
    const senhaError = document.querySelector(".senha-error");
    const confirmPasswordError = document.querySelector(".confirm-password-error");

    // Funções de validação
    function validateNome() {
        const nome = nomeInput.value.trim();
        if (!/^[a-zA-ZÀ-ÿ\s]+(?:\s[a-zA-ZÀ-ÿ\s]+)+$/.test(nome)) {
            nomeError.textContent = "O nome deve conter pelo menos 2 palavras e não pode conter números.";
            nomeError.style.display = "block";
        } else {
            nomeError.textContent = "";
            nomeError.style.display = "none";
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailError.textContent = "Por favor, insira um e-mail válido.";
            emailError.style.display = "block";
        } else {
            emailError.textContent = "";
            emailError.style.display = "none";
        }
    }

    function validateSenha() {
        const senha = senhaInput.value.trim();
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha)) {
            senhaError.textContent =
                "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.";
            senhaError.style.display = "block";
        } else {
            senhaError.textContent = "";
            senhaError.style.display = "none";
        }
    }

    function validateConfirmPassword() {
        const senha = senhaInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        if (senha !== confirmPassword) {
            confirmPasswordError.textContent = "As senhas não coincidem.";
            confirmPasswordError.style.display = "block";
        } else {
            confirmPasswordError.textContent = "";
            confirmPasswordError.style.display = "none";
        }
    }

    // Eventos de validação em tempo real
    nomeInput.addEventListener("blur", validateNome);
    emailInput.addEventListener("blur", validateEmail);
    senhaInput.addEventListener("blur", validateSenha);
    confirmPasswordInput.addEventListener("blur", validateConfirmPassword);
});
