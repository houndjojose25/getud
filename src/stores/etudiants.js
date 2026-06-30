import { defineStore } from 'pinia';

export const useEtudiantsStore = defineStore('etudiants', {
    state: () => ({
        etudiants: [],
        prochainId: 1
    }),

    getters: {
        // Nombre total d'étudiants
        total: (state) => state.etudiants.length,

        // Moyenne d'âge
        moyenneAge: (state) => {
            if (state.etudiants.length === 0) return 0;
            const total = state.etudiants.reduce((sum, e) => sum + e.age, 0);
            return Math.round(total / state.etudiants.length);
        },

        // Répartition par classe
        repartitionClasse: (state) => {
            const repartition = {};
            state.etudiants.forEach(e => {
                repartition[e.classe] = (repartition[e.classe] || 0) + 1;
            });
            return repartition;
        },

        // Répartition par genre
        repartitionGenre: (state) => {
            const repartition = { Masculin: 0, Féminin: 0 };
            state.etudiants.forEach(e => {
                if (e.genre === 'Masculin') repartition.Masculin++;
                else if (e.genre === 'Féminin') repartition.Féminin++;
            });
            return repartition;
        },

        // Trouver un étudiant par ID
        getEtudiantParId: (state) => (id) => {
            return state.etudiants.find(e => e.id === id);
        }
    },

    actions: {
        // Charger les étudiants depuis localStorage
        chargerEtudiants() {
            const saved = localStorage.getItem('etudiants');
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    this.etudiants = data.etudiants || [];
                    this.prochainId = data.prochainId || 1;
                } catch (e) {
                    this.etudiants = [];
                    this.prochainId = 1;
                }
            } else {
                // Données de démonstration
                this.etudiants = [
                    { id: 1, nom: 'Dupont', prenom: 'Jean', age: 20, classe: 'L1', genre: 'Masculin', email: 'jean@email.com' },
                    { id: 2, nom: 'Martin', prenom: 'Marie', age: 22, classe: 'L2', genre: 'Féminin', email: 'marie@email.com' },
                    { id: 3, nom: 'Durand', prenom: 'Pierre', age: 19, classe: 'L1', genre: 'Masculin', email: 'pierre@email.com' }
                ];
                this.prochainId = 4;
                this.sauvegarder();
            }
        },

        // Sauvegarder dans localStorage
        sauvegarder() {
            localStorage.setItem('etudiants', JSON.stringify({
                etudiants: this.etudiants,
                prochainId: this.prochainId
            }));
        },

        // Ajouter un étudiant
        ajouterEtudiant(etudiant) {
            const nouvelEtudiant = {
                id: this.prochainId,
                ...etudiant
            };
            this.etudiants.push(nouvelEtudiant);
            this.prochainId++;
            this.sauvegarder();
            return nouvelEtudiant;
        },

        // Modifier un étudiant
        modifierEtudiant(id, nouvellesDonnees) {
            const index = this.etudiants.findIndex(e => e.id === id);
            if (index !== -1) {
                this.etudiants[index] = { ...this.etudiants[index], ...nouvellesDonnees };
                this.sauvegarder();
                return true;
            }
            return false;
        },

        // Supprimer un étudiant
        supprimerEtudiant(id) {
            this.etudiants = this.etudiants.filter(e => e.id !== id);
            this.sauvegarder();
        }
    }
});