import {z} from 'zod'

export const pacientesLoadManySchema=z.object({
    direction:z
    .string()
    .toLowerCase()
    .regex(/^(asc|desc)$/)
    .optional(),

    orderby:z
    .string()
    .toLowerCase()
    .regex(/^(id|data_cadastro|nome)$/)
    .optional(),

    limit:z
    .string()
    .transform((value)=>Number(value))
    .refine((value)=>Number.isInteger(value) && value >=0 && value <=25)
    .optional(),
    

    offset:z
    .string()
    .transform((value)=>Number(value))
    .refine((value)=>Number.isInteger(value) && value >=0)
    .optional(),

    
    search: z
    .string()
    .max(120)
    .optional(),
})

export const exameLoadManySchema=z.object({
    direction:z
    .string()
    .toLowerCase()
    .regex(/^(asc|desc)$/)
    .optional(),

    orderby:z
    .string()
    .toLowerCase()
    .regex(/^(id|data_avaliacao)$/)
    .optional(),

    limit:z
    .string()
    .transform((value)=>Number(value))
    .refine((value)=>Number.isInteger(value) && value >=0 && value <=25)
    .optional(),
    

    offset:z
    .string()
    .transform((value)=>Number(value))
    .refine((value)=>Number.isInteger(value) && value >=0)
    .optional(),
    
})
