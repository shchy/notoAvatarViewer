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
import { NotoItem, assets } from "@/components/avatar";

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
    };

    // 適当に生成
    const test = assets.filter(
      (x) =>
        (x.category == "face" && x.id == 10) ||
        (x.category == "eyes" && x.id == 5) ||
        (x.category == "eyebrows" && x.id == 10) ||
        (x.category == "mouth" && x.id == 18) ||
        (x.category == "nose" && x.id == 3) ||
        (x.category == "details" && x.id == 0) ||
        (x.category == "beard" && x.id == 0) ||
        (x.category == "glasses" && x.id == 0) ||
        (x.category == "hairstyle" && x.id == 6) ||
        (x.category == "accessories" && x.id == 0) ||
        (x.category == "festival" && x.id == 0)
    );
    for (const item of test) {
      state.avatar.set(item.category, item);
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
