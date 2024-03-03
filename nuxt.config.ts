// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	buildModules: ['nuxt-vite'],
	modules: [
		'@formkit/auto-animate/nuxt',
		'@nuxtjs/tailwindcss',
		'@vueuse/nuxt',
	],
	devtools: { enabled: true },
	css: ['~/assets/css/tailwind.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
