import useAxios from "axios-hooks"
import { useState } from "react"
import Button from "../components/Button"
import CriaForm from "../components/Criaform"
import Input from "../components/Input"
import { Pacientes } from "../types/types"
import Text from "../components/Text"
import { useNavigate } from "react-router";
import { delay } from "../service/delay"
import Select from "../components/Select"

//TODO: calcular idade automáticamente.

const text = {
    labelNome: "Nome",
    labelIdade: "Idade",
    labelSexo: "Sexo",
    labelData_Nascimento: "Data de Nascimento",
    labelCpf: "CPF",
    labelCelular: "Celular",
    labelEmail: "E-mail"
}

const CadastraPaciente = ({ }) => {

    const navigate = useNavigate();
    const goToPage = (page: string) => { navigate(`/pacientes/${page}`) }



    const [id, setID] = useState("")
    const [form, setForm] = useState({
        nome: "",
        idade: "",
        sexo: "",
        data_nascimento: "",
        cpf: "",
        email: "",
        celular: ""
    })
    const [, cadastroPaciente] = useAxios(
        {
            url: '/pacientes',
            method: 'post',
            data: form,

        },

        {
            manual: true,
        }
    )

    const sendData = async (e: any) => {
        e.preventDefault();
        await cadastroPaciente()
            .then(
                function (response) {
                    setID(response.data.data.id)




                })

        goToPage("")



    }


    const inputs = [

        <Input label={text.labelNome} onChange={(e: any) => setForm({ ...form, nome: e.target.value })} value={form.nome} />,
        <Input label={text.labelIdade} onChange={(e: any) => setForm({ ...form, idade: e.target.value })} value={form.idade} />,
        <Select label={"Sexo"} value={form.sexo} onChange={(e: any) => setForm({ ...form, sexo: e.target.value })} options={[
            <option value={"Masculino"}>Masculino</option>,
            <option value={"Feminino"}>Feminino</option>,
            <option value={""}></option>,]
        } />,
        <Input label={text.labelCpf} onChange={(e: any) => setForm({ ...form, cpf: e.target.value })} value={form.cpf} />,
        <Input label={text.labelCelular} onChange={(e: any) => setForm({ ...form, celular: e.target.value })} value={form.celular} />,
        <Input label={text.labelEmail} onChange={(e: any) => setForm({ ...form, email: e.target.value })} value={form.email} />,
        <Input type={"date"} label={text.labelData_Nascimento} onChange={(e: any) => setForm({ ...form, data_nascimento: e.target.value })} value={form.data_nascimento} />,
    ]

    return <div className={"h-[calc(100vh-theme(spacing.20))] md:h-auto p-2 grid grid-cols-12 gap-4 "}>
        <form className={"sm:relative md:my-10 md:pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 xxl:col-start-4 xxl:col-span-6"}>
            <Text className={"text-center mt-6 text-4xl"} type={"h1"} text={"Cadastro"} />
            <CriaForm inputs={inputs} className={"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"} />
            <div className={"mx-10 "}>
                <Button title={"Cadastar Paciente"} className={"m-0 p-2 w-full md:absolute md:right-12 md:bottom-6 md:w-60"} onClick={sendData} />
            </div>
        </form>
    </div>
}

export default CadastraPaciente