import useAxios from "axios-hooks"
import { useState } from "react"
import Button from "../components/button/button"
import CriaForm from "../components/input/criaform"
import Input from "../components/input/input"
import { Antropometrica } from "../types/types"
import Text from "../components/text/text"
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom"


const CadastraAvAntropometrica = ({ }) => {

    const navigate=useNavigate();
    const goToPage=(page:string)=>{navigate(`/pacientes/${page}`)}
    const params=useParams()
    const id=params.id;
    const text={
        labelEstatura:"Estatura",
        labelComprimento_Pe:"Comprimento do Pé",
        labelAltura_Ombro:"Altura do Ombro", 
        labelLargura_Ombro:"Largura do Ombro", 
        labelEnvergadura:"Envergadura", 
        labelAltura_Quadril:"Altura do Quadril", 
        labelLargura_Quadril:"Largura do Quadril", 
        labelAltura_Joelho:"Altura do Joelho",
        labelAltura_Tornozelo:"Altura do Tornozelo",
        labelNoList:"Sem avaliações cadastradas",
        labelButtonCadastro:"Cadastrar Avaliação",
        labelTitle:"Cadastrar Avaliação"
    }

    const [form, setForm] = useState({
        Estatura: "",
        Comprimento_Pe: "",
        Altura_Ombro: "",
        Largura_Ombro: "",
        Envergadura: "",
        Altura_Quadril: "",
        Largura_Quadril: "",
        Altura_Joelho: "",
        Altura_Tornozelo: "",
    })
    const [ , cadastroAntropometrica] = useAxios(
        {
            url: `/antropometrica/${id}`,
            method: 'post',
            data:form,
            
        },
        
        {
            manual: true,
        }
    )

    const sendData = async (e:any) => {
        e.preventDefault();
        await cadastroAntropometrica()
       
        goToPage(`${id}`)
        
        
        
    }

    const inputs = [
        <Input label={text.labelEstatura} onChange={(e: any) => setForm({ ...form, Estatura: e.target.value })} value={form.Estatura} />,
        <Input label={text.labelComprimento_Pe} onChange={(e: any) => setForm({ ...form, Comprimento_Pe: e.target.value })} value={form.Comprimento_Pe} />,
        <Input label={text.labelAltura_Ombro} onChange={(e: any) => setForm({ ...form, Altura_Ombro: e.target.value })} value={form.Altura_Ombro} />,
        <Input label={text.labelLargura_Ombro} onChange={(e: any) => setForm({ ...form, Largura_Ombro: e.target.value })} value={form.Largura_Ombro} />,
        <Input label={text.labelEnvergadura} onChange={(e: any) => setForm({ ...form, Envergadura: e.target.value })} value={form.Envergadura} />,
        <Input label={text.labelAltura_Quadril} onChange={(e: any) => setForm({ ...form, Altura_Quadril: e.target.value })} value={form.Altura_Quadril} />,
        <Input label={text.labelLargura_Quadril} onChange={(e: any) => setForm({ ...form, Largura_Quadril: e.target.value })} value={form.Largura_Quadril} />,
        <Input label={text.labelAltura_Joelho} onChange={(e: any) => setForm({ ...form, Altura_Joelho: e.target.value })} value={form.Altura_Joelho} />,
        <Input label={text.labelAltura_Tornozelo} onChange={(e: any) => setForm({ ...form, Altura_Tornozelo: e.target.value })} value={form.Altura_Tornozelo} />,
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