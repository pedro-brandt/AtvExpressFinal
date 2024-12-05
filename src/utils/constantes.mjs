export const mockUsuario = [

];
export const createUsuarioValidationSchema = {
    nome: {
        isString: true,
        notEmpty: true,
        errorMessage: "error:nome nao está em string",
    },
    apelido: {
        isString: true,
        notEmpty: true,
        errorMessage: "error:apelido nao está em string",
    },
};

