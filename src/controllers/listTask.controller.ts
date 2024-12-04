import { listTaskHandler } from "../handlers/listTask.handler";
import { Task } from "../@types/task";
import { FastifyRequest, FastifyReply } from "fastify";

interface ListTaskResponseBody {
    tasks: Task[];
}

export const listTask = async (request: FastifyRequest, reply: FastifyReply) => {
    
    try {
        const tasks = listTaskHandler.list();

        if ((tasks.length === 0)) {
            reply.code(404).send({ error: 'No tasks found' });
            return;
        }
        
        reply.code(200).send({ tasks });
    } catch (error) {
        if (error instanceof Error) {
            reply.code(500).send({ error: error.message });
       }
    }
}