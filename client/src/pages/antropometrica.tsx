import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom"
import Button from "../components/Button";
import CriaForm from "../components/Criaform";
import Input from "../components/Input";
import { delay } from "../service/delay";
import type { Antropometrica } from "../types/types";
import Text from "../components/Text";

const text = {
    labelEstatura: "Estatura",
    labelComprimento_Pe: "Comprimento do Pé",
    labelAltura_Ombro: "Altura do Ombro",
    labelLargura_Ombro: "Largura do Ombro",
    labelEnvergadura: "Envergadura",
    labelAltura_Quadril: "Altura do Quadril",
    labelLargura_Quadril: "Largura do Quadril",
    labelAltura_Joelho: "Altura do Joelho",
    labelAltura_Tornozelo: "Altura do Tornozelo",
    lavelData_Avaliação: "Data da Avaliação",
    labelButtonAtualizar: "Atualizar",
    labelTitle: "Avaliação Antropométrica"
}


const AvAntropometrica = () => {
    const params = useParams()
    const id = params.id;
    const navigate = useNavigate();
    const goToPage = (page: string) => { navigate(page) }

    const forminicial: Antropometrica = {
        estatura: "",
        comprimento_pe: "",
        altura_ombro: "",
        largura_ombro: "",
        envergadura: "",
        altura_quadril: "",
        largura_quadril: "",
        altura_joelho: "",
        altura_tornozelo: "",
        data_avaliacao: ""
    }


    const [form, setForm] = useState(forminicial);
    const [disabled, setDisabled] = useState(true);

    const [{ data: infoAntropometrica }, getAntropometrica] = useAxios<Antropometrica>(
        {
            url: `/antropometrica/${id}`,
            method: "get",
        },
        {
            manual: true,
        }
    );

    const [, editAntropometrica] = useAxios<Antropometrica>(
        {
            url: `/antropometrica/${id}`,
            method: "put",
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
            url: `/antropometrica/${id}`,
            method: "delete",
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
        goToPage(`/pacientes/${infoAntropometrica?.paciente_id}`)
    }

    useEffect(() => {
        getAntropometrica()
        console.log("Atualizado")
    }, [])

    useEffect(() => {
        if (infoAntropometrica) {
            setForm(infoAntropometrica);
        }
    }, [infoAntropometrica]);



    const inputs = [
        <Input label={text.labelEstatura} onChange={(e: any) => setForm({ ...form, estatura: Number(e.target.value) })} value={form.estatura} disabled={disabled} />,
        <Input label={text.labelComprimento_Pe} onChange={(e: any) => setForm({ ...form, comprimento_pe: Number(e.target.value) })} value={form.comprimento_pe} disabled={disabled} />,
        <Input label={text.labelAltura_Ombro} onChange={(e: any) => setForm({ ...form, altura_ombro: Number(e.target.value) })} value={form.altura_ombro} disabled={disabled} />,
        <Input label={text.labelLargura_Ombro} onChange={(e: any) => setForm({ ...form, largura_ombro: Number(e.target.value) })} value={form.largura_ombro} disabled={disabled} />,
        <Input label={text.labelEnvergadura} onChange={(e: any) => setForm({ ...form, envergadura: Number(e.target.value) })} value={form.envergadura} disabled={disabled} />,
        <Input label={text.labelAltura_Quadril} onChange={(e: any) => setForm({ ...form, altura_quadril: Number(e.target.value) })} value={form.altura_quadril} disabled={disabled} />,
        <Input label={text.labelLargura_Quadril} onChange={(e: any) => setForm({ ...form, largura_quadril: Number(e.target.value) })} value={form.largura_quadril} disabled={disabled} />,
        <Input label={text.labelAltura_Joelho} onChange={(e: any) => setForm({ ...form, altura_joelho: Number(e.target.value) })} value={form.altura_joelho} disabled={disabled} />,
        <Input label={text.labelAltura_Tornozelo} onChange={(e: any) => setForm({ ...form, altura_tornozelo: Number(e.target.value) })} value={form.altura_tornozelo} disabled={disabled} />,
        <Input label={text.lavelData_Avaliação} onChange={(e: any) => setForm({ ...form, data_avaliacao: e.target.value })} value={form.data_avaliacao} disabled={disabled} />,
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