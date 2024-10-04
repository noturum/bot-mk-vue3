import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Request } from '@/helper/types'
import { MY_REQUEST } from '@/helper/strings'
import { useAuthStore } from './auth'
export const useRequestStore = defineStore('request', () => {
    const requests = ref<[Request]>([{} as Request])
    function get_request() {
            axios.get(MY_REQUEST).then((response) => {
                console.log(response.data)
                requests.value = response.data.items
            })
    }
    return { requests, get_request }
})
