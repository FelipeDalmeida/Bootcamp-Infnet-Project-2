import PropTypes from 'prop-types'
import { IconType } from 'react-icons/lib';
interface MessageProps {
    title: string;
    type?:'submit' | 'reset' | 'button' | undefined;
    onClick?: (e:any) => void;
    className?:string;
    fullwidth?:boolean;

  }

const Button =({title,type,onClick,className,fullwidth}:MessageProps)=>{

    className=`p-1 m-1 w-36 font-bold text-white bg-blue-500 border border-blue-500 rounded-xl hover:border-blue-800 hover:bg-blue-800 ${className}`
    fullwidth?className=`${className} w-full`:className=className


    return <button type={type} className={className} onClick={onClick}>{title.toUpperCase()}</button>
}

Button.propTypes={
    type: PropTypes.string,
    title:PropTypes.string,
    onClick: PropTypes.func,
    className:PropTypes.string,
    fullwidth:PropTypes.bool,
  }
  
Button.defaultProps={
    type:"button",
    title:"Button",
    onClick:null,
    className:"",
    fullwidth:false,
  }

export default Button