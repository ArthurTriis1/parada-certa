<template>
  <main>
    <div class="rooms">
      <h1 class="text-center text-h6 font-weight-black font-italic text-uppercase">Escolha seu Local de descanso</h1>
      <v-divider />
      <div class="rooms__list">
        <room-item 
          v-for="(room, i) in roomList" 
          :key="i"
          :price="room.cost"
          :image="room.photos[0] || ''" 
          :title="room.description"
          :subtitle="room.address"
          :rating="room.stars"
          :index="i"
          :comments="room.coments.length"
        />
      </div>
    </div>
  </main>
</template>

<script>
import apiMock from '../services/apiMock';
import RoomItem from  './../components/rooms/RoomItem'

export default {
  components: {
    RoomItem
  },

  async mounted() {
    const responseMock = await apiMock.get(".json");
    const pointData = responseMock.data

    this.roomList = pointData
  },

  data() {
    return {
      roomList: []
    }
  }
}
</script>

<style>

</style>