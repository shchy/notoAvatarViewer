<template>
  <div class="root" @click="download" ref="viewer">
    <img
      class="parts"
      v-for="v in ordered"
      :key="`${v.category}_${v.id}`"
      :src="toPath(v)"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import {
  NotoItem,
  toPath,
  orderByCategory,
  elementToDataURI,
  downloadURI,
} from "@/components/avatar";

export default defineComponent({
  name: "AvatarViewer",
  props: {
    avatar: {
      type: Map as PropType<Map<string, NotoItem>>,
      required: true,
    },
  },
  setup(props) {
    const viewer = ref<HTMLElement>();
    const ordered = computed(() =>
      Array.from(props.avatar.values()).sort((x, y) => orderByCategory(x, y))
    );
    const download = async () => {
      if (viewer.value === undefined) {
        return;
      }
      const datauri = await elementToDataURI(viewer.value, {
        width: 1280,
        height: 1280,
      });
      downloadURI(datauri, "test.svg");
    };
    return {
      ordered,
      toPath,
      download,
      viewer,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.root {
  height: 100%;
  display: grid;
  .parts {
    overflow: hidden;
    // width: 100%;
    height: 100%;
    object-fit: scale-down;
    grid-row: 1;
    grid-column: 1;
  }
}
</style>
