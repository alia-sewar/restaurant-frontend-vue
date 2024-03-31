<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import axios from "axios";
import { headers } from "@/shares/share";
import ModalCreateItem from "./ModalCreateItem.vue";
import PaginationBlock from "@/components/PaginationBlock.vue";

const items = reactive({
  list: null,
});
const state = reactive({
  loading: false,
  currentPage: 1,
  lastPage: null,
  total: null,
  from: null,
  to: null,
});
watch(
  () => state.currentPage,
  () => getItems()
);
const item = ref(null);

const UpdateItem = async (data) => {
  item.value = data;
};
const getItems = async () => {
  const response = await axios
    .post(
      import.meta.env.VITE_API_URL_USER + "/items",
      { page: state.currentPage },
      { headers: headers() }
    )
    .then(async (response) => {
      items.list = response.data.data.data;
      state.lastPage = response.data.data.last_page;
      state.total = response.data.data.total;
      state.from = response.data.data.from;
      state.to = response.data.data.to;
    })
    .catch((error) => {})
    .finally(() => {});
};
onMounted(async () => {
  await getItems();
});
</script>

<template>
  <div class="content">
    <BaseBlock title="items">
      <div class="row">
        <div class="col-lg-4">
          <div class="form-floating mb-4">
            <button
              type="button"
              class="btn btn-sm btn-alt-secondary"
              title="Create New item"
              data-bs-toggle="modal"
              data-bs-target="#modal-create-item"
            >
              Create New Item
            </button>
          </div>
        </div>
      </div>
    </BaseBlock>
  </div>

  <div class="content">
    <BaseBlock title="items">
      <template #options>
        <button type="button" class="btn-block-option">
          <i class="si si-settings"></i>
        </button>
      </template>
      <div class="table-responsive">
        <table class="table table-bordered table-striped table-vcenter">
          <thead>
            <tr>
              <th class="text-center">#</th>
              <th>Item</th>
              <th>Active</th>
              <th>Created By</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items.list" :key="item.id">
              <td class="text-center">
                {{ index + 1 }}
              </td>
              <td class="fw-semibold fs-sm">
                {{ item.name }}
              </td>
              <td>
                <span v-if="item.is_active == 1" class="text-success"> Active </span>
                <span v-else class="text-danger"> Inactive </span>
              </td>
              <td>
                {{ item.added_by }}
              </td>
              <td class="text-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-alt-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-update-item"
                    title="Delete New item"
                    @click="UpdateItem(item)"
                  >
                    <i>Update item</i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- END Recent Orders Table -->
      <div v-if="items.list">
        <pagination-block
          :total="state.total"
          :to="state.to"
          :from="state.from"
          :lastPage="state.lastPage"
          v-model:currentPage="state.currentPage"
        />
      </div>
    </BaseBlock>
    <ModalCreateItem @getItems="getItems" />
  </div>
</template>
