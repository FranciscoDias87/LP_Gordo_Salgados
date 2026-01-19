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
import {
  Clock,
  Gem,
  MapPin,
  PartyPopper,
  Phone,
  Rocket,
  Star,
  Zap,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';

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
            <Link
              href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido%20na%20Gordo%20Salgados."
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="mr-2" />
              Pedir Agora
            </Link>
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
                      <Button asChild>
                        <Link
                          href={`https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20pedir%20o%20item:%20${encodeURIComponent(
                            item.name
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Adicionar
                        </Link>
                      </Button>
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
              <WhatsAppIcon className="mr-2 h-6 w-6" />
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
          Onde Estamos
        </h2>
        <p className="mt-4 text-center text-lg text-foreground/80">
          Venha nos fazer uma visita e retirar seus salgados quentinhos!
        </p>
        <div className="relative mt-8 h-80 w-full overflow-hidden rounded-2xl shadow-lg md:h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.7840473891063!2d-46.6565719850228!3d-23.54027788469345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce583f7d6e5d2b%3A0x8f2d5f8f8f8f8f8f!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1678886543210!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização da Gordo Salgados"
          ></iframe>
        </div>
      </section>
      <section id="contato" className="container py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-headline text-4xl font-bold">
            Entre em Contato
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Estamos prontos para atender você!
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center gap-2">
              <MapPin className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Endereço</h3>
              <p className="text-foreground/70">
                Av. dos Sabores, 123
                <br />
                Bairro da Gula, Cidade - UF
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Phone className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">WhatsApp</h3>
              <p className="text-foreground/70">(11) 99999-9999</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Horário</h3>
              <p className="text-foreground/70">
                Seg a Sáb: 10h às 22h
                <br />
                Dom: 16h às 22h
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
