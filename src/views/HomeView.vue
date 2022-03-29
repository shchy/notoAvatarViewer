<template>
  <div class="home">
    <AvatarViewer class="viewer" :avatar="state.avatar" />
    <SelectAssets class="selector" @select-avatar="selectedAvatar" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import SelectAssets from "@/components/avatar/SelectAssets.vue";
import AvatarViewer from "@/components/avatar/AvatarViewer.vue";
import {
  NotoItem,
  assets,
  NotoCategory,
  update_query_parameters,
} from "@/components/avatar";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "HomeView",
  components: {
    SelectAssets,
    AvatarViewer,
  },
  setup() {
    const state = reactive({
      avatar: new Map(),
    });
    const selectedAvatar = (x: NotoItem) => {
      state.avatar.set(x.category, x);
      update_query_parameters(x.category, x.id);
    };

    // クエリパラメータから初期化
    const route = useRoute();
    for (const category of Object.values(NotoCategory)) {
      const id = Number.parseInt((route.query[category] as string) ?? "0");
      const part = assets.find((x) => x.category == category && x.id == id);
      if (part === undefined) continue;
      selectedAvatar(part);
    }

    return {
      state,
      selectedAvatar,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  .viewer {
    flex: 1;
    align-self: center;
    justify-content: center;
    height: calc(100% - 15rem);
  }
  .selector {
    height: auto;
  }
}
</style>
