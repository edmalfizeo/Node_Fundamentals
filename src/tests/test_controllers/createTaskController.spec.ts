import { describe, it, expect, vi } from "vitest";
import { v4 as uuid } from 'uuid';
import { createTask } from "../../controllers/create_task";
import { createTaskHandler } from "../../handlers/create_task_handler";
import { send } from "process";
import { create } from "domain";

vi.mock('../../handlers/create_task_handler', () => ({
    createTaskHandler: {
        create: vi.fn().mockReturnValue({
            id: uuid(),
            title: 'Task 1',
            description: 'Description 1',
            completed: false
        }),
    }
}));

describe('createTaskController', () => {
    it('should create a task', async () => {
        const mockRequest = { body: { title: 'Task 1', description: 'Description 1' } };
        
        const mockReply = {
            code: vi.fn().mockReturnThis(),
            send: vi.fn(),
        }

        await createTask(mockRequest as any, mockReply as any);

         // Verifica se o handler foi chamado com os dados corretos
        expect(createTaskHandler.create).toHaveBeenCalledWith({
            title: 'Task 1',
            description: 'Description 1'
        });

        const sentResponse = mockReply.send.mock.calls[0][0];
        expect(sentResponse).toMatchObject({
            title: 'Task 1',
            description: 'Description 1',
            completed: false
          });
          expect(sentResponse).toHaveProperty('id');
    })

    it('should return 400 if title is not provided', async () => {
        const mockRequest = { body: { description: 'Description 1' } };

        const mockReply = {
            code: vi.fn().mockReturnThis(),
            send: vi.fn(),
        }

        await createTask(mockRequest as any, mockReply as any);

        expect(mockReply.code).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith({ error: 'Title is required' });
    })
})