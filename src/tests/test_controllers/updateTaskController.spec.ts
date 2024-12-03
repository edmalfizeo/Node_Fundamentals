import { describe, it, expect, vi, beforeEach } from "vitest";
import { updateTask } from "../../controllers/updateTask.controller";
import { updateTaskHandler } from "../../handlers/updateTask.handler";

vi.mock("../../handlers/updateTask.handler", () => ({
    updateTaskHandler: {
        update: vi.fn()
    }
}));

describe("updateTaskController", () => {
    it('should return 404 if title or description is not provided', async () => {
        const mockRequest = {
            params: { id: "1" },
            body: { title: "", description: "" }, // Dados inválidos
          };
      
          const mockReply = {
            code: vi.fn().mockReturnThis(),
            send: vi.fn(),
          };
      
          await updateTask(mockRequest as any, mockReply as any);
      
          expect(updateTaskHandler.update).not.toHaveBeenCalled();

          
          expect(mockReply.code).toHaveBeenCalledWith(400);
          expect(mockReply.send).toHaveBeenCalledWith({
            error: "All informations are required for updating the task",
          });
    });
    
    it('should update a task', async () => {
        updateTaskHandler.update = vi.fn().mockReturnValue({
            id: "1",
            title: "Updated Task",
            description: "Updated Description",
            completed: false,
        });

        const mockRequest = {
            params: { id : "1" },
            body: { title: "Updated Task", description: "Updated Description" },
        };

        const mockReply = {
            code: vi.fn().mockReturnThis(),
            send: vi.fn(),
        };

        await updateTask(mockRequest as any, mockReply as any);

        expect(updateTaskHandler.update).toHaveBeenCalledWith("1", { title: "Updated Task", description: "Updated Description" });
        expect(mockReply.code).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({
            id: "1",
            title: "Updated Task",
            description: "Updated Description",
            completed: false,
        });
    });

    it('should return 404 if task is not found', async () => {
        updateTaskHandler.update = vi.fn().mockImplementation(() => {
            throw new Error("Task not found");
        });

        const mockRequest = {
            params: { id: "1" },
            body: { title: "Updated Task", description: "Updated Description" },
        };

        const mockReply = {
            code: vi.fn().mockReturnThis(),
            send: vi.fn(),
        };

        await updateTask(mockRequest as any, mockReply as any);

        expect(updateTaskHandler.update).toHaveBeenCalledWith("1", { title: "Updated Task", description: "Updated Description" });
        expect(mockReply.code).toHaveBeenCalledWith(404);
        expect(mockReply.send).toHaveBeenCalledWith({ error: "Task not found" });
    })
})

