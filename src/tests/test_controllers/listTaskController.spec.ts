import { describe, it, expect, vi, beforeEach } from "vitest";
import { listTask } from "../../controllers/listTask.controller";
import { listTaskHandler } from "../../handlers/listTask.handler";

vi.mock('../../handlers/listTask.handler', () => ({
    listTaskHandler: {
        list: vi.fn(),
    },
}))

describe('listTaskController', () => {
    let mockReply: any;

    beforeEach(() => {
        mockReply = {
            code: vi.fn().mockReturnThis(),
            send: vi.fn(),
        };
    });

    it('should return a list of tasks', async () => {
        listTaskHandler.list = vi.fn().mockReturnValue([
            { id: '1', title: 'Task 1', description: 'Description 1', completed: false },
            { id: '2', title: 'Task 2', description: 'Description 2', completed: true },
        ]);

        const mockRequest = {}; 

        await listTask(mockRequest as any, mockReply as any);

        expect(mockReply.code).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({
            tasks: [
                { id: '1', title: 'Task 1', description: 'Description 1', completed: false },
                { id: '2', title: 'Task 2', description: 'Description 2', completed: true },
            ]
        });
    })

    it('should return 404 if no tasks are found', async () => {
        listTaskHandler.list = vi.fn().mockReturnValue([]);

        const mockRequest = {}; 

        await listTask(mockRequest as any, mockReply as any);

        expect(mockReply.code).toHaveBeenCalledWith(404);
        expect(mockReply.send).toHaveBeenCalledWith({ error: 'No tasks found' });
    })
    
})