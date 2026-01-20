
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Ajuste este valor em produção, ou use tracesSampler para maior controle
  tracesSampleRate: 1,

  // Definir como true imprimirá informações úteis no console durante a configuração
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // Isso define a taxa de amostragem para 10%. Você pode querer que seja 100% em
  // desenvolvimento e uma taxa menor em produção
  replaysSessionSampleRate: 0.1,

  // Você pode remover esta opção se não planeja usar o recurso Sentry Session Replay:
  integrations: [
    Sentry.replayIntegration({
      // Configuração adicional de Replay vai aqui,
      // por exemplo, você pode mascarar todo o texto no replay
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
