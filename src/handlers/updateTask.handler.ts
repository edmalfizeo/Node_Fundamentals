import { Task } from "../@types/task";
import { tasks } from "./createTask.handler";

type UpdateTaskHandler = {
    update: (id: string, data: {title: string, description: string}) => Task;
}

export const updateTaskHandler: UpdateTaskHandler = {
    update: (id: string, data: {title: string, description: string}): Task => {
        const taskIndex = tasks.findIndex((task) => task.id === id);
        if (taskIndex === -1) {
            throw new Error("Task not found");
        }

        tasks[taskIndex] = {
            ...tasks[taskIndex],
            title: data.title,
            description: data.description,
        };

        return tasks[taskIndex];
    }
}