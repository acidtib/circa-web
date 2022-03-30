<template>
  <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
    <router-link to="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 navbar-brand">
      <img alt="Circa Diaries logo" src="../assets/logo.png" width="30" height="24">
    </router-link>

    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
      <li><router-link to="/" class="nav-link px-2 link-dark">Feed</router-link></li>
      <li><router-link to="/about" class="nav-link px-2 link-dark">About</router-link></li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'MainNavigation'
}
</script>