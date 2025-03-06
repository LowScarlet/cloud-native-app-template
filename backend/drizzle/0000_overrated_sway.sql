CREATE TYPE "public"."role" AS ENUM('STUDENT', 'ADMIN', 'INSTRUCTOR', 'ACADEMIC');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('MALE', 'FEMALE', 'OTHER');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"avatar" text,
	"banner" text,
	"fullName" text NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"isActive" boolean DEFAULT false,
	"isMaster" boolean DEFAULT false,
	"role" "role" DEFAULT 'STUDENT',
	"bio" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
