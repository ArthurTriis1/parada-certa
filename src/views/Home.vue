<template>
  <main>
    <div class="home">
      <div class="home__title">
        <h1 class="font-weight-black text-center">Encontre o lugar perfeito para seu descanso</h1>
      </div>
      <div class="home__hotel">
        <v-card tile elevation="8">
          <div class="d-flex flex-no-wrap justify-start">
            <v-avatar
              class="ma-3"
              width="125"
              height="80"
              tile
            >
              <v-img :src="img"></v-img>
            </v-avatar>
            
            <div class="home__hotel--infos">
              <v-card-title
                class="headline"
                v-text="title"
              ></v-card-title>

              <v-card-subtitle v-text="subtitle.join(' - ')"></v-card-subtitle>

              <v-card-actions :class="'justify-space-between'">
                <div class="home__hotel--stars">
                  <v-icon small color="light-green lighten-2">star</v-icon>
                  <span class="text-caption font-weight-bold">4.6</span>
                  <span class="text-caption text--secondary">(51)</span>
                </div>
                <div class="home__hotel--price">
                  <span class="text-h6 font-weight-bold">R$ 32</span>
                </div>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </div>
      <div class="home__stripes">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="home__subtitle">
        <h2 class="font-weight-black text-center">Basta adicionar o número do Whatsapp ou clicar no link e já começar a falar!</h2>
      </div>
      <div class="home__contact">
        <!-- <span class="phone font-weight-bold">(55) 99992-9992</span> -->
        <v-btn text color="light-green lighten-2" href="https://t.me/ParadaCerta_bot">Link aqui</v-btn>
      </div>
      <div class="home__signup ">
        <div class="home__signup--header">
          <h1>Seja um anfitrião</h1>
          <v-icon color="white">star_rate</v-icon>
          <v-icon color="white">star_rate</v-icon>
          <v-icon color="white">star_rate</v-icon>
        </div>
        <v-btn depressed color="white">Cadastrar Local</v-btn>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data(){
    return {
      title: 'Hotel Rosa Maria',
      subtitle: ['Cama', 'Banheiro', 'Jantar'],
      img: 'https://a0.muscache.com/im/pictures/cc9c54a6-3452-46de-a4f4-921482dc8c91.jpg?im_w=480'
    }
  }
}
</script>

<style>

</style>