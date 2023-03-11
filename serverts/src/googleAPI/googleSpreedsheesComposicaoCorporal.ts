// Planilha com funções específicas do projeto de pacientes bootcampinfnet

import { getDataSpreedsheetRowsByTitle, pushDataSpreadsheetByTitle } from './googleSpreedsheets'
import type { CompCorp } from '../types/types'

// type CompCorp = {
//     Massa: string | number;
//     IMC: string | number;
//     Gordura_Corporal: string | number;
//     Gordura_Visceral: string | number;
//     Metabolismo_Basal: string | number;
//     Musculos_Esqueleticos: string | number;
//     Idade_Corporal: string | number;

// }


export const carregaTodasAvCompCorp = async (id: Number) => {
    const AvCompCorp: CompCorp[] = []

    const response = await getDataSpreedsheetRowsByTitle(`compcorporalid${id}`)

    for (let row of response) {
        AvCompCorp.push({
            Massa: row.Massa,
            IMC: row.IMC,
            Gordura_Corporal: row.Gordura_Corporal,
            Gordura_Visceral: row.Gordura_Visceral,
            Metabolismo_Basal: row.Metabolismo_Basal,
            Musculos_Esqueleticos: row.Musculos_Esqueleticos,
            Idade_Corporal: row.Idade_Corporal,
            Data_Avaliacao:row.Data_Avaliacao
        })
    }
    return AvCompCorp
}

export const carregaAvCompCorpID = async (id: Number,index:number) => {

    const response = await getDataSpreedsheetRowsByTitle(`compcorporalid${id}`)

    const ResultadoAvAntropometrica: CompCorp = {  //irá carregar o ultimo exame, então pega a posição response.length-1
        Massa: response[index].Massa,
        IMC: response[index].IMC,
        Gordura_Corporal: response[index].Gordura_Corporal,
        Gordura_Visceral: response[index].Gordura_Visceral,
        Metabolismo_Basal: response[index].Metabolismo_Basal,
        Musculos_Esqueleticos: response[index].Musculos_Esqueleticos,
        Idade_Corporal: response[index].Idade_Corporal,
        Data_Avaliacao: response[index].Data_Avaliacao
    }


    return ResultadoAvAntropometrica
}

export const adicionaAvCompCorp = (id: number, data: CompCorp) => {
    data={...data,Data_Avaliacao:new Date()}
    pushDataSpreadsheetByTitle(data, `compcorporalid${id}`)
    console.log("Dados Avaliação Composição Corporal")
}

export const alteraDadosAvCompCorp = async (id: number,index:number, data: any) => {
    let rows: any; //rows da planilha com a avaliação antropometrica
    rows = await getDataSpreedsheetRowsByTitle(`compcorporalid${id}`)



    let keys = Object.keys(data)
    keys.map(key => { rows[index][key] = data[key] })

    await rows[index].save()
}

export const deletaUltimaAvCompCorp = async (id: number,index:number) => {
    let rows: any; //rows da planilha com a avaliação antropometrica
    rows = await getDataSpreedsheetRowsByTitle(`compcorporalid${id}`)


    await rows[index].delete()
}
