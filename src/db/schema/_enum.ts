import { pgEnum } from "drizzle-orm/pg-core";

export const enumGender = pgEnum("gender", ["MALE", "FEMALE", "OTHER"]);