import { defineStore } from 'pinia'

export const dataFoodStore = defineStore('data', {
  // state
  state() {
    return {
      foods: [],
    }
  },
  // action
  actions: {
    async fetchFoods() {
      const req = await fetch("http://127.0.0.1:8000/api/foods");
      const data = await req.json();
      this.foods = data
    },

    async deleteFood(id) {
      const req = await fetch(`http://127.0.0.1:8000/api/foods/${id}`, {
        method: "DELETE"
      });

      this.fetchFoods();
    },

    async createFood(newFood) {

      const dataJson = JSON.stringify(newFood)
      await fetch("http://127.0.0.1:8000/api/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson
      });

      console.log(newFood)
      this.fetchFoods();
    },
  }
  // getters
})