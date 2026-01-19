import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import menuData from '@/lib/menu.json';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-coxinha');
  const { menu } = menuData;

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
        <Tabs defaultValue={menu[0].category} className="mt-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            {menu.map((category) => (
              <TabsTrigger key={category.category} value={category.category}>
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>

          {menu.map((category) => (
            <TabsContent key={category.category} value={category.category}>
              <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.items.map((item) => (
                  <Card
                    key={item.id}
                    className="flex flex-col overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-105"
                  >
                    <CardHeader className="p-0">
                      <div className="relative h-48 w-full">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          data-ai-hint={item.imageHint}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col gap-2 p-4">
                      <CardTitle className="text-xl font-bold">
                        {item.name}
                      </CardTitle>
                      <p className="text-sm text-foreground/70">
                        {item.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                      <p className="text-lg font-bold">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(item.price)}
                      </p>
                      <Button>Adicionar</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
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
