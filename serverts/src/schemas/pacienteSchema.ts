import z from 'zod'

const nomeMinLength = 3;
const nomeMaxLength = 256;

const idadeMinLength = 0;
const idadeMaxLength = 100;

const sexoMinLength = 1;
const sexoMaxLength = 12;

const nascimentoMinLength = 10;
const nascimentoMaxLength = 10;

const errors = {
    nomeMinLength: (length: number) =>
        `O nome precisa ter pelo menos ${length} caracteres`,
    nomeMaxLength: (length: number) =>
        `O nome pode ter no máximo ${length} caracteres`,
    idadeMinLength: (length: number) =>
        `A idade precisa ser de pelo menos ${length} ano`,
    idadeMaxLength: (length: number) =>
        `A idade pode ser no máximo de ${length} anos`,
    sexoMinLength: (length: number) =>
        `O sexo precisa ter pelo menos ${length} caracter`,
    sexoMaxLength: (length: number) =>
        `O sexo pode ter no máximo ${length} caracteres`,
    nascimentoMinLength: () =>
        `A data de nascimento precisa estar no formado dd/mm/aaaa`,
    nascimentoMaxLength: () =>
        `A data de nascimento precisa estar no formado dd/mm/aaaa`,
};

const nome = z
    .string()
    .min(nomeMinLength, {
        message: errors.nomeMinLength(nomeMinLength)
    })
    .max(nomeMaxLength, {
        message: errors.nomeMaxLength(nomeMaxLength)
    });

const idade = z
    .string()
    .transform((value)=>Number(value))
    .refine((value)=>Number.isInteger(value) && value >=0 && value <=100)

const sexo = z
    .string()
    .min(sexoMinLength, {
        message: errors.sexoMinLength(sexoMinLength)
    })
    .max(sexoMaxLength, {
        message: errors.sexoMaxLength(sexoMaxLength)
    });
const data_nascimento = z
    .string()
    .min(nascimentoMinLength, {
        message: errors.nascimentoMinLength()
    })
    .max(nascimentoMaxLength, {
        message: errors.nascimentoMaxLength()
    });

const email =z
    .string()
//TODO: Criar Regex
const celular = z
.string()
//TODO: Criar Regex
const cpf =z.string()

export const pacienteSchema=z.object({
    nome,
    idade,
    sexo,
    data_nascimento,
    email,
    celular,
    cpf
})