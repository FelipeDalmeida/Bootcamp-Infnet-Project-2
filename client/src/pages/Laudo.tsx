import useAxios from "axios-hooks"
import { useEffect, useState } from "react";
import Input from "../components/Input";
import Text from "../components/Text"
import CriaForm from "../components/Criaform";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";

//Só pode ser usado se o paciente tiver uma composição corporal e uma antropometrica
const text = {
    labelSemExames:"Paciente sem todos os exames cadastrados",
    labelButtonBack:"Voltar",
    labelNome: "Nome",
    labelIdade: "Idade",
    labelData_Nascimento: "Data de nasciemnto",
    labelMassa: "Massa",
    labelIMC: "IMC",
    labelGordura_Corporal: "Gordura Corporal",
    labelGordura_Visceral: "Gordural Visceral",
    labelMetabolismo_Basal: "Metabolismo",
    labelMusculos_Esqueleticos: "Musculos",
    labelIdade_Corporal: "Idade Corporal",
    labelButtonCadastro: "Cadastrar Avaliação",
    labelEstatura: "Estatura",
    labelComprimento_Pe: "Comprimento do Pé",
    labelAltura_Ombro: "Altura do Ombro",
    labelLargura_Ombro: "Largura do Ombro",
    labelEnvergadura: "Envergadura",
    labelAltura_Quadril: "Altura do Quadril",
    labelLargura_Quadril: "Largura do Quadril",
    labelAltura_Joelho: "Altura do Joelho",
    labelAltura_Tornozelo: "Altura do Tornozelo",
    labelTitulo1:"Informação Paciente",
    labelTitulo2:"Informação Composição Corporal",
    labelTitulo3:"Informação Av. Antropométrica",

}

const Laudo = () => {

    const params = useParams()
    const id = params.id;
    const navigate = useNavigate();

    const forminicial = {
        nome: "",
        idade: 0,
        data_nascimento: "",
        massa: "",
        imc: "",
        gordura_corporal: "",
        gordura_visceral: "",
        metabolismo_basal: "",
        musculos_esqueleticos: "",
        idade_corporal: "",
        data_avaliacao: "",
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
    const [form, setForm] = useState(forminicial);

    const [{ data: laudoPaciente }, getLaudo] = useAxios<any>(
        {
            url: `pacientes/laudo/${id}`,
            method: "get",
        },
        {
            manual: true,
        }
    );
    useEffect(() => {
        getLaudo()
        console.log("Carregado")
    }, [])
    useEffect(() => {
        if (laudoPaciente) {
            if(laudoPaciente.success){
                setForm({...laudoPaciente.data});
            }
        }
        console.log(form)
    }, [laudoPaciente]);

    const infoPaciente = [
        <Input label={text.labelNome} value={form.nome} disabled={true} />,
        <Input label={text.labelIdade} value={form.idade} disabled={true} />,
        <Input label={text.labelData_Nascimento} value={form.data_nascimento} disabled={true} />,
    ]

    const infoCompCorp = [
        <Input disabled={true} label={text.labelMassa} value={form.massa} />,
        <Input disabled={true} label={text.labelIMC} value={form.imc} />,
        <Input disabled={true} label={text.labelGordura_Corporal} value={form.gordura_corporal} />,
        <Input disabled={true} label={text.labelGordura_Visceral} value={form.gordura_visceral} />,
        <Input disabled={true} label={text.labelMetabolismo_Basal} value={form.metabolismo_basal} />,
        <Input disabled={true} label={text.labelMusculos_Esqueleticos} value={form.musculos_esqueleticos} />,
        <Input disabled={true} label={text.labelIdade_Corporal} value={form.idade_corporal} />,
    ]

    const infoAntropometrica = [
        <Input disabled={true} label={text.labelEstatura} value={form.estatura} />,
        <Input disabled={true} label={text.labelComprimento_Pe} value={form.comprimento_pe} />,
        <Input disabled={true} label={text.labelAltura_Ombro} value={form.altura_ombro} />,
        <Input disabled={true} label={text.labelLargura_Ombro} value={form.largura_ombro} />,
        <Input disabled={true} label={text.labelEnvergadura} value={form.envergadura} />,
        <Input disabled={true} label={text.labelAltura_Quadril} value={form.altura_quadril} />,
        <Input disabled={true} label={text.labelLargura_Quadril} value={form.largura_quadril} />,
        <Input disabled={true} label={text.labelAltura_Joelho} value={form.altura_joelho} />,
        <Input disabled={true} label={text.labelAltura_Tornozelo} value={form.altura_tornozelo} />,
    ]

    return <div className={"md:h-auto p-2 grid grid-cols-12 gap-4 "}>
        <div className={"relative my-0 md:my-10 md:pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border col-start-0 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 xxl:col-start-4 xxl:col-span-6"}>
            {form.nome?<>
            <div className={""}>
                <Text className={"text-center mt-6 text-2xl md:text-4xl"} type={"h1"} text={text.labelTitulo1} />
                <CriaForm inputs={infoPaciente} className={"grid-cols-1 md:grid-cols-2"} />


            </div>
            <div className={""}>
                <Text className={"text-center mt-6 text-2xl md:text-4xl"} type={"h1"} text={text.labelTitulo2} />
                <CriaForm inputs={infoCompCorp} className={"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"} />
            </div>
            <div className={""}>
                <Text className={"text-center mt-6 text-2xl md:text-4xl"} type={"h1"} text={text.labelTitulo3} />
                <CriaForm inputs={infoAntropometrica} className={"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"} />
            </div></>:
            <div className={"text-center"}>
            <Text className={"text-rose-700 text-center my-10 text-3xl"} type={"h2"} text={text.labelSemExames} />
            <Button title={text.labelButtonBack} onClick={()=>navigate(`/pacientes/${id}`)} />
            </div>}
        </div>
    </div>
}

export default Laudo