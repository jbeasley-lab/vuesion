import { Context } from '@nuxt/types';
import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { transformAxiosToFetch } from '@/plugins/axios/transform-axios-to-fetch';

export default ({ $axios, $config, store }: Context) => {
  const httpLink = createHttpLink({
    uri: $config.apollo.contentfulURL,
    fetch: transformAxiosToFetch($axios),
  });
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
      __schema: {
        types: [],
      },
    },
  });
  const localeHeaderLink = setContext((_, previousContext) => {
    const { headers } = previousContext;

    return {
      ...previousContext,
      headers: {
        ...headers,
        Authorization: `Bearer ${$config.apollo.contentfulToken}`,
      },
    };
  });

  const link = localeHeaderLink.concat(httpLink);

  return {
    link,
    defaultHttpLink: false,
    cache: new InMemoryCache({ fragmentMatcher }),
  };
};
