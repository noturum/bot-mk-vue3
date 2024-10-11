<template>
  <div class="modal overflow-hidden">
    <div
      class="modal-dialog h-100 d-flex justify-content-center align-items-center flex-column"
    >
      <div
        class="w-100 h-100 position-absolute"
        style="background-color: #000000d4"
      />
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
