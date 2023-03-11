import CriaForm from "../../components/input/criaform"
import Input from "../../components/input/input"
import Text from "../../components/text/text"
import Button from "../../components/button/button"
import { useEffect, useState } from "react"
import Img from "../../components/img/img"
import Logo from '../../assets/img/logo192.png'
import { useNavigate } from "react-router-dom"
import {useAxios} from "../../service/useAxios"

const Login=({setIsAuth}:any)=>{
    const navigate=useNavigate();
    const goToPage=(page:string)=>{navigate(`${page}`)}

    const [loginData,setLoginData]=useState({email:"",senha:"",error:""})
    const [, realizaLogin] = useAxios(
        {
            url:'/auth/login',
            method: 'post',
            data:loginData,
            
        },
        
        {
            manual: true,
        }
    )


    const text={
        labelEmail:"E-mail",
        labelSenha:"Senha",
        labelTitle:"Login",
        labelButton:"Entrar",
        labelButtonRegister:"Registrar-se"
    }

    const sendLogin=async()=>{
        console.log(loginData)
        await realizaLogin().then(response=>{if(response){
            setIsAuth(true)
            setLoginData({...loginData,error:""})
        }})
        .catch((error)=>{
            if(error){
                setLoginData({...loginData,error:"Erro de Login"})
               
            }})

    }


    const inputs=[
        <Input label={text.labelEmail} type={"email"} value={loginData.email} onChange={(e)=>setLoginData({...loginData,email:e.target.value})} />,
        <Input label={text.labelSenha} type={"password"} value={loginData.senha} onChange={(e)=>setLoginData({...loginData,senha:e.target.value})} error={loginData.error}/>
    ]

    return <div className={"h-auto p-2 grid grid-cols-12 gap-4 "}>
    
    <div className={"sm:relative my-10 pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-4 md:col-span-6 lg:col-start-5 lg:col-span-4"}>
    <div className={"h-40 flex justify-center"}><Img img={Logo}/></div>
        <Text className={"text-center mt-6 text-4xl"} type={"h1"} text={text.labelTitle} />
        <CriaForm inputs={inputs} className={"grid-cols-1"} />
        <div className={"mx-10 "}>
            <Button title={text.labelButton} className={"m-0 p-2 w-full "} onClick={sendLogin} />
            <Button title={text.labelButtonRegister} className={"m-0 p-2 w-full "} onClick={()=>{goToPage('/registro')}} />
        </div>
    </div>
</div>
}

export default Login