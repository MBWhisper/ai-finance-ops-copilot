export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      stripe_accounts: {
        Row: {
          id: string;
          user_id: string;
          stripe_account_id: string | null;
          access_token: string;
          last_sync_at: string | null;
          webhook_secret: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_account_id?: string | null;
          access_token: string;
          last_sync_at?: string | null;
          webhook_secret?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_account_id?: string | null;
          access_token?: string;
          last_sync_at?: string | null;
          webhook_secret?: string | null;
          created_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan: "starter" | "pro" | "scale";
          stripe_sub_id: string | null;
          status: "active" | "trialing" | "canceled" | "past_due";
          mrr_cents: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan: "starter" | "pro" | "scale";
          stripe_sub_id?: string | null;
          status: "active" | "trialing" | "canceled" | "past_due";
          mrr_cents?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan?: "starter" | "pro" | "scale";
          stripe_sub_id?: string | null;
          status?: "active" | "trialing" | "canceled" | "past_due";
          mrr_cents?: number;
          created_at?: string;
        };
      };
      metrics_daily: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          mrr_cents: number;
          arr_cents: number;
          churn_rate: number | null;
          ltv_cents: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          mrr_cents: number;
          arr_cents: number;
          churn_rate?: number | null;
          ltv_cents?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          mrr_cents?: number;
          arr_cents?: number;
          churn_rate?: number | null;
          ltv_cents?: number | null;
          created_at?: string;
        };
      };
      cashflow_forecasts: {
        Row: {
          id: string;
          user_id: string;
          forecast_date: string;
          amount_cents: number;
          type: "revenue" | "expense" | "net";
          confidence: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          forecast_date: string;
          amount_cents: number;
          type: "revenue" | "expense" | "net";
          confidence?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          forecast_date?: string;
          amount_cents?: number;
          type?: "revenue" | "expense" | "net";
          confidence?: number | null;
          created_at?: string;
        };
      };
      invoices: {
        Row: {
          id: string;
          user_id: string;
          customer_email: string;
          amount_cents: number;
          due_date: string;
          status: "draft" | "sent" | "paid" | "overdue";
          stripe_invoice_id: string | null;
          reminders_sent: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          customer_email: string;
          amount_cents: number;
          due_date: string;
          status: "draft" | "sent" | "paid" | "overdue";
          stripe_invoice_id?: string | null;
          reminders_sent?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          customer_email?: string;
          amount_cents?: number;
          due_date?: string;
          status?: "draft" | "sent" | "paid" | "overdue";
          stripe_invoice_id?: string | null;
          reminders_sent?: number;
          created_at?: string;
        };
      };
    };
  };
};
