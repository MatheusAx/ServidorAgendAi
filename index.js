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
    database: "agendai",
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



//Rota para cadastrar serviço



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


// rota para conferencia de dados
app.get("/servico/conferir", cors(configCors), (req, res) =>{
    cx.query("select u.*,s.* from usuario u inner join servico s on u.idusuario=s.idusuario",[req.body],(erro,result) => {
        if (erro) {
            res.status(400).send({ output: `Não foi possivel listar -> ${erro}` });
            return;
        }
        res.status(201).send({output: result });
    })
});
// select u.*,s.* from usuario u inner join servico s on u.idusuario=s.idusuario







app.listen(5521, () => console.log("Servidor online na porta 5521"));