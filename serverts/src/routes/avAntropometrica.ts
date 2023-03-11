import express from 'express'
import { adicionaAvAntropometrica, alteraDadosAvAntropometrica, carregaAvAntropometricaID, carregaTodasAvAntropometricas, deletaUltimaAvAntropometrica } from '../googleAPI/googleSpreedsheesAntropometica';
export const antropometrica = express.Router();





//lista todas as Avaliações Antropométricas de um paciente
antropometrica.get('/all/:id',async(req,res)=>{
    const AvAntropometrica =await carregaTodasAvAntropometricas(Number(req.params.id))
    res.status(200).json(AvAntropometrica)
});

//lista a Avaliação Antropométrica de um paciente especifico
antropometrica.get('/:id/:index',async(req,res)=>{
    const AvAntropometrica =await carregaAvAntropometricaID(Number(req.params.id),Number(req.params.index))
    res.status(200).json(AvAntropometrica)
});

//add uma Avaliação Antropométrica a um paciente com id
antropometrica.post('/:id',async(req,res)=>{

    adicionaAvAntropometrica(Number(req.params.id),{...req.body})

    res.status(201).json({
        successes:true,
        data:{...req.body}
    });
});

// // Sobrescreve os dados do ultíma Avaliação Antropométrica de um paciente
antropometrica.put('/:id/:index',async (req,res)=>{
    await alteraDadosAvAntropometrica(Number(req.params.id),Number(req.params.index),req.body)

    res.status(200).json({
        success: true,
        data: {
            ...req.body
        },
    });
})

// // Realiza uma atualização parcial nos dados de Avaliação Antropométrica  de um paciente
antropometrica.patch("/:id/:index", async (req, res) => {
    await alteraDadosAvAntropometrica(Number(req.params.id),Number(req.params.index),req.body)

    res.status(200).json({
        success: true,
        data: {
            ...req.body
        },
    });
})

// // Deleta os dados da ultímo Avaliação Antropométrica  de um paciente
antropometrica.delete("/:id/:index", (req, res) => {
    deletaUltimaAvAntropometrica(Number(req.params.id),Number(req.params.index))
    res.json({
        success: true,
        data: {
            id: Number(req.params.id),
        }
    })
})