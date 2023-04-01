import express from "express";
import * as avAntropometricaRepository from "../repositories/avAntropometricaRepository";
export const antropometricaController = express.Router();
import { avAntropometricaLoadManySchema } from "../schemas/avAntropometricaLoadManySchema";

//lista todas as Avaliações Antropométricas de um paciente
antropometricaController.get('/all/:id', async (req, res) => {
    const params=await avAntropometricaLoadManySchema.safeParseAsync(req.query);

    if(params.success){
        const Pacientes = await avAntropometricaRepository.carregaTodasAvAntropometricas(params.data,Number(req.params.id))
        res.status(200).json(Pacientes)
    } else {
        res.status(400).json({
            success: false,
            params
        });
    }

});

//lista a Avaliação Antropométrica de um paciente especifico
antropometricaController.get('/:id', async (req, res) => {
    const Paciente = await avAntropometricaRepository.carregaAvAntropometricaID(Number(req.params.id))
    res.status(200).json(Paciente)
});

//add uma Avaliação Antropométrica a um paciente com id
antropometricaController.post('/:id', async (req, res) => {

    const data = await avAntropometricaRepository.adicionaAvAntropometrica(Number(req.params.id),{ ...req.body })

    if (data.success) {
        res.status(201).json({
            success: true,
            data:{
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

// Sobrescreve os dados do ultíma Avaliação Antropométrica de um paciente
antropometricaController.put('/:id', async (req, res) => {
    const success = await avAntropometricaRepository.alteraDadosAvAntropometrica(Number(req.params.id), req.body)

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

// Deleta os dados de uma Avaliação Antropométrica de um paciente
antropometricaController.delete("/:id", async (req, res) => {
    const success = await avAntropometricaRepository.deletaAvAntropometrica(Number(req.params.id))
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


