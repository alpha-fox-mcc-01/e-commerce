<template>
  <div>
    <FrontBanner />
    <ItemsDisplay></ItemsDisplay>
  </div>
</template>

<script>
import FrontBanner from '@/components/FrontBanner'
import ItemsDisplay from '@/components/ItemsDisplay'
export default {
  name: 'LandingPage',
  components: {
    FrontBanner,
    ItemsDisplay
  }
}
</script>
