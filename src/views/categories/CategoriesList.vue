<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import axios from "axios";
import { headers } from "@/shares/share";
import toast from "@/components/ToastBlock.vue";
import ModalCreateBank from "./ModalCreateBank.vue";
import ModalUpdateBank from "./ModalUpdateBank.vue";
import PaginationBlock from "@/components/PaginationBlock.vue";

const banks = reactive({
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
  () => getBanks()
);
const bank = ref(null);

const UpdateBank = async (data) => {
  bank.value = data;
};
const deactivateBank = async (id) => {
  toast
    .fire({
      title: "Are you sure?",
      text: "Please confirm!",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        confirmButton: "btn btn-danger m-1",
        cancelButton: "btn btn-secondary m-1",
      },
      confirmButtonText: "Yes, confirm it!",
      html: false,
      preConfirm: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 50);
        });
      },
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios
          .post(
            import.meta.env.VITE_API_URL + "/deactivate_deposit_bank",
            {
              id: id,
            },
            { headers: headers() }
          )
          .then(async (result) => {
            toast.fire("Success", "Bank deactivated successfully", "success");
          })
          .catch((error) => {
            if (error.response) {
              return toast.fire("Oops...", error.response.data.message, "error");
            }
            return toast.fire("Oops...", "Something went wrong!", "error");
          })
          .finally(() => {
            getBanks();
          });
      } else if (result.dismiss === "cancel") {
        toast.fire("Cancelled", "You have cancelled the action!", "error");
      }
    });
};
const activateBank = async (id) => {
  toast
    .fire({
      title: "Are you sure?",
      text: "Please confirm!",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        confirmButton: "btn btn-danger m-1",
        cancelButton: "btn btn-secondary m-1",
      },
      confirmButtonText: "Yes, confirm it!",
      html: false,
      preConfirm: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 50);
        });
      },
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios
          .post(
            import.meta.env.VITE_API_URL + "/activate_deposit_bank",
            {
              id: id,
            },
            { headers: headers() }
          )
          .then(async (response) => {
            toast.fire("Success", "Bank activate successfully", "success");
          })
          .catch((error) => {
            if (error.response) {
              return toast.fire("Oops...", error.response.data.message, "error");
            }
            return toast.fire("Oops...", "Something went wrong!", "error");
          })
          .finally(() => {
            getBanks();
          });
      } else if (result.dismiss === "cancel") {
        toast.fire("Cancelled", "You have cancelled the action!", "error");
      }
    });
};
const getBanks = async () => {
  const response = await axios
    .post(
      import.meta.env.VITE_API_URL + "/get_deposit_banks",
      { page: state.currentPage },
      { headers: headers() }
    )
    .then(async (response) => {
      banks.list = response.data.data;
      state.lastPage = response.data.last_page;
      state.total = response.data.total;
      state.from = response.data.from;
      state.to = response.data.to;
    })
    .catch((error) => {})
    .finally(() => {
      //getBanks();
    });
};
onMounted(async () => {
  await getBanks();
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
              data-bs-target="#modal-create-bank"
            >
              Create New Bank
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
              <th>Bank</th>
              <th>Active</th>
              <th>Created At</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(bank, index) in banks.list" :key="bank.id">
              <td class="text-center">
                {{ index + 1 }}
              </td>
              <td class="fw-semibold fs-sm">
                {{ bank.name }}
              </td>
              <td>
                <span v-if="bank.is_active == 1" class="text-success"> Active </span>
                <span v-else class="text-danger"> Inactive </span>
              </td>
              <td>
                {{ new Date(bank.created_at).toLocaleString() }}
              </td>
              <td class="text-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-alt-warning"
                    title="Deactivate Bank"
                    v-if="bank.is_active == 1"
                    @click="deactivateBank(bank.id)"
                  >
                    <i>Deactivate bank</i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-alt-success"
                    title="Activate Bank"
                    v-if="bank.is_active == 0"
                    @click="activateBank(bank.id)"
                  >
                    <i>Activate bank</i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-alt-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-update-bank"
                    title="Delete New bank"
                    @click="UpdateBank(bank)"
                  >
                    <i>Update bank</i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- END Recent Orders Table -->

      <pagination-block
        :total="state.total"
        :to="state.to"
        :from="state.from"
        :lastPage="state.lastPage"
        v-model:currentPage="state.currentPage"
      />
    </BaseBlock>
    <ModalCreateBank @getBanks="getBanks" />
    <ModalUpdateBank @getBanks="getBanks" :bank="bank" />
  </div>
</template>
