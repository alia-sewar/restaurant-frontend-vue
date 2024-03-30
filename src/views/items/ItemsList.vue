<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { headers } from "@/shares/share";
import toast from "@/components/ToastBlock.vue";
import ModalCreateAd from "./ModalCreateAd.vue";

const BlockCreate = ref(null);
const ads = reactive({
  list: null,
});

const deleteAd = async (id) => {
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
        BlockCreate.value.statusLoading();
        const response = await axios
          .post(
            import.meta.env.VITE_API_URL + "/delete_ad",
            {
              id: id,
            },
            { headers: headers() }
          )
          .then((response) => {
            toast.fire("Success", "Deleted Ad successfully!", "success");
          })
          .catch((error) => {
            if (error.response) {
              return toast.fire("Oops...", error.response.data.message, "error");
            }
            return toast.fire("Oops...", "Something went wrong!", "error");
          })
          .finally(() => {
            getAds();
            BlockCreate.value.statusNormal();
          });
      }
    });
};
const getAds = async () => {
  const response = await axios
    .post(import.meta.env.VITE_API_URL + "/get_ads_list", {}, { headers: headers() })
    .then((response) => {
      ads.list = response.data.data;
    })
    .catch((error) => {
      if (error.response) {
        return toast.fire("Oops...", error.response.data.message, "error");
      }
      return toast.fire("Oops...", "Something went wrong!", "error");
    })
    .finally(() => {});
};

onMounted(async () => {
  await getAds();
});
</script>

<template>
  <div class="content">
    <BaseBlock title="Ad">
      <div class="row">
        <div class="col-lg-4">
          <div class="form-floating mb-4">
            <button
              type="button"
              class="btn btn-sm btn-alt-secondary"
              title="Create Ad"
              data-bs-toggle="modal"
              data-bs-target="#modal-create-ad"
            >
              Create Ad
            </button>
          </div>
        </div>
      </div>
    </BaseBlock>
  </div>
  <div class="content">
    <BaseBlock title="Ads" ref="BlockCreate">
      <div class="row items-push">
        <div class="col-md-4 animated fadeIn" v-for="ad in ads.list" :key="ad.id">
          <div class="options-container">
            <img class="img-fluid options-item" :src="ad.image" alt="Image" />
            <div class="options-overlay bg-black-75">
              <div class="options-overlay-content">
                <h3 class="h4 text-white mb-2">
                  {{ ad.title }}
                </h3>
                <div class="space-x-2">
                  <a
                    class="btn btn-sm btn-alt-secondary"
                    href="javascript:void(0)"
                    @click="deleteAd(ad.id)"
                  >
                    <i class="fa fa-times text-danger me-1"></i>
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseBlock>

    <ModalCreateAd @get-ads="getAds" />
  </div>
</template>
