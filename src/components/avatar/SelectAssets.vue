<template>
  <div class="root">
    <div class="tabs">
      <ul class="categorys">
        <li
          class="category"
          v-for="category in categorys"
          :key="category"
          @click="state.selectedCategory = category"
        >
          {{ category }}
        </li>
      </ul>
    </div>
    <div class="images">
      <img
        class="parts"
        v-for="item in assetsInCategory"
        :key="item"
        :src="toPath(item)"
        @click="selectItem(item)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { assets, categorys, NotoItem, toPath } from "@/components/avatar";

export default defineComponent({
  name: "SelectAssets",
  emits: ["select-avatar"],
  setup(props, { emit }) {
    const state = reactive({
      selectedCategory: categorys[0],
    });

    const assetsInCategory = computed(() =>
      assets.filter((x) => x.category == state.selectedCategory)
    );

    const selectItem = (x: NotoItem) => {
      emit("select-avatar", x);
    };

    return {
      state,
      assets,
      assetsInCategory,
      categorys: categorys,
      selectItem,
      toPath,
    };
  },
});
</script>

<style scoped lang="scss">
.root {
  display: flex;
  flex-direction: column;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-top: 1px solid black;

  .tabs {
    ul {
      list-style: none;
      display: flex;
      overflow-x: auto;
      padding-bottom: 0.5rem;
      margin: 0;
      padding: 0;
      li {
        padding: 0.5rem;
        cursor: pointer;
        &:hover {
          font-weight: bold;
        }
      }
    }
  }
  .images {
    flex: 1;
    display: flex;
    align-items: center;
    overflow-x: auto;
    padding-bottom: 0.5rem;

    .parts {
      height: 96px;
      width: 96px;
      min-height: 96px;
      min-width: 96px;
      overflow: hidden;
      object-fit: scale-down;

      border: 1px solid black;
    }
  }
}
</style>
