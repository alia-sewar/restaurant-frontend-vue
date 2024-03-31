<script setup>
import { reactive, computed, ref, toRef, watch } from "vue";
import axios from "axios";
import { headers } from "@/shares/share";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import toast from "../../components/ToastBlock.vue";

const BlockBank = ref(null);
const props = defineProps({
  bank: {
    type: Object,
  },
});

// Input state variables
const state = reactive({
  name: null,
});
const emit = defineEmits(["getBanks"]);

function getBanks() {
  emit("getBanks");
}
const bank = toRef(props, "bank");
watch(bank, (val) => {
  state.name = val.name;
  state.id = val.id;
});
// Validation rules
const rules = computed(() => {
  return {
    name: {
      required,
      minLength: minLength(3),
    },
  };
});

// Use vuelidate
const v$ = useVuelidate(rules, state);

// On form submission
async function onSubmit() {
  BlockBank.value.statusLoading();
  const result = await v$.value.$validate();

  if (!result) {
    BlockBank.value.statusNormal();
    return;
  }

  // perform async actions
  const response = await axios
    .post(
      import.meta.env.VITE_API_URL + "/edit_bank",
      {
        ...state,
      },
      {
        headers: headers(),
      }
    )
    .then(async (result) => {
      toast.fire("Success", "Bank created successfully", "success");
    })
    .catch((error) => {
      if (error.response) {
        return toast.fire("Oops...", error.response.data.message, "error");
      }
      return toast.fire("Oops...", "Something went wrong!", "error");
    })
    .finally(() => {
      state.name = null;
      getBanks();
      BlockBank.value.statusNormal();
    });
}
</script>

<template>
  <div
    class="modal"
    id="modal-update-bank"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-update-bank"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <BaseBlock ref="BlockBank" title="Update Bank" transparent class="mb-0">
          <template #options>
            <button
              type="button"
              class="btn-block-option"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="fa fa-fw fa-times"></i>
            </button>
          </template>

          <template #content>
            <form @submit.prevent="onSubmit">
              <BaseBlock content-full>
                <div class="row items-push">
                  <div class="col-12">
                    <div class="mb-4">
                      <label class="form-label" for="name"
                        >Bank Name <span class="text-danger">*</span></label
                      >
                      <br />
                      <br />
                      <input
                        type="text"
                        id="name"
                        class="form-control"
                        :class="{
                          'is-invalid': v$.name.$errors.length,
                        }"
                        v-model="state.name"
                        @blur="v$.name.$touch"
                        placeholder="Enter a Bank Name.."
                      />
                      <div
                        v-if="v$.name.$errors.length"
                        class="invalid-feedback animated fadeIn"
                      >
                        Please enter a Bank Name.
                      </div>
                    </div>
                  </div>
                </div>
                <!-- END Advanced -->

                <div class="row items-push">
                  <div class="col-lg-7 offset-lg-4">
                    <button type="submit" class="btn btn-alt-primary">Submit</button>
                  </div>
                </div>
              </BaseBlock>
            </form>
            <div class="block-content block-content-full text-end bg-body">
              <button
                type="button"
                class="btn btn-sm btn-alt-secondary me-1"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>
