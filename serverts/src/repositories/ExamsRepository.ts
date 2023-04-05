import { databasePool } from "../database/databasePoll";
import type { Antropometrica, CompCorp } from "../types/types";
import { avAntropometricaSchema, avAntropometricaSchemaPost, compcorpSchema,compcorpSchemaPost } from "../schemas/examsSchema";


export const loadAllExams = async ({
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
    id: number, type: string): Promise<{
        count: number;
        exames: Antropometrica[] | CompCorp[];
    }> => {
    const connection = await databasePool.getConnection()
    const [exames] = (await connection.query(`select * from ${type} where paciente_id=? 
    order by ${orderby} ${direction}  limit ${limit} offset ${offset}`, id)) as any
    const [[{ count }]] = (await connection.query(`select count(*) as count from ${type}`)) as any;
    connection.release()
    return { count, exames }

}

export const loadExamByID = async (id: Number, type: string): Promise<Antropometrica | CompCorp> => {
    const connection = await databasePool.getConnection()
    const [exame] = (await connection.query(`select * from ${type} where id=?`, id)) as any
    connection.release()

    return exame[0]
}

export const postExam = async (id: number, data: Antropometrica | CompCorp, type: string) => {
    let validExame;

    if (type === "avantropometrica") {
        validExame = await avAntropometricaSchema.safeParseAsync(data);
        if (!validExame.success) {
            console.log(validExame.error)
            return {
                success: false,
                errors: validExame.error.errors
            }
        }
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

        const connection = await databasePool.getConnection()

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
            VALUES ( ?, ?, ?, ?, ?, ?, ?,?,?,?);`, [id, estatura, comprimento_pe, altura_ombro, largura_ombro, envergadura, altura_quadril, largura_quadril, altura_joelho, altura_tornozelo])) as any

        console.log(`Avaliação adicionada`)
        const success = response.affectedRows > 0
        connection.release()

        return {
            success,
        }

    } else if (type === "compcorp") {
        validExame = await compcorpSchema.safeParseAsync(data);
        if (!validExame.success) {
            console.log(validExame.error)
            return {
                success: false,
                errors: validExame.error.errors
            }
        }
        const {
            massa,
            imc,
            gordura_corporal,
            gordura_visceral,
            metabolismo_basal,
            musculos_esqueleticos,
            idade_corporal
        } = validExame.data

        const connection = await databasePool.getConnection()

        const [response] = (await connection.query(`
            INSERT into compcorp (
            paciente_id,
            massa,
            imc,
            gordura_corporal,
            gordura_visceral,
            metabolismo_basal,
            musculos_esqueleticos,
            idade_corporal) 
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?);`, [id, massa, imc, gordura_corporal, gordura_visceral, metabolismo_basal, musculos_esqueleticos, idade_corporal])) as any

        console.log(`Avaliação adicionada`)
        const success = response.affectedRows > 0
        connection.release()

        return {
            success,
        }


    }


    return {
        success: false,
    }



}

export const putExams = async (id: number, data: Partial<Antropometrica | CompCorp>, type: string) => {

    if (type === "avantropometrica") {
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

        return {
            success,
        }


    } else if(type === "compcorp"){
        const validExame = await compcorpSchema.safeParseAsync(data);
        if (!validExame.success) {
            console.log(validExame.error)
            return {
                success: false,
                errors: validExame.error.errors
            }
        }
        const connection = await databasePool.getConnection()

        const {
            massa,
            imc,
            gordura_corporal,
            gordura_visceral,
            metabolismo_basal,
            musculos_esqueleticos,
            idade_corporal
        } = validExame.data
    
    
        const [response] = (await connection.query(`UPDATE compcorp SET massa=?, imc=?, gordura_corporal=?, gordura_visceral=?, metabolismo_basal=?, musculos_esqueleticos=?, idade_corporal=? WHERE id=?;`,
            [massa, imc, gordura_corporal, gordura_visceral, metabolismo_basal, musculos_esqueleticos, idade_corporal, id])) as any
    
        const success = response.affectedRows > 0
        connection.release()
        
        return {
            success,
        }

    }

    return {
        success: false,
    }

}

export const deleteExam = async (id: number,type:string) => {
    const connection = await databasePool.getConnection()
    const [response] = (await connection.query(`delete from ${type} where id=?`, id)) as any

    const success = response.affectedRows > 0
    connection.release()
    return success

}