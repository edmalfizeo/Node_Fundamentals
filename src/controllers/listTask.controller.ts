import { listTaskHandler } from "../handlers/listTask.handler";
import { Task } from "../@types/task";
import { FastifyRequest, FastifyReply } from "fastify";

interface ListTaskResponseBody {
    tasks: Task[];
}

export const listTask = async (request: FastifyRequest, reply: FastifyReply) => {
    const tasks = listTaskHandler.list();

    if ((tasks.length === 0)) {
        reply.code(404).send({ error: 'No tasks found' });
        return;
    }
    
    reply.code(200).send({ tasks });
}