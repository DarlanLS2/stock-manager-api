import express from "express"; // Usando import em vez de require
import usuario from "./src/usuario.json" assert { type: "json" }; // Importando JSON
import produto from "./src/produto.json" assert { type: "json" }; // Importando JSON
const server = express(); // para criar um servidor
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
