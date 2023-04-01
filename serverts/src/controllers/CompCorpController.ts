import express from "express";
import * as examsRepository from "../repositories/ExamsRepository";
export const compcorpController = express.Router();
import { exameLoadManySchema } from "../schemas/LoadManySchema";

//lista todas as Avaliações de Composição Corporal de um paciente
compcorpController.get('/all/:id', async (req, res) => {
    const params=await exameLoadManySchema.safeParseAsync(req.query);

    if(params.success){
        const Pacientes = await examsRepository.loadAllExams(params.data,Number(req.params.id),"compcorp")
        res.status(200).json(Pacientes)
    } else {
        res.status(400).json({
            success: false,
            params
        });
    }

});

//lista uma Avaliações de Composição Corporal de um paciente especifico
compcorpController.get('/:id', async (req, res) => {
    const Paciente = await examsRepository.loadExamByID(Number(req.params.id),"compcorp")
    res.status(200).json(Paciente)
});

// add uma Avaliações de Composição Corporal a um paciente com id
compcorpController.post('/:id', async (req, res) => {

    const data = await examsRepository.postExam(Number(req.params.id),{ ...req.body },"compcorp")

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

// Sobrescreve os dados de uma av compcorp
compcorpController.put('/:id', async (req, res) => {
    const success = await examsRepository.putExams(Number(req.params.id), req.body,"compcorp")

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

// Deleta os dados de uma Avaliação CompCorp de um paciente
compcorpController.delete("/:id", async (req, res) => {
    const success = await examsRepository.deleteExam(Number(req.params.id),"compcorp")
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


