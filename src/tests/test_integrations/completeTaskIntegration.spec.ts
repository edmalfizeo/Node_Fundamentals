import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../../app";

describe("Complete Task Integration", () => {
    it("should complete a task when task is available", async () => {
        // Create a task
        const taskAdd = await request(app.server).post("/tasks").send({
            title: "Task 1",
            description: "Description 1",
        });
        
        // Complete the task
        const taskComplete = await request(app.server).put(`/tasks/${taskAdd.body.id}/complete`);

        expect(taskComplete.status).toBe(200);
        expect(taskComplete.body).toMatchObject({
            message: "Task completed",
        })
    });

    it("should return 404 when task is not available", async () => {
        const response = await request(app.server)
            .put("/tasks/1/complete");

        expect(response.status).toBe(404);
        expect(response.body).toMatchObject({
            error: "Task not found",
        });
    });
});