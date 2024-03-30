<script setup></script>

<template>
    <div
        class="modal"
        id="modal-kyc-documents-status"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modal-kyc-documents-status"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="table-responsive">
                    <table
                        class="table table-bordered table-striped table-vcenter"
                    >
                        <thead>
                            <tr>
                                <th>Document Type</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th>Document Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Proof of Address</td>
                                <td></td>

                                <td class="text-center">
                                    <div class="btn-group">
                                        <button
                                            type="button"
                                            class="btn btn-sm btn-alt-secondary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modal-uload-kyc-files"
                                            title="Upload"
                                        >
                                            <i class="fa fa-upload"></i>
                                        </button>
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Proof of Identity</td>
                                <td></td>

                                <td class="text-center">
                                    <div class="btn-group">
                                        <button
                                            type="button"
                                            class="btn btn-sm btn-alt-secondary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modal-uload-kyc-files"
                                            title="Upload"
                                        >
                                            <i class="fa fa-upload"></i>
                                        </button>
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
