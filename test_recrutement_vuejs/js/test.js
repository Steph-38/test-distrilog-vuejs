let tdr = {
  props: ['price', 'unitvalues'],
  data() {
    return {
      picked: 1.1,
      quantity: null,
      result: null,
    }
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
      this.quantity = quantity;
      const coefficient = this.price * this.picked;
      this.result = (coefficient * quantity).toFixed(2);
    }
  },
  computed: {
    generatedPrice() {
      return (this.price * this.picked).toFixed(2);
    },
    generatedProduct() {
      this.unitvalues.forEach((element) => {
        if (element.coef === this.picked) {
          this.productName = `(${element.txt}) (${element.code})`;
        }
      });
      return this.productName;
    },
    inputQuantity: {
      set: function () {
        return this.quantity;
      },
      get: function () {
        return this.quantity;
      },
    },
  },
  template: `
      <div class="tdr">
          <div class="tdrtitle">Configuration produit Coca Classic {{ generatedProduct}} : {{ generatedPrice }}€</div>
          <div class="tdrunit">
              <div>Unités</div>
              <div v-for="(u,i) in unitvalues">
                  <label :for="'unit'+i">{{u.txt}}</label><input :id="'unit'+i" type="radio" name="unit" :value="u.coef" v-model="picked">
              </div>
          </div>
          <div class="tdrbox">
              <input type="text" @input="change" v-model.number="inputQuantity">
              <div class="btn" @click=coefficientPrice(quantity)>Prix coefficienté</div>
              <div class="tdrval">{{ result }}</div>
          </div>
      </div>
    `
};

// run
(() => {
  let tdrv = new Vue({
    el: '#tdr',
    data: {
      price: "16.53",
      units: [
        {
          coef: 1.1,
          txt: 'Boite 33cl',
          code: 'UNIT33CL'
        },
        {
          coef: 1.5,
          txt: 'Bouteille 50cl',
          code: 'UNIT50CL'
        },
      ]
    },
    template: `
            <div id="tdrmainbox">
                <div>
                    <tdr :price="price" :unitvalues="units"></tdr>
                </div>
                <div class="consignes">
                    <h1>Test de recrutement VueJS</h1>
                    <h2>Introduction</h2>
                    <p>Bienvenue dans ce test de recrutement.</p>
                    <p>Veuillez ouvrir le fichier <code>/js/test.js</code> à l'aide l'éditeur de code que vous aurez choisit.</p>
                    <p>Vous êtes dans le contexte d'un composant VueJS qui est utilisé par un composant parent.</p>
                    <p>Le principe de ce composant est de simuler le prix d'un produit Coca dont l'unité de vente peut être à la boite de 33cl ou à la bouteille de 50cl. Son interface est situé sur votre gauche</p>
                    <p>Chaque unité dispose de son propre coefficient multiplicateur de prix par rapport au prix de base du produit.</p>
                    <p>Le composant parent vous a fourni les informations essentielles dont vous avez besoin pour faire la simulation de prix, ces dernières sont accessibles via les <code>props</code> du composant <code>tdr</code> : </p>
                    <ul>
                        <li><code>price</code> : est simplement le prix de base de l'article</li>
                        <li><code>unitvalues</code> : est une collection d'objet d'unité, chacune comportant un coefficient multiplicateur, son libellé et son code système.</li>
                    </ul>
                    <h2>Travail à faire</h2>
                    <p>
                        L'interface est sommaire mais suffisante pour aider le client à savoir à quel prix son produit sera vendu en fonction de son unité, elle est composée de :
                        <ul>
                            <li>Un titre rappelant le produit, son code système, son unité actuelle et son prix de base.</li>
                            <li>Une boite de sélection d'unité avec les unités préalablement chargées.</li>
                            <li>Un champ de saisie de prix.</li>
                            <li>Un bouton "Prix coefficienté" qui lance la simulation de prix.</li>
                            <li>Une zone d'affichage de résultat de la simulation.</li>
                        </ul>
                    </p>
                    <p>Votre objectif sera de :</p>
                    <ul>
                        <li>Faire en sorte que le prix donné par le composant parent soit affiché dans le champ de saisie</li>
                        <li>Faire en sorte qu'une une unité par défaut soit sélectionnée dans la boite de sélection d'unité (ce peut être l'unité d'index 0 ou 1, peut importe)</li>
                        <li>Faire en sorte que la saisie ne puisse pas accueillir autre chose qu'un nombre positif ou négatif, pour cela vous utiliserez l'expression régulière suivante : <code>^-?[0-9]*[.]?[0-9]*$</code></li>
                        <li>La saisie ne doit jamais faire apparaitre une lettre, vous devez la bloquer avant qu'elle apparaisse.</li>
                        <li>Faire en sorte que quand le bouton "Prix coefficienté" est cliqué, la zone d'affichage de résultat soit remplit du résultat du prix de base multiplié par le coefficient de l'unité préalablement choisie.</li>
                    </ul>
                    
                    <h2>Bonus (ne rentre pas en compte dans le recrutement, mais ça envoie du pâté)</h2>
                    <p>Pour une meilleure expérience utilisateur, et vu que ça ne coute rien à faire avec VueJS, vous pouvez aussi :</p>
                    <ul>
                        <li>Faire en sorte que le prix de base change dans le titre, au moment ou la simulation est faite.</li>
                        <li>Faire en sorte que le nom de l'unité change dans le titre.</li>
                    </ul>

                    <h2>Le mot de la fin</h2>
                    <p>Le test est sensé vous occuper maximum une vingtaine de minutes</p>
                    <p>Vous pouvez vous aider de toute l'aide disponible, documentation, console, VueTools, etc...</p>
                    <p>C'est quelque chose de très classique pour Distrilog, c'est même simpliste, si celà vous fait peur, "fuyez pauvre fou".</p>
                    <p>Bon courage, on se retrouve derrière le mur, <br> Pierlo.</p>

                </div>
            </div>
        `,
    components: { 'tdr': tdr }
  })
})()