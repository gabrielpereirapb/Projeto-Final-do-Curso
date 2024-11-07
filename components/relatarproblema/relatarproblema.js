// Função para validar e capturar os dados do formulário
function validarFormulario() {
    let titulo_do_chamado = document.getElementById('titulo_do_chamado').value.trim();
    let local = document.getElementById('local').value;
    let tipo_manutencao = document.getElementById('tipo_manutencao').value;
    let urgencia = document.getElementById('urgencia').value;
    let mensagem_problema = document.getElementById('mensagem_problema').value.trim();

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!titulo_do_chamado) {
        mostrarPopup("O campo 'Título do Chamado' é obrigatório.", 'error');
        return false;
    }
    if (!local) {
        mostrarPopup("O campo 'Local' é obrigatório.", 'error');
        return false;
    }
    if (!tipo_manutencao) {
        mostrarPopup("O campo 'Tipo de Manutenção' é obrigatório.", 'error');
        return false;
    }
    if (!urgencia) {
        mostrarPopup("O campo 'Urgência' é obrigatório.", 'error');
        return false;
    }
    if (!mensagem_problema) {
        mostrarPopup("O campo 'Mensagem do Problema' é obrigatório.", 'error');
        return false;
    }

    const dadoschamado = {
        titulo_do_Chamado: titulo_do_chamado,
        local: local,
        tipo_manutencao: tipo_manutencao,
        urgencia: urgencia,
        mensagem_problema: mensagem_problema
    };

    console.log(dadoschamado);

    // Envia os dados para o servidor
    enviarDados(dadoschamado);
}

// Função para exibir o pop-up
function mostrarPopup(mensagem, tipo) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');
    const popupIcon = document.getElementById('popupIcon');

    popupMessage.textContent = mensagem;
    if (tipo === 'success') {
        popup.className = 'popup popup-success show';
        popupIcon.textContent = '✔️';
    } else if (tipo === 'error') {
        popup.className = 'popup popup-error show';
        popupIcon.textContent = '❌';
    }

    setTimeout(fecharPopup, 4000);
}

// Função para fechar o pop-up
function fecharPopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
}

// Função para enviar os dados via fetch (AJAX)
function enviarDados(dadoschamado) {
    const url = 'http://localhost:3000/api/relatarProblema';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadoschamado)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Erro na requisição: ' + response.status);
    })
    .then(data => {
        console.log('Sucesso:', data);
        mostrarPopup("Cadastro realizado com sucesso!", 'success');
        setTimeout(() => {
            window.location.href = "../home/home.html";
        }, 2000); // Redireciona após 2 segundos
    })
    .catch((error) => {
        console.error('Erro:', error);
        mostrarPopup("Ocorreu um erro ao enviar os dados. Tente novamente.", 'error');
    });
}

// Função para cancelar e redirecionar para a página inicial
function cancelar() {
    window.location.href = "../home/home.html";
}
