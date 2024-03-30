<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { headers } from "@/shares/share";
import { useUserStore } from "@/stores/user";
import toast from "@/components/ToastBlock.vue";

const userStore = useUserStore();
const loggedUserName = ref(userStore.user);
</script>

<template>
  <!-- Hero -->
  <div class="content">
    <div
      class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-2 text-center text-md-start"
    >
      <div class="flex-grow-1 mb-1 mb-md-0">
        <h1 class="h3 fw-bold mb-2">Dashboard</h1>
        <h2 class="h6 fw-medium fw-medium text-muted mb-0">
          Welcome <a href="">{{ loggedUserName }}</a> , everything looks great.
        </h2>
      </div>
    </div>
  </div>

  <!-- END Hero -->
  <!-- Page Content -->
  <div class="content">
    <!-- Overview -->
  </div>
</template>
