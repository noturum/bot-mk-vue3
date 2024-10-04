import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { InitData } from '@/helper/types'

export const useTelegramStore = defineStore('data', () => {
  const initData = ref<InitData>({} as InitData)
  return { initData }
})
