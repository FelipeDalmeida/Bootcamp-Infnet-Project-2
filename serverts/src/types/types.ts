export type Pacientes = {
    id?:number;
    nome:string;
    sobrenome:string;
    idade:number;
    sexo:string;
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
    Estatura?: string | number;
    Comprimento_Pe?: string | number;
    Altura_Ombro?: string | number;
    Largura_Ombro?: string | number;
    Envergadura?: string | number;
    Altura_Quadril?: string | number;
    Largura_Quadril?: string | number;
    Altura_Joelho?: string | number;
    Altura_Tornozelo?: string | number;
    Data_Avaliacao?:string|Date;
}

