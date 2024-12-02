import { createTaskHandler } from "../handlers/createTask.handler";
import { FastifyRequest, FastifyReply } from "fastify";

interface CreateTaskRequestBody {
    title: string;
    description: string;
}

export const createTask = async (request: FastifyRequest<{ Body: CreateTaskRequestBody }>, reply: FastifyReply) => {
    const { title, description } = request.body;

    if (!title || !description) {
        reply.code(400).send({ error: 'Title is required' });
        return;
      }

    const task = createTaskHandler.create({ title, description });

    reply.code(201).send(task);
}