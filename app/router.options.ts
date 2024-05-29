import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
	routes: (_routes) => [
		{
			name: 'home',
			path: '/',
			component: () => import('~/pages/index.vue'),
		},
		{
			name: 'signup',
			path: '/signup',
			component: () => import('~/components/SignUp.vue'),
		},
		{
			name: 'login',
			path: '/login',
			component: () => import('~/components/Login.vue'),
		},
		{
			name: 'favorites',
			path: '/favorites',
			meta: { requiresAuth: true, name: 'Избранное' },
			component: () => import('~/pages/favorites.vue'),
		},
		{
			name: 'results',
			path: '/results',
			meta: { requiresAuth: true, name: 'Результаты' },
			component: () => import('~/pages/results.vue'),
		},
	],
};
