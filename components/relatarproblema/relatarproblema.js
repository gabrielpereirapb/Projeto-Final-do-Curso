function confirmar() {
    // Aqui você pode adicionar a lógica para salvar as informações
    // Exemplo: Enviar uma requisição AJAX para salvar os dados

    // Após salvar, redirecionar para a página inicial com uma mensagem
    const url = new URL('home.html', window.location.href);
    url.searchParams.append('mensagem', 'Operação bem-sucedida!');
    window.location.href = url;
}