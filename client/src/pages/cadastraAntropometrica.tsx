import useAxios from "axios-hooks"
import { useState } from "react"
import Button from "../components/Button"
import CriaForm from "../components/Criaform"
import Input from "../components/Input"
import { Antropometrica } from "../types/types"
import Text from "../components/Text"
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom"
import { avAntropometricaSchema } from "../schemas/examsSchema"
import { setFormErrorsValid } from "../service/formValidation"


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

    const [errors, setErrors] = useState<any>({
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

        },

        {
            manual: true,
        }
    )

    const sendData = async (e: any) => {
        e.preventDefault();

        const validForm = await avAntropometricaSchema.safeParseAsync(form);

        const erros: any = {
            estatura: "",
            comprimento_pe: "",
            altura_ombro: "",
            largura_ombro: "",
            envergadura: "",
            altura_quadril: "",
            largura_quadril: "",
            altura_joelho: "",
            altura_tornozelo: "",
        }

        if (!validForm.success) {



            setFormErrorsValid(validForm, errors, setErrors, erros)
            console.log(errors)
            return false
        }

        const { estatura, comprimento_pe, altura_ombro, largura_ombro, envergadura, altura_quadril, largura_quadril, altura_joelho, altura_tornozelo } = validForm.data
        await cadastroAntropometrica({
            data: {
                estatura: estatura,
                comprimento_pe: comprimento_pe,
                altura_ombro: altura_ombro,
                largura_ombro: largura_ombro,
                envergadura: envergadura,
                altura_quadril: altura_quadril,
                largura_quadril: largura_quadril,
                altura_joelho: altura_joelho,
                altura_tornozelo: altura_tornozelo,
            }
        })
        setErrors(erros)

        goToPage(`${id}`)



    }

    const inputs = [
        <Input label={text.labelEstatura} onChange={(e: any) => setForm({ ...form, estatura: e.target.value })} value={form.estatura} error={errors.estatura}/>,
        <Input label={text.labelComprimento_Pe} onChange={(e: any) => setForm({ ...form, comprimento_pe: e.target.value })} value={form.comprimento_pe} error={errors.comprimento_pe}/>,
        <Input label={text.labelAltura_Ombro} onChange={(e: any) => setForm({ ...form, altura_ombro: e.target.value })} value={form.altura_ombro} error={errors.altura_ombro}/>,
        <Input label={text.labelLargura_Ombro} onChange={(e: any) => setForm({ ...form, largura_ombro: e.target.value })} value={form.largura_ombro} error={errors.largura_ombro}/>,
        <Input label={text.labelEnvergadura} onChange={(e: any) => setForm({ ...form, envergadura: e.target.value })} value={form.envergadura} error={errors.envergadura}/>,
        <Input label={text.labelAltura_Quadril} onChange={(e: any) => setForm({ ...form, altura_quadril: e.target.value })} value={form.altura_quadril} error={errors.altura_quadril}/>,
        <Input label={text.labelLargura_Quadril} onChange={(e: any) => setForm({ ...form, largura_quadril: e.target.value })} value={form.largura_quadril} error={errors.largura_quadril}/>,
        <Input label={text.labelAltura_Joelho} onChange={(e: any) => setForm({ ...form, altura_joelho: e.target.value })} value={form.altura_joelho} error={errors.altura_joelho}/>,
        <Input label={text.labelAltura_Tornozelo} onChange={(e: any) => setForm({ ...form, altura_tornozelo: e.target.value })} value={form.altura_tornozelo} error={errors.altura_tornozelo}/>,
    ]

    return <div className={"md:h-auto p-2 grid grid-cols-12 gap-4 "}>
        <form className={"sm:relative md:my-10 md:pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 xxl:col-start-4 xxl:col-span-6"}>
            <Text className={"text-center mt-6 text-4xl"} type={"h1"} text={text.labelTitle} />
            <CriaForm inputs={inputs} className={"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"} />
            <div className={"mx-10 "}>
                <Button title={text.labelButtonCadastro} className={"m-0 p-2 w-full md:absolute md:right-12 md:bottom-6 md:w-60"} onClick={sendData} />
            </div>
        </form>
    </div>
}

export default CadastraAvAntropometrica