import useAxios from "axios-hooks"
import { useState } from "react"
import Button from "../components/Button"
import CriaForm from "../components/Criaform"
import Input from "../components/Input"
import { CompCorp } from "../types/types"
import Text from "../components/Text"
import { useNavigate } from "react-router";
import { delay } from "../service/delay"
import { useParams } from "react-router-dom"
import { compcorpSchema } from "../schemas/examsSchema"
import { setFormErrorsValid } from "../service/formValidation"


const text = {
    labelMassa: "Massa",
    labelIMC: "IMC",
    labelGordura_Corporal: "Gordura Corporal",
    labelGordura_Visceral: "Gordural Visceral",
    labelMetabolismo_Basal: "Metabolismo",
    labelMusculos_Esqueleticos: "Musculos",
    labelIdade_Corporal: "Idade Corportal",
    labelButtonCadastro: "Cadastrar Avaliação",
    labelTitle: "Cadastrar Avaliação"
}

const CadastraAvCompCorp = ({ }) => {

    const navigate = useNavigate();
    const goToPage = (page: string) => { navigate(`/pacientes/${page}`) }
    const params = useParams()
    const id = params.id;


    const [form, setForm] = useState({
        massa: "",
        imc: "",
        gordura_corporal: "",
        gordura_visceral: "",
        metabolismo_basal: "",
        musculos_esqueleticos: "",
        idade_corporal: "",
    })

    const [errors, setErrors] = useState<any>({
        massa: "",
        imc: "",
        gordura_corporal: "",
        gordura_visceral: "",
        metabolismo_basal: "",
        musculos_esqueleticos: "",
        idade_corporal: "",
    })

    const [, cadastroComcorp] = useAxios(
        {
            url: `/compcorp/${id}`,
            method: 'post',

        },

        {
            manual: true,
        }
    )

    const sendData = async (e: any) => {
        e.preventDefault();

        const validForm = await compcorpSchema.safeParseAsync(form);

        const erros: any = {
            massa: "",
            imc: "",
            gordura_corporal: "",
            gordura_visceral: "",
            metabolismo_basal: "",
            musculos_esqueleticos: "",
            idade_corporal: "",
        }

        if (!validForm.success) {



            setFormErrorsValid(validForm, errors, setErrors, erros)
            console.log(errors)
            return false
        }

        const { massa, imc, gordura_corporal, gordura_visceral, metabolismo_basal, musculos_esqueleticos, idade_corporal } = validForm.data
        await cadastroComcorp({
            data: {
                massa: massa,
                imc: imc,
                gordura_corporal: gordura_corporal,
                gordura_visceral: gordura_visceral,
                metabolismo_basal: metabolismo_basal,
                musculos_esqueleticos: musculos_esqueleticos,
                idade_corporal: idade_corporal,
            }
        })
        setErrors(erros)

        goToPage(`${id}`)



    }


    const inputs = [
        <Input label={text.labelMassa} onChange={(e: any) => setForm({ ...form, massa: e.target.value })} value={form.massa} error={errors.massa}/>,
        <Input label={text.labelIMC} onChange={(e: any) => setForm({ ...form, imc: e.target.value })} value={form.imc} error={errors.imc}/>,
        <Input label={text.labelGordura_Corporal} onChange={(e: any) => setForm({ ...form, gordura_corporal: e.target.value })} value={form.gordura_corporal} error={errors.gordura_corporal}/>,
        <Input label={text.labelGordura_Visceral} onChange={(e: any) => setForm({ ...form, gordura_visceral: e.target.value })} value={form.gordura_visceral} error={errors.gordura_visceral}/>,
        <Input label={text.labelMetabolismo_Basal} onChange={(e: any) => setForm({ ...form, metabolismo_basal: e.target.value })} value={form.metabolismo_basal} error={errors.metabolismo_basal}/>,
        <Input label={text.labelMusculos_Esqueleticos} onChange={(e: any) => setForm({ ...form, musculos_esqueleticos: e.target.value })} value={form.musculos_esqueleticos} error={errors.musculos_esqueleticos}/>,
        <Input label={text.labelIdade_Corporal} onChange={(e: any) => setForm({ ...form, idade_corporal: e.target.value })} value={form.idade_corporal} error={errors.idade_corporal}/>,
    ]

    return <div className={"md:h-auto p-2 grid grid-cols-12 gap-4 "}>
        <form className={"sm:relative md:my-10 md:pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 xxl:col-start-4 xxl:col-span-6"}>
            <Text className={"text-center mt-6 text-4xl"} type={"h1"} text={text.labelTitle} />
            <CriaForm inputs={inputs} className={"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"} />
            <div className={"mx-10 "}>
                <Button title={text.labelButtonCadastro} className={"m-0 p-2 w-full md:absolute md:right-12 md:bottom-6 md:w-60"} onClick={async(e)=>sendData(e)} />
            </div>
        </form>
    </div>
}

export default CadastraAvCompCorp