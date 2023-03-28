import Button from '../components/Button';
import { useAxios } from '../service/useAxios'
import { Pacientes } from '../types/types';
import Text from '../components/Text';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';


//TODO:Implementar busca e alterar limite

const text = {
    id: "Matrícula",
    title: "Pacientes",
    Nome: "Nome",
    Idade: "Idade",
    Sexo: "Sexo",
    Cadastro: "Data de Cadastro",
    semPacientes: "Sem pacientes cadastrados",
    btnNext: `Próximo `,
    btnPrevious: "Anterior"
}

const ListaPacientes = ({ }) => {

    const navigate = useNavigate();
    const goToPage = (page: string) => { navigate(page) }




    const [pacientesParams, setPacientesParams] = useState({
        offset: 0,
        limit: 5,
    })

    const [btnDisable, isBtnDisabled] = useState({
        btnNext: false,
        btnPrevious: true,
    })

    const [
        {
            data: { count: pacientesCount, pacientes: listaPacientes } = {
                count: 0,
                pacientes: []
            }
        }
        , getPacientes] = useAxios<{ count: number; pacientes: Pacientes[]; }>(
            {
                url: "/pacientes",
                method: "get",
            },
            {
                manual: true,
            });


    const nextPacientes = async () => {
        let params = { ...pacientesParams }
        const nextOffset = pacientesParams.offset + pacientesParams.limit;

        if (nextOffset < pacientesCount) {
            params = {
                ...pacientesParams,
                offset: nextOffset,
            }
            isBtnDisabled({
                btnNext: false,
                btnPrevious: false,
            })
        } else {
            isBtnDisabled({
                btnNext: true,
                btnPrevious: false,
            })
        }

        setPacientesParams(params)
        console.log(params)
        await getPacientes({
            params: params,
        })

        if (nextOffset + params.limit >= pacientesCount) {
            isBtnDisabled({
                btnNext: true,
                btnPrevious: false,
            })
        }
    }

    const previousPacientes = async () => {
        let params = {
            ...pacientesParams,
        }
        const nextOffset = pacientesParams.offset - pacientesParams.limit;



        if (nextOffset >= 0) {
            params = {
                ...pacientesParams,
                offset: nextOffset,
            }
            isBtnDisabled({
                btnNext: false,
                btnPrevious: false,
            })

        } else {
            isBtnDisabled({
                btnNext: false,
                btnPrevious: true,
            })
        }


        setPacientesParams(params)

        await getPacientes({
            params: params,
        })

        if (nextOffset <= 0) {
            isBtnDisabled({
                btnNext: false,
                btnPrevious: true,
            })
        }

    }


    useEffect(() => {
        getPacientes({
            params: pacientesParams,
        }).then((res) => {
            if (pacientesParams.limit >= Number(res.data.count)) {
                isBtnDisabled({
                    btnNext: true,
                    btnPrevious: true,
                })
            }

        })


    }, [])

    return <div className={"h-full p-2 grid grid-cols-12 gap-4 "}>

        <div className={"relative my-10 py-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 xxl:col-start-4 xxl:col-span-6"}>
            <Text className={"text-center mb-10 text-4xl"} type={"h1"} text={text.title} />
            <div className={"border-b  border-b-blue-400 px-10 grid grid-cols-2 sm:grid-cols-5  gap-0"}>
                {listaPacientes?.length > 0 ? <>
                    <div className={"self-center hidden sm:block"}><Text className={"font-bold"} text={text.Nome} /></div>
                    <div className={"self-center hidden sm:block"}><Text className={"font-bold"} text={text.Idade} /></div>
                    <div className={"self-center hidden sm:block"}><Text className={"font-bold"} text={text.Sexo} /></div>
                    <div className={"self-center hidden sm:block"}><Text className={"font-bold"} text={text.Cadastro} /></div>
                    <div className={"self-center hidden sm:block"}></div>
                </>
                    : ""}
            </div>

            <>{listaPacientes ? (listaPacientes?.length > 0) ? listaPacientes.map(({ id, nome, idade, sexo, data_cadastro }: Pacientes) => {

                return <div className={" border-b  border-b-blue-400  px-10 grid grid-cols-2 sm:grid-cols-5  gap-0 "} key={id}>
                    <div className={"self-center"}><Text className={"sm:hidden font-bold"} text={`${text.Nome}:`} /><Text text={`${nome}`} /></div>
                    <div className={"self-center"}><Text className={"sm:hidden font-bold"} text={`${text.Idade}:`} /><Text text={`${idade}`} /></div>
                    <div className={"self-center"}><Text className={"sm:hidden font-bold"} text={`${text.Sexo}:`} />{`${sexo}`}</div>
                    <div className={"self-center"}><Text className={"sm:hidden font-bold"} text={`${text.Cadastro}:`} />{`${data_cadastro}`}</div>
                    <Button title={"Exibir"} className={"w-full col-start-0 col-span-2 sm:col-start-5 sm:w-30"} onClick={() => goToPage(`/pacientes/${id}`)} />
                </div>


            })

                : <Text className={"text-rose-700 text-center my-10 text-3xl"} type={"h2"} text={text.semPacientes} /> :
                <Text className={"text-rose-700 text-center my-10 text-3xl"} type={"h2"} text={text.semPacientes} />}</>

            {(listaPacientes?.length > 0) ?
                <div className={"text-center mt-5"} >
                    <Button title={""} iconBack={<FaAngleDoubleLeft className={"text-2xl"} />} onClick={async () => previousPacientes()} disabled={btnDisable.btnPrevious} className={btnDisable.btnPrevious ? "bg-gray-500 border-gray-500 hover:bg-gray-500 hover:border-gray-500 " : ""} />
                    <Button title={""} iconFront={<FaAngleDoubleRight className={"text-2xl"} />} onClick={async () => nextPacientes()} disabled={btnDisable.btnNext} className={btnDisable.btnNext ? "bg-gray-500 border-gray-500 hover:bg-gray-500 hover:border-gray-500 " : ""} />
                </div>
                : ""}


        </div>
    </div>


}


export default ListaPacientes