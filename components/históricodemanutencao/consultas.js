const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Função para carregar o arquivo JSON de manutenções
const loadManutencoes = () => {
    const filePath = path.join(__dirname, '../data/manutencoes.json');
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

// Rota para obter todas as manutenções ou aplicar filtros
router.get('/manutencoes', (req, res) => {
    let manutencoes = loadManutencoes();

    // Obter os parâmetros de query da requisição
    const { data, local, tipo, tecnico } = req.query;

    // Aplicar os filtros, se presentes
    if (data) {
        // Se o parâmetro "data" estiver presente, filtramos pela data
        manutencoes = manutencoes.filter(m => m.data === data);
    }
    if (local) {
        // Se o parâmetro "local" estiver presente, filtramos pelo local
        manutencoes = manutencoes.filter(m => m.local.toLowerCase().includes(local.toLowerCase()));
    }
    if (tipo) {
        // Se o parâmetro "tipo" estiver presente, filtramos pelo tipo de manutenção
        manutencoes = manutencoes.filter(m => m.tipo.toLowerCase() === tipo.toLowerCase());
    }
    if (tecnico) {
        // Se o parâmetro "tecnico" estiver presente, filtramos pelo técnico responsável
        manutencoes = manutencoes.filter(m => m.tecnico.toLowerCase().includes(tecnico.toLowerCase()));
    }

    // Verifica se há resultados
    if (manutencoes.length === 0) {
        // Se não houver resultados, retorna uma mensagem amigável
        return res.status(404).json({ mensagem: 'Nenhuma manutenção encontrada com os filtros fornecidos.' });
    }

    // Retorna os resultados filtrados
    res.json(manutencoes);
});

module.exports = router;

