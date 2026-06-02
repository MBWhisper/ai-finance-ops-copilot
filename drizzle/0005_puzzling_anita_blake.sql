CREATE TABLE "lemon_squeezy_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"api_key" text NOT NULL,
	"store_name" text,
	"store_id" text,
	"last_sync_at" timestamp,
	"webhook_secret" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lemon_squeezy_customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"ls_customer_id" text NOT NULL,
	"name" text,
	"email" text,
	"status" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"synced_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lemon_squeezy_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"ls_order_id" text NOT NULL,
	"order_number" integer NOT NULL,
	"total" integer NOT NULL,
	"currency" text NOT NULL,
	"status" text NOT NULL,
	"customer_name" text,
	"customer_email" text,
	"product_name" text,
	"variant_name" text,
	"created_at" timestamp NOT NULL,
	"synced_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lemon_squeezy_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"ls_sub_id" text NOT NULL,
	"status" text NOT NULL,
	"customer_id" text,
	"product_name" text,
	"variant_name" text,
	"mrr" integer DEFAULT 0 NOT NULL,
	"currency" text,
	"cancelled" integer DEFAULT 0 NOT NULL,
	"renews_at" timestamp,
	"ends_at" timestamp,
	"created_at" timestamp NOT NULL,
	"synced_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lemon_squeezy_accounts" ADD CONSTRAINT "lemon_squeezy_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lemon_squeezy_customers" ADD CONSTRAINT "lemon_squeezy_customers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lemon_squeezy_orders" ADD CONSTRAINT "lemon_squeezy_orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lemon_squeezy_subscriptions" ADD CONSTRAINT "lemon_squeezy_subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "ls_customer_id_idx" ON "lemon_squeezy_customers" USING btree ("ls_customer_id");--> statement-breakpoint
CREATE UNIQUE INDEX "ls_order_id_idx" ON "lemon_squeezy_orders" USING btree ("ls_order_id");--> statement-breakpoint
CREATE UNIQUE INDEX "ls_sub_id_idx" ON "lemon_squeezy_subscriptions" USING btree ("ls_sub_id");