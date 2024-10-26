import { getAuth } from "@clerk/express";


const userMiddleware = (req, res, next) => {
    const { userId } = getAuth(req);
    req.user = userId;
    next();
}

export default userMiddleware;