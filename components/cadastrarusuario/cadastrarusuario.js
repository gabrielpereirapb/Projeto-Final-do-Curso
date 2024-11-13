document.querySelector("#registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    // Obtém os valores dos campos
    const nome = document.querySelector("input[name='nome']").value;
    const email = document.querySelector("input[name='email']").value;
    const senha = document.querySelector("input[name='senha']").value;
    const confirmPassword = document.querySelector("input[name='confirm_password']").value;

    // Validações de formato usando regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // mínimo 8 caracteres, letras, números e especiais

    if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return;
    }

    if (!senhaRegex.test(senha)) {
        alert("A senha deve ter pelo menos 8 caracteres, incluindo letras, números e caracteres especiais.");
        return;
    }

    // Valida se as senhas coincidem
    if (senha !== confirmPassword) {
        alert("As senhas não coincidem. Por favor, verifique.");
        return;
    }

    // Envia os dados para o servidor via fetch
    const data = {
        nome: nome,
        email: email,
        senha: senha
    };

    fetch("http://localhost:3000/api/cadastrarusuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert(data.message);
            window.location.href = "../login/login.html"; // Redireciona para a página de login após o cadastro
        }
    })
    .catch(error => {
        console.error("Erro ao cadastrar:", error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
    });
});
