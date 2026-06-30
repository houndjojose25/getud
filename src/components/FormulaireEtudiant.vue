<template>
  <form @submit.prevent="soumettre" class="formulaire">
    <div class="form-group">
      <label for="nom">Nom</label>
      <input id="nom" v-model="form.nom" type="text" placeholder="Nom" required />
    </div>

    <div class="form-group">
      <label for="prenom">Prénom</label>
      <input id="prenom" v-model="form.prenom" type="text" placeholder="Prénom" required />
    </div>

    <div class="form-group">
      <label for="age">Âge</label>
      <input id="age" v-model="form.age" type="number" placeholder="Âge" required min="16" max="99" />
    </div>

    <div class="form-group">
      <label for="classe">Classe</label>
      <select id="classe" v-model="form.classe" required>
        <option value="">Sélectionnez une classe</option>
        <option value="L1">L1</option>
        <option value="L2">L2</option>
        <option value="L3">L3</option>
        <option value="M1">M1</option>
        <option value="M2">M2</option>
      </select>
    </div>

    <div class="form-group">
      <label for="genre">Genre</label>
      <select id="genre" v-model="form.genre" required>
        <option value="">Sélectionnez</option>
        <option value="Masculin">Masculin</option>
        <option value="Féminin">Féminin</option>
      </select>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" v-model="form.email" type="email" placeholder="email@exemple.com" required />
    </div>

    <div class="form-actions">
      <button type="submit" class="btn-soumettre">
        {{ mode === 'ajout' ? '➕ Ajouter' : '💾 Modifier' }}
      </button>
      <router-link to="/" class="btn-annuler">Annuler</router-link>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  mode: {
    type: String,
    default: 'ajout' // 'ajout' ou 'modification'
  },
  etudiant: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['submit']);

const form = reactive({
  nom: '',
  prenom: '',
  age: '',
  classe: '',
  genre: '',
  email: ''
});

// Si on est en mode modification, remplir le formulaire
watch(() => props.etudiant, (etudiant) => {
  if (etudiant) {
    form.nom = etudiant.nom || '';
    form.prenom = etudiant.prenom || '';
    form.age = etudiant.age || '';
    form.classe = etudiant.classe || '';
    form.genre = etudiant.genre || '';
    form.email = etudiant.email || '';
  }
}, { immediate: true });

const soumettre = () => {
  emit('submit', { ...form });
};
</script>

<style scoped>
.formulaire {
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #e0e0e0;
  background: white;
}

.form-group {
  margin-bottom: 18px;
}

label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  font-size: 15px;
  font-family: 'Arial', sans-serif;
  box-sizing: border-box;
  background: white;
  color: black;
  transition: 0.3s;
}

input:focus,
select:focus {
  border-color: black;
  outline: none;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.btn-soumettre {
  flex: 2;
  background: black;
  color: white;
  border: none;
  padding: 12px 0;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.btn-soumettre:hover {
  background: #333;
}

.btn-annuler {
  flex: 1;
  background: white;
  color: black;
  border: 1px solid black;
  padding: 12px 0;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: 0.3s;
}

.btn-annuler:hover {
  background: #f5f5f5;
}

@media (max-width: 480px) {
  .formulaire {
    padding: 20px;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>