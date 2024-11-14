document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');

    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-error");

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
    function validatePassword() {
        const password = passwordInput.value.trim();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            passwordError.textContent =
                "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.";
            passwordError.style.display = "block";
        } else {
            passwordError.textContent = "";
            passwordError.style.display = "none";
        }
    }

    // Adiciona o evento blur aos campos
    emailInput.addEventListener("blur", validateEmail);
    passwordInput.addEventListener("blur", validatePassword);

    // Validação final ao enviar o formulário
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        validateEmail();
        validatePassword();

        // Impede o envio se houver mensagens de erro
        if (emailError.textContent || passwordError.textContent) {
            e.preventDefault();
        }
    });
});
