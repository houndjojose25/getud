<template>
  <div class="page-ajouter">
    <BoutonRetour />
    <h1>➕ Ajouter un étudiant</h1>
    <FormulaireEtudiant mode="ajout" @submit="ajouter" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useEtudiantsStore } from '@/stores/etudiants';
import BoutonRetour from '@/components/BoutonRetour.vue';
import FormulaireEtudiant from '@/components/FormulaireEtudiant.vue';

const router = useRouter();
const etudiantsStore = useEtudiantsStore();

const ajouter = (etudiant) => {
  etudiantsStore.ajouterEtudiant(etudiant);
  router.push('/');
};
</script>

<style scoped>
.page-ajouter {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
}
</style>