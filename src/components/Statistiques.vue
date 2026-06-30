<template>
  <div class="statistiques">
    <div class="stat">
      <span class="nombre">{{ etudiantsStore.total }}</span>
      <span class="label">Étudiants</span>
    </div>
    <div class="stat">
      <span class="nombre">{{ etudiantsStore.moyenneAge }} ans</span>
      <span class="label">Âge moyen</span>
    </div>
    <div class="stat">
      <span class="nombre">{{ repartitionGenre.Masculin || 0 }}</span>
      <span class="label">Masculins</span>
    </div>
    <div class="stat">
      <span class="nombre">{{ repartitionGenre.Féminin || 0 }}</span>
      <span class="label">Féminins</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useEtudiantsStore } from '@/stores/etudiants';

const etudiantsStore = useEtudiantsStore();

const repartitionGenre = computed(() => etudiantsStore.repartitionGenre);
</script>

<style scoped>
.statistiques {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat {
  text-align: center;
  padding: 16px 8px;
  border-radius: 10px;
  background: #f8f9fc;
  border: 1px solid #eef0f5;
}

.stat .nombre {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
}

.stat .label {
  display: block;
  font-size: 11px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
</style>