export const mockUsuario = [
    { id: 1, nome: "pedro", apelido: "Pedro" },
    { id: 2, nome: "luiz", apelido: "Luiz" },
    { id: 3, nome: "maria", apelido: "Ma" }
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

