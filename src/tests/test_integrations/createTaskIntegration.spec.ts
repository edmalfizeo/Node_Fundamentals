import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../../app";

describe("Create Task Integration", () => {
    it("should create a task", async () => {
        const response = await request(app.server)
            .post("/tasks")
            .send({
                title: "Task 1",
                description: "Description 1",
            });

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            title: "Task 1",
            description: "Description 1",
        });
    });

    it("should return 400 if title is not provided", async () => {
        const response = await request(app.server)
            .post("/tasks")
            .send({
                description: "Description 1",
            });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            error: "All information are required (title and description)",
        });
    });
});