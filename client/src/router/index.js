// import Vue from 'vue'
// import VueRouter from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/stats',
        name: 'Stats',
        component: () => import('../views/Stats.vue')
    },
    {
        path: '/vote',
        name: 'Vote',
        component: () => import('../views/Vote.vue')
    },
    {
        path: '/ideas',
        name: 'Ideas',
        component: () => import('../views/pre/PreIdeas.vue')
    },
    {
        path: '/create-idea',
        name: 'create-idea',
        component: () => import('../views/pre/PreCreateIdea.vue')
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('../views/SignUp.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
    