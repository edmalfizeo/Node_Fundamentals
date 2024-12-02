import { FastifyInstance } from "fastify";
import { createTask } from "../controllers/createTask.controller";

export const taskRoutes = (app: FastifyInstance) => {
    app.post('/', createTask);
}