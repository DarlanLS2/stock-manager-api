import express from "express"; 
import mysql from "mysql2";
import conexao from "./conexao_com_mysql2.js"; // Importa a conexão com o banco 
import path from "path"; // Importa o módulo path

const __dirname = path.resolve(); // Define __dirname corretamente
const server = express(); // Instância do express

// Sapo
const sapo =                                                    

    "⬛⬛⬛⬛⬛🟩🟩⬛🟩🟩⬛⬛⬛\n" +
    "⬛⬛⬛⬛🟩🟩🟩🟩🟩🟩🟩⬛⬛\n" + 
    "⬛⬛⬛🟩🟩⬜⬛⬜⬜⬛🟩⬛⬛\n" + 
    "⬛⬛⬛🟩🟩🟩🟩🟩🟩🟩⬛⬛⬛\n" +
    "⬛⬛🟩🟩🟩🟩🟫🟫🟫🟫⬛⬛⬛\n" +
    "⬛⬛🟩🟩🟩🟩🟩🟩🟩⬛⬛⬛⬛\n";

// API que retorna um sapo
server.get("/", (req, res) => {
    return res.send("<pre>" + sapo + "</pre>");
});

// API que retorna o JSON da tabela usuario
server.get("/usuario", (req, res) => {
    conexao.query("SELECT * FROM usuario", (err, resultado) => {
        res.json(resultado);
    });
});

// API que retorna o JSON da tabela produto
server.get("/produto", (req, res) => {
    conexao.query("SELECT * FROM produto", (err, resultado) => {
        res.json(resultado);
    });
});

// API que retorna o produto com ID digitado na URL
server.get("/consulta/:id", (req, res) => {
    const id = req.params.id;
    conexao.query(`SELECT * FROM produto WHERE id = ${id}`, (err, resultado) => {
        res.json(resultado);
    });
});

// API que envia o arquivo HTML
server.get("/html", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "index.html")); // Usa path.join para construir o caminho
});

// Inicia o server na porta 3030
server.listen(3000, () => {
    console.log("PORTA: 3000");
    console.log("Conexão com o server: ok");
});
