<template>
  <div class="page-modifier">
    <BoutonRetour />
    <h1>✏️ Modifier un étudiant</h1>
    <div v-if="etudiant">
      <FormulaireEtudiant mode="modification" :etudiant="etudiant" @submit="modifier" />
    </div>
    <div v-else>
      <p>Étudiant non trouvé</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEtudiantsStore } from '@/stores/etudiants';
import BoutonRetour from '@/components/BoutonRetour.vue';
import FormulaireEtudiant from '@/components/FormulaireEtudiant.vue';

const route = useRoute();
const router = useRouter();
const etudiantsStore = useEtudiantsStore();

const etudiant = ref(null);

onMounted(() => {
  const id = parseInt(route.params.id);
  etudiant.value = etudiantsStore.getEtudiantParId(id);
});

const modifier = (nouvellesDonnees) => {
  etudiantsStore.modifierEtudiant(etudiant.value.id, nouvellesDonnees);
  router.push('/');
};
</script>

<style scoped>
.page-modifier {
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