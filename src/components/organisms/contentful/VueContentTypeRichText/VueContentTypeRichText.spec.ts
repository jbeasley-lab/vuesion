import { render, RenderResult } from '@testing-library/vue';
import VueContentTypeRichText from './VueContentTypeRichText.vue';

describe('VueContentTypeRichText.vue', () => {
  let harness: RenderResult;

  beforeEach(() => {
    harness = render(VueContentTypeRichText, {
      stubs: ['nuxt-link'],
    });
  });

  test('renders component', () => {
    const { getByText } = harness;

    getByText('VueContentTypeRichText');
  });
});
