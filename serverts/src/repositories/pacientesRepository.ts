import { databasePool } from "../database/databasePoll";
import type { Pacientes } from "../types/types";
import { pacienteSchema } from "../schemas/pacienteSchema";


export const carregaPacientes = async ({
    orderby = "asc",
    direction = "data_cadastro",
    limit = 5,
    offset = 0,
}: {
    orderby?: string;
    direction?: string;
    limit?: number;
    offset?: number;
}): Promise<{
    count: number;
    pacientes: Pacientes[];
}> => {
    const connection = await databasePool.getConnection()
    const [pacientes] = (await connection.query(`select * from pacientes order by ${direction} ${orderby} limit ${limit} offset ${offset}`)) as any
    const [[{count}]]=(await connection.query("select count(*) as count from pacientes")) as any;
    connection.release()
    return {count,pacientes}

}

export const carregaPacienteID = async (id: number): Promise<Pacientes> => {
    const connection = await databasePool.getConnection()
    const [paciente] = (await connection.query("select * from pacientes where id=?", id)) as any

    connection.release()
    return paciente
}

export const criaPaciente = async (data: Pacientes) => {

    const validPacientes = await pacienteSchema.safeParseAsync(data);
    console.log(validPacientes)
    if (!validPacientes.success) {
        return {
            success: false,
            errors: validPacientes.error.errors
        }
    }


    const connection = await databasePool.getConnection()
    const { nome, idade, sexo, data_nascimento } = validPacientes.data
    const [response] = (await connection.query(`
        INSERT into pacientes (nome, idade, sexo, data_nascimento) 
            VALUES ( ?, ?, ?, ?);`, [nome, idade, sexo, data_nascimento])) as any

    console.log(`Paciente ${nome} com id ${response.insertId} adicionado`)
    const success = response.affectedRows > 0
    connection.release()

    return {
        success,
        id: response.insertId
    }


}

export const updateDadosPaciente = async (id: number, data: Partial<Pacientes>) => {
    const connection = await databasePool.getConnection()


    const [response] = (await connection.query(`UPDATE pacientes SET nome=?, idade=?, sexo=?, data_nascimento=? WHERE id=?`, [data.nome, data.idade, data.sexo, data.data_nascimento, id])) as any

    const success = response.affectedRows > 0
    connection.release()
    return success
}

export const deletaPaciente = async (id: number) => {
    const connection = await databasePool.getConnection()
    const [response] = (await connection.query("delete from pacientes where id=?", id)) as any

    const success = response.affectedRows > 0
    connection.release()
    return success

}