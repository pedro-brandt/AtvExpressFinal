"/api/usuario/:id", resolveIndexByUsuarioId, (request, response) => {
    const { findUsuarioIndex } = request;
    const findUsuario = mockUsuario[findUsuarioIndex]
   if (!findUsuario) return response.sendDtatus(404);
   return response.send(findUsuario);
}