import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref();
  const token = ref();
  const role = ref();
  
  return { user, token, role }
},
{
  persist: true,
})
