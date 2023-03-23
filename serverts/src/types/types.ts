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
    Massa: string | number;
    IMC: string | number;
    Gordura_Corporal: string | number;
    Gordura_Visceral: string | number;
    Metabolismo_Basal: string | number;
    Musculos_Esqueleticos: string | number;
    Idade_Corporal: string | number;
    Data_Avaliacao?:string|Date;

}

export type Antropometrica = {
    estatura?: string | number;
    comprimento_pe?: string | number;
    altura_ombro?: string | number;
    largura_ombro?: string | number;
    envergadura?: string | number;
    altura_quadril?: string | number;
    largura_quadril?: string | number;
    altura_joelho?: string | number;
    altura_tornozelo?: string | number;
    data_avaliacao?:string|Date;
}

