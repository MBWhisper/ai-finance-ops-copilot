import { PLANS } from '@/lib/lemonsqueezy';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Pricing - AI Finance Ops',
  description: 'Choose the plan that works best for your business',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <div
              key={plan.variantId}
              className={cn(
                'relative rounded-2xl border p-8 flex flex-col',
                plan.highlighted
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                  : 'border-border bg-card'
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Info */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href={plan.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-200 block',
                  plan.highlighted
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border border-border hover:bg-accent hover:text-accent-foreground'
                )}
              >
                Get started with {plan.name}
              </a>
            </div>
          ))}
        </div>

        {/* FAQ / Trust */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground text-sm">
            All plans include a 14-day free trial. No credit card required.
            Payments securely processed by{' '}
            <a
              href="https://www.lemonsqueezy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Lemon Squeezy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
