import { randomUUID } from "crypto";
import { Task } from "../@types/task";

type CreateTaskHandler = {
    create: (data: { title: string; description: string }) => Task;
    list: () => Task[];
};

const tasks: Task[] = [];

export const createTaskHandler: CreateTaskHandler = {
    create: (data: { title: string, description: string }): Task => {
        if (!data.title) {
            throw new Error('Title is required');
          }
      
          const titleExists = tasks.some(task => task.title === data.title);
          if (titleExists) {
            throw new Error('Task with this title already exists');
          }

        const newTask: Task = {
            id: randomUUID(),
            title: data.title,
            description: data.description,
            completed: false
        }
        
        tasks.push(newTask);
        return newTask;
    },

    // Método para obter todas as tasks (expondo a lista)
    list: (): Task[] => {
    return tasks;
  }
}