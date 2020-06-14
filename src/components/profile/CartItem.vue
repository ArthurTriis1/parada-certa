<template>
  <div class="cardItem">
    <div class="cardItem__header">
      <div class="cardItem__header--brand">
        {{ brandByNumber || cardNumber }}
      </div>
      <v-btn icon color="error" @click="$emit('onRemove', cardId)">
        <v-icon>delete</v-icon>
      </v-btn>
    </div>
    <div class="cardItem__infos">
      <p v-if="brandByNumber">Número: {{ cardNumber }}</p>
      <p>Titular: {{ cardOwner }}</p>
      <p>Validade: {{ cardValidate }}</p>
    </div>
    <v-divider />
  </div>
</template>

<script>
export default {
  props: {
    cardOwner: {
      type: String,
      required: true
    },
    cardNumber: {
      type: String,
      required: true
    },
    cardValidate: {
      type: String,
      required: true
    },
    cardId: {
      type: String,
      required: true
    }
  },

  computed: {
    brandByNumber: function() {
      const brand = this.brands.find(b => {
        const index = b.prefix.findIndex(p => this.cardNumber.indexOf(p) === 0)

        return index > -1
      })

      if (!brand) return ''

      return brand.brand
    }
  },

  data() {
    return {
      brands: [
        { brand: 'Visa', prefix: ['4'] },
        { brand: 'Mastercard', prefix: ['51', '52', '53', '54', '55'] },
        { brand: 'Dinners Club', prefix: ['36', '38'] },
        { brand: 'Discover', prefix: ['6011', '65'] },
        { brand: 'JCB', prefix: ['35'] },
        { brand: 'American Express', prefix: ['34', '37'] }
      ]
    }
  }
}
</script>

<style>

</style>