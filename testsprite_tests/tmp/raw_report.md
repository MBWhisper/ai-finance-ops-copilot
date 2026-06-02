
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** ai-finance-ops-copilot
- **Date:** 2026-06-01
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Log in to access the dashboard
- **Test Code:** [TC001_Log_in_to_access_the_dashboard.py](./TC001_Log_in_to_access_the_dashboard.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/7c4bc59a-2e19-4264-984a-0e1954a060a5
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 Review dashboard overview KPIs after login
- **Test Code:** [TC002_Review_dashboard_overview_KPIs_after_login.py](./TC002_Review_dashboard_overview_KPIs_after_login.py)
- **Test Error:** TEST BLOCKED

The test could not be run — the provided credentials were not accepted and the authenticated dashboard could not be reached.

Observations:
- The login form (email/password) remained visible after three sign-in attempts.
- No dashboard or authenticated UI elements appeared; the page remained on /login.
- Inputs located in shadow DOM at indices 1535 (email) and 1536 (password); Sign In button at 1538.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/37762812-32f6-47fe-ba97-ad144c85cc05
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 View dashboard overview after login
- **Test Code:** [TC003_View_dashboard_overview_after_login.py](./TC003_View_dashboard_overview_after_login.py)
- **Test Error:** TEST BLOCKED

The passwordless login flow requires access to the user's email to complete the sign-in — the UI sent (or attempted to send) a login link but did not perform an in-app redirect to the dashboard. The test cannot be completed without access to the user's mailbox.

Observations:
- Clicking the "Send me a login link" button (email=example@gmail.com) kept the app on the /login page; no dashboard or in-app login confirmation was shown.
- Three password sign-in attempts with example@gmail.com/password123 failed and the login UI remained visible.
- The UI does not provide an in-browser alternative (e.g., an in-app one-time code) to complete authentication without external email access.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/600ce204-3639-4ba0-831a-dcbed22a66c4
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 Open dashboard overview after signing in
- **Test Code:** [TC004_Open_dashboard_overview_after_signing_in.py](./TC004_Open_dashboard_overview_after_signing_in.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/7f0ed19a-f706-44a4-a0be-ae20912b805d
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 Create an account from the public signup flow
- **Test Code:** [TC005_Create_an_account_from_the_public_signup_flow.py](./TC005_Create_an_account_from_the_public_signup_flow.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/c581d0b6-1ac9-46e2-8aef-23059ba3deb5
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Start signup from the marketing site
- **Test Code:** [TC006_Start_signup_from_the_marketing_site.py](./TC006_Start_signup_from_the_marketing_site.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/8487ebf5-873e-4ff6-81f6-2f9b54fc1010
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 Connect and disconnect integrations
- **Test Code:** [TC007_Connect_and_disconnect_integrations.py](./TC007_Connect_and_disconnect_integrations.py)
- **Test Error:** TEST BLOCKED

The test could not be run — authentication could not be completed with the provided fallback credentials, so the Integrations settings could not be reached.

Observations:
- After three sign-in attempts, the login form remained visible and no dashboard or settings page was reached.
- Shadow DOM login inputs [1625] (email) and [1626] (password) and submit button [1628] are present; the email input shows value=example@gmail.com but submitting did not authenticate.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/dfe40b67-af43-418f-9daf-70b1f12d7fa1
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 Access settings and manage integrations from the dashboard
- **Test Code:** [TC008_Access_settings_and_manage_integrations_from_the_dashboard.py](./TC008_Access_settings_and_manage_integrations_from_the_dashboard.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/68a6fa20-8c9b-4625-955c-8fc656350763
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 Connect PayPal Business from settings
- **Test Code:** [TC009_Connect_PayPal_Business_from_settings.py](./TC009_Connect_PayPal_Business_from_settings.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/d29d37b0-8d72-46f1-b14d-b1869dbb2c5b
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 View dashboard loading states before data appears
- **Test Code:** [TC010_View_dashboard_loading_states_before_data_appears.py](./TC010_View_dashboard_loading_states_before_data_appears.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/57e1ffcf-84f1-46bf-ab8d-55373452a13a
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011 Review dashboard revenue and payment summaries
- **Test Code:** [TC011_Review_dashboard_revenue_and_payment_summaries.py](./TC011_Review_dashboard_revenue_and_payment_summaries.py)
- **Test Error:** TEST BLOCKED

The test could not be run to completion — authentication did not complete through any available UI path and no on-page confirmation for the magic-link flow was observed.

Observations:
- The UI remained on the marketing/login view showing MRR marketing cards and sign-in inputs; no redirect to a dashboard occurred.
- Two password sign-in attempts (example@gmail.com / password123) and two magic-link attempts were performed with no on-page confirmation (e.g., 'check your email', 'link sent').
- Direct navigation to /dashboard/overview was unavailable and the dashboard overview could not be verified via the UI.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/8f6bddd6-ea87-4ea1-b672-769473aa3360
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012 Connect a bank account from settings
- **Test Code:** [TC012_Connect_a_bank_account_from_settings.py](./TC012_Connect_a_bank_account_from_settings.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/5bbcfbaf-8828-47f6-a3ec-4256e2e78af9
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013 See updated dashboard data after a webhook-driven refresh
- **Test Code:** [TC013_See_updated_dashboard_data_after_a_webhook_driven_refresh.py](./TC013_See_updated_dashboard_data_after_a_webhook_driven_refresh.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/deab14a9-fd3b-4476-a35b-73095fc23360
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014 Retry a dashboard section after an in-page error
- **Test Code:** [TC014_Retry_a_dashboard_section_after_an_in_page_error.py](./TC014_Retry_a_dashboard_section_after_an_in_page_error.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/056c22df-22a4-4bc2-9285-947b5343f1fe
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015 Sign up and reach the authenticated app
- **Test Code:** [TC015_Sign_up_and_reach_the_authenticated_app.py](./TC015_Sign_up_and_reach_the_authenticated_app.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/d3b919aa-cc3a-4647-839a-fb01995a6ba9
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC016 Sync PayPal data and see refreshed dashboard metrics
- **Test Code:** [TC016_Sync_PayPal_data_and_see_refreshed_dashboard_metrics.py](./TC016_Sync_PayPal_data_and_see_refreshed_dashboard_metrics.py)
- **Test Error:** TEST BLOCKED

The test could not be run — valid login was not achieved, preventing access to dashboard settings and PayPal controls.

Observations:
- The UI remained on /login after two sign-in attempts with the provided test credentials; email and password inputs accepted text but authentication did not complete.
- Direct access to /dashboard/settings cannot be verified because the app requires authentication and the dashboard was not reached.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/c205b6b9-1b50-48b6-93ae-dea61074aca5
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC017 Switch between analytics views and review provider data
- **Test Code:** [TC017_Switch_between_analytics_views_and_review_provider_data.py](./TC017_Switch_between_analytics_views_and_review_provider_data.py)
- **Test Error:** TEST BLOCKED

The test could not be run — authentication could not be completed through the UI, so analytics pages and provider tabs cannot be reached.

Observations:
- Multiple password-based sign-in attempts (>=6) were performed and none authenticated; the login form remained visible after each attempt.
- An ERR_EMPTY_RESPONSE occurred earlier (server returned no data) and required using the Reload button to continue.
- Clicking 'Send me a login link' did not show any confirmation message or change the page; the login form (email and password inputs) remains visible.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/47f0ec9f-8fcd-4db1-aaaf-8563b0190ee2
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC018 View cash flow summaries across providers
- **Test Code:** [TC018_View_cash_flow_summaries_across_providers.py](./TC018_View_cash_flow_summaries_across_providers.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/d79ce65b-9b87-4246-bf36-c2fb6131bbdf
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC019 Review core analytics charts
- **Test Code:** [TC019_Review_core_analytics_charts.py](./TC019_Review_core_analytics_charts.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/1a44609b-1f67-4f31-97c7-1e257701bd32
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC020 Switch between analytics tabs and inspect PayPal data
- **Test Code:** [TC020_Switch_between_analytics_tabs_and_inspect_PayPal_data.py](./TC020_Switch_between_analytics_tabs_and_inspect_PayPal_data.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/f3ce4489-5879-470c-818f-c46a1ff2efba
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC021 Review PayPal analytics tables and charts
- **Test Code:** [TC021_Review_PayPal_analytics_tables_and_charts.py](./TC021_Review_PayPal_analytics_tables_and_charts.py)
- **Test Error:** TEST BLOCKED

The test could not be run — authentication could not be completed and no confirmation was shown for the passwordless flow.

Observations:
- The login form remained visible after three password sign-in attempts and three 'Send me a login link' clicks.
- No confirmation message (for example, 'Check your email', 'We've sent', or 'sent a login link') was displayed on the page after attempts.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/100584f1-a22b-45df-9255-2301f8032f58
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC022 Review cash flow metrics
- **Test Code:** [TC022_Review_cash_flow_metrics.py](./TC022_Review_cash_flow_metrics.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/94746c6d-71ff-4000-9510-fdaae8687a3e
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC023 Update profile or workspace settings
- **Test Code:** [TC023_Update_profile_or_workspace_settings.py](./TC023_Update_profile_or_workspace_settings.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/71bc8438-d875-4770-a7f3-3b9f98086823
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC024 Review cash flow views across providers
- **Test Code:** [TC024_Review_cash_flow_views_across_providers.py](./TC024_Review_cash_flow_views_across_providers.py)
- **Test Error:** TEST BLOCKED

The test could not be run — dashboard access could not be reached because authentication did not succeed and the dashboard route is unavailable.

Observations:
- Multiple login attempts with the provided credentials repeatedly returned to the login/landing UI (login did not authenticate).
- Direct navigation to /dashboard/cashflow failed (site unavailable).
- The current page shows the public landing/login UI (MRR hero and login inputs) at http://localhost:3000/login.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/d56c2868-bdc5-41cf-9c23-430eb3a798fc
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC025 Switch between analytics tabs
- **Test Code:** [TC025_Switch_between_analytics_tabs.py](./TC025_Switch_between_analytics_tabs.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/ab52d8cf-4b57-4d04-b0c5-0e89b4241fdd
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC026 Review PayPal analytics transactions and invoices
- **Test Code:** [TC026_Review_PayPal_analytics_transactions_and_invoices.py](./TC026_Review_PayPal_analytics_transactions_and_invoices.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/152a12ce-9a8a-41c7-b387-c7598900c3ff
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC027 Paginate through PayPal transactions in analytics
- **Test Code:** [TC027_Paginate_through_PayPal_transactions_in_analytics.py](./TC027_Paginate_through_PayPal_transactions_in_analytics.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/144f0fa8-ca58-4c99-a099-aeae53f5cce7
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC028 Update profile information
- **Test Code:** [TC028_Update_profile_information.py](./TC028_Update_profile_information.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/ff0aa52d-daee-46d0-bfbd-20bdf2f52e1a
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC029 Update workspace details
- **Test Code:** [TC029_Update_workspace_details.py](./TC029_Update_workspace_details.py)
- **Test Error:** TEST BLOCKED

The test could not be run — the UI cannot be navigated to an authenticated dashboard because sign-in repeatedly returns to the login page.

Observations:
- The login page remained visible after three sign-in attempts using valid-looking credentials (example@gmail.com / password123).
- No navigation to /dashboard occurred and no confirmation of successful authentication was observed.
- Repeated submission attempts produced the same result and a loop was detected, indicating the authentication backend or environment is not reachable in this session.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/891ceb80-ea3e-4e24-937f-5e690abecfc1
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC030 Browse PayPal analytics pagination
- **Test Code:** [TC030_Browse_PayPal_analytics_pagination.py](./TC030_Browse_PayPal_analytics_pagination.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/23b1e56c-96b6-4971-9652-f6bf100ca92c/811caf2b-56c3-4c97-b3b1-f06c95a5f937
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **70.00** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---