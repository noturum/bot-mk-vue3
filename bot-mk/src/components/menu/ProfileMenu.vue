<template>
    <div class="modal fade" id="notsure" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
        <div class="modal-dialog h-100 container d-flex align-items flex-column justify-content-center">
            <h4 class="d-flex justify-content-center">Потвердите удаление</h4>
            <div class="modal-content d-flex flex-row justify-content-center">

                <button type="button" class="btn-custom me-2" data-bs-dismiss="modal">Отмена</button>
                <button type="button" class="btn-custom remove-request" data-bs-dismiss="modal">Удалить</button>
            </div>
        </div>
    </div>

    <div class="title">Активная заявка</div>
    <BaseCardRequest :request="requests[0]" :keys="[]" v-if="requests.length > 0" />

    <div v-else class="active-request empty container d-flex flex-column justify-content-center">
        <div class="d-flex">
            <p>+ Добавить заявку </p>
        </div>

    </div>

    <div class="container">
        <div class="my-request container d-flex justify-content-center">

            <ul class="nav nav-underline d-flex justify-content-evenly">
                <TabNav v-for="link in navLinks" :is-active="activeLink === link" @click="setLink(link)">
                    {{ link }}
                </TabNav>
            </ul>

        </div>
        <div class="container profile-data mt-5">
        </div>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRequestStore } from '@/stores/request'
import BaseCardRequest from '../common/BaseCardRequest.vue'
import TabNav from '../tabs/TabNav.vue'
const navLinks = [
    'Сделки',
    'Предложения',
    'Архив',
    'Отзывы обо мне'
]
const activeLink = ref('Сделки')
const rs = useRequestStore()
const requests = ref(rs.requests)
const setLink = (link: string) => {
    activeLink.value = link
}
onMounted(() => {
    rs.get_request()
})
</script>