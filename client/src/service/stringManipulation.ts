export const criaNome=(email:string)=>{
    const posicao=email.indexOf("@")
    const nome=email.substring(0,posicao)
    return nome
}