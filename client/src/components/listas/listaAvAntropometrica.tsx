import Button from '../button/button';
import { useAxios } from '../../service/useAxios'
import type { Antropometrica } from '../../types/types';
import Text from '../text/text';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';

const ListaAvAntropometrica = ({ }) => {
 
    const navigate=useNavigate();
    const goToPage=(page:string)=>{navigate(page)}
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
        labelData_Avaliacao:"Data da Avaliação",
        labelTitle:"Avaliação Antropometrica",
        labelNoList:"Sem avaliações cadastradas",
        labelButtonCadastrar:"Cadastar Avaliação"
    }

    const [{ data: listaAvAntropometrica},setAvCompCorp] = useAxios<Antropometrica[]>({
        url: `/antropometrica/all/${id}`,
        method: "get",
    });

    useEffect(()=>{
        setAvCompCorp()
        console.log("Atualizado")
    },[])

    return <div className={"h-full p-2 grid grid-cols-12 gap-4 "}>

        <div className={"relative my-10 py-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 xxl:col-start-4 xxl:col-span-6"}>
            <Text className={"text-center mb-10 text-4xl"} type={"h1"} text={text.labelTitle} />
            <div className={"border-b  border-b-blue-400 px-10 grid grid-cols-2 sm:grid-cols-5  gap-0"}>
                <div className={"self-center hidden sm:block col-start-0 col-span-4"}><Text className={"font-bold text-center sm:text-left"} text={text.labelData_Avaliacao} /></div>
                {/* <div className={"self-center hidden sm:block"}></div> */}
                <div className={"self-center hidden sm:block"}></div>
            </div>

            <>{listaAvAntropometrica?(listaAvAntropometrica?.length>0)?listaAvAntropometrica.map(({ 
                
                Data_Avaliacao,
             }: Antropometrica,index:number) => {
           
                

                return <div className={" border-b  border-b-blue-400  px-10 grid grid-cols-2 sm:grid-cols-5  gap-0 "} key={index}>
                   
                    <div className={"self-center col-start-0 col-span-4 text-center sm:text-left"}><Text className={"sm:hidden font-bold text-center"} text={text.labelData_Avaliacao} />{`${Data_Avaliacao}`}</div>

                    <Button title={"Exibir"} className={"w-full col-start-0 col-span-2 sm:col-start-5 sm:w-30 "} onClick={()=>goToPage(`/antropometrica/${id}/${index}`)} />
                </div>


            }):<Text className={"text-rose-700 text-center my-10 text-3xl"} type={"h2"} text={text.labelNoList}  />:
            <Text className={"text-rose-700 text-center my-10 text-3xl"} type={"h2"} text={text.labelNoList}  />}</>
            
            <button title='Adicionar Avaliação' className={`absolute top-3 right-6`}>{<FaPlusCircle className={"text-3xl text-blue-500 hover:text-blue-800 h-10 w-10"} onClick={()=>goToPage(`/cadastroantropometrica/${id}`)}/>}</button>


        </div>
    </div>


}


export default ListaAvAntropometrica