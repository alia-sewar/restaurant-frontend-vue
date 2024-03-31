<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import axios from "axios";
import { headers } from "@/shares/share";
import ModalCreateCategory from "./ModalCreateCategory.vue";
import ModalUpdateCategory from "./ModalUpdateCategory.vue";
import PaginationBlock from "@/components/PaginationBlock.vue";

const categories = reactive({
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
  () => getCategories()
);
const category = ref(null);

const UpdateCategory = async (data) => {
  category.value = data;
};
const getCategories = async () => {
  const response = await axios
    .post(
      import.meta.env.VITE_API_URL_USER + "/categories",
      { page: state.currentPage },
      { headers: headers() }
    )
    .then(async (response) => {
      categories.list = response.data.data.data;

      console.log(categories.list);
      state.lastPage = response.data.data.last_page;
      state.total = response.data.data.total;
      state.from = response.data.data.from;
      state.to = response.data.data.to;
    })
    .catch((error) => {})
    .finally(() => {});
};
onMounted(async () => {
  await getCategories();
});
</script>

<template>
  <div class="content">
    <BaseBlock title="Banks">
      <div class="row">
        <div class="col-lg-4">
          <div class="form-floating mb-4">
            <button
              type="button"
              class="btn btn-sm btn-alt-secondary"
              title="Create New Bank"
              data-bs-toggle="modal"
              data-bs-target="#modal-create-category"
            >
              Create New Category
            </button>
          </div>
        </div>
      </div>
    </BaseBlock>
  </div>

  <div class="content">
    <BaseBlock title="Banks">
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
              <th>Category</th>
              <th>Active</th>
              <th>Created By</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in categories.list" :key="category.id">
              <td class="text-center">
                {{ index + 1 }}
              </td>
              <td class="fw-semibold fs-sm">
                {{ category.name }}
              </td>
              <td>
                <span v-if="category.is_active == 1" class="text-success"> Active </span>
                <span v-else class="text-danger"> Inactive </span>
              </td>
              <td>
                {{ category.added_by }}
              </td>
              <td class="text-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-alt-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-update-category"
                    title="Delete New category"
                    @click="UpdateCategory(category)"
                  >
                    <i>Update category</i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- END Recent Orders Table -->
      <div v-if="categories.list">
        <pagination-block
          :total="state.total"
          :to="state.to"
          :from="state.from"
          :lastPage="state.lastPage"
          v-model:currentPage="state.currentPage"
        />
      </div>
    </BaseBlock>
    <ModalCreateCategory @getCategories="getCategories" />
    <ModalUpdateCategory @getCategories="getCategories" :category="category" />
  </div>
</template>
