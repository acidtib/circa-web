<template>
  <div class="row">
    <div class="col-12 my-4 text-center py-3">
      <header class="pb-1 mb-2">
        <h1 class="text-dark text-decoration-none h3">Circa Diaries</h1>
        <p>Follow the ups and downs of this little community</p>
      </header>
    </div>
  </div>

  <PostsFeed />
</template>

<script>
import PostsFeed from '@/components/PostsFeed.vue'

export default {
  name: 'HomeView',
  components: {
    PostsFeed
  }
}
</script>
