import Button from '../components/button/button';
import { useAxios } from '../service/useAxios'
import { Pacientes } from '../types/types';
import Text from '../components/text/text';
import { useEffect } from 'react';
import { useNavigate } from "react-router";

const ListaPacientes = ({ }) => {
 
    const navigate=useNavigate();
    const goToPage=(page:string)=>{navigate(page)}


    const text={
        title:"Pacientes",
        Nome:"Nome",
        Idade:"Idade",
        Sexo:"Sexo",
        Nascimento:"Nascimento",
        semPacientes:"Sem pacientes cadastrados"
    }

    const [{ data: listaPacientes },setPacientes] = useAxios<Pacientes[]>({
        url: "/pacientes",
        method: "get",
    });

    useEffect(()=>{
        setPacientes()
        console.log("Atualizado")
    },[])

    return <div className={"h-full p-2 grid grid-cols-12 gap-4 "}>

        <div className={"relative my-10 py-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 xxl:col-start-4 xxl:col-span-6"}>
            <Text className={"text-center mb-10 text-4xl"} type={"h1"} text={text.title} />
            <div className={"border-b  border-b-blue-400 px-10 grid grid-cols-2 sm:grid-cols-5  gap-0"}>

                <div className={"self-center hidden sm:block"}><Text className={"font-bold"} text={text.Nome} /></div>
                <div className={"self-center hidden sm:block"}><Text className={"font-bold"} text={text.Idade} /></div>
                <div className={"self-center hidden sm:block"}><Text className={"font-bold"} text={text.Sexo} /></div>
                <div className={"self-center hidden sm:block"}><Text className={"font-bold"} text={text.Nascimento} /></div>
                <div className={"self-center hidden sm:block"}></div>
            </div>

            <>{listaPacientes?(listaPacientes?.length>0)?listaPacientes.map(({ id, Nome, Sobrenome, Idade, Sexo, Data_Nascimento, Data_Cadastro }: Pacientes) => {

                return <div className={" border-b  border-b-blue-400  px-10 grid grid-cols-2 sm:grid-cols-5  gap-0 "} key={id}>
                    <div className={"self-center"}><Text className={"sm:hidden font-bold"} text={`Nome:`} /><Text text={`${Nome} ${Sobrenome}`} /></div>
                    <div className={"self-center"}><Text className={"sm:hidden font-bold"} text={`Idade:`} /><Text text={`${Idade}`} /></div>
                    <div className={"self-center"}><Text className={"sm:hidden font-bold"} text={`Sexo:`} />{`${Sexo}`}</div>
                    <div className={"self-center"}><Text className={"sm:hidden font-bold"} text={`Nascimento:`} />{`${Data_Nascimento}`}</div>
                    <Button title={"Exibir"} className={"w-full col-start-0 col-span-2 sm:col-start-5 sm:w-30"} onClick={()=>goToPage(`/pacientes/${id}`)} />
                </div>


            }):<Text className={"text-rose-700 text-center my-10 text-3xl"} type={"h2"} text={text.semPacientes}  />:
            <Text className={"text-rose-700 text-center my-10 text-3xl"} type={"h2"} text={text.semPacientes}  />}</>



        </div>
    </div>


}


export default ListaPacientes