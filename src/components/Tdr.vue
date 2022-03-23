<template>
  <div class="tdr">
    <div class="tdrtitle">
      Configuration produit Coca Classic - {{ generatedProduct }} :
      {{ generatedPrice }}€
    </div>
    <div class="tdrunit">
      <div>Unités</div>
      <div v-for="u in unitvalues" :key="u.code">
        <label :for="'unit' + u">{{ u.txt }}</label
        ><input
          :id="'unit' + u"
          type="radio"
          name="unit"
          :value="u.coef"
          v-model="picked"
        />
      </div>
    </div>

    <span v-if="error">{{ error }}</span>

    <div class="tdrbox">
      <input
        type="text"
        @input="change"
        @change="change"
        v-model.number="inputQuantity"
      />
      <div class="btn" @click="coefficientPrice(quantity)">
        Prix coefficienté
      </div>
      <div class="tdrval">{{ result }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
    },
    unitvalues: {
      type: Array,
    },
  },
  data() {
    return {
      picked: null,
      quantity: null,
      result: null,
      error: null,
      productName: "Aucun produit sélectionné",
    };
  },
  computed: {
    inputQuantity: {
      set: function () {
        return this.quantity;
      },
      get: function () {
        return this.quantity;
      },
    },
    generatedPrice() {
      if (this.picked) {
        return (this.price * this.picked).toFixed(2);
      } else {
        return this.price;
      }
    },
    generatedProduct() {
      if (this.picked) {
        this.unitvalues.forEach((element) => {
          if (element.coef === this.picked) {
            this.productName = `${element.txt} ${element.code}`;
          }
        });
        return this.productName;
      } else {
        return this.productName;
      }
    },
  },
  methods: {
    change(event) {
      let val = event.target.value.trim();
      if (/^-?[0-9]*[.]?[0-9]*$/.test(val)) {
        this.quantity = val;
      } else {
        event.target.value = this.quantity;
      }
    },

    coefficientPrice(quantity) {
      if (!quantity || !this.picked) {
        this.error = "Veuillez saisir un nombre de produits et une unité";
      } else {
        this.quantity = quantity;
        const coefficient = this.price * this.picked;
        this.result = (coefficient * quantity).toFixed(2);
      }
    },
  },
};
</script>

<style>
</style>