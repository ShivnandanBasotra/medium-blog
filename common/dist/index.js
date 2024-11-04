"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.createBlogSchema = exports.authSchema = void 0;
const zod_1 = require("zod");
exports.authSchema = zod_1.z.object({
    email: zod_1.z.string().email('enter valid email'),
    password: zod_1.z.string().min(6, 'password should contain atleast 6 characters'),
    name: zod_1.z.string().optional()
});
exports.createBlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(5, 'title should contain atleast 5 characters'),
    content: zod_1.z.string().min(16, 'content should contain atleast 16 characters')
});
exports.updateBlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(5, 'title should contain atleast 5 characters'),
    content: zod_1.z.string().min(16, 'content should contain atleast 16 characters'),
    id: zod_1.z.string()
});
