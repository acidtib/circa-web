<template>
  <div class="container">
    <MainNavigation />

    <router-view/>

    <MainFooter />
  </div>
</template>

<script>
import MainNavigation from '@/components/MainNavigation.vue'
import MainFooter from '@/components/MainFooter.vue'

export default {
  components: {
    MainNavigation,
    MainFooter
  },
  // state
  data() {
    return {
      apiUrl: "https://api.local"
    }
  },
}
</script>

<style lang="scss">

</style>
