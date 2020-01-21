<template>
  <div>
    <b-card
      @click="log"
      :title="title"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 16rem"
      class="mb-2"
    >
      <b-card-text>Deskripsinya</b-card-text>
      <b-button href="#" variant="primary">Selengkapnya</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  methods: {
    log () {
      console.log('featured di klik')
    }
  }
}
</script>

<style>
</style>
