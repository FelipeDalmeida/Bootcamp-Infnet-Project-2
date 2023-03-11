import express from 'express'
import {alteraDadosPaciente,deletaPaciente,criaPlanilhaPaciente,carregaPacientes,numeroDePacientes,carregaPacienteID,criaPaciente} from '../googleAPI/googleSpreedsheetsPacientes'
export const pacientes = express.Router();







//lista todos os pacientes
pacientes.get('/',async (req,res)=>{
    
    const Pacientes = await carregaPacientes()

    res.status(200).json(Pacientes)
});

//lista um paciente especifico
pacientes.get('/:id',async(req,res)=>{
    const Paciente =await carregaPacienteID(Number(req.params.id))
    res.status(200).json(Paciente)
});

//add um paciente novo
pacientes.post('/',async(req,res)=>{

    const data=await criaPaciente({...req.body})

    res.status(201).json({
        successes:true,
        data
    });
});

// Sobrescreve os dados de um paciente
pacientes.put('/:id',async (req,res)=>{
    await alteraDadosPaciente(Number(req.params.id),req.body)
    const Paciente =await carregaPacienteID(Number(req.params.id))
    res.status(200).json({
        success: true,
        data: {
            ...Paciente
        },
    });
})

// Realiza uma atualização parcial nos dados de um paciente
pacientes.patch("/:id", async (req, res) => {
    await alteraDadosPaciente(Number(req.params.id),req.body)
    const Paciente =await carregaPacienteID(Number(req.params.id))
    res.status(200).json({
        success: true,
        data: {
            ...Paciente
        }
    })
})

// Deleta um paciente
pacientes.delete("/:id", (req, res) => {
    deletaPaciente(Number(req.params.id))
    res.json({
        success: true,
        data: {
            id: Number(req.params.id),
        }
    })
})