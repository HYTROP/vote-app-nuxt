// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
	],

	css: ['~/assets/css/tailwind.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
