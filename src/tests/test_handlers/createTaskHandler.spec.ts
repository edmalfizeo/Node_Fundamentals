import {describe, it, expect} from 'vitest';
import {createTaskHandler} from '../../handlers/create_task_handler';

describe('createTaskHandler', () => {
    it('should create a task and return it', () => {
        const data = {title: 'Task 1', description: 'Description 1'};

        const task = createTaskHandler.create(data);

        expect(task).toMatchObject({
                title: "Task 1",
                description: "Description 1",
                completed: false
           }
        )

        expect(task).toHaveProperty('id');
    })

    it('should add the task to the tasks array', () => {
        const data = {title: 'Task 2', description: 'Description 2'};

        const task = createTaskHandler.create(data);

        expect(createTaskHandler.list()).toContainEqual(task);
    })

    it('should return all tasks', () => {
        const tasks = createTaskHandler.list();

        expect(tasks).toHaveLength(2);
    })

    it('should throw an error if title is not provided', () => {
        expect(() => createTaskHandler.create({title: '', description: 'Description 3'})).toThrowError('Title is required');
    })

    it('should throw an error if task with the same title already exists', () => {
        expect(() => createTaskHandler.create({title: 'Task 1', description: 'Description 1'})).toThrowError('Task with this title already exists');
    })
});