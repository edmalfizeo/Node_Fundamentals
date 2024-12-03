import { randomUUID } from "crypto";
import { Task } from "../@types/task";

type CreateTaskHandler = {
    create: (data: { title: string; description: string }) => Task;
    list: () => Task[];
    delete: (id: string) => Task;
};

export const tasks: Task[] = [];

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

    // Método para obter todas as tasks (expondo a lista) (Para Testes)
    list: (): Task[] => {
      return tasks;
    },

    // Método para deletar uma task (Para Testes)
    delete: (id: string): Task => {
      const taskIndex = tasks.findIndex(task => task.id === id);
      if (taskIndex === -1) {
        throw new Error('Task not found');
      }
  
      const deletedTask = tasks.splice(taskIndex, 1);
      return deletedTask[0];
    }
}