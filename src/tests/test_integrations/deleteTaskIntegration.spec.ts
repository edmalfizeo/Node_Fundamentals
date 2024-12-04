import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../../app";

describe("Delete Task Integration", () => {
    it("should delete a task when task is available", async () => {
        // Create a task
        const taskAdd = await request(app.server).post("/tasks").send({
            title: "Task 1",
            description: "Description 1",
        });
        
        // Delete the task
        const taskDelete = await request(app.server).delete(`/tasks/${taskAdd.body.id}`);

        expect(taskDelete.status).toBe(200);
        expect(taskDelete.body).toMatchObject({
            message: "Task deleted successfully",
        })
    });

    it("should return 404 when task is not available", async () => {
        const response = await request(app.server)
            .delete("/tasks/1");

        expect(response.status).toBe(404);
        expect(response.body).toMatchObject({
            error: "Task not found",
        });
    });
});