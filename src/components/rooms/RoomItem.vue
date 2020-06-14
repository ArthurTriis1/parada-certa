<template>
  <div class="roomItem" @click="$router.push({ name: 'detail', params: { id: index } })">
    <div class="roomItem__photo" :style="backgroundImage"></div>
    <div class="roomItem__info">
      <h1 class="roomItem__info--title">
        {{ title }}
      </h1>
      <p class="roomItem__info--subtitle">
        {{ subtitle }}
      </p>
      <div class="roomItem__info--price">
        <v-icon small color="light-green lighten-2">star_rate</v-icon>
        <span class="font-weight-bold">{{ rating }}</span>
        <span class="text--secondary font-weight-bold">({{ comments }})</span>
        <span class="price">R$ {{ price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    comments: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },

  computed: {
    backgroundImage: function() {
      return {
        backgroundImage: `url(${ this.image || './../../assets/blank.png' })`
      }
    }
  }
}
</script>

<style>

</style>