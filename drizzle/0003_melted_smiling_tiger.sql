ALTER TABLE "ptt_user" ADD COLUMN "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "ptt_user" ADD COLUMN "updated_at" timestamp with time zone;