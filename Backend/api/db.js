//IMPORTAÇÃO DO BANCO DE DADOS

import mysql from "mysql"

export const db = mysql.createConnection({   //Guardou a conecção do banco na const db
    host: "localhost",
    user: "root",     //nome do usuario do banco
    password: "25012001",   //senha do usuário do banco
    database: "crud"   //Nome do banco
});
