import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom"
import Button from "../components/button/button";
import CriaForm from "../components/input/criaform";
import Input from "../components/input/input";
import { delay } from "../service/delay";
import type { CompCorp } from "../types/types";
import Text from "../components/text/text";

const AvCompCorp = () => {
    const params = useParams()
    const id = params.id;
    const index = params.index;
    const navigate = useNavigate();
    const goToPage = (page: string) => { navigate(page) }

    const forminicial: CompCorp = {
        Massa: "",
        IMC: "",
        Gordura_Corporal: "",
        Gordura_Visceral: "",
        Metabolismo_Basal: "",
        Musculos_Esqueleticos: "",
        Idade_Corporal: "",
        Data_Avaliacao: ""
    }

    const text = {
        labelMassa: "Massa",
        labelIMC: "IMC",
        labelGordura_Corporal: "Gordura Corporal",
        labelGordura_Visceral: "Gordural Visceral",
        labelMetabolismo_Basal: "Metabolismo",
        labelMusculos_Esqueleticos: "Musculos",
        labelIdade_Corporal: "Idade Corportal",
        lavelData_Avaliação: "Data da Avaliação",
        labelButtonAtualizar: "Atualizar",
        labelTitle:"Composição Corporal"
    }

    const [form, setForm] = useState(forminicial);
    const [disabled, setDisabled] = useState(true);

    const [{ data: infoCompCorp }, getCompCorp] = useAxios<CompCorp>(
        {
            url: `/compcorp/${id}/${index}`,
            method: "get",
        },
        {
            manual: true,
        }
    );

    const [, editCompCorp] = useAxios<CompCorp>(
        {
            url: `/compcorp/${id}/${index}`,
            method: "patch",
            data: {
                ...form,
            }
        },
        {
            manual: true,
        }
    )

    const [, deleteCompCorp] = useAxios<CompCorp>(
        {
            url: `/compcorp/${id}/${index}`,
            method: "delete",
            data: {
                index: index
            }
        },
        {
            manual: true,
        }
    );



    const editarForm = () => {
        setDisabled(!disabled)
    }

    const atualizaForm = () => {
        editCompCorp()
        setDisabled(true)
    }

    const deletaForm = async () => {
        deleteCompCorp()
        await delay(0.5)
        goToPage(`/pacientes/${id}`)
    }

    useEffect(() => {
        getCompCorp()
        console.log("Atualizado")
        console.log(`Index: ${index}`)
    }, [])

    useEffect(() => {
        if (infoCompCorp) {
            setForm(infoCompCorp);
        }
    }, [infoCompCorp]);


const inputs = [
    <Input label={text.labelMassa} onChange={(e: any) => setForm({ ...form, Massa: e.target.value })} value={form.Massa} disabled={disabled} />,
    <Input label={text.labelIMC} onChange={(e: any) => setForm({ ...form, IMC: e.target.value })} value={form.IMC} disabled={disabled} />,
    <Input label={text.labelGordura_Corporal} onChange={(e: any) => setForm({ ...form, Gordura_Corporal: e.target.value })} value={form.Gordura_Corporal} disabled={disabled} />,
    <Input label={text.labelGordura_Visceral} onChange={(e: any) => setForm({ ...form, Gordura_Visceral: e.target.value })} value={form.Gordura_Visceral} disabled={disabled} />,
    <Input label={text.labelMetabolismo_Basal} onChange={(e: any) => setForm({ ...form, Metabolismo_Basal: e.target.value })} value={form.Metabolismo_Basal} disabled={disabled} />,
    <Input label={text.labelMusculos_Esqueleticos} onChange={(e: any) => setForm({ ...form, Musculos_Esqueleticos: e.target.value })} value={form.Musculos_Esqueleticos} disabled={disabled} />,
    <Input label={text.labelIdade_Corporal} onChange={(e: any) => setForm({ ...form, Idade_Corporal: e.target.value })} value={form.Idade_Corporal} disabled={disabled} />,
    <Input label={text.lavelData_Avaliação} onChange={(e: any) => setForm({ ...form, Data_Avaliacao: e.target.value })} value={form.Data_Avaliacao} disabled={disabled} />,   
]



return <div className={"h-[calc(100vh-theme(spacing.20))] md:h-auto p-2 grid grid-cols-12 gap-4 "}>
    <div className={"relative my-10 pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border col-start-0 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 xxl:col-start-4 xxl:col-span-6"}>
        <form className={"   "}>
            <Text className={"text-center mt-6 text-4xl"} type={"h1"} text={text.labelTitle} />
            <CriaForm inputs={inputs} className={"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"} />


        </form>

        <button className={`absolute  top-2 left-6 ${disabled ? "hidden" : ""}`}>{<FaTrashAlt className={"text-red-700 h-10 w-5"} onClick={deletaForm} />}</button>
        <button className={`absolute top-3 right-6`}>{<FaPen className={"text-sky-700 h-10 w-5"} onClick={() => { editarForm() }} />}</button>
        <div className={`mx-10 ${disabled ? "hidden" : ""}`}>
            <Button title={text.labelButtonAtualizar} className={"m-0 p-2 w-full md:absolute md:right-12 md:bottom-6 md:w-60"} onClick={atualizaForm} />
        </div>
    </div>
</div>

}

export default AvCompCorp