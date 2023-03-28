interface ButtonProps {
  title: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClick?: (e: any) => void;
  className?: string;
  fullwidth?: boolean;
  iconBack?: JSX.Element;
  iconFront?: JSX.Element;
  disabled?: boolean;
}

const Button = ({ title, type, onClick, className, fullwidth, iconBack, iconFront, disabled }: ButtonProps) => {

  className = `p-1 m-1 w-36 font-bold text-white bg-blue-500 border border-blue-500 rounded-xl hover:border-blue-800 hover:bg-blue-800 [&>*]:inline  ${className}`
  fullwidth ? className = `${className} w-full` : className = className


  return <button disabled={disabled} type={type} className={className} onClick={onClick}>{iconBack}{title.toUpperCase()}{iconFront}</button>
}


Button.defaultProps = {
  type: "button",
  title: "Button",
  onClick: null,
  className: "",
  fullwidth: false,
  disabled: false,
}

export default Button