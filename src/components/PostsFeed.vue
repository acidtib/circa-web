<template>

  <div class="row col-lg-5 mx-auto py-md-3" v-if="posts && posts.length">
    <div class="col-12 mb-5" v-for="post of posts" :key="post.id">
      <div class="card border-secondary">
        <div class="card-header">
          <div class="row">
            <div class="col-2">
              <img :src="post.user.avatar" class="avatar-thumbnail">  
            </div>
            <div class="col-10">
              <strong>{{post.user.name}}</strong>
              <div class="row">
                <div class="col-12">
                  <small class="text-muted">{{formatDate(post.epoch)}}</small>
                  <small class="text-muted float-end"><span class="badge bg-secondary">{{post.content_type}}</span></small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div :id="`carousel${post.id}SlidesOnly`" class="carousel carousel-dark slide" data-bs-ride="false" v-if="post.images && post.images.length">
          <div class="carousel-indicators" v-if="post.images.length > 1">
            <button type="button" :data-bs-target="`#carousel${post.id}SlidesOnly`" :data-bs-slide-to="index" :aria-label="`Slide ${image.id}`" :class="isActiveClass(index)" v-for="(image, index) of post.images" :key="image.id"></button>
          </div>

          <div class="carousel-inner">
            <div :class="`carousel-item ${isActiveClass(index)}`" v-for="(image, index) of post.images" :key="image.id">
              <img :src="image.source" class="d-block w-100">
            </div>
          </div>

          <button class="carousel-control-prev" type="button" :data-bs-target="`#carousel${post.id}SlidesOnly`" data-bs-slide="prev" v-if="post.images.length > 1">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" :data-bs-target="`#carousel${post.id}SlidesOnly`" data-bs-slide="next" v-if="post.images.length > 1">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <div class="card-body">                  
          <h5 class="card-title"><router-link :to="'/posts/' + post.id"><strong>{{post.title}}</strong></router-link></h5>
          <h6 class="card-subtitle mb-2 text-muted">{{post.sub_title}}</h6>
          <p class="card-text">{{post.content}}</p>
        </div>

        <div class="card-footer" v-for="reply of post.replies" :key="reply.id">
          <div class="row">
            <div class="col-2">
              <img :src="reply.user.avatar" class="avatar-thumbnail">  
            </div>
            <div class="col-10">
              <strong>{{reply.user.name}}</strong>
              <small class="text-muted float-end">{{formatDate(reply.epoch)}}</small>
              <div class="row">
                <div class="col-12">
                  <p class="card-text">{{reply.reply}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row col-lg-5 mx-auto py-md-5" v-if="loading">
    <div class="col-12 mb-5 text-center">
      <p>Loading Posts</p>
    </div>
  </div>

  <div class="row col-lg-5 mx-auto py-md-4" v-if="!loading && more">
    <div class="col-12 mb-5 text-center">
      <button type="button" class="btn btn-lg btn-primary" @click="loadMore">Load More</button>
    </div>
  </div>

  <div class="row col-lg-5 mx-auto py-md-4" v-if="error">
    <div class="col-12 mb-5 text-center">
      <p>error loading posts</p>
      <p>{{error}}</p>
    </div>
  </div>
</template>

<script>
import ApiService from "../services/ApiService"
import moment from 'moment'

export default {
  name: 'PostsFeed',
  data() {
    return {
      posts: [],
      postsMeta: null,
      error: null,
      loading: true,
      more: false
    }
  },
  methods: {
    getPosts(page = 1) {
      this.loading = true;

      ApiService.getAll(page)
        .then(response => {
          this.posts = this.posts.concat(response.data.data)
          this.postsMeta = response.data.meta

          if (this.postsMeta.current_page != this.postsMeta.total_pages) {
            this.more = true
          } else {
            this.more = false
          }
        })
        .catch(error => {
          this.error = error.message;
          console.log(error);
        })
        .then(() => {
          this.loading = false;
        })
    },
    loadMore() {
      this.getPosts(this.postsMeta.next_page)  
    },
    isActiveClass(index) {
      if (index == 0) {
        return "active"
      } else {
        return ""
      }
    },
    formatDate(epoch) {
      if (epoch) {
        return moment(parseInt(epoch)).format('MM/DD/YYYY')
      }
    }
  },
  mounted() {
    this.getPosts()
  }
}
</script>

<style lang="scss">
  .avatar-thumbnail {
    width: 50px;
    height: auto;
    border-radius: 25px;
  }
</style>