import { z } from "zod"

export const messageSchema = z.object({
content:z
.string()
.min(10,{message:"content must be of atleast ten characters"})
.max(300,{message:"content must be no longer than 300 characters"})
        
})