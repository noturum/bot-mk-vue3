import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Auth } from '@/helper/types'
import { GET_USER } from '@/helper/strings'
import { useTelegramStore } from './telegram'
export const useAuthStore = defineStore('auth', () => {
    const authData = ref<Auth>({error:false} as Auth)
    function getUser() {
        axios.get(GET_USER)
            .then(response => {
                authData.value.user = response.data
            })
            .catch((error) => {
                if (error) authData.value.error = true
            })
    }
    return { authData, getUser }
})
