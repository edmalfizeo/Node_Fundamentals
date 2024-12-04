import { tasks } from "./createTask.handler";
import { Task } from "../@types/task";

type DeleteTaskHandler = {
    delete: (id: string) => void;
};

export const deleteTaskHandler: DeleteTaskHandler = {
    delete: (id: string): void => {
        const taskIndex = tasks.findIndex(task => task.id === id);
       
        if (taskIndex === -1) {
            throw new Error('Task not found');
        }

        tasks.splice(taskIndex, 1);
    }
}

