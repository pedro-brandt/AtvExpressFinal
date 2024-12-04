export const resolveIndexByUsuarioId = (request, response, next) => {
    const {
        params: {id},
    } = request;
    const parsedId = parseInt(Id);
    if (isNaN(parsedId)) return response.sendStatus(400);
    const findUsuarioIndex = mockUsuario.findIndex((usuario) => usuario.id === parsedId);
    if (findUsuarioIndex === -1) return response.sendStatus(404);
    request.findUsuarioIndex = findUsuarioIndex;
    next();
}