CREATE TABLE IF NOT EXISTS "ptt_game_state" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"started_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"last_round_id" varchar(255),
	"user_id" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ptt_game_state" ADD CONSTRAINT "ptt_game_state_user_id_ptt_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ptt_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uniq_per_user" ON "ptt_game_state" USING btree ("user_id");