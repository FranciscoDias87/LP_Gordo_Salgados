import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WhatsAppFab } from '@/components/whatsapp-fab';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-coxinha');

export const metadata: Metadata = {
  title: 'Gordo Salgados - Os Melhores Salgados da Região',
  description:
    'Os melhores salgados artesanais da região, feitos com ingredientes premium e fritos na hora. Peça já o seu!',
  openGraph: {
    title: 'Gordo Salgados - Os Melhores Salgados da Região',
    description:
      'Os melhores salgados artesanais da região, feitos com ingredientes premium e fritos na hora. Peça já o seu!',
    images: heroImage ? [heroImage.imageUrl] : [],
    siteName: 'Gordo Salgados',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gordo Salgados - Os Melhores Salgados da Região',
    description:
      'Os melhores salgados artesanais da região, feitos com ingredientes premium e fritos na hora. Peça já o seu!',
    images: heroImage ? [heroImage.imageUrl] : [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Belleza&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn('min-h-dvh bg-background font-body antialiased')}
        suppressHydrationWarning
      >
        <div className="relative flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <WhatsAppFab />
      </body>
    </html>
  );
}
