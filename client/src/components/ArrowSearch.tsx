import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"
import Button from "./Button"

interface ArrowSearchProps {
    btnDisablePrev:boolean;
    btnDisableNext:boolean;
    setParams:(e:any)=>void;
    Params:any;
    count:number;
    isBtnDisabled:(e:any)=>void;
    get:(e:any)=>void
}

const ArrowSearch = ({btnDisablePrev,btnDisableNext,Params,setParams,count,isBtnDisabled,get }:ArrowSearchProps) => {

    const next = async () => {
        
  
        let params = { ...Params }
        const nextOffset = Number(params.offset) + Number(params.limit);
        console.log(nextOffset)
        if (nextOffset < count) {
            params = {
                ...Params,
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

        setParams(params)
        console.log(params)

        await get({
            params: params,
        })

        if (nextOffset + params.limit >= count) {
            isBtnDisabled({
                btnNext: true,
                btnPrevious: false,
            })
        }
    }

    const previous = async () => {
        let params = {
            ...Params,
        }
        const nextOffset = Number(params.offset) - Number(params.limit);



        if (nextOffset >= 0) {
            params = {
                ...Params,
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


        setParams(params)

        await get({
            params: params,
        })

        if (nextOffset <= 0) {
            isBtnDisabled({
                btnNext: false,
                btnPrevious: true,
            })
        }

    }



    return <div className={"text-center mt-5"} >
        <Button title={""} iconBack={<FaAngleDoubleLeft className={"text-2xl"} />} onClick={async () => previous()} disabled={btnDisablePrev} className={btnDisablePrev ? "bg-gray-500 border-gray-500 hover:bg-gray-500 hover:border-gray-500 " : ""} />
        <Button title={""} iconFront={<FaAngleDoubleRight className={"text-2xl"} />} onClick={async () => next()} disabled={btnDisableNext} className={btnDisableNext ? "bg-gray-500 border-gray-500 hover:bg-gray-500 hover:border-gray-500 " : ""} />
    </div>
}

export default ArrowSearch