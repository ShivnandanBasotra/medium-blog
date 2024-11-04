import {z} from 'zod';

export const authSchema = z.object({
    email : z.string().email('enter valid email'),
    password: z.string().min(6, 'password should contain atleast 6 characters'),
    name: z.string().optional()
})

export type AuthSchema = z.infer<typeof authSchema>;

export const createBlogSchema = z.object({
    title : z.string().min(5,'title should contain atleast 5 characters'),
    content: z.string().min(16, 'content should contain atleast 16 characters')
})
export type CreateBlogSchema = z.infer<typeof createBlogSchema>;

export const updateBlogSchema = z.object({
    title : z.string().min(5,'title should contain atleast 5 characters'),
    content: z.string().min(16, 'content should contain atleast 16 characters'),
    id : z.string()
})
export type updateBlogSchema = z.infer<typeof updateBlogSchema>;