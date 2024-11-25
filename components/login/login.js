document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#loginForm");
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-error");

    // Adiciona validação em tempo real
    emailInput.addEventListener("input", validateEmail);
    passwordInput.addEventListener("input", validatePassword);

    // Envia os dados para o servidor
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Impede envio padrão

            // Validação final
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();

            if (!isEmailValid || !isPasswordValid) {
                return; // Para se houver erros de validação
            }

            // Dados para o backend
            const data = {
                email: emailInput.value.trim(),
                senha: passwordInput.value.trim(),
            };

            fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erro na requisição");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.error) {
                        exibirPopup(data.error, "error");
                    } else {
                        exibirPopup(data.message, "success");
                        localStorage.setItem("token", data.token); // Armazena token
                        setTimeout(() => {
                            window.location.href = "../home/home.html"; // Redireciona
                        }, 3000);
                    }
                })
                .catch((error) => {
                    console.error("Erro ao fazer login:", error);
                    exibirPopup("Ocorreu um erro. Tente novamente mais tarde.", "error");
                });
        });
    }
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
