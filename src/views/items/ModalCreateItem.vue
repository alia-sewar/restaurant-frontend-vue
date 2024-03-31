<script setup>
import { reactive, computed, ref } from "vue";
import axios from "axios";
import { headers } from "@/shares/share";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import toast from "@/components/ToastBlock.vue";

const BlockCreate = ref(null);
// Input state variables
const state = reactive({
  item: null,
  sub_category_id: null,
});
const emit = defineEmits(["getItem"]);

function getItem() {
  emit("getItem");
}
// Validation rules
const rules = computed(() => {
  return {
    item: {
      required,
      minLength: minLength(3),
    },
    sub_category_id: {
      required,
    },
  };
});

// Use vuelidate
const v$ = useVuelidate(rules, state);

// On form submission
async function onSubmit() {
  BlockCreate.value.statusLoading();
  const result = await v$.value.$validate();

  if (!result) {
    BlockCreate.value.statusNormal();
    // notify user form is invalid
    return;
  }
  // perform async actions
  const response = await axios
    .post(
      import.meta.env.VITE_API_URL_USER + "/items/create",
      {
        item: state.item,
        sub_category_id: state.sub_category_id,
      },
      {
        headers: headers(),
      }
    )
    .then((response) => {
      toast.fire("Success", "Added Item successfully!", "success");
    })
    .catch((error) => {
      if (error.response) {
        return toast.fire("Oops...", error.response.data.message, "error");
      }
      return toast.fire("Oops...", "Something went wrong!", "error");
    })
    .finally(() => {
      state.item = null;
      state.sub_category_id = null;
      getItem();
      BlockCreate.value.statusNormal();
    });
}
</script>

<template>
  <div
    class="modal"
    id="modal-create-item"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-create-item"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <BaseBlock ref="BlockCreate" title="Create Title" transparent class="mb-0">
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
                      <label class="form-label" for="item"
                        >item <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        id="item"
                        class="form-control"
                        :class="{
                          'is-invalid': v$.item.$errors.length,
                        }"
                        v-model="state.item"
                        @blur="v$.item.$touch"
                        placeholder="Enter a item.."
                      />
                      <div
                        v-if="v$.item.$errors.length"
                        class="invalid-feedback animated fadeIn"
                      >
                        Please enter a item.
                      </div>
                    </div>
                  </div>
                </div>

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
