<template>
  <div class="dashboard">

    <!-- BANNIÈRE -->
    <header class="banniere">
      <div class="banniere-texte">
        <h1>Gestion des étudiants</h1>
        <p>Suivez, ajoutez et organisez votre liste d'étudiants en un coup d'œil.</p>
      </div>
      <router-link to="/ajouter" class="btn-ajouter">
        <span>+</span> Ajouter un étudiant
      </router-link>
    </header>

    <!-- CORPS EN 2 COLONNES -->
    <div class="corps">

      <!-- COLONNE GAUCHE : statistiques -->
      <aside class="colonne-stats">
        <h2 class="titre-section">Aperçu</h2>
        <div class="stats-wrapper">
          <Statistiques />
        </div>
      </aside>

      <!-- COLONNE DROITE : recherche + liste -->
      <main class="colonne-liste">
        <div class="barre-recherche">
          <svg class="icone-recherche" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            v-model="recherche"
            type="text"
            placeholder="Rechercher par nom, prénom ou classe..."
            class="input-recherche"
          />
          <span class="compteur">{{ etudiantsFiltres.length }}</span>
        </div>

        <ListeEtudiants :etudiantsFiltres="etudiantsFiltres" />
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useEtudiantsStore } from '@/stores/etudiants';
import Statistiques from '@/components/Statistiques.vue';
import ListeEtudiants from '@/components/ListeEtudiants.vue';

const etudiantsStore = useEtudiantsStore();
const recherche = ref('');

onMounted(() => {
  etudiantsStore.chargerEtudiants();
});

const etudiantsFiltres = computed(() => {
  if (!recherche.value.trim()) {
    return etudiantsStore.etudiants;
  }
  const terme = recherche.value.toLowerCase().trim();
  return etudiantsStore.etudiants.filter(e => {
    return e.nom.toLowerCase().includes(terme) ||
           e.prenom.toLowerCase().includes(terme) ||
           e.classe.toLowerCase().includes(terme);
  });
});
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.dashboard {
  font-family: 'Segoe UI', Arial, sans-serif;
  max-width: 1140px;
  margin: 0 auto;
  padding: 32px 24px 60px;
  background: #f4f5f7;
}

/* ---------- Bannière ---------- */
.banniere {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  background: linear-gradient(135deg, #4338ca, #6366f1 60%, #818cf8);
  color: white;
  padding: 40px 36px;
  border-radius: 16px;
  margin-bottom: 28px;
  box-shadow: 0 10px 30px -10px rgba(67, 56, 202, 0.45);
}

.badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.18);
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.4px;
  margin-bottom: 12px;
}

.banniere-texte h1 {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.banniere-texte p {
  margin: 0;
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  max-width: 420px;
  line-height: 1.5;
}

.btn-ajouter {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  color: #4338ca;
  padding: 13px 24px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  transition: 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.btn-ajouter span {
  font-size: 18px;
  line-height: 1;
}

.btn-ajouter:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

/* ---------- Corps en 2 colonnes ---------- */
.corps {
  display: grid;
  grid-template-columns: minmax(260px, 320px) 1fr;
  gap: 24px;
  align-items: start;
}

.titre-section {
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

/* ---------- Colonne stats ---------- */
.colonne-stats {
  background: white;
  border-radius: 16px;
  padding: 22px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* On force le contenu du composant Statistiques à bien tenir dans la colonne */
.stats-wrapper {
  width: 100%;
  overflow: hidden;
}

.stats-wrapper :deep(*) {
  max-width: 100%;
  box-sizing: border-box;
}

/* Si Statistiques utilise une grille en 4 colonnes, on la force à 2 colonnes ici */
.stats-wrapper :deep(.stats-grid),
.stats-wrapper :deep([class*="grid"]) {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 12px !important;
}

/* ---------- Colonne liste ---------- */
.colonne-liste {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

/* ---------- Barre de recherche ---------- */
.barre-recherche {
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: 0.2s;
}

.barre-recherche:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.icone-recherche {
  color: #9ca3af;
  flex-shrink: 0;
}

.input-recherche {
  flex: 1;
  min-width: 0;
  border: none;
  font-size: 14px;
  font-family: inherit;
  background: transparent;
  color: #111827;
  outline: none;
}

.input-recherche::placeholder {
  color: #9ca3af;
}

.compteur {
  font-size: 13px;
  font-weight: 600;
  color: #6366f1;
  background: #eef2ff;
  padding: 4px 12px;
  border-radius: 999px;
  white-space: nowrap;
  flex-shrink: 0;
}

/* ---------- Responsive ---------- */
@media (max-width: 768px) {
  .corps {
    grid-template-columns: 1fr;
  }

  .banniere {
    flex-direction: column;
    align-items: flex-start;
    padding: 28px 24px;
  }

  .btn-ajouter {
    width: 100%;
    justify-content: center;
  }
}
</style>