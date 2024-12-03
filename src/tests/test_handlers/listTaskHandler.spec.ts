import { describe, it, expect, beforeEach } from "vitest";
import { listTaskHandler } from "../../handlers/listTask.handler";
import { createTaskHandler } from "../../handlers/createTask.handler";

describe("listTaskHandler", () => {
    const data = { title: "Task 1", description: "Description 1" };
    const tasks = listTaskHandler.list();

    // Limpa a lista de tasks antes de cada teste
    beforeEach(() => {
        tasks.length = 0; // Limpa a lista diretamente
    });
    
    it("should return all tasks", () => {
        const task = createTaskHandler.create(data);

        expect(tasks).toHaveLength(1);
        expect(tasks).toContainEqual(task);
        expect(tasks[0]).toMatchObject({
            title: "Task 1",
            description: "Description 1",
            completed: false
        });
    });

    it("should return an empty array if no tasks are available", () => {
        const emptyTasks = listTaskHandler.list();

        expect(emptyTasks).toHaveLength(0);
    });
});