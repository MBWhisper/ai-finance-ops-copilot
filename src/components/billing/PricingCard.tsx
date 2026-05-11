import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Plan } from '@/lib/lemonsqueezy';

interface PricingCardProps {
  plan: Plan;
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border p-8 flex flex-col transition-shadow hover:shadow-md',
        plan.highlighted
          ? 'border-primary bg-primary/5 shadow-lg'
          : 'border-border bg-card'
      )}
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
      <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>

      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-3xl font-bold">{plan.price}</span>
        <span className="text-muted-foreground text-sm">{plan.period}</span>
      </div>

      <ul className="space-y-2 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-primary shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={plan.checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'w-full py-2.5 px-5 rounded-lg font-medium text-center text-sm transition-colors block',
          plan.highlighted
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'border border-input hover:bg-accent'
        )}
      >
        Get started
      </a>
    </div>
  );
}
