"use client"

import { z } from "zod"

const formSchema = z.object({
  busname: z.string().min(2, {
    message: "busname must be at least 2 characters.",
  }),
  busnumber: z.number(),
  startingDate: z.date(),
  endingDate: z.date(),
  price: z.number(),
  seats: z.number(),
  routeId: z.number().optional(),

})
 
    // const form = useForm<z.infer<typeof formSchema>>({
    //   resolver: zodResolver(formSchema),
    //   defaultValues: {
    //     username: "",
    //   },
    // })
