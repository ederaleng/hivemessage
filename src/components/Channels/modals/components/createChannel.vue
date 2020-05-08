<template>
  <div
    class="shadow-lg modal-container bg-black-100 w-6/12 mx-auto rounded shadow-lg z-50 overflow-y-auto"
  >
    <div class="modal-content text-left py-4 px-6">
      <div
        class="flex justify-between items-center pb-3 text-hive-black border-b-2"
      >
        <p class="text-2xl font-bold flex text-white">
          <span> Create channel </span>
        </p>
        <div class="modal-close z-50" @click="closeModal()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 18 18"
          >
            <path
              style="fill: #fff;"
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            ></path>
          </svg>
        </div>
      </div>
      <div class="my-2">
        <div class="py-4 px-2">
          Create channel
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { get as _get } from "lodash";
import { mapActions } from "vuex";
export default {
  name: "createServer",
  methods: {
    ...mapActions({
      closeModal: "modals/closeModal"
    })
  }
};
</script>
