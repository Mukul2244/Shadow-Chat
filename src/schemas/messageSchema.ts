import { z } from "zod"

export const messageSchema = z.object({
content:z
.string()
.min(10,{message:"Content must of atleast ten characters"})
.max(300,{message:"Content must no longer than 300 characters"})
        
})