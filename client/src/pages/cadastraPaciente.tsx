import useAxios from "axios-hooks"
import { useState } from "react"
import Button from "../components/button/button"
import CriaForm from "../components/input/criaform"
import Input from "../components/input/input"
import { Pacientes } from "../types/types"
import Text from "../components/text/text"
import { useNavigate } from "react-router";
import { delay } from "../service/delay"


//TODO: Adicionar select para sexo, date para data de nascimento e calcular idade automáticamente. Adicionar field e-mail


const CadastraPaciente = ({ }) => {

    const navigate=useNavigate();
    const goToPage=(page:string)=>{navigate(`/pacientes/${page}`)}


    const text={
        labelNome: "Nome",
        labelIdade: "Idade",
        labelSexo: "Sexo",
        labelData_Nascimento: "Data de Nascimento",
        labelCpf:"CPF",
        labelCelular:"Celular",
        labelEmail:"E-mail"
    }
    const [id,setID]=useState("")
    const [form, setForm] = useState({
        nome: "",
        idade: "",
        sexo: "",
        data_nascimento: "",
        cpf:"",
        email:"",
        celular:""
    })
    const [ , cadastroPaciente] = useAxios(
        {
            url: '/pacientes',
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
        .then(
            function(response){
            setID(response.data.data.id)
 
            
             
            
        })
       
        goToPage("")
        
        
        
    }


    const inputs = [
        <Input label={text.labelNome} onChange={(e: any) => setForm({ ...form, nome: e.target.value })} value={form.nome} />,
        <Input label={text.labelSexo} onChange={(e: any) => setForm({ ...form, sexo: e.target.value })} value={form.sexo} />,
        <Input label={text.labelIdade} onChange={(e: any) => setForm({ ...form, idade: e.target.value })} value={form.idade} />,
        <Input label={text.labelCpf} onChange={(e: any) => setForm({ ...form, cpf: e.target.value })} value={form.cpf} />,
        <Input label={text.labelCelular} onChange={(e: any) => setForm({ ...form, celular: e.target.value })} value={form.celular} />,
        <Input label={text.labelEmail} onChange={(e: any) => setForm({ ...form, email: e.target.value })} value={form.email} />,
        <Input type={"date"} label={text.labelData_Nascimento} onChange={(e: any) => setForm({ ...form, data_nascimento: e.target.value })} value={form.data_nascimento} />,
    ]

    return <div className={"h-[calc(100vh-theme(spacing.20))] md:h-auto p-2 grid grid-cols-12 gap-4 "}>
        <form className={"sm:relative my-10 pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 xxl:col-start-4 xxl:col-span-6"}>
            <Text className={"text-center mt-6 text-4xl"} type={"h1"} text={"Cadastro"} />
            <CriaForm inputs={inputs} className={"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"} />
            <div className={"mx-10 "}>
                <Button title={"Cadastar Paciente"} className={"m-0 p-2 w-full md:absolute md:right-12 md:bottom-6 md:w-60"} onClick={sendData} />
            </div>
        </form>
    </div>
}

export default CadastraPaciente