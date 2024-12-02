import { fastify } from 'fastify';
import { taskRoutes } from './routes/taskRoutes';

const app = fastify();

app.register(taskRoutes, { prefix: '/tasks' });

app.listen({ port: 3000 }, () => {
    console.log('Server is running on port 3000');
});

