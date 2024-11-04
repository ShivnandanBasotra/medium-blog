import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { setCookie } from 'hono/cookie'
import { authSchema } from "@shiv.100xdevs/medium-common";


export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
}>();

userRouter.post('/signup', async (c) => {
  const { email, password, name } = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const validationResult = authSchema.safeParse({
    email,
    password,
    name
  })
  if (!validationResult.success) return c.json({ error: validationResult.error.issues.map(error => `error in ${error.path}, ${error.message}`) }, 403);
  try {
    const exisitingUser = await prisma.user.findFirst({
      where: {
        email
      }
    })
    if (exisitingUser) return c.json({ error: "user already exists" }, 409);
    const user = await prisma.user.create({
      data: {
        email,
        password,
        name
      }
    })
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    setCookie(c, 'jwt', jwt/* , {
      httpOnly: true,
      // secure: true,    
      // maxAge: 60 * 60 * 24 * 7 
    } */)
    return c.json({ message: "user created successfully", user, jwt }, 201);
  } catch (error) {
    console.log(error);
    return c.json({
      message: "error in signup route"
    })
  }
})

userRouter.post('/signin', async (c) => {
  const { email, password } = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
        password
      }
    })
    if (!user) return c.json({ error: "user do not exists" }, 409);

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    setCookie(c, 'jwt', jwt/* , {
      httpOnly: true,
      // secure: true,    
      // maxAge: 60 * 60 * 24 * 7
    } */)
    return c.json({ message: "user signed in successfully", user, jwt }, 201);
  } catch (error) {
    console.log(error);
    return c.json({
      message: "error in signin route"
    })
  }
})