import { FastifyInstance } from "fastify";
import { createTask } from "../controllers/createTask.controller";
import { listTask } from "../controllers/listTask.controller";
import { updateTask } from "../controllers/updateTask.controller";

export const taskRoutes = (app: FastifyInstance) => {
    app.post('/', createTask);
    app.get('/', listTask);
    app.put('/:id', updateTask);
}