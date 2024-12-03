import { updateTaskHandler } from "../handlers/updateTask.handler";
import { FastifyRequest, FastifyReply } from "fastify";
import { Task } from "../@types/task";

interface UpdateTaskParams {
    id: string;
  }
  
interface UpdateTaskBody {
    title: string;
    description: string;
}

export const updateTask = async (request: FastifyRequest<{ Params: UpdateTaskParams; Body: UpdateTaskBody }>, reply: FastifyReply) => {
    const { title, description } = request.body;
    const { id } = request.params;
  
    if (!title || !description) {
      reply.code(400).send({ error: 'All informations are required for updating the task' });
      return;
    }
  
    try {
      const task = updateTaskHandler.update(id, { title, description });

      reply.code(200).send(task);
  } catch (error) {
    if (error instanceof Error) {      
      reply.code(404).send({ error: error.message });
  }
};
  };