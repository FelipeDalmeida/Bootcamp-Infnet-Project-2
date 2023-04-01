import z from 'zod'


export const avAntropometricaSchema = z.object({
    // paciente_id:z
    // .string()
    // .transform((value) => Number(value)),

    estatura:z
    .string()
    .transform((value) => Number(value))
    .refine((value) => Number.isInteger(value) && value >= 0 && value <= 250),

    comprimento_pe:z
    .string()
    .transform((value) => Number(value))
    .refine((value) => Number.isInteger(value) && value >= 0 && value <= 50),

    altura_ombro:z
    .string()
    .transform((value) => Number(value))
    .refine((value) => Number.isInteger(value) && value >= 0 && value <= 200),

    largura_ombro:z
    .string()
    .transform((value) => Number(value))
    .refine((value) => Number.isInteger(value) && value >= 0 && value <= 200),

    envergadura:z
    .string()
    .transform((value) => Number(value))
    .refine((value) => Number.isInteger(value) && value >= 0 && value <= 300),

    altura_quadril:z
    .string()
    .transform((value) => Number(value))
    .refine((value) => Number.isInteger(value) && value >= 0 && value <= 200),

    largura_quadril:z
    .string()
    .transform((value) => Number(value))
    .refine((value) => Number.isInteger(value) && value >= 0 && value <= 200),

    altura_joelho:z
    .string()
    .transform((value) => Number(value))
    .refine((value) => Number.isInteger(value) && value >= 0 && value <= 200),

    altura_tornozelo:z
    .string()
    .transform((value) => Number(value))
    .refine((value) => Number.isInteger(value) && value >= 0 && value <= 200),
    
})