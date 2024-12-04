import { describe, it, expect, beforeEach } from "vitest";
import { deleteTaskHandler } from "../../handlers/deleteTask.handler";
import { tasks } from "../../handlers/createTask.handler";


describe("deleteTaskHandler", () => {
    beforeEach(() => {
        // Reseta o array de tarefas antes de cada teste
        tasks.length = 0;
        tasks.push(
            { id: "1", title: "Task 1", description: "Description 1", completed: false },
            { id: "2", title: "Task 2", description: "Description 2", completed: false },
            { id: "3", title: "Task 3", description: "Description 3", completed: false }
        );
    });

    it("should delete a task when a valid ID is provided", () => {
        // Executa o handler para deletar uma tarefa
        deleteTaskHandler.delete("2");

        // Verifica se a tarefa foi removida
        expect(tasks).toHaveLength(2);
        expect(tasks.find(task => task.id === "2")).toBeUndefined();
    });

    it("should throw an error if the task is not found", () => {
        // Verifica se uma exceção é lançada quando o ID não é encontrado
        expect(() => deleteTaskHandler.delete("99")).toThrowError("Task not found");
    });
});