import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { FaEye,FaEyeSlash } from "react-icons/fa";


interface MessageProps {
    label: string;
    type?:string;
    name?:string;
    id?:string;
    placeholder?:string;
    labelClassName?:string;
    onChange?: (e:any) => void;
    value?:string|number;
    className?:string;
    error?:string;
    disabled?:boolean
  }

const Input =({label,type,name,id,placeholder,onChange,value,className,error,disabled}:MessageProps)=>{
    
  const [hover,setHover]=useState(false)  
  const [showPassorwd,setShowPassword]=useState(false)
  const [isActive,setIsActive]=useState(false)
  const changePasswordVisibility=()=>setShowPassword(!showPassorwd);



  className=`${className} m-2`

  

    return <div className={className} onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}} onFocus={()=>{setIsActive(true)}} onBlur={()=>{setIsActive(false)}} >
    
   
    
    <div className="relative" >
    <span className={(value || isActive || hover)?'bottom-8 pl-3 absolute':"pl-3 bottom-2.5 absolute"}><label htmlFor="price" className="font-semibold bg-white border-0 rounded-2xl px-2" >
    {label}
    </label>
    </span>
      <input
        type={'password'?(showPassorwd?'text':type):type}
        name={name}
        id={id}
        className={`block w-full border rounded-xl p-2 focus-visible:outline-none border-slate-400 focus:border-sky-600 focus:border-2 ${error?"border-2 border-rose-600 focus:border-rose-600 focus:border-rose-600":""}`}
        placeholder={placeholder?placeholder:""}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    <button className="absolute right-3 bottom-3 text-xl" onClick={changePasswordVisibility}>{type==='password'?(showPassorwd?<FaEyeSlash/>:<FaEye/>):null}</button>
    </div>
    <p className="pl-2 text-rose-600">{error?error:""}</p>
  </div>
}

Input.propTypes={
  type: PropTypes.string,
  label:PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  className:PropTypes.string,
  value:PropTypes.string,
  error:PropTypes.string,
  disabled:PropTypes.bool
}

Input.defaultProps={
  type:"text",
  label:"",
  id:"",
  name:"",
  onChange:null,
  value:null,
  className:"",
  error:"",
  disabled:false,
}


export default Input

