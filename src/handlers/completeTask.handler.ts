import { tasks } from "./createTask.handler";

type CompleteTaskHandler = {
    complete: (id: string) => void;
};

export const completeTaskHandler: CompleteTaskHandler = {
    complete: (id: string): void => {
        const task = tasks.find(task => task.id === id);
        if (!task) {
            throw new Error('Task not found');
        }

        task.completed = true;
    }
}