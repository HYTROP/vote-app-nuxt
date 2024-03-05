// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
        '@formkit/auto-animate/nuxt',
        '@nuxtjs/tailwindcss',
        '@vueuse/nuxt',
        "@nuxt/image"
    ],

	css: ['~/assets/css/tailwind.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});