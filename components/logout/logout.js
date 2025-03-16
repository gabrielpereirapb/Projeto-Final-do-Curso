document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.createElement("div");
    menuContainer.id = "profileMenuContainer";

    const menuButton = document.createElement("button");
    menuButton.id = "profileMenuButton";
    menuButton.innerHTML = '<i class="bi bi-person"></i>';  // Ícone de perfil do Bootstrap
    menuButton.onclick = () => {
        menuContainer.classList.toggle("active");
    };

    const dropdown = document.createElement("div");
    dropdown.id = "profileDropdown";

    const username = localStorage.getItem("username") || "Usuário";
    const userName = document.createElement("p");
    userName.textContent = `Nome: ${username}`;

    const email = localStorage.getItem("email") || "email@exemplo.com";
    const userEmail = document.createElement("p");
    userEmail.textContent = `Email: ${email}`;

    const logoutButton = document.createElement("button");
    logoutButton.textContent = "Sair";
    logoutButton.onclick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        window.location.href = "../login/login.html";
    };

    dropdown.appendChild(userName);
    dropdown.appendChild(userEmail);
    dropdown.appendChild(logoutButton);

    menuContainer.appendChild(menuButton);
    menuContainer.appendChild(dropdown);

    document.body.appendChild(menuContainer);
});
