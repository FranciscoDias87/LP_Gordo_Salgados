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
import { Gem, PartyPopper, Rocket, Star, Zap } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-coxinha');
  const { menu } = menuData;
  const testimonials = [
    {
      id: 1,
      name: 'Ana Silva',
      avatarUrl: 'https://picsum.photos/seed/ana/150/150',
      avatarHint: 'woman avatar',
      rating: 5,
      quote:
        'As coxinhas são divinas! Massa levinha e recheio super cremoso. Virei cliente fiel!',
    },
    {
      id: 2,
      name: 'Carlos Oliveira',
      avatarUrl: 'https://picsum.photos/seed/carlos/150/150',
      avatarHint: 'man avatar',
      rating: 5,
      quote:
        'Melhor kibe que já comi! Chegou quentinho e muito rápido. Recomendo demais!',
    },
    {
      id: 3,
      name: 'Juliana Santos',
      avatarUrl: 'https://picsum.photos/seed/juliana/150/150',
      avatarHint: 'woman avatar',
      rating: 5,
      quote:
        'O kit festa salvou meu aniversário! Todos os convidados elogiaram os salgados. Qualidade impecável.',
    },
    {
      id: 4,
      name: 'Rafael Costa',
      avatarUrl: 'https://picsum.photos/seed/rafael/150/150',
      avatarHint: 'man avatar',
      rating: 4,
      quote:
        'A bolinha de queijo é uma delícia, muito queijo mesmo! Só a entrega que demorou um pouquinho, mas valeu a pena.',
    },
    {
      id: 5,
      name: 'Fernanda Lima',
      avatarUrl: 'https://picsum.photos/seed/fernanda/150/150',
      avatarHint: 'woman avatar',
      rating: 5,
      quote:
        'Pedi a esfiha de carne e me surpreendi. Massa fofinha e recheio muito bem temperado. Parabéns!',
    },
  ];

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

      <section id="kits-festa" className="container py-16">
        <div className="rounded-2xl border-4 border-primary bg-primary/5 p-8 text-center shadow-lg md:p-12">
          <div className="mx-auto mb-4 inline-block rounded-full bg-primary/10 p-4">
            <PartyPopper className="size-10 text-primary" />
          </div>
          <h2 className="mb-4 font-headline text-4xl font-bold">
            Kits para sua Festa!
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-foreground/80">
            Leve o sabor inconfundível da Gordo Salgados para o seu evento.
            Temos opções de kits com centos de salgados que vão surpreender
            seus convidados. Entre em contato para um orçamento personalizado!
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link
              href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20um%20orçamento%20para%20um%20Kit%20Festa."
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 h-6 w-6"
              >
                <path d="M16.6 14.2c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.7-.8.9-.1.1-.3.1-.5 0-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6s0-.3.1-.4c.1-.1.2-.2.4-.4.1-.1.2-.2.2-.4.1-.1 0-.3-.1-.4-.1-.1-1.2-2.8-1.6-3.8-.4-.9-.8-1-.8-1s-.3-.1-.5-.1h-.5c-.2 0-.5.1-.8.4-.2.2-.8.8-.8 1.9s.9 2.2 1 2.4c.1.1 1.6 2.4 3.8 3.4.6.2.9.4 1.2.5.5.2.9.1 1.2-.1.4-.2.8-.9.9-1.1.1-.2.1-.4 0-.5s-.2-.2-.4-.4zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
              </svg>
              Solicitar Orçamento via WhatsApp
            </Link>
          </Button>
        </div>
      </section>

      <section id="porque-nos" className="bg-muted/50 py-16 sm:py-24">
        <div className="container">
          <h2 className="text-center font-headline text-4xl font-bold">
            Por que escolher a Gordo Salgados?
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Gem className="size-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Ingredientes Premium</h3>
              <p className="text-foreground/70">
                Selecionamos apenas os melhores ingredientes, garantindo sabor e
                qualidade inigualáveis.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Zap className="size-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Fritos na Hora</h3>
              <p className="text-foreground/70">
                Seus salgados são preparados no momento do pedido, chegando
                quentinhos e crocantes até você.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Rocket className="size-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Entrega Rápida</h3>
              <p className="text-foreground/70">
                Receba seus salgados favoritos no conforto da sua casa, com
                rapidez e eficiência.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="depoimentos" className="container py-16 sm:py-24">
        <h2 className="text-center font-headline text-4xl font-bold">
          O que nossos clientes dizem
        </h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="mx-auto mt-12 w-full max-w-xs sm:max-w-2xl lg:max-w-4xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="h-full">
                    <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                      <Avatar className="mb-4 h-20 w-20">
                        <AvatarImage
                          src={testimonial.avatarUrl}
                          alt={testimonial.name}
                          data-ai-hint={testimonial.avatarHint}
                        />
                        <AvatarFallback>
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="mb-2 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`size-5 ${
                              i < testimonial.rating
                                ? 'fill-primary text-primary'
                                : 'text-muted-foreground/50'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mb-4 flex-1 text-sm italic text-foreground/80">
                        "{testimonial.quote}"
                      </p>
                      <p className="font-bold">{testimonial.name}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-8 sm:ml-4" />
          <CarouselNext className="mr-8 sm:mr-4" />
        </Carousel>
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
