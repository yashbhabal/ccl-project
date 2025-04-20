import { z} from 'zod'

export const Book = z.object({
    id:z.number().optional(),
    name:z.string(),
    author:z.string(),
    price:z.number().min(1),
    qty:z.number().min(1),
    description:z.string(),
    image:z.string(),
    genres:z.string(),
    ebook:z.boolean()
}) 

export const User = z.object({
    id:z.number().optional(),
    email:z.string(),
    password:z.string(),
    admin:z.boolean().optional(),
})

export const Address = z.object({
    id:z.number().optional(),
    name:z.string(),
    phone:z.string(),
    state:z.string(),
    city:z.string(),
    pincode:z.number(),
    address:z.string(),
    landmark:z.string().optional(),
    user_id:z.number(),
})