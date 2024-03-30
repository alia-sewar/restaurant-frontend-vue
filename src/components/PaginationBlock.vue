@ -1,128 +0,0 @@
<script setup>
import {
  reactive,
  defineProps,
  defineEmits,
  watchEffect,
  watch,
  toRef,
  computed,
} from "vue";

const props = defineProps({
  from: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  to: {
    type: Number,
    required: true,
  },
  lastPage: {
    type: Number,
    required: true,
  },
});

const total = toRef(props, "total");
const from = toRef(props, "from");
const to = toRef(props, "to");
const lastPage = toRef(props, "lastPage");

const state = reactive({
  from: null,
  total: null,
  to: null,
  lastPage: null,
  currentPage: 1,
});

watch(
  [total, from, to, lastPage],
  ([totalVal, fromVal, toVal, lastPageVal]) => {
    state.total = totalVal;
    state.from = fromVal;
    state.to = toVal;
    state.lastPage = lastPageVal;
  }
);

const emit = defineEmits(["update:currentPage"]);

// Emit the `currentPage` value whenever it changes
watchEffect(() => {
  emit("update:currentPage", state.currentPage);
});

const morePages = "....";
const disabledPrevious = computed(() => state.currentPage === 1);
const disabledNext = computed(
  () => state.currentPage === state.lastPage || state.lastPage === 0
);
</script>
<template>
  <div class="block-content block-content-full bg-body-light">
    <div class="d-flex justify-content-between">
      <div class="p-2 bd-highlight">
        <span>
          Showing {{ state.from }} to {{ state.to }} of
          {{ state.total }} entries
        </span>
      </div>
      <div class="p-2 bd-highlight">
        <!-- Pagination -->
        <ul class="pagination">
          <li :class="['page-item', disabledPrevious && 'disabled']">
            <a
              class="page-link"
              href="#"
              :tabindex="disabledPrevious && '-1'"
              :aria-disabled="disabledPrevious && 'true'"
              @click.prevent="
                state.currentPage > 1 ? (state.currentPage -= 1) : 1
              "
            >
              Prev
            </a>
          </li>

          <template v-for="(item, index) in state.lastPage" :key="index">
            <li
              :class="[
                'page-item',
                item === state.currentPage && 'active',
                item === morePages && 'disabled',
                item > state.currentPage + 1 && item !== morePages && 'd-none',
              ]"
            >
              <a
                v-if="item !== morePages"
                class="page-link"
                href="#"
                @click.prevent="state.currentPage = item"
              >
                {{ item }}
              </a>
              <span v-else>...</span>
            </li>
          </template>

          <li :class="['page-item', disabledNext && 'disabled']">
            <a
              class="page-link"
              href="#"
              :tabindex="disabledNext && '-1'"
              :aria-disabled="disabledNext && 'true'"
              @click.prevent="
                state.currentPage < state.lastPage
                  ? (state.currentPage += 1)
                  : state.lastPage
              "
            >
              Next
            </a>
          </li>
        </ul>
        <!-- END Pagination -->
      </div>
    </div>
  </div>
</template>
