<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import axios from "axios";
import { headers } from "@/shares/share";
import ModalCreateSubCategory from "./ModalCreateSubCategory.vue";
import ModalUpdateSubCategory from "./ModalUpdateSubCategory.vue";
import PaginationBlock from "@/components/PaginationBlock.vue";

const subCategories = reactive({
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
  () => getSubCategories()
);
const subCategory = ref(null);

const updateSubCategory = async (data) => {
  subCategory.value = data;
};
const getSubCategories = async () => {
  const response = await axios
    .post(
      import.meta.env.VITE_API_URL_USER + "/sub-categories",
      { page: state.currentPage },
      { headers: headers() }
    )
    .then(async (response) => {
      subCategories.list = response.data.data.data;
      state.lastPage = response.data.data.last_page;
      state.total = response.data.data.total;
      state.from = response.data.data.from;
      state.to = response.data.data.to;
    })
    .catch((error) => {})
    .finally(() => {});
};
onMounted(async () => {
  await getSubCategories();
});
</script>

<template>
  <div class="content">
    <BaseBlock title="Sub Category">
      <div class="row">
        <div class="col-lg-4">
          <div class="form-floating mb-4">
            <button
              type="button"
              class="btn btn-sm btn-alt-secondary"
              title="Create New Sub Category"
              data-bs-toggle="modal"
              data-bs-target="#modal-create-sub-category"
            >
              Create New Sub Category
            </button>
          </div>
        </div>
      </div>
    </BaseBlock>
  </div>

  <div class="content">
    <BaseBlock title="Sub Category">
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
              <th>Sub Category</th>
              <th>Active</th>
              <th>Created By</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(subCategory, index) in subCategories.list"
              :key="subCategory.id"
            >
              <td class="text-center">
                {{ index + 1 }}
              </td>
              <td class="fw-semibold fs-sm">
                {{ subCategory.name }}
              </td>
              <td>
                <span v-if="subCategory.is_active == 1" class="text-success">
                  Active
                </span>
                <span v-else class="text-danger"> Inactive </span>
              </td>
              <td>
                {{ subCategory.added_by }}
              </td>
              <td class="text-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-alt-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-update-sub-category"
                    title="Delete New sub category"
                    @click="updateSubCategory(subCategory)"
                  >
                    <i>Update sub category</i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- END Recent Orders Table -->
      <div v-if="subCategories.list">
        <pagination-block
          :total="state.total"
          :to="state.to"
          :from="state.from"
          :lastPage="state.lastPage"
          v-model:currentPage="state.currentPage"
        />
      </div>
    </BaseBlock>
    <ModalCreateSubCategory @getSubCategories="getSubCategories" />
    <ModalUpdateSubCategory
      @getSubCategories="getSubCategories"
      :subCategory="subCategory"
    />
  </div>
</template>
