import { databasePool } from "../database/databasePoll";
import type { Antropometrica } from "../types/types";
import { avAntropometricaSchema } from "../schemas/avAntropometricaSchema";


export const carregaTodasAvAntropometricas = async ({
    orderby = "id",
    direction = "asc",
    limit = 10,
    offset = 0,
    
}: {
    orderby?: string;
    direction?: string;
    limit?: number;
    offset?: number;
},
id:number): Promise<{
    count: number;
    exames: Antropometrica[];
}> => {
    const connection = await databasePool.getConnection()
    const [exames] = (await connection.query(`select * from avantropometrica where paciente_id=? 
    order by ${orderby} ${direction}  limit ${limit} offset ${offset}`,id)) as any
    const [[{count}]]=(await connection.query("select count(*) as count from avantropometrica")) as any;
    connection.release()
    return {count,exames}

}

export const carregaAvAntropometricaID = async (id: Number,index:number): Promise<Antropometrica> => {  //id do paciente, então paciente_id e index id do exame no BD
    const connection = await databasePool.getConnection()
    const [exame] = (await connection.query("select * from avantropometrica where id=? and paciente_id=?",[index, id])) as any
    connection.release()
    
    return exame[0]
}

export const adicionaAvAntropometrica = async (id: number, data: Antropometrica) => {

    const validExame = await avAntropometricaSchema.safeParseAsync(data);
    if (!validExame.success) {
        console.log(validExame.error)
        return {
            success: false,
            errors: validExame.error.errors
        }
    }


    const connection = await databasePool.getConnection()
    const {
        estatura,
        comprimento_pe,
        altura_ombro,
        largura_ombro,
        envergadura,
        altura_quadril,
        largura_quadril,
        altura_joelho,
        altura_tornozelo,  
    } = validExame.data
    const [response] = (await connection.query(`
        INSERT into avantropometrica (
            paciente_id,
            estatura,
            comprimento_pe,
            altura_ombro,
            largura_ombro,
            envergadura,
            altura_quadril,
            largura_quadril,
            altura_joelho,
            altura_tornozelo) 
            VALUES ( ?, ?, ?, ?, ?, ?, ?,?,?,?);`, [id, estatura, comprimento_pe, altura_ombro, largura_ombro, envergadura, altura_quadril, largura_quadril, altura_joelho, altura_tornozelo ])) as any

    console.log(`Avaliação adicionada`)
    const success = response.affectedRows > 0
    connection.release()

    return {
        success,
    }


}

export const alteraDadosAvAntropometrica = async (id: number, data: Partial<Antropometrica>) => {
    const validExame = await avAntropometricaSchema.safeParseAsync(data);
    if (!validExame.success) {
        console.log(validExame.error)
        return {
            success: false,
            errors: validExame.error.errors
        }
    }
    const connection = await databasePool.getConnection()

    const {
        estatura,
        comprimento_pe,
        altura_ombro,
        largura_ombro,
        envergadura,
        altura_quadril,
        largura_quadril,
        altura_joelho,
        altura_tornozelo,  
    } = validExame.data


    const [response] = (await connection.query(`UPDATE avantropometrica SET estatura=?, comprimento_pe=?, altura_ombro=?, largura_ombro=?, envergadura=?, altura_quadril=?, largura_quadril=?, altura_joelho=?, altura_tornozelo=? WHERE id=?;`, 
    [estatura, comprimento_pe, altura_ombro, largura_ombro, envergadura, altura_quadril, largura_quadril, altura_joelho, altura_tornozelo, id])) as any

    const success = response.affectedRows > 0
    connection.release()
    return success
}

export const deletaAvAntropometrica = async (id: number) => {
    const connection = await databasePool.getConnection()
    const [response] = (await connection.query("delete from avantropometrica where id=?", id)) as any

    const success = response.affectedRows > 0
    connection.release()
    return success

}