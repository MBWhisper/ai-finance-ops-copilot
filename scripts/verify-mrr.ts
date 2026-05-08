import Stripe from "stripe";
import { buildMrrFromSubscription, aggregateMrr } from "@/core/stripe/mrr-builder";

async function main() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    console.error("❌ STRIPE_SECRET_KEY not set. Use: STRIPE_SECRET_KEY=sk_test_... npm run verify:mrr");
    process.exit(1);
  }

  if (!stripeKey.startsWith("sk_test_")) {
    console.error("❌ Must use STRIPE_TEST_KEY (starts with sk_test_)");
    process.exit(1);
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: "2024-06-20",
    typescript: true,
  });

  console.log("🔍 Fetching subscriptions from Stripe test mode...\n");

  const subscriptions = await stripe.subscriptions.list({
    limit: 100,
    status: "all",
    expand: ["data.items.data.price"],
  });

  console.log(`📊 Found ${subscriptions.data.length} subscriptions\n`);

  let stripeMrr = 0;
  const snapshots = [];

  for (const sub of subscriptions.data) {
    if (sub.status === "active" || sub.status === "trialing") {
      let subMrr = 0;
      for (const item of sub.items.data) {
        const price = item.price;
        if (!price.unit_amount || !price.recurring) continue;

        const monthly =
          price.recurring.interval === "year"
            ? Math.round(price.unit_amount / 12)
            : price.unit_amount;

        subMrr += monthly;
      }
      stripeMrr += subMrr;
    }

    const snapshot = buildMrrFromSubscription(sub as any);
    snapshots.push(snapshot);
  }

  const appResult = aggregateMrr(snapshots);
  const appMrr = appResult.totalMrrCents;

  const absoluteDiff = Math.abs(stripeMrr - appMrr);
  const percentageDiff = stripeMrr === 0 ? 0 : (absoluteDiff / stripeMrr) * 100;

  console.log("=".repeat(60));
  console.log("📈 MRR Verification Report");
  console.log("=".repeat(60));
  console.log(`Stripe MRR:        $${(stripeMrr / 100).toFixed(2)} (${stripeMrr} cents)`);
  console.log(`App MRR (pipeline): $${(appMrr / 100).toFixed(2)} (${appMrr} cents)`);
  console.log(`Absolute Diff:      $${(absoluteDiff / 100).toFixed(2)} (${absoluteDiff} cents)`);
  console.log(`Percentage Diff:    ${percentageDiff.toFixed(4)}%`);
  console.log("=".repeat(60));

  if (percentageDiff <= 1.0) {
    console.log("\n✅ PASS: MRR difference within ±1% tolerance");
    return true;
  } else {
    console.log("\n❌ FAIL: MRR difference exceeds ±1% tolerance");
    return false;
  }
}

main()
  .then((passed) => {
    process.exit(passed ? 0 : 1);
  })
  .catch((err) => {
    console.error("Error:", err.message);
    process.exit(1);
  });
