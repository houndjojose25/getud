import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '../views/Accueil.vue';
import Ajouter from '../views/Ajouter.vue';
import Modifier from '../views/Modifier.vue';
import Details from '../views/Details.vue';

const routes = [
    { path: '/', name: 'Accueil', component: Accueil },
    { path: '/ajouter', name: 'Ajouter', component: Ajouter },
    { path: '/modifier/:id', name: 'Modifier', component: Modifier },
    { path: '/details/:id', name: 'Details', component: Details },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: { template: '<h1 style="padding:50px;text-align:center;">404 - Page non trouvée</h1>' } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;