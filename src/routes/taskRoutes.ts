import { FastifyInstance } from "fastify";
import { createTask } from "../controllers/createTask.controller";
import { listTask } from "../controllers/listTask.controller";
import { updateTask } from "../controllers/updateTask.controller";
import { completeTask } from "../controllers/completeTask.controller";

export const taskRoutes = (app: FastifyInstance) => {
    app.post('/', createTask);
    app.get('/', listTask);
    app.put('/:id', updateTask);
    app.put('/:id/complete', completeTask);
}