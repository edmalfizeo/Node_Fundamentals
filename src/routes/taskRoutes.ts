import { FastifyInstance } from "fastify";
import { createTask } from "../controllers/create_task";

export const taskRoutes = (app: FastifyInstance) => {
    app.post('/', createTask);
}