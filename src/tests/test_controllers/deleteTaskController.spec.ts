import { describe, it, expect, beforeEach, vi } from "vitest";
import { deleteTask } from "../../controllers/deleteTask.controller";
import { deleteTaskHandler } from "../../handlers/deleteTask.handler";
import { tasks } from "../../handlers/createTask.handler";

vi.mock("../../handlers/deleteTask.handler", () => ({
    deleteTaskHandler: {
        delete: vi.fn(),
    },
}));

describe("deleteTaskController", () => {
    it("should return 200 if the task is deleted successfully", async () => {
        deleteTaskHandler.delete = vi.fn().mockResolvedValueOnce(undefined);

        const mockRequest = { params: { id: "1" } }; 
        const mockReply = {
            code: vi.fn().mockReturnThis(),
            send: vi.fn(),
        };

        await deleteTask(mockRequest as any, mockReply as any);

        
        expect(deleteTaskHandler.delete).toHaveBeenCalledWith("1");

        expect(mockReply.code).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Task deleted successfully" });
    });

    it("should return 404 if the task is not found", async () => {
        deleteTaskHandler.delete = vi.fn().mockImplementationOnce(() => {
            throw new Error("Task not found");
        });

        const mockRequest = { params: { id: "99" } };
        const mockReply = {
            code: vi.fn().mockReturnThis(),
            send: vi.fn(),
        };

        await deleteTask(mockRequest as any, mockReply as any);

        
        expect(deleteTaskHandler.delete).toHaveBeenCalledWith("99");

        expect(mockReply.code).toHaveBeenCalledWith(404);
        expect(mockReply.send).toHaveBeenCalledWith({ error: "Task not found" });
    });

});