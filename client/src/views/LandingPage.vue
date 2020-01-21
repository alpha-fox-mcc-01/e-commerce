<template>
  <div>
    <FrontBanner />
    <ItemsDisplay :products="products"></ItemsDisplay>
  </div>
</template>


<script>
import FrontBanner from "@/components/FrontBanner"
import ItemsDisplay from "@/components/ItemsDisplay"
export default {
    name: 'LandingPage',
    components: {
        FrontBanner,
        ItemsDisplay
    },
    props: {
        products: Array
    }
}
</script>