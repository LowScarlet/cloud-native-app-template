import express, { Request, Response, NextFunction } from "express";
import db from "../../../../db/drizzle.ts";
import { user } from "../../../../db/schema/user.ts";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const primaryQuery = db
      .select()
      .from(user)
      .$dynamic();

    const rawRecords = await primaryQuery;

    res.json(rawRecords);
  } catch (err) {
    next(err);
  }
});

router.get("/create", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const randomUsername = () => {
      const prefix = 'user';
      const randomString = Math.random().toString(36).substring(2, 8);
      const timestamp = Date.now().toString().slice(-4);
      return `${prefix}_${randomString}${timestamp}`;
    };
    const defaultPassword = Math.random().toString(36).substring(2);

    const newUser = await db.insert(user).values({
      fullName: `User ${Math.random().toString(36).substring(2)}`,
      username: randomUsername(),
      email: `${randomUsername()}@example.com`,
      password: defaultPassword,
      avatar: null,
      banner: null,
      bio: null,
      isActive: false,
      isMaster: false,
      role: "STUDENT"
    });

    res.json({
      message: "User created successfully",
      user: newUser,
      generatedPassword: req.body.password ? undefined : defaultPassword
    });
  } catch (err) {
    next(err);
  }
});

export default router;
