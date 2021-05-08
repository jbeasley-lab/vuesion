<template>
  <div :class="$style.vueContentBlock">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'VueContentBlock',
  components: {},
  props: {},
  setup() {
    return {};
  },
});
</script>

<style lang="scss" module>
@import '~@/assets/_design-system';

.vueContentBlock {
  width: calc(100% - #{$space-32});
  margin: 0 auto;
  position: relative;

  @include mediaMin(tabletPortrait) {
    max-width: calc(#{$screen-tablet-portrait-min} - #{$space-32});
  }

  @include mediaMin(tabletLandscape) {
    max-width: calc(#{$screen-tablet-landscape-min} - #{$space-64});
  }

  @include mediaMin(smallDesktop) {
    max-width: calc(#{$screen-small-desktop-min} - #{$space-64});
  }

  @include mediaMin(largeDesktop) {
    max-width: calc(#{$screen-large-desktop-min} - #{$space-128});
  }
}
</style>
