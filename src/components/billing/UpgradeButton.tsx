import Link from 'next/link';
import { Zap } from 'lucide-react';

export function UpgradeButton() {
  return (
    <Link
      href="/pricing"
      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
    >
      <Zap className="h-4 w-4" />
      Upgrade Plan
    </Link>
  );
}
