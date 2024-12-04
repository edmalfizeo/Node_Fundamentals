import { describe, it, expect, vi } from "vitest";
import { completeTask } from "../../controllers/completeTask.controller";
import { completeTaskHandler } from "../../handlers/completeTask.handler";

vi.mock('../../handlers/completeTask.handler', () => ({
    completeTaskHandler: {
        complete: vi.fn()
    }
}))

describe('completeTaskController', () => {
    it('should return 200 if task is completed', async () => {
        // Configura o mock para o caso de sucesso
        completeTaskHandler.complete = vi.fn().mockResolvedValueOnce(undefined);

        const mockRequest = { params: { id: '1' } };
        const mockReply = {
            code: vi.fn().mockReturnThis(),
            send: vi.fn(),
        };

        await completeTask(mockRequest as any, mockReply as any);

        // Verifica se o handler foi chamado corretamente
        expect(completeTaskHandler.complete).toHaveBeenCalledWith('1');
        expect(mockReply.code).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'Task completed' });
    });

    it('should return 404 if task is not found', async () => {
        // Configura o mock para lançar erro
        completeTaskHandler.complete = vi.fn().mockImplementationOnce(() => {
            throw new Error('Task not found');
        });

        const mockRequest = { params: { id: '1' } };
        const mockReply = {
            code: vi.fn().mockReturnThis(),
            send: vi.fn(),
        };

        await completeTask(mockRequest as any, mockReply as any);

        // Verifica se o handler foi chamado corretamente
        expect(completeTaskHandler.complete).toHaveBeenCalledWith('1');
        expect(mockReply.code).toHaveBeenCalledWith(404);
        expect(mockReply.send).toHaveBeenCalledWith({ error: 'Task not found' });
    });
});