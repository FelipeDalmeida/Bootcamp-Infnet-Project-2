import express from 'express'
import { adicionaAvCompCorp, alteraDadosAvCompCorp, carregaAvCompCorpID, carregaTodasAvCompCorp, deletaUltimaAvCompCorp } from '../googleAPI/googleSpreedsheesComposicaoCorporal';
export const compcorp = express.Router();





//lista todas as Avaliações de Composição Corporal de um paciente
compcorp.get('/all/:id',async(req,res)=>{
    const compcorp =await carregaTodasAvCompCorp(Number(req.params.id))
    res.status(200).json(compcorp)
});

//lista a Avaliação de Composição Corporal de um paciente especifico
compcorp.get('/:id/:index',async(req,res)=>{
    const compcorp =await carregaAvCompCorpID(Number(req.params.id),Number(req.params.index))
    res.status(200).json(compcorp)
});

//add uma Avaliação de Composição Corporal a um paciente com id
compcorp.post('/:id',async(req,res)=>{

    adicionaAvCompCorp(Number(req.params.id),{...req.body})

    res.status(201).json({
        successes:true,
        data:{...req.body}
    });
});

// // Sobrescreve os dados da Avaliação de Composição Corporal de um paciente
compcorp.put('/:id/:index',async (req,res)=>{
    await alteraDadosAvCompCorp(Number(req.params.id),Number(req.params.index),req.body)

    res.status(200).json({
        success: true,
        data: {
            ...req.body
        },
    });
})

// // Realiza uma atualização parcial nos dados de Avaliação de Composição Corporal  de um paciente
compcorp.patch("/:id/:index", async (req, res) => {
    await alteraDadosAvCompCorp(Number(req.params.id),Number(req.params.index),req.body)

    res.status(200).json({
        success: true,
        data: {
            ...req.body
        },
    });
})

// // Deleta os dados da Avaliação de Composição Corporal  de um paciente
compcorp.delete("/:id/:index", (req, res) => {
    deletaUltimaAvCompCorp(Number(req.params.id),Number(req.params.index))
    res.json({
        success: true,
        data: {
            id: Number(req.params.id),
        }
    })
})