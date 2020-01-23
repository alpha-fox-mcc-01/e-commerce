<template>
  <div>
    <div>
    <b-card
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, minima?
      </b-card-text>

      <b-button :to="`/posts/`" variant="primary">See More</b-button>
    </b-card>
  </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard'
}
</script>

<style>

</style>
