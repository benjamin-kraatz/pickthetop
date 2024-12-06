CREATE TABLE IF NOT EXISTS "ptt_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
DROP TABLE "game_account";--> statement-breakpoint
DROP TABLE "game_post";--> statement-breakpoint
DROP TABLE "game_session";--> statement-breakpoint
DROP TABLE "game_user";--> statement-breakpoint
DROP TABLE "game_verification_token";