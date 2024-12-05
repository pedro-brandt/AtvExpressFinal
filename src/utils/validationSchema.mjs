import { isColString } from "sequelize/lib/utils";

export const createUserValidationSchema = {
    nome: {
        isLenght: {
            Option:{
                min: 4,
                max: 30,
            },
            errorMessage:
                "o nome deve ter entre 4 a 30",
        },
        notEmpty: {
            errorMessage: "nome nao deve estar vazio",
        },
        isString: {
            errorMessage: "nome tem de ser String",
        },
    },
    displayNme: {
        notEmpty: true,
    },
};