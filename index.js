const express = require("express"); // para usar express
const server = express(); // para criar um servidor
const usuario = require("./src/usuario.json");  // para pegar o json e transformar em variavel
const produto = require("./src/produto.json");  // para pegar o json e transformar em variavel
const sapo =                                                    
    "⬛⬛⬛⬛⬛🟩🟩⬛🟩🟩⬛⬛⬛\n"+
    "⬛⬛⬛⬛🟩🟩🟩🟩🟩🟩🟩⬛⬛\n"+ 
    "⬛⬛⬛🟩🟩⬜⬛⬜⬜⬛🟩⬛⬛\n"+ 
    "⬛⬛⬛🟩🟩🟩🟩🟩🟩🟩⬛⬛⬛\n"+
    "⬛⬛🟩🟩🟩🟩🟫🟫🟫🟫⬛⬛⬛\n"+
    "⬛⬛🟩🟩🟩🟩🟩🟩🟩⬛⬛⬛⬛\n";

server.get("/", (req, res) => {
    return res.send("<pre>" + sapo + "</pre>");
});

server.get("/usuario", (req, res) => {
    return res.json(usuario);
});

server.get("/produto", (req, res) => {
    return res.json(produto);
});

server.listen(3030, () => {
    console.log("server on");
});
