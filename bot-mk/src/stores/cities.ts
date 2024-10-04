import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { CITIES } from '@/helper/strings'

export const useCitiesStore = defineStore('cities', () => {
    const cities = ref<[]>()
    async function getCities() {
        axios.get(CITIES)
            .then(
                (response) => { cities.value = response.data.items }
            )
            .catch(
                (error) => { console.error(error) }
            )
    }
    return { cities, getCities }
})
