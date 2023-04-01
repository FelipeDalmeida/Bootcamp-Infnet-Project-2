import useAxios from "axios-hooks"
import { useState } from "react"
import Button from "../components/Button"
import CriaForm from "../components/Criaform"
import Input from "../components/Input"
import { Antropometrica } from "../types/types"
import Text from "../components/Text"
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom"


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
    labelNoList: "Sem avaliações cadastradas",
    labelButtonCadastro: "Cadastrar Avaliação",
    labelTitle: "Cadastrar Avaliação"
}

const CadastraAvAntropometrica = ({ }) => {

    const navigate = useNavigate();
    const goToPage = (page: string) => { navigate(`/pacientes/${page}`) }
    const params = useParams()
    const id = params.id;


    const [form, setForm] = useState({
        estatura: "",
        comprimento_pe: "",
        altura_ombro: "",
        largura_ombro: "",
        envergadura: "",
        altura_quadril: "",
        largura_quadril: "",
        altura_joelho: "",
        altura_tornozelo: "",
    })
    const [, cadastroAntropometrica] = useAxios(
        {
            url: `/antropometrica/${id}`,
            method: 'post',
            data: form,

        },

        {
            manual: true,
        }
    )

    const sendData = async (e: any) => {
        e.preventDefault();
        await cadastroAntropometrica()

        goToPage(`${id}`)



    }

    const inputs = [
        <Input label={text.labelEstatura} onChange={(e: any) => setForm({ ...form, estatura: e.target.value })} value={form.estatura}/>,
        <Input label={text.labelComprimento_Pe} onChange={(e: any) => setForm({ ...form, comprimento_pe: e.target.value })} value={form.comprimento_pe}/>,
        <Input label={text.labelAltura_Ombro} onChange={(e: any) => setForm({ ...form, altura_ombro: e.target.value })} value={form.altura_ombro}/>,
        <Input label={text.labelLargura_Ombro} onChange={(e: any) => setForm({ ...form, largura_ombro: e.target.value })} value={form.largura_ombro}/>,
        <Input label={text.labelEnvergadura} onChange={(e: any) => setForm({ ...form, envergadura: e.target.value })} value={form.envergadura}/>,
        <Input label={text.labelAltura_Quadril} onChange={(e: any) => setForm({ ...form, altura_quadril: e.target.value })} value={form.altura_quadril}/>,
        <Input label={text.labelLargura_Quadril} onChange={(e: any) => setForm({ ...form, largura_quadril: e.target.value })} value={form.largura_quadril}/>,
        <Input label={text.labelAltura_Joelho} onChange={(e: any) => setForm({ ...form, altura_joelho: e.target.value })} value={form.altura_joelho}/>,
        <Input label={text.labelAltura_Tornozelo} onChange={(e: any) => setForm({ ...form, altura_tornozelo: e.target.value })} value={form.altura_tornozelo}/>,
    ]

    return <div className={"h-[calc(100vh-theme(spacing.20))] md:h-auto p-2 grid grid-cols-12 gap-4 "}>
        <form className={"sm:relative my-10 pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 xxl:col-start-4 xxl:col-span-6"}>
            <Text className={"text-center mt-6 text-4xl"} type={"h1"} text={text.labelTitle} />
            <CriaForm inputs={inputs} className={"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"} />
            <div className={"mx-10 "}>
                <Button title={text.labelButtonCadastro} className={"m-0 p-2 w-full md:absolute md:right-12 md:bottom-6 md:w-60"} onClick={sendData} />
            </div>
        </form>
    </div>
}

export default CadastraAvAntropometrica