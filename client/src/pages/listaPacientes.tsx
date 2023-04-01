import Button from '../components/Button';
import { useAxios } from '../service/useAxios'
import { Pacientes } from '../types/types';
import Text from '../components/Text';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaTools } from 'react-icons/fa';
import Input from '../components/Input';
import Search from '../components/Search';
import Tools from '../components/Tools';
import Select from '../components/Select';
import ArrowSearch from '../components/ArrowSearch';




const text = {
    id: "Matrícula",
    title: "Pacientes",
    Nome: "Nome",
    Idade: "Idade",
    Sexo: "Sexo",
    Cadastro: "Data de Cadastro",
    semPacientes: "Sem pacientes cadastrados",
    btnNext: `Próximo `,
    btnPrevious: "Anterior",
    search: "Buscar Paciente",
    tools: "Configurações de pesquisa",
    orderby: "Ordenar por",
    limit: "Quantidade",
    changeConfig: "Salvar",
    direction: "Direção"
}

const ListaPacientes = ({ }) => {

    const navigate = useNavigate();
    const goToPage = (page: string) => { navigate(page) }

    const [openModal, setOpenModal] = useState(false)


    const [pacientesParams, setPacientesParams] = useState({
        offset: 0,
        limit: 5,
        search: "",
        orderby: "id",
        direction: "asc"
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




    const buscaPaciente = async () => {
        setPacientesParams({...pacientesParams,offset:0})
        await getPacientes({
            params: {...pacientesParams,offset:0}
        })

        if ((Number(pacientesParams.limit)) >= Number(pacientesCount)) {
            isBtnDisabled({
                btnNext: true,
                btnPrevious: true,
            })
        } else if (Number(pacientesParams.limit) < Number(pacientesCount)) {
            isBtnDisabled({
                btnPrevious: true,
                btnNext: false,
            })
        }
        console.log(pacientesCount)
    }

    const setParams = async()=>{
        await getPacientes({
            params: pacientesParams,
        })
        if (pacientesParams.limit >= Number(pacientesCount)) {
            isBtnDisabled({
                btnNext: true,
                btnPrevious: true,
            })
        } else if (pacientesParams.limit < Number(pacientesCount)) {
            isBtnDisabled({
                ...btnDisable,
                btnNext: false,
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
            } else if (pacientesParams.limit <= Number(res.data.count)) {
                isBtnDisabled({
                    ...btnDisable,
                    btnNext: false,
                })
            }

        })


    }, [])


    return <div className={"h-full p-2 grid grid-cols-12 gap-4 "}>

        <div className={"relative md:my-10 md:pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 xxl:col-start-4 xxl:col-span-6"}>
            <Text className={"text-center my-10 text-4xl"} type={"h1"} text={text.title} />
            <Tools
                openModal={openModal}
                setOpenModal={setOpenModal}
                modalTitle={text.tools}
                content={
                    <div className={"grid grid-cols-12 gap-4"}>
                        <Select
                            value={pacientesParams.orderby}
                            onChange={(e) => { setPacientesParams({ ...pacientesParams, orderby: e.target.value }) }}
                            className={"col-span-12 md:col-span-6"}
                            label={text.orderby}
                            options={
                                [
                                    <option value={"nome"}>Nome</option>,
                                    <option value={"data_cadastro"}>Cadastro</option>,
                                    <option value={"id"}>Matrícula</option>
                                ]
                            }
                        />
                        <Select
                            value={pacientesParams.limit}
                            onChange={(e) => { setPacientesParams({ ...pacientesParams, limit: Number(e.target.value) }) }}
                            className={"col-span-12 md:col-span-6"}
                            label={text.limit}
                            options={
                                [
                                    <option value={5}>5</option>,
                                    <option value={10}>10</option>,
                                    <option value={15}>15</option>,
                                    <option value={20}>20</option>,
                                    <option value={25}>25</option>
                                ]
                            }
                        />
                        <Select
                            value={pacientesParams.direction}
                            onChange={(e) => { setPacientesParams({ ...pacientesParams, direction: e.target.value }) }}
                            className={"col-span-12 md:col-span-6"}
                            label={text.direction}
                            options={
                                [
                                    <option value={"asc"}>Ascendente</option>,
                                    <option value={"desc"}>Descendente</option>
                                ]
                            }
                        />
                    </div>}
                lowerContent={
                    <Button title={text.changeConfig} onClick={() => { setParams(); setOpenModal(false) }} />
                }
            />
            <Search label={text.search}
                classNameComponent={"sm:absolute sm:top-10 sm:right-10"}
                value={pacientesParams.search}
                onChange={(e) => setPacientesParams({ ...pacientesParams, search: e.target.value })}
                onClick={() => buscaPaciente()}
            />
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
                <ArrowSearch
                    btnDisableNext={btnDisable.btnNext}
                    btnDisablePrev={btnDisable.btnPrevious}
                    isBtnDisabled={isBtnDisabled}
                    Params={pacientesParams}
                    setParams={setPacientesParams}
                    count={pacientesCount}
                    get={getPacientes}
                />
                : ""}


        </div>
    </div>


}


export default ListaPacientes