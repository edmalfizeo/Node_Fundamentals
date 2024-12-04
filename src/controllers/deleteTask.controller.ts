import { FastifyRequest, FastifyReply } from "fastify";
import { deleteTaskHandler } from "../handlers/deleteTask.handler";

export const deleteTask = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const { id } = request.params as { id: string };
        
        deleteTaskHandler.delete(id);
        
        reply.code(200).send({ message: "Task deleted successfully" });
    } catch (error ) {
        
        if (error instanceof Error) {
            reply.code(404).send({ error: error.message });
        }
        
    }
}