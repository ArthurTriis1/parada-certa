<template>
  <main>
    <div class="profile">
      <div class="profile__header">
        <div class="profile__header--user">
          <v-avatar size="3rem">
            <v-img src="./../assets/user.png"></v-img>            
          </v-avatar>
          <p class="text-h6 font-weight-black">Edimilson</p>
          <div class="profile__header--rating">
            <v-icon small color="light-green lighten-2">star_rate</v-icon>
            <span>3.8</span>
          </div>
        </div>
        <p>Amo minha família de dirigir!</p>
      </div>
      <v-divider></v-divider>
      <div class="profile__cardList">
        <card-item 
          v-for="card in cardList"
          :key="card.id"
          :card-owner="card.cardOwner"
          :card-validate="card.cardValidate"
          :card-id="card.id"
          :card-number="card.cardNumber"
          @onRemove="removeCard"
        />
        <div class="profile__cardList--form" :class="{ 'show' : toggleForm }">
          <v-form
            ref="cardForm"
            :lazy-validation="true"
            v-model="valid"
          >
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field 
                    label="Número do Cartão" 
                    outlined
                    dense
                    return-masked-value
                    v-model="cardNumber"
                    v-mask="['####.####.####.####']" 
                    :rules="[rules.required, rules.lengthNumber]"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field 
                    label="Nome do titular" 
                    outlined 
                    dense
                    v-model="cardOwner"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field 
                    label="Validade" 
                    outlined 
                    dense
                    return-masked-value
                    v-mask="['##/##']"
                    v-model="cardValidate"
                    :rules="[rules.required, rules.lengthValidate]"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field 
                    label="CVC" 
                    outlined 
                    dense
                    return-masked-value
                    v-mask="['###']"
                    v-model="cardCvc"
                    :rules="[rules.required, rules.lengthCvc]"
                  />
                </v-col>
                <v-col cols="12" :class="'formSubmit'" v-if="!loading">
                  <v-btn 
                    large 
                    text
                    color="error" 
                    @click="closeForm"
                  >{{'Cancelar'}}</v-btn>
                  <v-btn 
                    large 
                    depressed 
                    color="success"
                    @click="validate"
                  >{{'Cadastrar'}}</v-btn>
                </v-col>
                <v-col :class="'formSubmit'" cols="12" v-else>
                  <v-btn
                    block
                    large
                    disabled
                    depressed
                    color="grey lighten-1"
                  >
                    Cadastrando Cartão
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </div>
        <v-btn 
          text 
          block 
          :disabled="toggleForm" 
          :class="'justify-space-between'" 
          color="grey lighten-1"
          @click="toggleForm = true"
        >
          Adicionar Cartão
          <v-icon v-if="!toggleForm">add_circle_outline</v-icon>
        </v-btn>
      </div>
    </div>
  </main>
</template>

<script>
import CardItem from './../components/profile/CartItem'

export default {
  components: {
    CardItem
  },
  methods: {
    validate() {
      const validation = this.$refs.cardForm.validate()      
      if (!validation) return

      this.loading = true

      setTimeout(() => {
        const { cardNumber, cardValidate, cardOwner, cardCvc } = this

        this.cardList.push({
          cardNumber,
          cardValidate,
          cardOwner,
          cardCvc,
          id: `${Math.ceil(Math.random() * 100000)}`
        })

        this.toggleForm = false
        this.loading = false
        this.$refs.cardForm.reset()
      }, 2000);
    },

    removeCard(cardId) {
      this.cardList = [...this.cardList].filter(card => card.id !== cardId)
    },

    closeForm() {
      this.toggleForm = false
      this.$refs.cardForm.reset()
    },
  },
  data() {
    return {
      cardList: [
        {
          cardOwner: 'EDIMILSON H DE SOUZA',
          cardValidate: '03/25',
          cardCvc: '222',
          cardNumber: '3811.4444.4444.4444',
          id: `${Math.ceil(Math.random() * 10000)}`
        }
      ],
      toggleForm: false,
      loading: false,
      
      cardNumber: '',
      cardValidate: '',
      cardOwner: '',
      cardCvc: '',

      valid: true,

      rules: {
        required: value => !!value || 'Campo obrigatório.',
        lengthNumber: value => (value && value.length === 19)|| 'Campo deve conter 16 números',
        lengthValidate: value => (value && value.length === 5) || 'Campo deve seguir o modelo MM/AA',
        lengthCvc: value => (value && value.length === 3) || 'Campo deve conter 3 números'
      },
    }
  }
}
</script>

<style>

</style>