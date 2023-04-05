import CriaForm from "../../components/Criaform"
import Input from "../../components/Input"
import Text from "../../components/Text"
import Button from "../../components/Button"
import { useState } from "react"
import Img from "../../components/Img"
import Logo from '../../assets/img/logo192.png'
import { useNavigate } from "react-router-dom"
import { useAxios } from "../../service/useAxios"
import { criaNome } from "../../service/stringManipulation"

const text = {
    labelEmail: "E-mail",
    labelSenha: "Senha",
    labelEmailCheck: "Repita seu e-mail",
    labelSenhaCheck: "Repita sua senha",
    labelTitle: "Registro",
    labelButton: "Registrar",
    labelButtonLogin: "Ir para Login"
}

const Register = ({ setIsAuth,setUser }: any) => {
    const navigate = useNavigate();
    const goToPage = (page: string) => { navigate(`${page}`) }


    const [registro, setRegistro] = useState({ email: "", senha: "", emailCheck: "", emailError: "", senhaCheck: "", senhaError: "", error: "" })

    const [{ data: response }, realizaRegistro] = useAxios(
        {
            url: '/auth/register',
            method: 'post',
            data: registro,

        },

        {
            manual: true,
        }
    )


    const registar = async () => {


        await realizaRegistro().then(response => { 
            if (response) { 
                setIsAuth(true); 
                const nome=criaNome(registro.email)
                setUser(nome)
                goToPage("/") 
            } })
            .catch((error) => {
                if (error) {
                    setRegistro({ ...registro, error: "Erro no registro" })

                }
            })


    }

    const inputs = [
        <Input label={text.labelEmail} type={"email"} value={registro.email} onChange={(e) => setRegistro({ ...registro, email: e.target.value })} error={registro.emailError} />,
        // <Input label={text.labelEmailCheck} type={"email"} value={registro.emailCheck} onChange={(e) => setRegistro({ ...registro, emailCheck: e.target.value })} />,
        <Input label={text.labelSenha} type={"password"} value={registro.senha} onChange={(e) => setRegistro({ ...registro, senha: e.target.value })} error={registro.senhaError} />,
        // <Input label={text.labelSenhaCheck} type={"password"} value={registro.senhaCheck} onChange={(e) => setRegistro({ ...registro, senhaCheck: e.target.value })} error={registro.error} />
    ]

    return <div className={"h-auto p-2 grid grid-cols-12 gap-4 "}>

        <div className={"sm:relative my-10 pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-4 md:col-span-6 lg:col-start-5 lg:col-span-4"}>
            <div className={"h-40 flex justify-center"}><Img img={Logo} /></div>
            <Text className={"text-center mt-6 text-4xl"} type={"h1"} text={text.labelTitle} />
            <CriaForm inputs={inputs} className={"my-2 grid-cols-1"} />

            <div className={"mx-10 "}>
                <Button type={"submit"} title={text.labelButton} className={"m-0 my-3 p-2 w-full "} onClick={registar} />
                <Button type={"button"} title={text.labelButtonLogin} className={"m-0 my-3 p-2 w-full "} onClick={() => { goToPage('/') }} />
            </div>
        </div>
    </div>
}

export default Register