CREATE TABLE "plaid_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"access_token" text NOT NULL,
	"item_id" text NOT NULL,
	"institution_name" text,
	"institution_id" text,
	"bacs" text,
	"last_synced_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plaid_transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"plaid_transaction_id" text NOT NULL,
	"plaid_account_id" text,
	"category" text,
	"subcategory" text,
	"type" text,
	"name" text,
	"merchant_name" text,
	"amount" integer,
	"currency" text,
	"iso_currency_code" text,
	"date" text,
	"pending" text,
	"payment_channel" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
