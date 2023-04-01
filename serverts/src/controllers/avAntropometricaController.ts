import express from "express";
import * as examsRepository from "../repositories/ExamsRepository";
export const antropometricaController = express.Router();
import { exameLoadManySchema } from "../schemas/LoadManySchema";

//lista todas as Avaliações Antropométricas de um paciente
antropometricaController.get('/all/:id', async (req, res) => {
    const params=await exameLoadManySchema.safeParseAsync(req.query);

    if(params.success){
        const Pacientes = await examsRepository.loadAllExams(params.data,Number(req.params.id),"avantropometrica")
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
    const Paciente = await examsRepository.loadExamByID(Number(req.params.id),"avantropometrica")
    res.status(200).json(Paciente)
});

//add uma Avaliação Antropométrica a um paciente com id
antropometricaController.post('/:id', async (req, res) => {

    const data = await examsRepository.postExam(Number(req.params.id),req.body,"avantropometrica")

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

// Sobrescreve os dados de uma Avaliação Antropométrica de um paciente
antropometricaController.put('/:id', async (req, res) => {
    const data = await examsRepository.putExams(Number(req.params.id),req.body,"avantropometrica")

    if (data.success) {
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
    const success = await examsRepository.deleteExam(Number(req.params.id),"avantropometrica")
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


