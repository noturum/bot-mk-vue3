<template>
  <div>
    <div class="notify toast align-items-center position-absolute w-auto start-50 translate-middle-x mt-4 z-2" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
        </div>
      </div>
    </div>

    <div class="container welcome-container d-flex flex-column align-items-center justify-content-start mx-auto pt-5">
      <div class="nav-btn ml-4 d-flex w-100" v-if="showNav">
        <img loading="lazy" class="logo back_btn" />
        <h5 class="title text-center align-items-center position-absolute w-auto start-50 translate-middle-x mt-2">{{ title }}</h5>
      </div>

      <div id="main" class="container">
        <div class="d-flex flex-column align-items-center text-center">
          <header class="logo-container">
            <h1 class="welcome-title">Welcome to <br /> Delevisor</h1>
          </header>
          <p class="welcome-text">
            Здесь приветсвенный текст, что-то типа: здравствуй пользователь, это приложение для того-то, жми "Создать заявку" и полетели.
          </p>

          <button class="btn btn-custom mt-4" @click="createRequest">Создать заявку</button>
          <button class="btn btn-custom mt-3" @click="search">Поиск</button>
        </div>
      </div>

      <div class="container mt-4 d-flex flex-column align-items-center" id="content">
      </div>

      <nav class="navigation navbar fixed-bottom d-flex justify-content-between">
        <div class="nav-item active d-flex flex-column align-items-center" id="main-link">
          <img loading="lazy" :src="getIconUrl('main_icon.svg')" class="nav-icon" alt="Navigation icon" />
          <div class="nav-indicator active"></div>
        </div>
        <div class="nav-item d-flex flex-column align-items-center" id="my-profile-link">
          <img loading="lazy" :src="getIconUrl('profile_icon.svg')" class="nav-icon" alt="Navigation icon" />
          <div class="nav-indicator"></div>
        </div>
        <div class="nav-item d-flex flex-column align-items-center" id="reviews-link">
          <img loading="lazy" :src="getIconUrl('reviews_icon.svg')" class="nav-icon" alt="Navigation icon" />
          <div class="nav-indicator"></div>
        </div>
        <div class="nav-item d-flex flex-column align-items-center" id="support-link">
          <img loading="lazy" :src="getIconUrl('help_icon.svg')" class="nav-icon" alt="Navigation icon" />
          <div class="nav-indicator"></div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const showNav = ref(false)
  const title = ref('')

  const createRequest = () => {
    console.log('Создать заявку')
  }

  const search = () => {
    console.log('Поиск')
  }

  const getIconUrl = (iconName) => {
    return `/static/${iconName}`
  }
</script>

<style scoped>
</style>
