document.addEventListener("DOMContentLoaded", function () {
    const nomeInput = document.querySelector('input[name="nome"]');
    const emailInput = document.querySelector('input[name="email"]');
    const senhaInput = document.querySelector('input[name="senha"]');
    const confirmPasswordInput = document.querySelector('input[name="confirm_password"]');

    const nomeError = document.querySelector(".nome-error");
    const emailError = document.querySelector(".email-error");
    const senhaError = document.querySelector(".senha-error");
    const confirmPasswordError = document.querySelector(".confirm-password-error");

    // Função para validar nome
    function validateNome() {
        const nome = nomeInput.value.trim();
        const nomeRegex = /^[a-zA-ZÀ-ÿ\s]+(?:\s[a-zA-ZÀ-ÿ\s]+)+$/;
        if (!nomeRegex.test(nome)) {
            nomeError.textContent = "O nome deve conter pelo menos 2 palavras e não pode conter números.";
            nomeError.style.display = "block";
        } else {
            nomeError.textContent = "";
            nomeError.style.display = "none";
        }
    }

    // Função para validar e-mail
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.textContent = "Por favor, insira um e-mail válido.";
            emailError.style.display = "block";
        } else {
            emailError.textContent = "";
            emailError.style.display = "none";
        }
    }

    // Função para validar senha
    function validateSenha() {
        const senha = senhaInput.value.trim();
        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!senhaRegex.test(senha)) {
            senhaError.textContent =
                "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.";
            senhaError.style.display = "block";
        } else {
            senhaError.textContent = "";
            senhaError.style.display = "none";
        }
    }

    // Função para validar confirmação de senha
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

    // Adiciona o evento blur aos campos
    nomeInput.addEventListener("blur", validateNome);
    emailInput.addEventListener("blur", validateEmail);
    senhaInput.addEventListener("blur", validateSenha);
    confirmPasswordInput.addEventListener("blur", validateConfirmPassword);

    // Validação final ao enviar o formulário
    document.getElementById("registerForm").addEventListener("submit", function (e) {
        validateNome();
        validateEmail();
        validateSenha();
        validateConfirmPassword();

        // Impede o envio se houver mensagens de erro
        if (
            nomeError.textContent ||
            emailError.textContent ||
            senhaError.textContent ||
            confirmPasswordError.textContent
        ) {
            e.preventDefault();
        }
    });
});
