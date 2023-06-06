<script>
import { dataFoodStore } from '../stores/DataStore';

export default {
  name: 'Card',
  computed: {
    foods() {
      const store = dataFoodStore();
      return store.foods;
    },
  },

  methods: {
    async deleteFood(id) {
      const store = dataFoodStore();
      store.deleteFood(id)
    },


  },
  mounted() {
    const store = dataFoodStore();
    store.fetchFoods();
  }
}
</script>

<template>
  <div class="container">
    <h1>Cardápio</h1>
    <div class="row">
      <div class="col-4 mt-4" v-for="food in foods" :key="food.id">
        <div class="card d-flex align-items-center">
          <div class="closeBtn" @click="deleteFood(food.id)">&times;</div>
          <img :src="food.imgUrl" alt="food image" class="card-img-top img-fluid">
          <div class="card-body">
            <h5 class="card-title">{{ food.title }}</h5>
          </div>
          <div class="">
            <p class="card-text m-2"><strong>Valor:</strong> R${{ food.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.card {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0;
}

.card-img-top {
  width: 100%;
  height: 7vw;
  object-fit: cover;
}

h1{
  text-align: center;
}

.closeBtn{
  position: absolute;
  right: 10px;
  color: grey;
  font-size: 18px;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
}
.closeBtn:hover{
  color: whitesmoke;
}
</style>
