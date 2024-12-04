import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { mockUsuario } from "../utils/constantes.mjs";
import { createUsuarioValidationSchema} from "../utils/constantes.mjs";
import { resolveIndexByUsuarioId } from "../utils/middleweres.mjs";

const router = Router();

router.get(
"/api/usuario",
query("filter")
.isString()
.notEmpty()
.isLength({ min: 2, max:3 })
.withMessage('tem de estar entre 2 a 3'),
 (request, response) => {
    const result = validationResult(request)
    console.log(result);
const { 
    query: {filter, value}, 
} = request;
if (filter && value) 
    return response.send(
        mockUsuario.filter((user) => usuario[filter].includes(value))
    );
return response.send(mockUsuario);
}
);

router.get(
    "/api/usuario/:id", resolveIndexByUsuarioId, (request, response) => {
    const { findUsuarioIndex } = request;
    const findUsuario = mockUsuario[findUsuarioIndex]
   if (!findUsuario) return response.sendDtatus(404);
   return response.send(findUsuario);
}
)

router.post(
    "/api/usuario", checkSchema(createUsuarioValidationSchema), (request, response) => {
        const result = validationResult(result);
        console.log(result);
        
        if (!result.isEmpty())
            return response.status(400).send({errors: result.array()})
        const data = matchedData(request);
    const newUsuario = { id: mockUsuario[mockUsuario.length - 1].id + 1, ...data};
    mockUsuario.push(newUsuario);
    return response.status(201).send(newUsuario);
}
);

router.put("/api/usuario/:id", resolveIndexByUsuarioId, (request, response) => {
    const {body, findUsuarioIndex} = request;
mockUsuario[findUsuarioIndex] = {id: mockUsuario[findUsuarioIndex].id, ...body};
return response.sendStatus(200);
})

router.patch("/api/usuario:id", resolveIndexByUsuarioId, (request, response) => {
    const {
        body,
    } = request;
    mockUsuario[findUsuarioIndex] = { ...mockUsuario[findUsuarioIndex] ...body};
    return response.sendStatus(200);
})  

router.delete("/api/usuario:id", resolveIndexByUsuarioId, (request, response) => {
    const {findUsuarioIndex} = request;
        mockUsuario.splice(findUsuarioIndex, 1);
        return response.sendStatus(200);
})


export default router;