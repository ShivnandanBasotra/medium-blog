import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { getCookie } from 'hono/cookie'
import { verify } from 'hono/jwt'
import { createBlogSchema, updateBlogSchema } from "@shiv.100xdevs/medium-common"


type JwtPayload = { id: string }

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use(async (c, next) => {
    let jwt = c.req.header('Authorization');
    try {
        if (!jwt) return c.json({ error: "Unauthorized access: missing token" }, 403);
        jwt = jwt.split(' ')[1];
        const user = await verify(jwt, c.env.JWT_SECRET) as JwtPayload;
        if (!user) return c.json({ error: "unauthorized access" }, 403);
        c.set("userId", user.id);
        await next()
    } catch (error2) {
        return c.json({ error: "unauthorized access",error2, jwt}, 403);
    }
})

blogRouter.post('/', async (c) => {
    const { title, content } = await c.req.json();
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const validationResult = createBlogSchema.safeParse({
        title,
        content
    })
    if (!validationResult.success) return c.json({ error: validationResult.error.issues.map(error => `error in ${error.path}, ${error.message}`) }, 403);
    try {
        const blog = await prisma.post.create({
            data:
            {
                title,
                content,
                authorId: userId
            }
        })
        return c.json({
            blog
        })
    } catch (error) {
        console.log(error);
        return c.json({
            message: "error in create blog"
        })
    }
})

blogRouter.put("/", async (c) => {
    const { title, content, id } = await c.req.json();
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const validationResult = updateBlogSchema.safeParse({
        title,
        content,
        id
    })
    if (!validationResult.success) return c.json({ error: validationResult.error.issues.map(error => `error in ${error.path}, ${error.message}`) }, 403);

    try {
        const updatedBlog = await prisma.post.update({
            where: {
                authorId: userId,
                id
            },
            data: {
                title,
                content
            }
        })
        return c.json({
            updatedBlog
        })
    } catch (error) {
        console.log(error);
        return c.json({
            message: "error in edit blog"
        })
    }
})


// add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blogs = await prisma.post.findMany({
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json({
            blogs
        })
    } catch (error) {
        console.log(error);
        return c.json({
            message: "error in get bulk blogs"
        })
    }

})

blogRouter.get('/blog/:id', async (c) => {
    const id = c.req.param('id');
    // const id = "7e9d1d6a-b458-4e6d-8f03-e62d22324a82";
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id
            },
            select: {
                title: true,
                id: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({
            blog,
        })
    } catch (error) {
        console.log(error);
        return c.json({
            message: "error in get blog"
        })
    }

})
