import { createTaskHandler } from "../handlers/createTask.handler";
import { FastifyRequest, FastifyReply } from "fastify";

interface CreateTaskRequestBody {
    title: string;
    description: string;
}

export const createTask = async (request: FastifyRequest<{ Body: CreateTaskRequestBody }>, reply: FastifyReply) => {
    const { title, description } = request.body;

    if (!title || !description) {
        reply.code(400).send({ error: 'All information are required (title and description)' });
        return;
      }

      try {
        const task = createTaskHandler.create({ title, description });

        reply.code(201).send(task);
      } catch (error) {
        if (error instanceof Error) {
          reply.code(500).send({ error: error.message });
        }
      }
    
}