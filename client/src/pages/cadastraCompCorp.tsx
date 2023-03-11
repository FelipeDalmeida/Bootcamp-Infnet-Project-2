import useAxios from "axios-hooks"
import { useState } from "react"
import Button from "../components/button/button"
import CriaForm from "../components/input/criaform"
import Input from "../components/input/input"
import { CompCorp } from "../types/types"
import Text from "../components/text/text"
import { useNavigate } from "react-router";
import { delay } from "../service/delay"
import { useParams } from "react-router-dom"


const CadastraAvCompCorp = ({ }) => {

    const navigate=useNavigate();
    const goToPage=(page:string)=>{navigate(`/pacientes/${page}`)}
    const params=useParams()
    const id=params.id;
    const text={
        labelMassa:"Massa",
        labelIMC:"IMC",
        labelGordura_Corporal:"Gordura Corporal", 
        labelGordura_Visceral:"Gordural Visceral", 
        labelMetabolismo_Basal:"Metabolismo", 
        labelMusculos_Esqueleticos:"Musculos", 
        labelIdade_Corporal:"Idade Corportal", 
        labelButtonCadastro:"Cadastrar Avaliação",
        labelTitle:"Cadastrar Avaliação"
    }

    const [form, setForm] = useState({
        Massa:"",
        IMC:"",
        Gordura_Corporal:"", 
        Gordura_Visceral:"", 
        Metabolismo_Basal:"", 
        Musculos_Esqueleticos:"", 
        Idade_Corporal:"",
    })
    const [ , cadastroPaciente] = useAxios(
        {
            url: `/compcorp/${id}`,
            method: 'post',
            data:form,
            
        },
        
        {
            manual: true,
        }
    )

    const sendData = async (e:any) => {
        e.preventDefault();
        await cadastroPaciente()
       
        goToPage(`${id}`)
        
        
        
    }


    const inputs = [
        <Input label={text.labelMassa} onChange={(e: any) => setForm({ ...form, Massa: e.target.value })} value={form.Massa} />,
        <Input label={text.labelIMC} onChange={(e: any) => setForm({ ...form, IMC: e.target.value })} value={form.IMC} />,
        <Input label={text.labelGordura_Corporal} onChange={(e: any) => setForm({ ...form, Gordura_Corporal: e.target.value })} value={form.Gordura_Corporal} />,
        <Input label={text.labelGordura_Visceral} onChange={(e: any) => setForm({ ...form, Gordura_Visceral: e.target.value })} value={form.Gordura_Visceral} />,
        <Input label={text.labelMetabolismo_Basal} onChange={(e: any) => setForm({ ...form, Metabolismo_Basal: e.target.value })} value={form.Metabolismo_Basal} />,
        <Input label={text.labelMusculos_Esqueleticos} onChange={(e: any) => setForm({ ...form, Musculos_Esqueleticos: e.target.value })} value={form.Musculos_Esqueleticos} />,
        <Input label={text.labelIdade_Corporal} onChange={(e: any) => setForm({ ...form, Idade_Corporal: e.target.value })} value={form.Idade_Corporal} />,
    ]

    return <div className={"h-[calc(100vh-theme(spacing.20))] md:h-auto p-2 grid grid-cols-12 gap-4 "}>
        <form className={"sm:relative pb-1 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 xxl:col-start-4 xxl:col-span-6"}>
            <Text className={"text-center mt-6 text-4xl"} type={"h1"} text={text.labelTitle} />
            <CriaForm inputs={inputs} className={"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"} />
            <div className={"mx-10 "}>
                <Button title={text.labelButtonCadastro} className={"m-0 p-2 w-full md:absolute md:right-12 md:bottom-6 md:w-60"} onClick={sendData} />
            </div>
        </form>
    </div>
}

export default CadastraAvCompCorp