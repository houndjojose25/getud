<template>
  <div class="page-details">
    <BoutonRetour />
    <h1>👁️ Détails de l'étudiant</h1>

    <div v-if="etudiant" class="carte-details">
      <div class="info">
        <span class="label">Nom</span>
        <span class="valeur">{{ etudiant.nom }}</span>
      </div>
      <div class="info">
        <span class="label">Prénom</span>
        <span class="valeur">{{ etudiant.prenom }}</span>
      </div>
      <div class="info">
        <span class="label">Âge</span>
        <span class="valeur">{{ etudiant.age }} ans</span>
      </div>
      <div class="info">
        <span class="label">Classe</span>
        <span class="valeur">{{ etudiant.classe }}</span>
      </div>
      <div class="info">
        <span class="label">Genre</span>
        <span class="valeur">{{ etudiant.genre }}</span>
      </div>
      <div class="info">
        <span class="label">Email</span>
        <span class="valeur">{{ etudiant.email }}</span>
      </div>
      <div class="info">
        <span class="label">ID</span>
        <span class="valeur">#{{ etudiant.id }}</span>
      </div>
    </div>

    <div v-else>
      <p>Étudiant non trouvé</p>
    </div>

    <div class="actions">
      <router-link :to="'/modifier/' + etudiant?.id" class="btn-modifier">
        ✏️ Modifier
      </router-link>
      <router-link to="/" class="btn-retour-liste">
        ← Retour à la liste
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useEtudiantsStore } from '@/stores/etudiants';
import BoutonRetour from '@/components/BoutonRetour.vue';

const route = useRoute();
const etudiantsStore = useEtudiantsStore();

const etudiant = ref(null);

onMounted(() => {
  const id = parseInt(route.params.id);
  etudiant.value = etudiantsStore.getEtudiantParId(id);
});
</script>

<style scoped>
.page-details {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
}

.carte-details {
  border: 1px solid #e0e0e0;
  padding: 25px;
  background: white;
}

.info {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info:last-child {
  border-bottom: none;
}

.info .label {
  font-weight: 600;
  color: #666;
}

.info .valeur {
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.btn-modifier {
  display: inline-block;
  background: black;
  color: white;
  padding: 10px 25px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: 0.3s;
}

.btn-modifier:hover {
  background: #333;
}

.btn-retour-liste {
  display: inline-block;
  background: white;
  color: black;
  padding: 10px 25px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  border: 1px solid black;
  transition: 0.3s;
}

.btn-retour-liste:hover {
  background: #f5f5f5;
}

@media (max-width: 480px) {
  .actions {
    flex-direction: column;
  }
}
</style>