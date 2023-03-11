import Button from '../button/button';
import { useAxios } from '../../service/useAxios'
import type { CompCorp } from '../../types/types';
import Text from '../text/text';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';

const ListaCompCorp = ({ }) => {
 
    const navigate=useNavigate();
    const goToPage=(page:string)=>{navigate(page)}
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
        labelData_Avaliacao:"Data",
        labelTitle:"Avaliação de Composição Corporal",
        labelNoList:"Sem avaliações cadastradas",
        labelButtonCadastrar:"Cadastar Avaliação"
    }

    const [{ data: listaAvCompCorp },setAvCompCorp] = useAxios<CompCorp[]>({
        url: `/compcorp/all/${id}`,
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

                <div className={"self-center hidden sm:block"}><Text className={"font-bold"} text={text.labelMassa} /></div>
                <div className={"self-center hidden sm:block"}><Text className={"font-bold"} text={text.labelGordura_Corporal} /></div>
                <div className={"self-center hidden sm:block"}><Text className={"font-bold"} text={text.labelMusculos_Esqueleticos} /></div>
                <div className={"self-center hidden sm:block"}><Text className={"font-bold"} text={text.labelData_Avaliacao} /></div>
                <div className={"self-center hidden sm:block"}></div>
            </div>

            <>{listaAvCompCorp?(listaAvCompCorp?.length>0)?listaAvCompCorp.map(({ 
                Massa,
                IMC,
                Gordura_Corporal, 
                Gordura_Visceral, 
                Metabolismo_Basal, 
                Musculos_Esqueleticos, 
                Idade_Corporal, 
                Data_Avaliacao }: CompCorp,index:number) => {
           
                

                return <div className={" border-b  border-b-blue-400  px-10 grid grid-cols-2 sm:grid-cols-5  gap-0 "} key={index}>
                    <div className={"self-center"}><Text className={"sm:hidden font-bold"} text={text.labelMassa} /><Text text={`${Massa} Kg`} /></div>
                    <div className={"self-center"}><Text className={"sm:hidden font-bold"} text={text.labelGordura_Corporal} /><Text text={`${Gordura_Corporal} %`} /></div>
                    <div className={"self-center"}><Text className={"sm:hidden font-bold"} text={text.labelMusculos_Esqueleticos} />{`${Musculos_Esqueleticos} %`}</div>
                    <div className={"self-center"}><Text className={"sm:hidden font-bold"} text={text.labelData_Avaliacao} />{`${Data_Avaliacao}`}</div>
                    <Button title={"Exibir"} className={"w-full col-start-0 col-span-2 sm:col-start-5 sm:w-30"} onClick={()=>goToPage(`/compcorp/${id}/${index}`)} />
                </div>


            }):<Text className={"text-rose-700 text-center my-10 text-3xl"} type={"h2"} text={text.labelNoList}  />:
            <Text className={"text-rose-700 text-center my-10 text-3xl"} type={"h2"} text={text.labelNoList}  />}</>
            
            <button title='Adicionar Avaliação' className={`absolute top-3 right-6`}>{<FaPlusCircle className={"text-3xl text-blue-500 hover:text-blue-800 h-10 w-10"} onClick={()=>goToPage(`/cadastrocompcorp/${id}`)}/>}</button>


        </div>
    </div>


}


export default ListaCompCorp