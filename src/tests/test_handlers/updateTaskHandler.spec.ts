import { describe, it, expect, beforeEach } from "vitest";
import { updateTaskHandler } from "../../handlers/updateTask.handler";
import { tasks } from "../../handlers/createTask.handler";
import { v4 as uuid } from "uuid";

describe("updateTaskHandler", () => {
    let task = {
        id: uuid(),
        title: "Task 1",
        description: "Description 1",
        completed: false,
    }

    beforeEach(() => {
        tasks.length = 0;
        tasks.push(task);
    })

    it("should update a task", () => {
        const updatedTask = updateTaskHandler.update(task.id, { title: "Task 1 updated", description: "Description 1 updated" });

        expect(updatedTask).toEqual({
            id: task.id,
            title: "Task 1 updated",
            description: "Description 1 updated",
            completed: false,
        });
        expect(tasks).toEqual([updatedTask]);
        expect(tasks).not.toContain(task);
    })

    it("should throw an error if task is not found", () => {
        expect(() => {
            updateTaskHandler.update(uuid(), { title: "Task 1 updated", description: "Description 1 updated" });
        }).toThrowError("Task not found");
    })

})



