import sequelize, { Sequelize } from "sequelize";

// Criando a conexão com o banco
const conexaoSequelize = new Sequelize("loja", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

// Define uma tabela 
const Tabela = conexaoSequelize.define("nomeTabela", {
    coluna1: {
        type: Sequelize.STRING,
    },
    coluna2: {
        type: Sequelize.TEXT,
    },
});

// Tabela.sync({ force: true }); // roda este codigo so uma vez se nao vai ficar criando novas tabelas 

// INSERT exemplo
Tabela.create({
    coluna1: "conteudo a ser inserido na tabela",
    coluna1: "conteudo a ser inserido na tabela"
})