import { describe, it, expect, vi } from "vitest";
import { completeTaskHandler } from "../../handlers/completeTask.handler";

vi.mock('../../handlers/completeTask.handler', () => ({
    completeTaskHandler: {
        complete: vi.fn()
    }
}))

describe('completeTaskHandler', () => {
    it('should complete a task', async () => {
        const tasks = [
            { id: '1', title: 'Task 1', completed: false },
            { id: '2', title: 'Task 2', completed: false },
            { id: '3', title: 'Task 3', completed: false },
        ];

        completeTaskHandler.complete = vi.fn().mockImplementation((id: string) => {
            const task = tasks.find((t) => t.id === id);
            
            if (!task) throw new Error('Task not found');
            
            task.completed = true;
        });
      
        completeTaskHandler.complete(tasks[1].id);
        
        expect(tasks[1].completed).toBe(true);
        expect(completeTaskHandler.complete).toHaveBeenCalledWith(tasks[1].id);
    })

    it('should throw an error if task is not found', () => {
        const tasks = [
          { id: '1', title: 'Task 1', completed: false },
          { id: '2', title: 'Task 2', completed: false },
          { id: '3', title: 'Task 3', completed: false },
        ];
    
        // Mocka o comportamento para lançar erro
        completeTaskHandler.complete = vi.fn().mockImplementation((id: string) => {
          const task = tasks.find((t) => t.id === id);
          
          if (!task) throw new Error('Task not found');
          
          task.completed = true;
        });
    
        expect(() => completeTaskHandler.complete('4')).toThrowError('Task not found');
        expect(completeTaskHandler.complete).toHaveBeenCalledWith('4');
      });
})