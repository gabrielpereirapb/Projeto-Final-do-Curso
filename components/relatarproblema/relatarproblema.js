// Função para validar e capturar os dados do formulário
function validarFormulario() {
    // Obtém os valores dos campos
    let titulo_do_chamado = document.getElementById('titulo_do_chamado').value.trim();
    let local = document.getElementById('local').value;
    let tipo_manutencao = document.getElementById('tipo_manutencao').value;
    let urgencia = document.getElementById('urgencia').value;
    let mensagem_problema = document.getElementById('mensagem_problema').value.trim();

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!titulo_do_chamado) {
        alert("O campo 'Título do Chamado' é obrigatório.");
        return false;
    }
    if (!local) {
        alert("O campo 'Local' é obrigatório.");
        return false;
    }
    if (!tipo_manutencao) {
        alert("O campo 'Tipo de Manutenção' é obrigatório.");
        return false;
    }
    if (!urgencia) {
        alert("O campo 'Urgência' é obrigatório.");
        return false;
    }
    if (!mensagem_problema) {
        alert("O campo 'Mensagem do Problema' é obrigatório.");
        return false;
    }

    // Cria um objeto com os dados capturados
    const dadoschamado = {
        titulo_do_Chamado: titulo_do_chamado,
        local: local,
        tipo_manutencao: tipo_manutencao,
        urgencia: urgencia,
        mensagem_problema: mensagem_problema
    };

    // Exibe os dados no console (para verificação)
    console.log(dadoschamado);

    // Envia os dados para o servidor
    enviarDados(dadoschamado);
}

// Função para enviar os dados via fetch (AJAX)
function enviarDados(dadoschamado) {
    const url = 'http://localhost:3000/api/relatarProblema'; 



    fetch(url, {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json' // Tipo de conteúdo JSON
        },
        body: JSON.stringify(dadoschamado) // Envia os dados como JSON
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        // Se não for OK, lança um erro com o status
        throw new Error('Erro na requisição: ' + response.status);
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
