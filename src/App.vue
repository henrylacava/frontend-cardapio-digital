<script>
import Card from './components/Card.vue';
import CreateModal from './components/CreateModal.vue';

export default {
  name: 'App',
  components: { Card, CreateModal }
} 
</script>

<template>
  <main>
    <div class="vh-100 d-flex flex-column align-items-center justify-content-center">
      <div>
        <Card />
      </div>
    </div>
    <CreateModal :visible="false"/>
  </main>
</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
