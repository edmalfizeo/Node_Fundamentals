import { FastifyInstance } from "fastify";
import { createTask } from "../controllers/createTask.controller";
import { listTask } from "../controllers/listTask.controller";

export const taskRoutes = (app: FastifyInstance) => {
    app.post('/', createTask);
    app.get('/', listTask);
}