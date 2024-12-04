import { Router } from "express";

const router = Router();

router.get("/api/produtos", (request, response) => {
    response.send([{id: 123, mome: "pera", preco: 2}]);
});

export default router;