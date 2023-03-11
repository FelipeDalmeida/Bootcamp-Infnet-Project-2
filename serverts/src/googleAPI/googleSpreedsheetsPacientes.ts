// Planilha com funções específicas do projeto de pacientes bootcampinfnet

import type { Pacientes } from '../types/types';
import { pushDataSpreadsheet, createNewSpreedsheet,getDataSpreedsheet,getDataSpreedsheetByTitle } from './googleSpreedsheets'





export const carregaPacientes = async()=>{
    const response = await getDataSpreedsheet(0)
    const Pacientes:Pacientes[]=[]
    response.map((paciente:Pacientes)=>{
        Pacientes.push({
            id:paciente.id,
            Nome:paciente.Nome,
            Idade:paciente.Idade,
            Sobrenome:paciente.Sobrenome,
            Data_Nascimento:paciente.Data_Nascimento,
            Sexo:paciente.Sexo,
            Data_Cadastro:paciente.Data_Cadastro
        })
    })
    return  Pacientes
}

export const carregaPacienteID = async(id:Number)=>{
    let Paciente:Pacientes={id:0,Nome:"",Idade:0,Sobrenome:"",Sexo:"",Data_Nascimento:"",Data_Cadastro:""}
    const response = await getDataSpreedsheet(0)
    response.map((paciente:Pacientes)=>{
        if(paciente.id==id){
        
        Paciente = {...Paciente,
                id:paciente.id,
                Nome:paciente.Nome,
                Idade:paciente.Idade,
                Sobrenome:paciente.Sobrenome,
                Sexo:paciente.Sexo,
                Data_Nascimento:paciente.Data_Nascimento,
                Data_Cadastro:paciente.Data_Cadastro
            }
            console.log(`Paciente ${Paciente.Nome} com id: ${Paciente.id} carregado`)  
        }
    })
    return Paciente 
}


export const numeroDePacientes=async()=>{
    const response = await getDataSpreedsheet(0)
    return response.length
}

export const idNovoPaciente=async()=>{
    const response = await getDataSpreedsheet(0)
    if (response.length>0){
        return Number(response[response.length-1].id)+1
    } else {
        return 1
    }
}

export const criaPlanilhaPaciente = async(id:number)=>{

    const variaveisAntropometrica = [
        "Estatura",
        "Comprimento_Pe",
        "Altura_Ombro",
        "Largura_Ombro",
        "Envergadura",
        "Altura_Quadril",
        "Largura_Quadril",
        "Altura_Joelho",
        "Altura_Tornozelo",
        "Data_Avaliacao"
    ]
    const variaveisComCorporal =[
        "Massa",
        "IMC",
        "Gordura_Corporal",
        "Gordura_Visceral",
        "Metabolismo_Basal",
        "Musculos_Esqueleticos",
        "Idade_Corporal",
        "Data_Avaliacao"
    ]

    // const variaveisHemograma =[
    //     "Hemacias",
    //     "Hemoglobina",
    //     "Hematocritos",
    //     "Leucocitos",
    //     "VGM",
    //     "HGM",
    //     "CHGM",
    //     "RDW",
    //     "Plaquetas"
    // ]

    await createNewSpreedsheet(id,variaveisAntropometrica,`antropometricaid${id}`)
    await createNewSpreedsheet(id,variaveisComCorporal,`compcorporalid${id}`)
    //await createNewSpreedsheet(id,variaveisHemograma,`hemograma${id}`)
    console.log(`Planilha do Paciente ${id} criada`)

}

export const criaPaciente = async(data:Pacientes)=>{
    const novoID = await idNovoPaciente()
    data={id:novoID,Data_Cadastro:new Date(),...data}
    pushDataSpreadsheet(data,0)
    await criaPlanilhaPaciente(novoID)

    return data

}

export const deletaPaciente = async(id:number)=>{
    let rowsPacientes:any;//rows da Sheet de index 0
    let sheetPacienteAntropometrica:any; //Planilha do paciente com a Avaliação Antropométrica
    let sheetPacienteCompCorporal:any; //Planilha do paciente com a Avaliação de Composição Corporal
    // let sheetPacienteHemograma:any; //Planilha do paciente com o Hemograma

    rowsPacientes = await getDataSpreedsheet(0)
    sheetPacienteAntropometrica = await getDataSpreedsheetByTitle(`antropometricaid${id}`) 
    sheetPacienteCompCorporal = await getDataSpreedsheetByTitle(`compcorporalid${id}`) 
    // sheetPacienteHemograma = await getDataSpreedsheetByTitle(`hemograma${id}`) 

    let index:number=-1;
    rowsPacientes.map((row:any,ind:any)=>{ //encontrar a coluna do paciente
        console.log(row.id)
        if(row.id==id){
            console.log(`Index:${ind}`)
            index=Number(ind)
        }
    })


    const nome:string = rowsPacientes[index].Nome
    rowsPacientes[index].delete();
    sheetPacienteAntropometrica.delete();
    sheetPacienteCompCorporal.delete();
    // sheetPacienteHemograma.delete()

    console.log(`Paciente ${nome} com id ${id} deletado`)

}

export const alteraDadosPaciente = async(id:number,data:any)=>{
    let rowsPacientes:any; //rows da Sheet de index 0
    rowsPacientes = await getDataSpreedsheet(0)


    let index:number=-1;
    rowsPacientes.map((row:any,ind:any)=>{  //encontrar a coluna do paciente
        if(row.id==id){
            console.log(`Index:${ind}`)
            index=Number(ind)
        }
    })
    let keys=Object.keys(data)
    console.log(keys)
    keys.map(key=>{ rowsPacientes[index][key]=data[key]})
   
    await  rowsPacientes[index].save()
    console.log("Alterado")
}

