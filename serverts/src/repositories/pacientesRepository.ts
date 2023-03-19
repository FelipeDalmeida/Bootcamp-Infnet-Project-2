import { databasePool } from "../database/databasePoll";
import type { Pacientes } from "../types/types";

export const carregaPacientes = async():Promise<Pacientes[]>=>{
    const connection = await databasePool.getConnection()
    const [fields] = (await connection.query("select * from pacientes")) as any
    connection.release()
    return fields
} 

export const carregaPacienteID = async(id:number):Promise<Pacientes>=>{
    const connection = await databasePool.getConnection()
    const [fields] = (await connection.query("select * from pacientes where id=?",id)) as any
    connection.release()
    return fields
} 

export const criaPaciente = async(data:Pacientes)=>{
    const connection = await databasePool.getConnection()

    
    if(data.nome && data.idade && data.sexo && data.data_nascimento){ //para validar dado antes de fazer a query
        const [response] = (await connection.query(`
        INSERT into pacientes (nome, idade, sexo, data_nascimento) 
            VALUES ( ?, ?, ?, ?);`,[data.nome,data.idade,data.sexo,data.data_nascimento])) as any
        
        console.log(`Paciente ${data.nome} com id ${response.insertId} adicionado`)
        connection.release()
        return response
    }

    else {
        return false
    }
    
} 

export const updateDadosPaciente = async(id:number,data:Partial<Pacientes>)=>{
    const connection = await databasePool.getConnection()


    const [response] = (await connection.query(`UPDATE pacientes SET nome=?, idade=?, sexo=?, data_nascimento=? WHERE id=?`,[data.nome,data.idade,data.sexo,data.data_nascimento,id])) as any

    const success=response.affectedRows>0
    connection.release()
    return success
}

export const deletaPaciente = async(id:number)=>{
    const connection=await databasePool.getConnection()
    const [response]= (await connection.query("delete from pacientes where id=?",id)) as any
    
    const success=response.affectedRows>0
    connection.release()
    return success

}