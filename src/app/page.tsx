import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-coxinha');

  return (
    <>
      <section
        id="hero"
        className="container grid grid-cols-1 items-center gap-8 py-16 md:grid-cols-2 md:py-24"
      >
        <div className="flex flex-col items-start gap-6">
          <h1 className="font-headline text-5xl font-bold leading-tight md:text-6xl">
            O sabor que abraça o seu coração
          </h1>
          <p className="text-lg text-foreground/80 md:text-xl">
            Os melhores salgados artesanais da região, feitos com ingredientes
            premium e fritos na hora. Peça já o seu!
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link href="#contato">Pedir Agora</Link>
          </Button>
        </div>
        <div className="relative h-80 w-full overflow-hidden rounded-2xl shadow-2xl md:h-[450px]">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
        </div>
      </section>

      <section id="cardapio" className="container py-16">
        <h2 className="text-center font-headline text-4xl font-bold">
          Cardápio
        </h2>
      </section>
      <section id="localizacao" className="container py-16">
        <h2 className="text-center font-headline text-4xl font-bold">
          Localização
        </h2>
      </section>
      <section id="contato" className="container py-16">
        <h2 className="text-center font-headline text-4xl font-bold">
          Contato
        </h2>
      </section>
    </>
  );
}
