import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      <UtensilsCrossed className="h-8 w-8 text-primary" />
      <span className="font-headline text-2xl font-bold tracking-tighter">
        Gordo Salgados
      </span>
    </Link>
  );
}
