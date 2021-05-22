const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const configCors = {
    origin:"*",
    optionsStatusSuccess: "200",
};

//configurando a conexão com o banco de dados
const cx = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "AgendAi",
    port: "3306",
});

cx.connect((error, dados) => {
    if (error) {
        console.error(`Erro ao tentar executar o servidor -> ${error.stack}`);
        return;
    }
    console.log(`Dados do servidor -> ${cx.threadId}`)
});

//Rota para cadastro



app.post("/usuario/cadastro", cors(configCors), (req, res) =>{
    cx.query("insert into usuario set ?",[req.body],(erro,result) => {
        if (erro) {
            res.status(400).send({ output: `Não cadastrou -> ${erro}` });
            return;
        }
        res.status(201).send({output: result });

    })
});



//Rotas para cadastrar serviços



app.post("/servico/cadastro", cors(configCors), (req, res) =>{
    cx.query("insert into servico set ?",[req.body],(erro,result) => {
        if (erro) {
            res.status(400).send({ output: `Não cadastrou -> ${erro}` });
            return;
        }
        res.status(201).send({output: result });

    })
});



//Rota para listar 

app.get("/servico/listar", cors(configCors), (req, res) =>{
    cx.query("select * from servico",[req.body],(erro,result) => {
        if (erro) {
            res.status(400).send({ output: `Não foi possivel listar -> ${erro}` });
            return;
        }
        res.status(201).send({output: result });
    })
});


app.listen(5521, () => console.log("Servidor ondeline na porta 5521"));