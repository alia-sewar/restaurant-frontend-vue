<script setup>
import { reactive, computed, ref } from "vue";
import axios from "axios";
import { headerUploadFiles } from "@/shares/share";
import useVuelidate from "@vuelidate/core";
import { required, minLength, url, requiredIf } from "@vuelidate/validators";
import toast from "@/components/ToastBlock.vue";

const BlockCreate = ref(null);
const file = ref(null);
// Input state variables
const state = reactive({
  title: null,
  link: null,
  image: null,
});
const emit = defineEmits(["getAds"]);
//Input image
async function handleFileUpload(event) {
  state.image = event.target.files[0];
}
function getAds() {
  emit("getAds");
}
// Validation rules
const rules = computed(() => {
  return {
    title: {
      required,
      minLength: minLength(3),
    },
    link: {
      required,
      url,
    },
    image: {
      required: requiredIf(() => file.value.files.length == 0),
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
      import.meta.env.VITE_API_URL + "/create_ad",
      {
        title: state.title,
        link: state.link,
        image: state.image,
      },
      {
        headers: headerUploadFiles(),
      }
    )
    .then((response) => {
      toast.fire("Success", "Added Ad successfully!", "success");
    })
    .catch((error) => {
      if (error.response) {
        return toast.fire("Oops...", error.response.data.message, "error");
      }
      return toast.fire("Oops...", "Something went wrong!", "error");
    })
    .finally(() => {
      state.title = null;
      state.link = null;
      state.image = null;
      getAds();
      BlockCreate.value.statusNormal();
    });
}
</script>

<template>
  <div
    class="modal"
    id="modal-create-ad"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-create-ad"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <BaseBlock ref="BlockCreate" title="Create AD" transparent class="mb-0">
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
                      <label class="form-label" for="title"
                        >Title <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        id="title"
                        class="form-control"
                        :class="{
                          'is-invalid': v$.title.$errors.length,
                        }"
                        v-model="state.title"
                        @blur="v$.title.$touch"
                        placeholder="Enter a Title.."
                      />
                      <div
                        v-if="v$.title.$errors.length"
                        class="invalid-feedback animated fadeIn"
                      >
                        Please enter a title.
                      </div>
                    </div>

                    <div class="mb-4">
                      <label class="form-label" for="link"
                        >URL <span class="text-danger">*</span></label
                      >
                      <input
                        type="url"
                        id="link"
                        class="form-control"
                        :class="{
                          'is-invalid': v$.link.$errors.length,
                        }"
                        v-model="state.link"
                        @blur="v$.link.$touch"
                        placeholder="Enter a link.. http://example.com"
                      />
                      <div
                        v-if="v$.link.$errors.length"
                        class="invalid-feedback animated fadeIn"
                      >
                        Please enter a link.
                      </div>
                    </div>
                    <div class="mb-4">
                      <label class="form-label" for="image"
                        >Image <span class="text-danger">*</span></label
                      >
                      <input
                        class="form-control"
                        type="file"
                        id="image"
                        ref="file"
                        accept="image/jpg"
                        @change="handleFileUpload"
                        @blur="v$.image.$touch"
                        :class="{
                          'is-invalid': v$.image.$errors.length,
                        }"
                        placeholder="Enter a image.. "
                      />
                      <div
                        v-if="v$.image.$errors.length"
                        class="invalid-feedback animated fadeIn"
                      >
                        Please enter a image.
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
