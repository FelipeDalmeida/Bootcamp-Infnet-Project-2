import express from "express";
import * as pacientesRepository from "../repositories/pacientesRepository";
export const pacientesController = express.Router();
import { pacientesLoadManySchema } from "../schemas/pacientesLoadManySchema";
//lista todos os pacientes
pacientesController.get('/', async (req, res) => {
    const params=await pacientesLoadManySchema.safeParseAsync(req.query);

    if(params.success){
        const Pacientes = await pacientesRepository.carregaPacientes(params.data)
        res.status(200).json(Pacientes)
    } else {
        res.status(400).json({
            success: false,
            params
        });
    }



});

//lista um paciente especifico
pacientesController.get('/:id', async (req, res) => {
    const Paciente = await pacientesRepository.carregaPacienteID(Number(req.params.id))
    res.status(200).json(Paciente)
});

//add um paciente novo
pacientesController.post('/', async (req, res) => {

    const data = await pacientesRepository.criaPaciente({ ...req.body })

    if (data.success) {
        res.status(201).json({
            success: true,
            data: {
                id: data.id,
                ...req.body
            }

        });
    } else {
        res.status(400).json({
            success: false,
            error:data.errors
        });
    }
});

// Sobrescreve os dados de um paciente
pacientesController.put('/:id', async (req, res) => {
    const success = await pacientesRepository.updateDadosPaciente(Number(req.params.id), req.body)

    if (success) {
        res.status(200).json({
            success: true,
            data: {
                ...req.body
            },
        });
    } else {
        res.status(400).json({
            success: false,
        });

    }
})

// Deleta um paciente
pacientesController.delete("/:id", async (req, res) => {
    const success = await pacientesRepository.deletaPaciente(Number(req.params.id))
    if (success) {
        res.status(200).json({
            success: true,
        });
    } else {
        res.status(400).json({
            success: false,
        });

    }
})

// // Realiza uma atualização parcial nos dados de um paciente
// pacientesController.patch("/:id", async (req, res) => {
//     await alteraDadosPaciente(Number(req.params.id),req.body)
//     const Paciente =await carregaPacienteID(Number(req.params.id))
//     res.status(200).json({
//         success: true,
//         data: {
//             ...Paciente
//         }
//     })
// })

