import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from "plaid";

function getPlaidClient() {
  const env = (process.env.PLAID_ENV || "sandbox") as keyof typeof PlaidEnvironments;
  return new PlaidApi(new Configuration({
    basePath: PlaidEnvironments[env] ?? PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID ?? "",
        "PLAID-SECRET": process.env.PLAID_SECRET ?? "",
      },
    },
  }));
}

export async function createLinkToken(userId: string) {
  const client = getPlaidClient();
  const response = await client.linkTokenCreate({
    user: { client_user_id: userId },
    client_name: "AI Finance Ops",
    products: [Products.Transactions, Products.Auth],
    country_codes: [CountryCode.Us, CountryCode.Gb, CountryCode.Ca],
    language: "en",
  });
  return response.data;
}

export async function exchangePublicToken(publicToken: string) {
  const client = getPlaidClient();
  const response = await client.itemPublicTokenExchange({ public_token: publicToken });
  return response.data;
}

export async function getTransactions(accessToken: string) {
  const client = getPlaidClient();
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth() - 12, 1).toISOString().split("T")[0]!;
  const endDate = now.toISOString().split("T")[0]!;
  const response = await client.transactionsGet({
    access_token: accessToken,
    start_date: startDate,
    end_date: endDate,
    options: { count: 500 },
  });
  return response.data;
}

export async function getBalances(accessToken: string) {
  const client = getPlaidClient();
  const response = await client.accountsBalanceGet({ access_token: accessToken });
  return response.data;
}
