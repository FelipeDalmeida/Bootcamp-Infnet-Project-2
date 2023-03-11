// Planilha com funções específicas do projeto de pacientes bootcampinfnet

import { getDataSpreedsheetRowsByTitle, pushDataSpreadsheetByTitle } from './googleSpreedsheets'
import type { Antropometrica } from '../types/types'


export const carregaTodasAvAntropometricas = async (id: Number) => {
    const AvAntropometrica: Antropometrica[] = []

    const response = await getDataSpreedsheetRowsByTitle(`antropometricaid${id}`)

    for (let row of response) {
        AvAntropometrica.push({
            Estatura: row.Estatura,
            Comprimento_Pe: row.Comprimento_Pe,
            Altura_Ombro: row.Altura_Ombro,
            Largura_Ombro: row.Largura_Ombro,
            Envergadura: row.Envergadura,
            Altura_Quadril: row.Altura_Quadril,
            Largura_Quadril: row.Largura_Quadril,
            Altura_Joelho: row.Altura_Joelho,
            Altura_Tornozelo: row.Altura_Tornozelo,
            Data_Avaliacao:row.Data_Avaliacao
        })
    }
    return AvAntropometrica
}

export const carregaAvAntropometricaID = async (id: Number,index:number) => {

    const response = await getDataSpreedsheetRowsByTitle(`antropometricaid${id}`)

    const ResultadoAvAntropometrica: Antropometrica = {  //irá carregar o ultimo exame, então pega a posição response.length-1
        Estatura: response[index].Estatura,
        Comprimento_Pe: response[index].Comprimento_Pe,
        Altura_Ombro: response[index].Altura_Ombro,
        Largura_Ombro: response[index].Largura_Ombro,
        Envergadura: response[index].Envergadura,
        Altura_Quadril: response[index].Altura_Quadril,
        Largura_Quadril: response[index].Largura_Quadril,
        Altura_Joelho: response[index].Altura_Joelho,
        Altura_Tornozelo: response[index].Altura_Tornozelo,
        Data_Avaliacao:response[index].Data_Avaliacao
    }


    return ResultadoAvAntropometrica
}

export const adicionaAvAntropometrica = (id: number, data: Antropometrica) => {
    data={...data,Data_Avaliacao:new Date()}
    pushDataSpreadsheetByTitle(data, `antropometricaid${id}`)
    console.log("Dados Avaliação Antropométrica Adicionados")
}

export const alteraDadosAvAntropometrica = async (id: number,index:number, data: any) => {
    let rows: any; //rows da planilha com a avaliação antropometrica
    rows = await getDataSpreedsheetRowsByTitle(`antropometricaid${id}`)



    let keys = Object.keys(data)
    keys.map(key => { rows[index][key] = data[key] })

    await rows[index].save()
}

export const deletaUltimaAvAntropometrica = async (id: number,index:number) => {
    let rows: any; //rows da planilha com a avaliação antropometrica
    rows = await getDataSpreedsheetRowsByTitle(`antropometricaid${id}`)


    await rows[index].delete()
}
