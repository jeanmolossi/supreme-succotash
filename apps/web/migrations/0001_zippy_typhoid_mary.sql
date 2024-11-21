CREATE TABLE IF NOT EXISTS "bank_accounts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userID" varchar NOT NULL,
	"familyID" varchar NOT NULL,
	"name" varchar NOT NULL,
	"initialValue" numeric(20, 2) DEFAULT '0' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_userID_users_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "bacc_family_idx" ON "bank_accounts" USING btree ("familyID");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "bacc_user_idx" ON "bank_accounts" USING btree ("userID");--> statement-breakpoint
CREATE INDEX CONCURRENTLY IF NOT EXISTS "bacc_created_at_idx" ON "bank_accounts" USING btree ("created_at");