<template>
  <tr>
    <!-- {{item}} -->
    <td class="product-thumbnail">
      <img :src="item.product.img" alt="Image" class="img-fluid" />
    </td>
    <td class="product-name">
      <h2 class="h5 cart-product-title text-black">{{item.product.name}}</h2>
    </td>
    <td>$55.00</td>
    <td>
      <div class="input-group mb-3" style="max-width: 120px;">
        <div class="input-group-prepend">
          <button class="btn btn-outline-primary js-btn-minus" type="button">&minus;</button>
        </div>
        <input
          type="text"
          class="form-control text-center border mr-0"
          value="1"
          placeholder
          aria-label="Example text with button addon"
          aria-describedby="button-addon1"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-primary js-btn-plus" type="button">&plus;</button>
        </div>
      </div>
    </td>
    <td>$49.00</td>
    <td>
      <a href="#" class="btn btn-primary height-auto btn-sm">X</a>
    </td>
  </tr>
</template>

<script>
name: 'itemCart'
export default {
  props:{
    item:Object
  }
};
</script>

<style scoped>
img{
  max-height: 8rem;
  object-fit:contain;
}
</style>