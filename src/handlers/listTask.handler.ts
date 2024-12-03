import { Task } from "../@types/task";
import { tasks } from "./createTask.handler";	

type ListTaskHandler = {
    list: () => Task[];
};

export const listTaskHandler: ListTaskHandler = {
    list: (): Task[] => {
        return tasks;
    }
}

