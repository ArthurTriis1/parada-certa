<template>
  <div class="containerPayment">
    <v-card color="success" tile width="100%" v-if="showSuccess">
      <div class="containerPayment__success">
        <p class="font-weight-bold text-center">Compra confirmada com sucesso!</p>
        <p class="font-weight-bold text-center">Tenha um bom descanso</p>
      </div>
    </v-card>
    <v-card :loading="loading" tile v-else>
      <v-row justify="space-around">
        <v-radio-group v-model="choiceMethod" row>
          <v-radio
            color="success"
            v-for="(method, index) in methodsPayment"
            :key="index"
            :label="`${method}`"
            :value="method"
          ></v-radio>
        </v-radio-group>
      </v-row>
      <div v-if="choiceMethod != ''" class="dataPayment">
        <div v-if="choiceMethod === 'Dinheiro'" class="text-center">
          <v-container>
            <v-row>
              <v-col cols="12">
                <p
                  class="textChoice"
                >Você escolheu pagar em dinheiro. Lembre de entregar o valor no checkin</p>
                <p>{{ ownerName }}</p>
                <p>Contato: {{ ownerContact }}</p>
                <v-btn 
                  large 
                  depressed 
                  color="success"
                  :disabled="loading === 'success'"   
                  @click="successSubmit"
                >{{loading === 'success' ? 'Enviando' : 'Finalizar'}}</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <div v-else-if="choiceMethod === 'Cartão'">
          <p class="textChoice">Você escolheu pagar em cartão. Por favor, preencha seus dados</p>
          <v-form
            ref="form"
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
                <v-col cols="12" :class="'text-center formSubmit'">
                  <v-btn 
                    large 
                    depressed 
                    color="success"
                    :disabled="loading === 'success'"   
                    @click="validate"
                  >{{loading === 'success' ? 'Enviando' : 'Finalizar'}}</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </div>
      </div>
      <div v-else class="dataPayment">
        <p class="textChoice">Escolha um método de pagamento</p>
      </div>
    </v-card>
    <v-btn :class="'closeBtn'" :disabled="loading === 'success'" dark icon @click="close">
      <v-icon large>close</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    methodsPayment: {
      type: Array,
      required: true
    },
    ownerName: {
      type: String,
      required: true
    },
    ownerContact: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      choiceMethod: "",
      
      cardNumber: '',
      cardValidate: '',
      cardOwner: '',
      cardCvc: '',

      valid: true,
      loading: 'none',
      showSuccess: false,

      rules: {
        required: value => !!value || 'Campo obrigatório.',
        lengthNumber: value => value.length === 19 || 'Campo deve conter 16 números',
        lengthValidate: value => value.length === 5 || 'Campo deve seguir o modelo MM/AA',
        lengthCvc: value => value.length === 3 || 'Campo deve conter 3 números'
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },

    successSubmit() {
      this.loading = 'success'

      setTimeout(() => {
        this.showSuccess = true
        this.loading = 'none'
      }, 1000);
    },

    validate () {
      const validation = this.$refs.form.validate()
      if (!validation) return

      this.successSubmit()
    },
  },

  mounted() {
    this.choiceMethod = this.methodsPayment[0]
  }
};
</script>

<style>
.containerPayment {
  height: 100vh;
  width: 100vw;
  padding: 1rem;
  background: rgba(116, 116, 116, 0.71);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.containerPayment__success {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 15rem;
}

.containerPayment__success p {
  margin: 0;
}

.squarePayment {
  background-color: #fff;
  height: 300px;
  width: 90vw;
  box-sizing: border-box;
  padding: 10px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dataPayment {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.textChoice {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-align: center;
  font-style: italic;
  color: #747474;
}

.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin: 0;
}

.dataPayment .col {
  padding-top: 0 
}

.dataPayment .formSubmit {
  padding-top: 12px;
}
.closeBtn {
  margin-top: 1rem;
}
</style>