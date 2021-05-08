import { storiesOf } from '@storybook/vue';
import VueContentTypeRichText from './VueContentTypeRichText.vue';

const story = storiesOf('Organisms|Contentful/ContentTypeRichText', module) as any;

story.add(
  'Default',
  () => ({
    components: { VueContentTypeRichText },
    template: `<vue-content-type-rich-text>VueContentTypeRichText</vue-content-type-rich-text>`,
  }),
  {
    info: {
      components: { VueContentTypeRichText },
    },
  },
);
