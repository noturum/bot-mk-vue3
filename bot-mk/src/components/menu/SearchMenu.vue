<template>
    <div class="container mt-5">
        <form id="search-form" @submit.prevent>
            <div class="form-row">
                <BaseSelect id="mode" :options="selectOptions" v-model:data="form.mode">
                    Найти
                </BaseSelect>
                <BaseInput id="cityIn" type="search" v-model:data="form.cityIn">
                    Город отправки
                </BaseInput>
                <BaseInput id="cityTo" type="search" v-model:data="form.cityTo">
                    Город прибытия
                </BaseInput>
                <BaseInput id="dateIn" type="date" v-model:data="form.dateIn">
                    Город прибытия
                </BaseInput>
                <div class="form-group mb-4">
                    <BaseButton>
                        Отправить
                    </BaseButton>
                    <BaseButton>
                        Вставить из заявки
                    </BaseButton>
                </div>
            </div>
        </form>
    </div>
    <Teleport to="body">
        <BaseModal style="display: block;">
            Ass
        </BaseModal>
    </Teleport>
    
    <div id="results" class="container" style="display:none;">
        <div class="container flight-route-container">
            <div class="route-display d-flex align-items-start justify-content-evenly overflow-hidden">
                <div class="city-info">
                    <p class="city-in">cityFrom</p>
                    <div class="route-dots">
                        <p>-</p>
                        <p>-</p>
                        <p>-</p>
                        <p>-</p>
                    </div>
                </div>
                <img class="trip-icon" alt="Plane icon" />
                <div class="city-info">
                    <div class="route-dots">
                        <p>-</p>
                        <p>-</p>
                        <p>-</p>
                        <p>-</p>
                    </div>
                    <p class="city-to">cityTo</p>
                </div>
            </div>

            <button class="unwrap-button" id="unwrap-button" aria-label="Unwrap flight details">
                <img class="unwrap-icon" alt="" />
            </button>
        </div>
        <div class="separator mt-3"></div>
        <div class="card-container flex-column align-self-center" id="card-container">
        </div>
    </div>


    <div class="modal fade" id="seach_request" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
        <div class="modal-dialog h-100 container d-flex align-items flex-column justify-content-center">
            <h4 class="d-flex justify-content-center">Для продолжения, нужно создать заявку</h4>
            <div class="modal-content d-flex flex-row justify-content-center">

                <button type="button" class="btn-custom me-2" data-bs-dismiss="modal">Отмена</button>
                <button type="button" class="btn-custom accept-request" data-bs-dismiss="modal">Создать</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BaseButton from '../common/BaseButton.vue'
import BaseInput from '../common/BaseInput.vue'
import BaseSelect from '../common/BaseSelect.vue'
import BaseModal from '../common/BaseModal.vue'
import type { SearchRequest } from '@/helper/types'
import { reactive } from 'vue'
const form = reactive({
    mode: 'DELY'
} as SearchRequest)
const selectOptions = {
    "SEND": "Отправителя",
    "DELY": "Доставщика"
}
</script>