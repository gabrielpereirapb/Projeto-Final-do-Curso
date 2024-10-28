document.addEventListener('DOMContentLoaded', function() {
    carregarChamadosPendentes();
    carregarTecnicosCadastrados();
});

// Função para buscar e preencher os chamados pendentes
function carregarChamadosPendentes() {
    fetch('http://localhost:3000/api/cadastroManutencao/pendente')
    .then(response => response.json())
    .then(data => {
        const selectChamado = document.getElementById('titulo_do_chamado');
        data.forEach(chamado => {
            const option = document.createElement('option');
            option.value = chamado.id;
            option.textContent = chamado.titulo_do_chamado;
            selectChamado.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar os chamados pendentes:', error);
    });

    console.log(document.getElementById('titulo_do_chamado'))
}

// Função para buscar e preencher os técnicos cadastrados
function carregarTecnicosCadastrados() {
    fetch('http://localhost:3000/api/cadastroManutencao/tecnicocadastrado')
    .then(response => response.json())
    .then(data => {
        const selectTecnico = document.getElementById('tecnico_responsavel');
        data.forEach(tecnico => {
            const option = document.createElement('option');
            option.value = tecnico.cpf;
            option.textContent = tecnico.nome;
            selectTecnico.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar os técnicos cadastrados:', error);
    });

    console.log(document.getElementById('tecnico_responsavel'))

}

// Função para validar e enviar o formulário
function validarFormulario() {
    // Obtém os valores dos campos
    let id = document.getElementById('titulo_do_chamado').value;
    let cpf_tecnico = document.getElementById('tecnico_responsavel').value;
    let mensagem_solucao = document.getElementById('mensagem_solucao').value.trim();
    //let data_resolucao = new Date().toISOString().split('T')[0]; // Pega a data atual no formato YYYY-MM-DD

    // Verifica se todos os campos estão preenchidos
    if (id === "" || tecnico_responsavel === "" || mensagem_solucao === "") {
        alert("Por favor, preencha todos os campos obrigatórios.");
    } else {
        // Monta o objeto com os dados do formulário
        const dadosManutencao = {
            id: id,
            cpf_tecnico: cpf_tecnico, // Assumindo que 'cpf_tecnico' seja o nome do técnico por agora
            mensagem_solucao: mensagem_solucao,
            //data_resolucao: data_resolucao
        };
console.log(dadosManutencao)


        // Envia os dados para o backend
        enviarDados(dadosManutencao);
    }
}

// Função para enviar os dados via fetch
function enviarDados(dadosManutencao) {
    const url = 'http://localhost:3000/api/cadastroManutencao';

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosManutencao)
    })
    .then(response => {
        if (response.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "../home/home.html"; // Redireciona após sucesso
        } else {
            return response.text().then(text => { throw new Error(text); });
        }
    })
    .catch(error => {
        console.error('Erro ao cadastrar manutenção:', error);
        alert("Ocorreu um erro ao enviar os dados. Tente novamente.");
    });
}

// Função para cancelar e redirecionar
function cancelar() {
    window.location.href = "../home/home.html"; // Redireciona ao cancelar
}

