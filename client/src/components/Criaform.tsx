const CriaForm = ({ inputs, className }: any) => {  //spamar input

  className = `m-8 grid gap-4 ${className}`

  return <div className={className}>
    {inputs.map((input: any) => {
      return input;


    })}
  </div>

}

export default CriaForm