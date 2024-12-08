DO $$ BEGIN
 CREATE TYPE "public"."quiz_answer_state" AS ENUM('correct', 'incorrect');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ptt_quiz_answer" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"round_id" varchar(255) NOT NULL,
	"question_id" varchar(255) NOT NULL,
	"state" "quiz_answer_state" NOT NULL,
	"user_id" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ptt_quiz_answer" ADD CONSTRAINT "ptt_quiz_answer_user_id_ptt_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ptt_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uniq_answer" ON "ptt_quiz_answer" USING btree ("user_id","round_id","question_id");