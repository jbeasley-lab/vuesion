import { Context } from '@nuxt/types';
import { defineNuxtPlugin, onGlobalSetup, provide } from '@nuxtjs/composition-api';
import { ApolloClients } from '@vue/apollo-composable/dist';

export default defineNuxtPlugin(({ app }: Context): void => {
  onGlobalSetup(() => {
    provide(ApolloClients, {
      default: app.apolloProvider.clients.default,
      contentful: app.apolloProvider.clients.contentful,
    });
  });
});
