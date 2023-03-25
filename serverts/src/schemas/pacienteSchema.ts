import z from 'zod'

const nomeMinLength = 3;
const nomeMaxLength = 256;

const idadeMinLength = 0;
const idadeMaxLength = 100;

const CPFlen = 11;

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
    sexoType: () =>
        `Sexo inserido inválido`,
    nascimentoMinLength: () =>
        `A data de nascimento precisa estar no formado dd/mm/aaaa`,
    nascimentoMaxLength: () =>
        `A data de nascimento precisa estar no formado dd/mm/aaaa`,
    cpfLen: () => 
        "CPF inválido"
    
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
    .transform((value) => Number(value))
    .refine((value) => Number.isInteger(value) && value >= 0 && value <= 100)

const sexo = z
    .string()
    .regex(/^(Feminino|Masculino)$/, {
        message: errors.sexoType()
    })

const data_nascimento = z
    .string()
    .min(nascimentoMinLength, {
        message: errors.nascimentoMinLength()
    })
    .max(nascimentoMaxLength, {
        message: errors.nascimentoMaxLength()
    });

const email = z
    .string()
//TODO: Criar Regex
const celular = z
    .string()
//TODO: Criar Regex

const cpf = z
    .string()
    .min(CPFlen, {
        message: errors.cpfLen()
    })
    .max(CPFlen, {
        message: errors.cpfLen()
    });

export const pacienteSchema = z.object({
    nome,
    idade,
    sexo,
    data_nascimento,
    email,
    celular,
    cpf
})