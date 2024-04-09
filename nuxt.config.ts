// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: true,

	devtools: { enabled: true },
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
		},
	},
	modules: [
		'@formkit/auto-animate/nuxt',
		'@nuxtjs/tailwindcss',
		'@vueuse/nuxt',
		'@nuxt/image',
		'@nuxtjs/supabase',
		'@pinia/nuxt',
	],

	supabase: {
		// redirect: false,
		redirectOptions: {
			login: '/signup',
			callback: '/login',
			include: undefined,
			exclude: [],
			cookieRedirect: false,
		},
	},

	css: ['~/assets/css/tailwind.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	image: {
		domains: [''],
	},
});
