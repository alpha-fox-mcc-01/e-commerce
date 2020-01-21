<template>
  <modal name="item-detail" :height="400" :width="800">
    <div class="modalBox">
      <!-- <div> -->
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col md="8">
            <b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="4">
            <b-card-body title="Nama Produk">
              <b-card-text>Deskripsi</b-card-text>
              <table>
                <tr>
                  <th width="100px">Category</th>
                  <td>Kategorinya</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>Harganya</td>
                </tr>
              </table>
            </b-card-body>
            <button style="position: absolute; bottom:1rem; right:1rem">Add to Cart</button>
          </b-col>
        </b-row>
      </b-card>
      <!-- </div> -->
      <!-- <button @click="hide">Close</button> -->
    </div>
  </modal>
</template>

<script>
export default {
methods: {
  hide () {
    this.$modal.hide('item-detail');
  }
}

}
</script>
<style>
.modalBox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 400px;
}

.modalBox div {
  width: 800px;
  height: 400px;
  border: none;
  border-radius: 0;
}
</style>