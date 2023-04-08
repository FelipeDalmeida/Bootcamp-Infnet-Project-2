import { databasePool } from "../database/databasePoll";
import type { Pacientes } from "../types/types";
import { pacienteSchema } from "../schemas/pacienteSchema";


export const carregaPacientes = async ({
    orderby = "id",
    direction = "asc",
    limit = 10,
    offset = 0,
    search,
}: {
    orderby?: string;
    direction?: string;
    limit?: number;
    offset?: number;
    search?: string;
}): Promise<{
    count: number;
    pacientes: Pacientes[];
}> => {
    const connection = await databasePool.getConnection()
    const [pacientes] = (await connection.query(`select * from pacientes 
    ${search ? `where nome like '%${search}%' or cpf like '%${search}%'` : ""}
    order by ${orderby} ${direction}  limit ${limit} offset ${offset}`)) as any
    const [[{ count }]] = (await connection.query(`select count(*) as count from pacientes ${search ? `where nome like '%${search}%' or cpf like '%${search}%'` : ""}`)) as any;
    connection.release()
    return { count, pacientes }

}

export const carregaPacienteID = async (id: number): Promise<Pacientes> => {
    const connection = await databasePool.getConnection()
    const [paciente] = (await connection.query("select * from pacientes where id=?", id)) as any
    connection.release()

    return paciente[0]
}

export const criaPaciente = async (data: Pacientes) => {

    const validPacientes = await pacienteSchema.safeParseAsync(data);
    if (!validPacientes.success) {
        console.log(validPacientes.error)
        return {
            success: false,
            errors: validPacientes.error.errors
        }
    }


    const connection = await databasePool.getConnection()
    const { nome, idade, sexo, email, celular, cpf, data_nascimento } = validPacientes.data
    const [response] = (await connection.query(`
        INSERT into pacientes (nome, idade, sexo, email, celular, cpf, data_nascimento) 
            VALUES ( ?, ?, ?, ?, ?, ?, ?);`, [nome, idade, sexo, email, celular, cpf, data_nascimento])) as any

    console.log(`Paciente ${nome} com id ${response.insertId} adicionado`)
    const success = response.affectedRows > 0
    connection.release()

    return {
        success,
        data: {
            id: response.insertId,
            nome: nome,
            idade: idade,
            sexo: sexo,
            data_nascimento: data_nascimento,
            email: email,
            celular: celular,
            cpf: cpf
        }
    }


}

export const updateDadosPaciente = async (id: number, data: Partial<Pacientes>) => {
    const connection = await databasePool.getConnection()


    const [response] = (await connection.query(`UPDATE pacientes SET nome=?, idade=?, sexo=?, data_nascimento=?, celular=?, email=?, cpf=? WHERE id=?;`,
        [data.nome, data.idade, data.sexo, data.data_nascimento, data.celular, data.email, data.cpf, id])) as any

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

export const getLaudo = async (id: number) => {
    const connection = await databasePool.getConnection()
    const [response] = (await connection.query(`
    SELECT
    pacientes.id as paciente_id,
    avantropometrica.id as antropometrica_id,
    avantropometrica.paciente_id as avantropometrica_paciente_id,
    compcorp.id as compcorp_id,
    compcorp.paciente_id as compcorp_paciente_id,
    nome,
    idade,
    data_nascimento,
    estatura,
    comprimento_pe,
    altura_ombro,
    largura_ombro,
    envergadura,
    altura_quadril,
    largura_quadril,
    altura_joelho,
    altura_tornozelo,
    massa,
    imc,
    gordura_corporal,
    gordura_visceral,
    metabolismo_basal,
    musculos_esqueleticos,
    idade_corporal
    from pacientes 
    join  avantropometrica on avantropometrica.paciente_id=pacientes.id 
    join compcorp on compcorp.paciente_id=pacientes.id
    where pacientes.id=?;`, id)
        .catch(error => {
            if (error) {
                console.log(error)
                return null
            }
        })
    ) as any
    connection.release()   
    if(response[0]){
        
        const success = response[0].paciente_id === id
        
        if (success) {
            return {
                success,
                data: {
                    ...response[0]
                }
            }
        }
    
        else {
            return {
                success,
            }
        }
    }
    

    return {
        success:false,
    }
}