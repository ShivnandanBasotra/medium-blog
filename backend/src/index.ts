import { Hono } from 'hono'
import { userRouter } from './routes/userRoutes';
import { blogRouter } from './routes/blogRoutes';
import { cors } from 'hono/cors'



const app = new Hono();
app.use('/*', cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog',blogRouter)





export default app