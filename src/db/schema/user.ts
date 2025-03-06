import {
  pgTable,
  text,
  boolean,
  pgEnum,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";

export const enumRole = pgEnum("role", [
  "STUDENT",
  "ADMIN",
  "INSTRUCTOR",
  "ACADEMIC",
]);

export const user = pgTable("user", {
  id: serial().primaryKey(),

  avatar: text(),
  banner: text(),

  fullName: text().notNull(),
  username: text().unique().notNull(),
  email: text().unique().notNull(),
  password: text().notNull(),
  isActive: boolean().default(false),
  isMaster: boolean().default(false),
  role: enumRole().default("STUDENT"),
  bio: text(),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
});