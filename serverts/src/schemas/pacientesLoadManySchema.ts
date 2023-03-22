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
    .regex(/^(id|data_cadastro)$/)
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