<template>
    <div class="block-content border-bottom">
        <!-- Search Form -->

        <div class="push">
            <div class="input-group">
                <input
                    type="search"
                    placeholder="Search..."
                    id="one-ecom-orders-search"
                    v-model="search"
                    @input="search"
                    v-on:keyup="searchClick()"
                    class="form-control form-control-alt"
                />
                <span class="input-group-text bg-body border-0 py-3">
                    <i class="fa fa-search"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    search: {
        type: String,
        default: "",
    },
    methods: {
        searchClick() {
            this.$emit("search", this.search);
        },
    },
    watch: {
        search() {
            this.searchClick();
        },
    },
};
</script>

<style></style>
