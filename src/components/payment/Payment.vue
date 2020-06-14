<template>
  <div class="containerPayment">
      <div class="squarePayment">
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
          <div v-if="choiceMethod === 'Dinheiro'">
            <p class="textChoice">Você escolheu pagar em dinheiro. Lembre de entregar o valor no checkin</p>
            <p>Edimilson Pereira da Silva</p>
            <p>CPF: 1509090901-1</p>
          </div>
          <div  v-else-if="choiceMethod === 'Cartão'">
            <p class="textChoice">Você escolheu pagar em cartão. Por favor, preencha seus dados</p>
            
          </div>
          <v-btn color="success" light>FINALIZAR</v-btn>
        </div>
        <div v-else class="dataPayment">
          <p class="textChoice">Escolha um método de pagamento</p>
          
        </div>

      </div>
      <img src="./../../assets/close.png" @click="close">
  </div>
</template>

<script>
export default {
  props: {
    methodsPayment: {
      type: Array,
      required: true
    },
  },
  data(){
    return {
      choiceMethod: ''
    }
  },
  methods: {
    close(){
      this.$emit('close')
    }
  },

  mounted(){
    
  }

}
</script>

<style>
  .containerPayment{  
    height: 100vh;
    width: 100vw;
    background: rgba(116, 116, 116, 0.71);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .squarePayment{
    background-color: #FFF;
    height: 300px;
    width: 90vw;
    box-sizing: border-box;
    padding: 10px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .dataPayment{
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }

  .textChoice{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-align: center;
    font-style: italic;
    color: #747474;
  }


</style>