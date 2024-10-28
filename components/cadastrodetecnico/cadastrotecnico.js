
// Função para formatar o CPF (xxx.xxx.xxx-xx)
function formatarCPF(cpf) {
    cpf.value = cpf.value
        .replace(/\D/g, '') // Remove tudo que não for dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o ponto após o terceiro dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o ponto após o sexto dígito
        .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca o hífen após o nono dígito
        .replace(/(-\d{2})\d+?$/, '$1'); // Limita a entrada aos 11 dígitos do CPF
}

// Função para validar CPF
function validarCPF(cpf) {
    // Remove a formatação
    const cpfLimpo = cpf.replace(/\D/g, '');
    
    // Verifica se o CPF tem 11 dígitos
    if (cpfLimpo.length !== 11 || /^[0-9]+$/.test(cpfLimpo)) {
        return false; // CPF inválido se não tem 11 dígitos ou se é apenas números iguais
    }

    // Cálculo dos dígitos verificadores
    let soma = 0;
    let resto;

    // Valida o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpfLimpo.charAt(i - 1)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpfLimpo.charAt(9))) {
        return false; // CPF inválido
    }

    // Valida o segundo dígito verificador
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpfLimpo.charAt(i - 1)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpfLimpo.charAt(10))) {
        return false; // CPF inválido
    }

    return true; // CPF válido
}

// Exemplo de uso da validação no formulário
function validarFormulario(event) {
    event.preventDefault(); // Previne o envio automático do formulário

    let nome = document.getElementById('nome').value.trim();
    let cpf = document.getElementById('cpf').value.trim();
    let telefone = document.getElementById('telefone').value.trim();

    // Verifica se todos os campos estão preenchidos
    if (nome === "" || cpf === "" || telefone === "") {
        alert("Por favor, preencha todos os campos obrigatórios.");
    } else if (!validarCPF(cpf)) {
        alert("CPF inválido. Por favor, verifique o número informado.");
    } else {
        cadastrarTecnico(nome, cpf, telefone);
    }
}

// Adiciona o evento de submit ao formulário
window.onload = function () {
    document.getElementById('cadastroForm').addEventListener('submit', validarFormulario);
}


// Função para formatar o telefone (xx) xxxxx-xxxx
function formatarTelefone(telefone) {
    telefone.value = telefone.value
        .replace(/\D/g, '') // Remove tudo que não for dígito
        .replace(/(\d{2})(\d)/, '($1) $2') // Coloca os parênteses no código de área
        .replace(/(\d{5})(\d)/, '$1-$2') // Coloca o hífen após os primeiros 5 dígitos
        .replace(/(-\d{4})\d+?$/, '$1'); // Limita a entrada ao formato (xx) xxxxx-xxxx
}

// Função para validar o formulário antes do envio
function validarFormulario(event) {
    event.preventDefault(); // Previne o envio automático do formulário

    let nome = document.getElementById('nome').value.trim();
    let cpf = document.getElementById('cpf').value.trim();
    let telefone = document.getElementById('telefone').value.trim();

    // Verifica se todos os campos estão preenchidos
    if (nome === "" || cpf === "" || telefone === "") {
        alert("Por favor, preencha todos os campos obrigatórios.");
    } else {
        cadastrarTecnico(nome, cpf, telefone);
    }
}

// Função para enviar os dados do formulário para o servidor usando fetch
async function cadastrarTecnico(nome, cpf, telefone) {
    try {
        const response = await fetch('http://localhost:3000/api/cadastroTecnico', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, cpf, telefone })
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar técnico');
        }

        const data = await response.text();
        alert(data); // Exibe a mensagem de sucesso ou erro
        window.location.href = "../home/home.html"; // Redireciona para a página inicial após o cadastro
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar técnico. Por favor, tente novamente.');
    }
}

window.onload = function () {
    // Adiciona o evento de submit ao formulário
    document.getElementById('cadastroForm').addEventListener('submit', validarFormulario);
}
