<template>
  <main>
    <div class="details__button">
      <v-btn color="deep-orange" large depressed dark @click="pay">Comprar</v-btn>
    </div>
    <div class="details__carousel">
      <v-carousel
        height="160"
        hide-delimiter-background
        :show-arrows="photos.length > 1"
      >
        <v-carousel-item
          v-for="(photo, i) in photos"
          :key="i"
        >
          <img :src='photo'/>
        </v-carousel-item>
      </v-carousel>

    </div>
    <div class="details__info">
      <h1 class="text-h6 font-weight-bold">{{description}}</h1>
      <p class="text-subtitle-1">{{address}}</p>
      <div class="details__info--tags">
          <span class="details__info--distance blue-grey lighten-4 text--secondary">{{distance}} de você</span>
          <span class="details__info--gender text--secondary light-green lighten-2">Para {{gender.join(' e ')}}</span>
      </div>
      <div class="details__info--convenient">
        <p class="text-caption text--secondary">{{ convenient.join('-') }}</p>
      </div>
      <div class="details__info--convenient">
        <p class="text-caption text--secondary">Tamanho máximo do caminhão: {{ maxSize }}</p>
      </div>
      <div class="details__info--price">
        <p class="text-caption text-end">{{payment.join(" e ")}}</p>
        <div class="details__info--value">
          <span class="details__info--dot"></span>
          <span class="font-weight-bold text-h6">R$ {{cost}}</span>
        </div>
      </div>
      <v-divider />
      <div class="details__comfort">
        <h1 class="text-h6 font-weight-bold">Comodidades</h1>
        <div class="details__comfort--list">
          <div class="details__comfort--element" v-for="comfort in filteredComfortList" :key="comfort.icon">
            <v-icon color="light-green lighten-2" large>{{ comfort.icon }}</v-icon>
            <span>{{ comfort.label }}</span>
          </div>
        </div>
      </div>


      <v-divider />
      <div class="details__comments">
        <div class="details__comments--rating">
          <v-icon color="light-green lighten-2">star</v-icon>
          <span class="text-h6">{{ stars }}</span>
          <span class="text--secondary text-h6">({{ comments.length }} Comentários)</span>
        </div>
        <div class="details__comments--list">
          <comment-item 
            v-for="(comment, i) in comments"
            :key="i"
            :author="comment.user"
            :text='comment.coment'
          />
        </div>
      </div>
      <v-divider />
      <div class="details__location">
        <h1 class="text-h6 font-weight-bold">Localização</h1>
        <div class="details__location--map">
          <div id="map"></div>
        </div>
      </div>
      <v-divider />
      <div class="details__owner">
        <div class="details__owner--header">
          <v-icon size="3rem" color="blue-grey lighten-4">account_circle</v-icon>
          <h1 class="text-h6 font-weight-bold">Oferecido por {{owner.name}}</h1>
        </div>
        <div class="details__owner--info">
          <v-icon color="light-green lighten-2">star</v-icon>
          <span>{{owner.avaliations}} avaliações</span>
          <span class="details__owner--verified">Identidade verificada</span>
        </div>
        <div class="details__owner--description">
          <p>{{owner.bio}}</p>
        </div>
        <div class="details__owner--contact">
          <p>Contato {{owner.contact}}</p>
        </div>
      </div>
    </div>
    <Payment 
      v-if="inPay" 
      class="payment" 
      :methodsPayment='payment' 
      :owner-name="owner.name"
      :owner-contact="owner.contact"
      @close="closePay"/>
  </main>
</template>

<script>
import CommentItem from './../components/details/CommentItem';
import Payment from './../components/payment/Payment';
import apiMock from '../services/apiMock';
import L from 'leaflet';

export default {
  components: {
    CommentItem,
    Payment
  },

  computed: {
    filteredComfortList: function() {
      return this.comfortList.filter(c => this.attractives[c.key])
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      gender: ["Homem", "Mulher"],
      slides: [
        '#FF0',
        '#F0F',
        '#0FF',
        '#F00',
        '#0F0',
        '#00F'
      ],
      convenient: ['1 Vaga', 'Cama', 'Banheiro'],
      comfortList: [
        { label: 'Jantar', icon: 'restaurant', key: 'dinner'},
        { label: 'Ventilador', icon: 'toys', key: 'fan' },
        { label: 'WiFi', icon: 'wifi', key: 'wifi' },
        { label: 'Vigilância', icon: 'security', key: 'securityCam' },
        { label: 'TV', icon: 'tv' , key: 'tv' },
        { label: 'Permite Caminhão', icon: 'directions_bus', key: 'truckStation' },
        { label: 'Higiene Pessoal', icon: 'wash', key: 'bathroom' },
      ],

      comments: [],
      stars: 3.56,
      attractives: { },
      address: '',
      distance: '',
      description: '',
      owner: {},
      cost: '',
      payment: [],
      maxSize: '',
      photos: [],


      map: '',
      baseLayer: '',
      marker: '',

      inPay: false,
    }
  },

  methods: {
    closePay(){
      this.inPay = false
    },
    pay(){
      this.inPay = true
    }
  },

  async mounted(){
    const responseMock = await apiMock.get(`${this.id}.json`);
    const pointData = responseMock.data

    this.comments = pointData.coments
    this.stars = pointData.stars
    this.attractives = pointData.attractives
    this.gender = pointData.gender
    this.address = pointData.address
    this.distance = pointData.distance
    this.description = pointData.description
    this.owner = pointData.owner
    this.cost = pointData.cost
    this.payment = pointData.payment
    this.maxSize = pointData.maxSize
    this.owner = pointData.owner
    this.photos = pointData.photos

    const configMap = {
        center: [pointData.coords.latitude, pointData.coords.longitude], 
        zoom: 18,
    }
    this.map = L.map("map", configMap);
    this.baseLayer = L.tileLayer('https://c.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)
    this.marker = L.marker([pointData.coords.latitude, pointData.coords.longitude]).addTo(this.map)

  }
}
</script>

<style>
  #map{
    height: 220px;
    margin-top: 15px;
    border-radius: 12px;
  }

  .payment{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }
</style>