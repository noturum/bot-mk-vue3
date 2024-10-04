<template>
    <div class="form-group mb-4 position-relative">
        <label class="form-label" for="mode">
            <slot />
        </label>
        <select class="form-control" :id="id" :name="id" v-model="data">
            <option v-for="(key, val) in options" :value="val">{{ key }}</option>
        </select>
        <div class="invalid-feedback mode" style="display: none;"></div>
    </div>
</template>
<script setup lang="ts">
const data = defineModel<any>('data')
const props = defineProps<{
    id: string
    options: {}
}>()
</script>