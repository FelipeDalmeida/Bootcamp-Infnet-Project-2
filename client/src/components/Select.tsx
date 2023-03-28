interface SelectProps {
  label: string;
  type?: string;
  name?: string;
  id?: string;
  onChange?: (e: any) => void;
  value?: string | number;
  className?: string;
  disabled?: boolean;
  options: any;
}

const Select = ({ label, name, id, options, onChange, value, className, disabled }: SelectProps) => {




  className = `${className} m-2`



  return <div className={`${className} m-2 relative`}>
    <span className={value ? 'bottom-8 pl-3 absolute' : "pl-3 bottom-2.5 absolute"}><label className="relative z-10 font-semibold bg-white border-0 rounded-2xl px-2" >
      {label}
    </label>
    </span>
    <select
      name={name}
      id={id}
      className={`block w-full border rounded-xl p-2 focus-visible:outline-none border-slate-400 focus:border-sky-600 focus:border-2 [&>*]:rounded-xl [&>*]:p-2`}
      onChange={onChange}
      disabled={disabled}
      value={value}
    >
      {options.map((option: any) => {
        return option
      })}
    </select>
  </div>
}

export default Select