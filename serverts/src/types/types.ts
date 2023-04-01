export type Pacientes = {
    id?:number;
    nome:string;
    idade:number;
    sexo:string;
    email:string;
    cpf:string;
    celular:string;
    data_nascimento:string;
    data_cadastro?:string | Date;
}

export type CompCorp = {
    id?:number|string;
    paciente_id?:number|string;
    massa: number |string;
    imc: number|string;
    gordura_corporal: number|string;
    gordura_visceral: number|string;
    metabolismo_basal: number|string;
    musculos_esqueleticos: number|string;
    idade_corporal: number|string;
    data_avaliacao?:string;

}

export type Antropometrica = {
    id?:number|string;
    paciente_id?:number|string;
    estatura?: number|string;
    comprimento_pe?: number|string;
    altura_ombro?: number|string;
    largura_ombro?: number|string;
    envergadura?: number|string;
    altura_quadril?: number|string;
    largura_quadril?: number|string;
    altura_joelho?: number|string;
    altura_tornozelo?: number|string;
    data_avaliacao?:string;
}

