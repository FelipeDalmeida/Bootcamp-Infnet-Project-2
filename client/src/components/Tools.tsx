import { useState } from "react"
import { FaTools } from "react-icons/fa"
import Button from "./Button"
import Modal from "./Modal"
import Select from "./Select";

interface ToolsProps {
    modalTitle?:string;
    content?:any;
    lowerContent?:any;
    openModal:boolean;
    setOpenModal:any;
}




const Tools = ({modalTitle,content,lowerContent,openModal,setOpenModal}:ToolsProps) => {



    

    return <>
        <Button
            title={""}
            className={"absolute top-2 left-6 w-9"}
            onClick={() => setOpenModal(!openModal)}
            iconBack={<FaTools className={"text-2xl text-white-500 "} 
            />}
        />
        <Modal 
        open={openModal} 
        setOpen={setOpenModal} 
        title={modalTitle}
        content={content}
        lowerContent={lowerContent}
        />
    </>
}

export default Tools