import { completeTaskHandler } from "../handlers/completeTask.handler";
import { FastifyRequest, FastifyReply } from "fastify";

interface CompleteTaskParams {
    id: string;
}

export const completeTask = async (request: FastifyRequest<{ Params: CompleteTaskParams }>, reply: FastifyReply) => {
    const { id } = request.params;

    try {
        completeTaskHandler.complete(id);

        reply.code(200).send({ message: 'Task completed' });
    } catch (error) {
        if (error instanceof Error) {
            reply.code(404).send({ error: error.message });
        }
    }
};