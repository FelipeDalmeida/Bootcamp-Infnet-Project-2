import z from 'zod'


export const avAntropometricaSchemaPut = z.object({
    estatura:z
    .number()
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 250),

    comprimento_pe:z
    .number()
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 50),

    altura_ombro:z
    .number()
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 200),

    largura_ombro:z
    .number()
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 200),

    envergadura:z
    .number()
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 300),

    altura_quadril:z
    .number()
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 200),

    largura_quadril:z
    .number()
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 200),

    altura_joelho:z
    .number()
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 200),

    altura_tornozelo:z
    .number()
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 200),

    data_avaliacao:z
    .string()
    .optional()
    
})

export const avAntropometricaSchema = z.object({

    estatura:z
    .string()
    .transform((value)=>Number(value))
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 250),

    comprimento_pe:z
    .string()
    .transform((value)=>Number(value))
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 50),

    altura_ombro:z
    .string()
    .transform((value)=>Number(value))
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 200),

    largura_ombro:z
    .string()
    .transform((value)=>Number(value))
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 200),

    envergadura:z
    .string()
    .transform((value)=>Number(value))
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 300),

    altura_quadril:z
    .string()
    .transform((value)=>Number(value))
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 200),

    largura_quadril:z
    .string()
    .transform((value)=>Number(value))
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 200),

    altura_joelho:z
    .string()
    .transform((value)=>Number(value))
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 200),

    altura_tornozelo:z
    .string()
    .transform((value)=>Number(value))
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 200),
    
    data_avaliacao:z
    .string()
    .optional()

});

export const compcorpSchemaPut = z.object({
    massa:z
    .number()
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 250),

    imc:z
    .number()
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 60),

    gordura_corporal:z
    .number()
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 100),

    gordura_visceral:z
    .number()
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 100),

    metabolismo_basal:z
    .number()
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 5000),

    musculos_esqueleticos:z
    .number()
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 100),

    idade_corporal:z
    .number()
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 100),

    data_avaliacao:z
    .string()
    .optional()
})

export const compcorpSchema = z.object({
    massa:z
    .string()
    .transform((value)=>Number(value))
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 250),

    imc:z
    .string()
    .transform((value)=>Number(value))
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 60),

    gordura_corporal:z
    .string()
    .transform((value)=>Number(value))
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 100),

    gordura_visceral:z
    .string()
    .transform((value)=>Number(value))
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 100),

    metabolismo_basal:z
    .string()
    .transform((value)=>Number(value))
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 5000),

    musculos_esqueleticos:z
    .string()
    .transform((value)=>Number(value))
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 100),

    idade_corporal:z
    .string()
    .transform((value)=>Number(value))
    .refine((value) => Number.isInteger(value) && value > 0 && value <= 100),

    data_avaliacao:z
    .string()
    .optional()
})