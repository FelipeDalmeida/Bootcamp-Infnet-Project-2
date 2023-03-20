import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise"
import { requireSQL } from "../requireSQL";
import { connectionConfig } from "../conectionConfig";


async function createTables(){
    const createTablesSql=await requireSQL("createTables.sql");
    const conection=await mysql.createConnection(connectionConfig);

    await conection.query(createTablesSql);
    console.log("Tabela criada com sucesso");
    conection.destroy();
}

createTables();