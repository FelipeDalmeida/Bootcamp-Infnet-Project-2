import useAxios from "axios-hooks"
import { useEffect, useState } from "react"
import Button from "../components/button/button"
import CriaForm from "../components/input/criaform"
import Input from "../components/input/input"
import { Pacientes } from "../types/types"
import Text from "../components/text/text"
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom"
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { delay } from "../service/delay"
import ListaCompCorp from "../components/listas/listaComposicaoCorporal"
import ListaAvAntropometrica from "../components/listas/listaAvAntropometrica"


const PacientePage = ({ }) => {
    const params=useParams()
    const id=params.id;
    const navigate=useNavigate();
    const goToPage=(page:string)=>{navigate(page)}

    const text ={
        labelNome: "Nome",
        labelSobrenome: "Sobrenome",
        labelIdade: "Idade",
        labelSexo: "Sexo",
        labelData_Nascimento: "Data de nasciemnto",
        labelData_Cadastro: "Data de Cadastro",
        labelButtonAtualizar:"Atualizar",
        labelPen:"Editar Paciente"
    }
    const forminicial:Pacientes={
        
            Nome: "",
            Sobrenome: "",
            Idade: "",
            Sexo: "",
            Data_Nascimento: "",     
            Data_Cadastro:""
    }

    const [form, setForm] = useState(forminicial);
    const [disabled,setDisabled]=useState(true)

    const [{ data: infoPaciente },getPaciente] = useAxios<Pacientes>(
        {
        url: `/pacientes/${id}`,
        method: "get",
    },
    {
      manual: true,
     }
    );

    const [,editPaciente]=useAxios<Pacientes>(
        {
            url: `/pacientes/${id}`,
            method:"patch",
            data:{
                ...form
            }
        },
        {
            manual: true,
        }
    )

    const [,deletePaciente] = useAxios<Pacientes>(
        {
        url: `/pacientes/${id}`,
        method: "delete",
    },
    {
      manual: true,
     }
    );
    


    const editarForm=()=>{
        setDisabled(!disabled)
    }

    const atualizaForm=()=>{
        editPaciente()
        setDisabled(true)
    }

    const deletaForm=async ()=>{
        deletePaciente()
        await delay(0.5)
        goToPage(`/pacientes`)
    }
   
    useEffect(()=>{
        getPaciente()
        console.log("Atualizado")
    },[])

    useEffect(() => {
        if (infoPaciente) {
          setForm(infoPaciente);
        }
      }, [infoPaciente]);

    const inputs = [
        <Input label={text.labelNome} onChange={(e: any) => setForm({ ...form, Nome: e.target.value })} value={form.Nome} disabled={disabled}/>,
        <Input label={text.labelSobrenome} onChange={(e: any) => setForm({ ...form, Sobrenome: e.target.value })} value={form.Sobrenome} disabled={disabled}/>,
        <Input label={text.labelIdade} onChange={(e: any) => setForm({ ...form, Idade: e.target.value })} value={form.Idade} disabled={disabled}/>,
        <Input label={text.labelSexo} onChange={(e: any) => setForm({ ...form, Sexo: e.target.value })} value={form.Sexo} disabled={disabled}/>,
        <Input label={text.labelData_Nascimento} onChange={(e: any) => setForm({ ...form, Data_Nascimento: e.target.value })} value={form.Data_Nascimento} disabled={disabled}/>,
        <Input label={text.labelData_Cadastro} onChange={(e: any) => setForm({ ...form, Data_Cadastro: e.target.value })} value={form.Data_Cadastro} disabled={disabled}/>,
    ]

    return <> <div className={"md:h-auto p-2 grid grid-cols-12 gap-4 "}>
        <div className={"relative my-10 pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border col-start-0 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 xxl:col-start-4 xxl:col-span-6"}>
        <form className={"   "}>
            <Text className={"text-center mt-6 text-4xl"} type={"h1"} text={`${form.Nome} ${form.Sobrenome}`} />
            <CriaForm inputs={inputs} className={"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"} />
            
            
        </form>
        
        <button className={`absolute  top-2 left-6 ${disabled?"hidden":""}`}>{<FaTrashAlt className={"text-red-700 h-10 w-5"} onClick={deletaForm}/>}</button>
        <button className={`absolute top-3 right-6`}>{<FaPen className={"text-blue-500 hover:text-blue-800 h-10 w-5"} onClick={()=>{editarForm()}} title={text.labelPen}/>}</button>
        <div className={`mx-10 ${disabled?"hidden":""}`}>
                <Button title={text.labelButtonAtualizar} className={"m-0 p-2 w-full md:absolute md:right-12 md:bottom-6 md:w-60"} onClick={atualizaForm} />
        </div>
        </div>
        
            
            
    
    </div>
    <div>
    <ListaCompCorp/>
    <ListaAvAntropometrica/>
    </div>
    </>
}

export default PacientePage