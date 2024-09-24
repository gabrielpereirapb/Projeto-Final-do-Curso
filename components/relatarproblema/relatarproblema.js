// Função para validar e capturar os dados do formulário
function validarFormulario() {
    // Obtém os valores dos campos
    let tituloChamado = document.getElementById('titulochamado').value.trim();
    let local = document.getElementById('local').value;
    let tipoManutencao = document.getElementById('tipomanutencao').value;
    let urgencia = document.getElementById('urgencia').value;
    let mensagem = document.getElementById('mensagem').value.trim();

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (tituloChamado === "" || local === "" || tipoManutencao === "" || urgencia === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false;
    }

    // Cria um objeto com os dados capturados
    const dadosChamado = {
        tituloChamado: tituloChamado,
        local: local,
        tipoManutencao: tipoManutencao,
        urgencia: urgencia,
        mensagem: mensagem
    };

    // Exibe os dados no console (para verificação)
    console.log(dadosChamado);

    // Envia os dados para o servidor
    enviarDados(dadosChamado);
}

// Função para enviar os dados via fetch (AJAX)
function enviarDados(dadosChamado) {
    const url = 'http://localhost:3000/api/relatarProblema'; 

    fetch(url, {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json' // Tipo de conteúdo JSON
        },
        body: JSON.stringify(dadosChamado) // Envia os dados como JSON
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Erro na requisição');
    })
    .then(data => {
        console.log('Sucesso:', data);
        alert("Cadastro realizado com sucesso!");
        window.location.href = "../home/home.html"; // Redireciona para a página inicial após o sucesso
    })
    .catch((error) => {
        console.error('Erro:', error);
        alert("Ocorreu um erro ao enviar os dados. Tente novamente.");
    });
}

// Função para cancelar e redirecionar para a página inicial
function cancelar() {
    window.location.href = "../home/home.html"; // Redireciona ao cancelar
}
