CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"user_id" text,
	"anonymous_id" text,
	"metadata" jsonb,
	"page" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "lemonsqueezy_subscription_id" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "lemonsqueezy_customer_id" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "lemonsqueezy_order_id" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "lemonsqueezy_product_id" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "lemonsqueezy_variant_id" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "lemonsqueezy_customer_portal_url" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "trial_ends_at" timestamp;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "renews_at" timestamp;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "ends_at" timestamp;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "is_cancelled" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;