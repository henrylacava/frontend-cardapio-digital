<script>
import useVuelidate from '@vuelidate/core'
import { required, alpha, maxLength, numeric, minValue, url, helpers } from '@vuelidate/validators'

export default {
  name: 'CreateModal',
  props: {
    visible: Boolean,
  },
    
  data () {
    return {
      v$: useVuelidate(),

      OpenClose: this.visible,

      title: null,
      price: null,
      imgUrl: null
    }
  },

  validations() {
    return {
      title: {
        required: helpers.withMessage('Título não pode ser vázio', required),
        alpha: helpers.withMessage('Só aceita letras', alpha), 
        maxLength: helpers.withMessage('Máximo de 64 caracteres', maxLength(64))
      },
      price: {
        required: helpers.withMessage('Preço não pode ser vázio', required), 
        numeric: helpers.withMessage('Só aceita números', numeric),
        minValue: helpers.withMessage('Não pode valores negativos', minValue(0))
      },
      imgUrl: {
        required: helpers.withMessage('URL não pode ser vázio', required), 
        url: helpers.withMessage('Precisa ser uma URL válida', url)
      }
    }
  },

  methods: {
    OpenCloseFun() {
      this.OpenClose = !this.OpenClose;
    },

    submit() {
      this.v$.$touch();
    },

    async createFood(e) {
      e.preventDefault();

      const data = {
        title: this.title,
        price: this.price,
        imgUrl: this.imgUrl
      }

      const dataJson = JSON.stringify(data);

      await fetch("http://127.0.0.1:8000/api/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json"},
        body: dataJson
      });
    },
  },

  watch: {
    visible: function (newVal, oldVal) {
      this.OpenClose = newVal
      console.log('new' + newVal + '==' + oldVal)
    }
  }
}
</script>


<template>
  <div v-if="OpenClose" class="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style="display: block;">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Cadastre um item no cárdapio</h5>
          <button type="button" class="btn" @click="OpenCloseFun()" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit="createFood">
          <div class="modal-body">
            <div class="form-group">
              <label class="fw-bold mb-2" for="title">Título</label>
              <input type="text" name="title" v-model="title" 
              :class="v$.title.$error === true ? 'form-control is-invalid' : 'form-control'" placeholder="Título">
            </div>
            <div class="p-1 text-danger" v-for="error of v$.title.$errors" :key="error.$uid">
              {{ error.$message }}
            </div>
            <div class="form-group mt-4">
              <label class="fw-bold mb-2" for="price">Preço</label>
              <input type="text" name="price" v-model="price" 
              :class="v$.price.$error === true ? 'form-control is-invalid' : 'form-control'" placeholder="Preço">
            </div>
            <div class="p-1 text-danger" v-for="error of v$.price.$errors" :key="error.$uid">
              {{ error.$message }}
            </div>
            <div class="form-group mt-4">
              <label class="fw-bold mb-2" for="imgUrl">URL da imagem</label>
              <input type="text" name="imgUrl" v-model="imgUrl" 
              :class="v$.imgUrl.$error === true ? 'form-control is-invalid' : 'form-control'" placeholder="URL">
            </div>
            <div class="p-1 text-danger" v-for="error of v$.imgUrl.$errors" :key="error.$uid">
              {{ error.$message }}
            </div>
          </div>
          <div class="modal-footer">
            <input type="submit" @click="submit" class="btn btn-success">
            <button type="button" @click="OpenCloseFun" class="btn btn-danger">Fechar</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <button type="button" @click="OpenCloseFun" class="btn btn-primary"
    style="position: fixed; bottom: 20px; right: 20px;">Criar</button>
</template>