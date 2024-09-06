function formatarCPF(campo) {
    let cpf = campo.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length > 3 && cpf.length <= 6) {
        campo.value = cpf.replace(/(\d{3})(\d+)/, '$1.$2');
    } else if (cpf.length > 6 && cpf.length <= 9) {
        campo.value = cpf.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else if (cpf.length > 9) {
        campo.value = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }
}

document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio real do formulário

    // Exibe uma mensagem de confirmação
    alert('Técnico cadastrado com sucesso!');
});



//Função de cadastro do técnico no botão confirmar

document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio real do formulário

    // Exibe uma mensagem de confirmação
    alert('Técnico cadastrado com sucesso!');

    // Você pode redirecionar o usuário ou realizar outra ação após a confirmação
    // window.location.href = 'pagina-de-destino.html';
});


//Função de ajustar o número de telefone no card

function formatarTelefone(campo) {
    // Remove caracteres não numéricos
    var telefone = campo.value.replace(/\D/g, '');
    
    // Adiciona "9" no início se não estiver presente e se o número tiver 10 dígitos
    if (telefone.length === 10 && telefone[0] !== '9') {
        telefone = '9' + telefone;
    }
    
    // Formata o número com DDD e máscara
    telefone = telefone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');

    campo.value = telefone;
}
