import validarToken from "../auth/auth.js";




document.addEventListener('DOMContentLoaded', function() {
    const valido = validarToken();

    console.log(valido)


    if(!valido){
        window.location.href = "/components/exceptions/NaoAutorizadoException.html";

    }

});

const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token não encontrado.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/protegerota', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`  // Adiciona o token no header Authorization
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Dados:', data);
        } else {
            console.error('Erro na autenticação:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
    }
};

