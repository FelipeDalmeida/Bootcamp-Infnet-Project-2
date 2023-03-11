import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom"
import Button from "../components/button/button";
import CriaForm from "../components/input/criaform";
import Input from "../components/input/input";
import { delay } from "../service/delay";
import type { Antropometrica } from "../types/types";
import Text from "../components/text/text";

const AvAntropometrica = () => {
    const params = useParams()
    const id = params.id;
    const index = params.index;
    const navigate = useNavigate();
    const goToPage = (page: string) => { navigate(page) }

    const forminicial: Antropometrica = {
        Estatura: "",
        Comprimento_Pe: "",
        Altura_Ombro: "",
        Largura_Ombro: "",
        Envergadura: "",
        Altura_Quadril: "",
        Largura_Quadril: "",
        Altura_Joelho: "",
        Altura_Tornozelo: "",
        Data_Avaliacao: ""
    }

    const text = {
        labelEstatura:"Estatura",
        labelComprimento_Pe:"Comprimento do Pé",
        labelAltura_Ombro:"Altura do Ombro", 
        labelLargura_Ombro:"Largura do Ombro", 
        labelEnvergadura:"Envergadura", 
        labelAltura_Quadril:"Altura do Quadril", 
        labelLargura_Quadril:"Largura do Quadril", 
        labelAltura_Joelho:"Altura do Joelho",
        labelAltura_Tornozelo:"Altura do Tornozelo",
        lavelData_Avaliação: "Data da Avaliação",
        labelButtonAtualizar: "Atualizar",
        labelTitle:"Composição Corporal"
    }

    const [form, setForm] = useState(forminicial);
    const [disabled, setDisabled] = useState(true);

    const [{ data: infoAntropometrica }, getAntropometrica] = useAxios<Antropometrica>(
        {
            url: `/antropometrica/${id}/${index}`,
            method: "get",
        },
        {
            manual: true,
        }
    );

    const [, editAntropometrica] = useAxios<Antropometrica>(
        {
            url: `/antropometrica/${id}/${index}`,
            method: "patch",
            data: {
                ...form,
            }
        },
        {
            manual: true,
        }
    )

    const [, deleteAntropometrica] = useAxios<Antropometrica>(
        {
            url: `/antropometrica/${id}/${index}`,
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
        editAntropometrica()
        setDisabled(true)
    }

    const deletaForm = async () => {
        deleteAntropometrica()
        await delay(0.5)
        goToPage(`/pacientes/${id}`)
    }

    useEffect(() => {
        getAntropometrica()
        console.log("Atualizado")
        console.log(`Index: ${index}`)
    }, [])

    useEffect(() => {
        if (infoAntropometrica) {
            setForm(infoAntropometrica);
        }
    }, [infoAntropometrica]);



const inputs = [
    <Input label={text.labelEstatura} onChange={(e: any) => setForm({ ...form, Estatura: e.target.value })} value={form.Estatura} disabled={disabled} />,
    <Input label={text.labelComprimento_Pe} onChange={(e: any) => setForm({ ...form, Comprimento_Pe: e.target.value })} value={form.Comprimento_Pe} disabled={disabled} />,
    <Input label={text.labelAltura_Ombro} onChange={(e: any) => setForm({ ...form, Altura_Ombro: e.target.value })} value={form.Altura_Ombro} disabled={disabled} />,
    <Input label={text.labelLargura_Ombro} onChange={(e: any) => setForm({ ...form, Largura_Ombro: e.target.value })} value={form.Largura_Ombro} disabled={disabled} />,
    <Input label={text.labelEnvergadura} onChange={(e: any) => setForm({ ...form, Envergadura: e.target.value })} value={form.Envergadura} disabled={disabled} />,
    <Input label={text.labelAltura_Quadril} onChange={(e: any) => setForm({ ...form, Altura_Quadril: e.target.value })} value={form.Altura_Quadril} disabled={disabled} />,
    <Input label={text.labelLargura_Quadril} onChange={(e: any) => setForm({ ...form, Largura_Quadril: e.target.value })} value={form.Largura_Quadril} disabled={disabled} />,
    <Input label={text.labelAltura_Joelho} onChange={(e: any) => setForm({ ...form, Altura_Joelho: e.target.value })} value={form.Altura_Joelho} disabled={disabled} />,
    <Input label={text.labelAltura_Tornozelo} onChange={(e: any) => setForm({ ...form, Altura_Tornozelo: e.target.value })} value={form.Altura_Tornozelo} disabled={disabled} />,
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

export default AvAntropometrica