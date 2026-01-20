'use client';

import { AuthProvider } from '@/hooks/use-auth';
import { QueryProvider } from '@/components/query-provider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryProvider>
  );
}