<template>
  <div class="liste-etudiants">
    <div class="header">
      <h2>Liste des étudiants</h2>
      <span class="total">{{ etudiantsStore.total }} inscrit(s)</span>
    </div>

    <div v-if="etudiantsStore.etudiants.length === 0" class="vide">
      <span>📚</span>
      <p>Aucun étudiant enregistré</p>
    </div>

    <div v-else class="tableau-wrapper">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Âge</th>
            <th>Classe</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(etudiant, index) in etudiantsFiltres" :key="etudiant.id">
            <td>{{ index + 1 }}</td>
            <td>{{ etudiant.nom }}</td>
            <td>{{ etudiant.prenom }}</td>
            <td>{{ etudiant.age }}</td>
            <td>{{ etudiant.classe }}</td>
            <td>{{ etudiant.genre }}</td>
            <td class="actions">
              <router-link :to="'/modifier/' + etudiant.id" class="btn-modifier">
                ✏️
              </router-link>
              <button @click="supprimer(etudiant.id)" class="btn-supprimer">
                🗑️
              </button>
              <router-link :to="'/details/' + etudiant.id" class="btn-details">
                👁️
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useEtudiantsStore } from '@/stores/etudiants';

const props = defineProps({
  etudiantsFiltres: {
    type: Array,
    required: true
  }
});

const etudiantsStore = useEtudiantsStore();

const supprimer = (id) => {
  if (confirm('Supprimer cet étudiant ?')) {
    etudiantsStore.supprimerEtudiant(id);
  }
};
</script>

<style scoped>
.liste-etudiants {
  margin-top: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.header h2 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.header .total {
  font-size: 14px;
  color: #888;
}

.vide {
  text-align: center;
  padding: 40px;
  border: 1px solid #e0e0e0;
}

.vide span {
  font-size: 40px;
  display: block;
  margin-bottom: 10px;
}

.tableau-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

thead {
  background: black;
  color: white;
}

th {
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
}

td {
  padding: 10px 15px;
  border-bottom: 1px solid #e0e0e0;
}

tr:hover td {
  background: #f5f5f5;
}

.actions {
  display: flex;
  gap: 8px;
}

.actions a,
.actions button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 6px;
  transition: 0.3s;
  text-decoration: none;
}

.btn-modifier:hover {
  color: #1976d2;
}

.btn-supprimer:hover {
  color: #d32f2f;
}

.btn-details:hover {
  color: #2e7d32;
}

@media (max-width: 480px) {
  table {
    font-size: 12px;
  }

  th,
  td {
    padding: 8px 10px;
  }

  .actions {
    gap: 4px;
  }
}
</style>