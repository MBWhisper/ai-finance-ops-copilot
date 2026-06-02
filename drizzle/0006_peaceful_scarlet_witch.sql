CREATE TABLE "paypal_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"client_id" text NOT NULL,
	"client_secret" text NOT NULL,
	"mode" text,
	"merchant_email" text,
	"merchant_name" text,
	"access_token" text,
	"token_expires_at" timestamp,
	"last_synced_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "paypal_invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"invoice_id" text NOT NULL,
	"invoice_number" text,
	"status" text,
	"recipient_email" text,
	"recipient_name" text,
	"amount" integer,
	"currency" text,
	"due_amount" integer,
	"invoice_date" timestamp,
	"due_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "paypal_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"subscription_id" text NOT NULL,
	"plan_id" text,
	"status" text,
	"subscriber_email" text,
	"subscriber_name" text,
	"last_payment_amount" integer,
	"last_payment_date" timestamp,
	"next_billing_date" timestamp,
	"failed_payments_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "paypal_transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"transaction_id" text NOT NULL,
	"transaction_type" text,
	"status" text,
	"amount" integer,
	"currency" text,
	"fee_amount" integer,
	"net_amount" integer,
	"payer_email" text,
	"payer_name" text,
	"item_name" text,
	"transaction_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "paypal_invoice_id_idx" ON "paypal_invoices" USING btree ("invoice_id");--> statement-breakpoint
CREATE UNIQUE INDEX "paypal_subscription_id_idx" ON "paypal_subscriptions" USING btree ("subscription_id");--> statement-breakpoint
CREATE UNIQUE INDEX "paypal_transaction_id_idx" ON "paypal_transactions" USING btree ("transaction_id");