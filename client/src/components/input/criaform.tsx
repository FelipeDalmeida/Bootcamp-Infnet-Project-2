
const CriaForm =({inputs,className}:any)=>{  //spamar input

  className=`m-8 grid gap-4 ${className}`
    // return <div className="m-10 grid grid-cols-4 gap-4">
    //   {inputs.map((input:MessageProps)=>{
    //         return <Input label={input.label}
    //         type={input.type}
    //         name={input.name}
    //         id={input.id} 
    //         placeholder={input.placeholder} 
    //         onChange={input.onChange} 
    //         value={input.value} 
    //         className={input.className} 
    //         error={input.error}/>;

       
    // })}
    // </div>
    return <div className={className}>
    {inputs.map((input:any)=>{
          return input;

     
  })}
  </div>

}

export default CriaForm