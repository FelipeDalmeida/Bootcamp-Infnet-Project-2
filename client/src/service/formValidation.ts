import { SafeParseError } from "zod"


export const setFormErrorsValid = (validForm: SafeParseError<any>, errors: any,setErrors:(e:any)=>void, errorsInitial:any) => { //função para validar os campos do formulário e setar os erros
    const errors_form = validForm.error.errors
    const keys = Object.keys(errors)
    const errorsModel: any = errorsInitial

    errors_form.map(error => {
        keys.map(key => {
            if (error.path[0] == key) {
                errorsModel[key] = error.message

                setErrors({ ...errors, ...errorsModel })

            }
        })
    })
}