import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../../app";

describe("Update Task Integration", () => {
    it("should update a task when task is available", async () => {
        // Add Task
        const taskAdd = await request(app.server).post("/tasks").send({
            title: "Task 1",
            description: "Description 1",
        });

        const response = await request(app.server)
            .put(`/tasks/${taskAdd.body.id}`)
            .send({
                title: "Task 1 Updated",
                description: "Description 1 Updated",
            });

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(
            {
                id: taskAdd.body.id,
                title: "Task 1 Updated",
                description: "Description 1 Updated",
                completed: false,
            }
        );

        // Remove Task
        const taskRemove = await request(app.server).delete(`/tasks/${taskAdd.body.id}`);
    });

    it("should return 404 when task is not available", async () => {
        const response = await request(app.server)
            .put("/tasks/1")
            .send({
                title: "Task 1 Updated",
                description: "Description 1 Updated",
                completed: true,
            });

        expect(response.status).toBe(404);
        expect(response.body).toMatchObject({
            error: "Task not found",
        });
    });
});