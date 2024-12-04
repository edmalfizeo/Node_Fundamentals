import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";
import { app } from "../../app";

describe("List Task Integration", () => {
    
    it("should list all tasks when tasks are available", async () => {
         // Add Task
        const taskAdd = await request(app.server).post("/tasks").send({
            title: "Task 1",
            description: "Description 1",
        });

        const response = await request(app.server)
            .get("/tasks");

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(
            {
                tasks: [
                    {
                        id: taskAdd.body.id,
                        title: "Task 1",
                        description: "Description 1",
                        completed: false,
                    }
                ]
                
            }
        );

        // Remove Task
        const taskRemove = await request(app.server).delete(`/tasks/${taskAdd.body.id}`);

    });

    it("should return 404 when no tasks are available", async () => {

        const response = await request(app.server)
            .get("/tasks");

        expect(response.status).toBe(404);
        expect(response.body).toMatchObject({
            error: "No tasks found",
        });
    });
});
