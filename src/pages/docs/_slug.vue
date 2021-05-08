<template>
  <div v-if="loading === false" :class="$style.index">
    <component :is="item.component" v-for="(item, idx) in contentItems" :key="idx" v-bind="{ ...item.props }" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useMeta, useContext, Ref } from '@nuxtjs/composition-api';
import { useQuery, useResult } from '@vue/apollo-composable/dist';
import {
  ContentTypeRichText,
  GetDocsPageDataQuery,
  GetDocsPageDataQueryVariables,
  Page,
} from '@/interfaces/graphql/types';
import { GetDocsPageData } from '@/graphql/DocsPage';
import VueContentTypeRichText from '@/components/organisms/contentful/VueContentTypeRichText/VueContentTypeRichText.vue';

interface IContentItem {
  component: string;
  props: Partial<ContentTypeRichText>;
}

export default defineComponent({
  name: 'DocsPage',
  auth: false,
  components: { VueContentTypeRichText },
  setup() {
    const { app, route } = useContext();
    const slug = computed(() => route.value.params.slug || '/');
    const { loading, result } = useQuery<GetDocsPageDataQuery, GetDocsPageDataQueryVariables>(
      GetDocsPageData,
      { slug: slug.value, locale: app.i18n.locale },
      { clientId: 'contentful' },
    );
    const pageData: Ref<Partial<Page>> = useResult(result, null, (data) => data.pageCollection.items[0]);
    const pageTitle = computed<string>(() => pageData.value?.title);
    const pageDescription = computed<string>(() => pageData.value?.metaDescription);
    const contentItems = computed(() => {
      if (pageData.value?.contentCollection?.items) {
        return pageData.value.contentCollection.items.map(
          (contentItem): IContentItem => {
            const component = `Vue${contentItem.__typename}`;
            const props: IContentItem['props'] = {
              fullWidth: contentItem.fullWidth,
              text: contentItem.text,
            };

            return {
              component,
              props,
            };
          },
        );
      }

      return [];
    });
    // const linkedEntries = ref<Partial<Page>>([]);

    useMeta(() => ({
      title: pageTitle.value,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: pageDescription.value,
        },
      ],
    }));

    if (!pageData.value) {
      // error({ statusCode: 404, message: 'Page not Found' });
    }

    return {
      loading,
      contentItems,
    };
  },
  head: {},
});
</script>

<style lang="scss" module>
@import '~@/assets/design-system';

.index {
  margin-top: $nav-bar-height;
}
</style>
