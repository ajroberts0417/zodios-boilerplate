import { zodiosContext } from "@zodios/express";
import z from "zod";
import { userApi } from "../../common/api";
import { userMiddleware } from "./userMiddleware";
import 'dotenv/config'
import { clerkMiddleware } from '@clerk/express'

const ctx = zodiosContext(z.object({
    user: z.object({
        id: z.number(),
        name: z.string(),
        isAdmin: z.boolean(),
    }),
}));

const app = ctx.app(userApi);
// middleware that adds the user to the context
app.use(clerkMiddleware())
app.use(userMiddleware);

//  auto-complete path  fully typed and validated input params (body, query, path, header)
//          ▼           ▼    ▼
app.get("/users/:id", (req, res) => {
    //  auto-complete user  fully typed
    //      ▼
    if (req.user.isAdmin) {
        // res.json is typed thanks to zod
        return res.json({
            //   auto-complete req.params.id
            //              ▼
            id: req.params.id,
            name: "John Doe",
        });
    }
    return res.status(403).end();
})

app.listen(3000);