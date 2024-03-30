<script setup>
import { reactive, computed, ref } from "vue";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import FlatPickr from "vue-flatpickr-component";
import toast from "@/components/ToastBlock.vue";

// Vuelidate, for more info and examples you can check out https://github.com/vuelidate/vuelidate
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
const BlockCreateMasterCardProfil = ref(null);
const userStore = useUserStore();

const props = defineProps({ masterCardRequestID: Number });

// Input state variables
const state = reactive({
    issue_date: null,
    accepted_documents: null,
    nationality: null,
});

//
// Example options for select
const nationalities = reactive([
    { value: null, text: "Select Nationality" },
    { value: "Australian", text: "Australia" },
    { value: "Austrian", text: "Austria" },
    { value: "Andorran", text: "Andorra" },
    { value: "Afghan", text: "Afghanistan" },
    { value: "Antiguan and Barbudan", text: "Antigua and Barbuda" },
    { value: "Anguillan", text: "Anguilla" },
    { value: "Samoan", text: "American Samoa" },
    { value: "Albanian", text: "Albania" },
    { value: "Algerian", text: "Algeria" },
    { value: "Armenian", text: "Armenia" },
    { value: "Angolan", text: "Angola" },
    { value: "Argentinian", text: "Argentina" },
    { value: "American Samoan", text: "American Samoa" },
    { value: "Austrian", text: "Austria" },
    { value: "Aruban", text: "Aruba" },
    { value: "Landers", text: "Aland Islands" },
    { value: " Azerbaijani", text: "Azerbaijan" },
    { value: " Bosnian", text: "Bosnian" },
    { value: " Barbadian", text: "Barbados" },
    { value: "Bangladeshi", text: "Bangladesh" },
    { value: " Belgian", text: "Belgium" },
    { value: " Burkinab", text: "Burkina Faso" },
    { value: " Bulgarian", text: "Bulgaria" },
    { value: " Bahraini", text: "Bahrain" },
    { value: " Burundian", text: "Burundi" },
    { value: " Beninese", text: "Benin" },
    { value: " Bermudian", text: "Bermuda" },
    { value: " Bruneian", text: "Brunei Darussalam" },
    { value: " Bolivian", text: "Bolivia" },
    { value: " Brazilian", text: "Brazil" },
    { value: " Bahamian", text: "Bahamas" },
    { value: " Bhutanese", text: "Bhutan" },
    { value: " Bouvet Island", text: "Bouvet Island" },
    { value: " Tswana", text: "Botswana" },
    { value: " Belizian", text: "Belize" },
    { value: " Bolivian", text: "Bolivia" },
    { value: "Belgian", text: "Belgium" },
    { value: "Bulgarian", text: "Bulgaria" },
    { value: "Chadian", text: "Chad" },
    { value: "Canadian", text: "Canada" },
    { value: "Cambodian", text: "Cambodia" },
    { value: "Cook Islander", text: "Cook Islands" },
    { value: "Chilean", text: "Chile" },
    { value: "Cameroonian", text: "Cameroon" },
    { value: "Costa Rican", text: "Costa Rica" },
    { value: "Comoran", text: "Comoros" },
    { value: "Cape Verdean", text: "Cape Verde" },
    { value: "Cameroonian", text: "Cameroon" },
    { value: "Croatian", text: "Croatia (Hrvatska)" },
    { value: "Croatian", text: "Croatia" },
    { value: "Cypriot", text: "Cyprus" },
    { value: "Czech", text: "Czech Republic" },
    { value: "Caymanian", text: "Cayman Islands" },
    { value: "Dane", text: "Denmark" },
    { value: "Djiboutian", text: "Djibouti" },
    { value: "Dominican", text: "Dominican Republic" },
    { value: "Salvadorean", text: "El Salvador" },
    { value: "Estonian", text: "Estonia" },
    { value: "Ecuadorean", text: "Ecuador" },
    { value: "Egyptian", text: "Egypt" },
    { value: "European", text: "Europe" },
    { value: "Fijian", text: "Fiji" },
    { value: "Faroese", text: "Faroe Islands" },
    { value: " French Guiana", text: "French Guiana" },
    { value: "Finn", text: "Finland" },
    { value: "French Polynesian", text: "French Polynesia" },
    { value: "French", text: "France" },
    { value: "Gabonese", text: "Gabon" },
    { value: "Grenadian", text: "Grenada" },
    { value: "Georgian", text: "Georgia" },
    { value: "Channel Islander", text: "Guernsey" },
    { value: "Ghanaian", text: "Gana" },
    { value: "Gibraltar", text: "Gibraltar" },
    { value: "Greenlander", text: "Greenland" },
    { value: "Guinean", text: "Guinea" },
    { value: "Guadeloupian", text: "Guadeloupe" },
    { value: "Equatoguinean", text: "Guinea" },
    { value: "Guatemalan", text: "Guatemala" },
    { value: "Guamanian", text: "Guam" },
    { value: "Guyanese", text: "Guyana" },
    { value: "German", text: "Germany" },
    { value: "Greek", text: "Greece" },
    { value: "Hungarian", text: "Hungary" },
    { value: "Hong Konger", text: "Hong Kong" },
    { value: "Honduran", text: "Honduras" },
    { value: "Haitian", text: "Haiti" },
    { value: "Indonesian", text: "Indonesia" },
    { value: "Irish", text: "Ireland" },
    { value: "Italian", text: "Italy" },
    { value: "Israeli", text: "Israel" },
    { value: "Manx", text: "Isle of Man" },
    { value: " Indian", text: "India" },
    { value: "Icelander", text: "Iceland" },
    { value: "Jamaican", text: "Jamaica" },
    { value: "Jordanian", text: "Jordan" },
    { value: "Japanese", text: "Japan" },
    { value: "Kenyan", text: "Kenya" },
    { value: "Kyrgyzstani", text: "Kyrgyzstan" },
    { value: "I-Kiribati", text: "Kiribati" },
    { value: "South Korean", text: "Korea" },
    { value: "Kuwaiti", text: "Kuwait" },
    { value: "Kazakh", text: "Kazakhstan" },
    { value: "Laotian", text: "Laos" },
    { value: "Liechtensteiner", text: "Liechtenstein" },
    { value: "Laotian", text: "Laos" },
    { value: "Basotho", text: "Lesotho" },
    { value: "Latvian", text: "Latvia" },
    { value: "Lithuanian", text: "Lithuania" },
    { value: "Luxembourger", text: "Luxembourg" },
    { value: "Madagascan", text: "Madagascar" },
    { value: "Marshallese", text: "Macedonia" },
    { value: "Macedonian", text: "Macedonia" },
    { value: "Macau Chinese", text: "Macau" },
    { value: "Maltese", text: "Malta" },
    { value: "Martiniquais", text: "Martinique" },
    { value: "Mauritanian", text: "Mauritania" },
    { value: "Mauritian", text: "Mauritius" },
    { value: "Mahorais", text: "Mayotte" },
    { value: "Maltese", text: "Malta" },
    { value: "Falkland Islander", text: "Malvinas" },
    { value: "Maldivian", text: "Maldives" },
    { value: "Malawian", text: "Malawi" },
    { value: "Mexican", text: "Mexico" },
    { value: "Malaysian", text: "Malaysia" },
    { value: "Micronesian", text: "Micronesia, Federated States of" },
    { value: "Mongolian", text: "Mongolia" },
    { value: "Montserratian", text: "Montserrat" },
    { value: "Mozambican", text: "Mozambique" },
    { value: "Moldovan", text: "Moldova, Republic of" },
    { value: "Montenegrin", text: "Montenegro" },
    { value: "Moroccan", text: "Morocco" },
    { value: "Monacan", text: "Monaco" },
    { value: "Moldovan", text: "Moldova, Republic of" },
    { value: "Montenegrin", text: "Montenegro" },
    { value: "New Zealander", text: "New Zealand" },
    { value: "Dutch", text: "Netherlands" },
    { value: "Netherlands Antilles", text: "Netherlands Antilles" },
    { value: "Omani", text: "Oman" },
    { value: "Qatari", text: "Qatar" },
    { value: "Filipino", text: "Philippines" },
    { value: "Pakistani", text: "Pakistan" },
    { value: "Pitcairn Islander", text: "Pitcairn Islands" },
    { value: "Puerto Rican", text: "Puerto Rico" },
    { value: "Palestinian", text: "Palestinian Territory, Occupie" },
    { value: "Palauan", text: "Palau" },
    { value: "Paraguayan", text: "Paraguay" },
    { value: "Panamanian", text: "Panama" },
    { value: "Peruvian", text: "Peru" },
    { value: "Pole", text: "Poland" },
    { value: "Portuguese", text: "Portugal" },
    { value: "Romanian", text: "Romania" },
    { value: "Rwandan", text: "Rwanda" },
    { value: "Reunionese", text: "Reunion" },
    { value: "Serbian", text: "Serbia" },
    { value: "Sao Tomean", text: "Sao Tome and Principe" },
    { value: "Saudi Arabian", text: "Saudi Arabia" },
    { value: "Solomon Islander", text: "Solomon Islands" },
    { value: "Seychellois", text: "Seychelles" },
    { value: "Sierra Leonian", text: "Sierra Leone" },
    { value: "Senegalese", text: "Senegal" },
    { value: "Surinamese", text: "Suriname" },
    { value: "Kittitian, Nevisian", text: "Saint Kitts and Nevis" },
    { value: "Vincentian", text: "Saint Vincent and the Grenadin" },
    { value: "Saint Lucian", text: "Saint Lucia" },
    { value: "St. Maarten", text: "Saint Martin" },
    { value: "Singaporean", text: "Singapore" },
    { value: "Sri Lankan", text: "Sri Lanka" },
    { value: "Slovak", text: "Slovakia" },
    { value: "Slovenian", text: "Slovenia" },
    { value: "South African", text: "South Africa" },
    { value: "Spaniard", text: "Spain" },
    { value: "Swede", text: "Sweden" },
    { value: "Swiss", text: "Switzerland" },
    { value: "Swazi", text: "Swaziland" },
    { value: "Taiwanese", text: "Taiwan Island" },
    { value: "Togolese", text: "Togo" },
    { value: "Tadjik", text: "Tajikistan" },
    { value: "Tokelauan", text: "Tokelau" },
    { value: "Timorese", text: "Timor-Leste" },
    { value: "Turkmen", text: "Turkmenistan" },
    { value: "Thai", text: "Thailand" },
    { value: "Tunisian", text: "Tunisia" },
    { value: "Tongan", text: "Tonga" },
    { value: "Turk", text: "Turkey" },
    { value: "Trinidadian", text: "Trinidad and Tobago" },
    { value: "Tuvaluan", text: "Tuvalu" },
    { value: "Tanzanian", text: "Tanzania, United Republic of" },
    { value: "British", text: "United Kingdom" },
    { value: "United Arab Emirates", text: "United Arab Emirates" },
    { value: "Uzbek", text: "Uzbekistan" },
    { value: "Ugandan", text: "Uganda" },
    { value: "Ni-Vanuatu", text: "Vanuatu" },
    { value: "Virgin Islander", text: "Virgin Islands, U.S." },
    { value: "Vietnamese", text: "Vietnam" },
    { value: "British Virgin Islander", text: "Virgin Islands, British" },
    { value: "Futuna Islander", text: "Wallis and Futuna" },
    { value: "Zambian", text: "Zambia" },
]);
//
// Validation rules
const rules = computed(() => {
    return {
        issue_date: {
            required,
        },
        accepted_documents: {
            required,
        },
        nationality: {
            required,
        },
    };
});

// Use vuelidate
const v$ = useVuelidate(rules, state);

// On form submission
async function onSubmit() {
    BlockCreateMasterCardProfil.value.statusLoading();
    const result = await v$.value.$validate();

    if (!result) {
        BlockCreateMasterCardProfil.value.statusNormal();
        // notify user form is invalid
        return;
    }

    // perform async actions
    await axios
        .post(
            import.meta.env.VITE_API_URL + "/master_card/upload_KYC",
            {
                device_type: "DESKTOP",
                ...state,
            },
            {
                headers: {
                    Accept: "form-data",
                    "Content-Type": "application/json",
                    "access-token": userStore.getToken() ? 'Bearer '+ userStore.getToken() : "none",
                },
            }
        )
        .then((response) => {
            BlockCreateMasterCardProfil.value.statusNormal();
            // if (response.data.isSuccess && response.data.status === 200) {
            //     if (response.data.data.code && response.data.data.code != 200) {
            //         toast.fire("Oops...", response.data.message ?? "Something went wrong!", "error");
            //         return;
            //     }
            //     // update master card profile status
            //     axios.post(
            //         import.meta.env.VITE_API_URL +
            //             "/master_card/update_master_card_porfile_status",
            //         {
            //             id: props.masterCardRequestID,
            //             status: "COMPLETED",
            //         },
            //         {
            //             headers: {
            //                 Accept: "application/json",
            //                 "Content-Type": "application/json",
            //                 "access-token": userStore.token
            //                     ? userStore.token
            //                     : "none",
            //             },
            //         }
            //     );
            //     toast.fire(
            //         "Success",
            //         "Everything was updated perfectly!",
            //         "success"
            //     );
            //     // reload  page -- TODO : replace with emit event
            //     window.location.reload();

            //     //  End  update master card profile status
            //     return;
            // } else {
            //     toast.fire("Oops...", response.data.message ?? "Something went wrong!", "error");
            //     return;
            // }
        })
        .catch((error) => {
            console.error(error);
        });
}
</script>
<style lang="scss">
// Flatpickr + Custom overrides
@import "flatpickr/dist/flatpickr.css";
@import "@/assets/scss/vendor/flatpickr";
</style>

<template>
    <!--  Upload files Modal -->
    <div
        class="modal"
        id="modal-uload-kyc-files"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modal-uload-kyc-files"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <BaseBlock
                    ref="BlockCreateMasterCardProfil"
                    title="Upload KYC Documents"
                    transparent
                    class="mb-0"
                >
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
                                            <label
                                                class="form-label"
                                                for="accepted-documents"
                                                >Accepted Documents
                                                <span class="text-danger"
                                                    >*</span
                                                ></label
                                            >
                                            <select
                                                id="accepted-documents"
                                                class="form-select"
                                                :class="{
                                                    'is-invalid':
                                                        v$.accepted_documents
                                                            .$errors.length,
                                                }"
                                                v-model="
                                                    state.accepted_documents
                                                "
                                                @blur="
                                                    v$.accepted_documents.$touch
                                                "
                                            >
                                                <option value="">
                                                    Choose...
                                                </option>
                                                <option value="1">
                                                    Utility Bill
                                                </option>
                                                <option value="2">
                                                    Bank Statement
                                                </option>
                                            </select>

                                            <div
                                                v-if="
                                                    v$.accepted_documents
                                                        .$errors.length
                                                "
                                                class="invalid-feedback animated fadeIn"
                                            >
                                                Please select a document!
                                            </div>
                                        </div>
                                        <div class="mb-4">
                                            <label
                                                class="form-label"
                                                for="Nationality"
                                                >Nationality
                                                <span class="text-danger"
                                                    >*</span
                                                ></label
                                            >
                                            <select
                                                id="Nationality"
                                                class="form-select"
                                                :class="{
                                                    'is-invalid':
                                                        v$.nationality.$errors
                                                            .length,
                                                }"
                                                v-model="state.nationality"
                                                @blur="v$.nationality.$touch"
                                            >
                                                <option
                                                    v-for="(
                                                        option, index
                                                    ) in nationalities"
                                                    :value="option.value"
                                                    :key="`option-${index}`"
                                                >
                                                    {{ option.text }}
                                                </option>
                                            </select>
                                            <div
                                                v-if="
                                                    v$.nationality.$errors
                                                        .length
                                                "
                                                class="invalid-feedback animated fadeIn"
                                            >
                                                Please select Nationality!
                                            </div>
                                        </div>

                                        <div class="mb-4">
                                            <label
                                                class="form-label"
                                                for="issue-date"
                                            >
                                                Issue Date
                                                <span class="text-danger"
                                                    >*</span
                                                ></label
                                            >
                                            <FlatPickr
                                                id="issue_date"
                                                class="form-control"
                                                :class="{
                                                    'is-invalid':
                                                        v$.issue_date.$errors
                                                            .length,
                                                }"
                                                v-model="state.issue_date"
                                                @blur="v$.issue_date.$touch"
                                                placeholder="Y-m-d"
                                            />

                                            <div
                                                v-if="
                                                    v$.issue_date.$errors.length
                                                "
                                                class="invalid-feedback animated fadeIn"
                                            >
                                                Please enter a Issue Date
                                            </div>
                                        </div>
                                        <div class="mb-4">
                                            <label
                                                class="form-label"
                                                for="file-input"
                                                >File Input
                                                <span class="text-danger"
                                                    >*</span
                                                ></label
                                            >
                                            <input
                                                class="form-control"
                                                type="file"
                                                id="file-input"
                                                accept="image/png, image/jpg, .pdf"
                                                required
                                            />

                                            <div>
                                                <div>
                                                    File Size Limit:1MB Max File
                                                </div>
                                                <div>
                                                    Types Accepted: pdf/ png/
                                                    jpg
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- END Advanced -->

                                <div class="row items-push">
                                    <div class="col-lg-7 offset-lg-4">
                                        <button
                                            type="submit"
                                            class="btn btn-alt-primary"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </BaseBlock>
                        </form>
                        <div
                            class="block-content block-content-full text-end bg-body"
                        >
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
