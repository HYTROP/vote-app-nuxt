// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: true,

	devtools: { enabled: true },
	modules: [
		'@formkit/auto-animate/nuxt',
		'@nuxtjs/tailwindcss',
		'@vueuse/nuxt',
		'@nuxt/image',
		'@nuxtjs/supabase',
		'@pinia-plugin-persistedstate/nuxt',
		'@pinia/nuxt',
	],

	supabase: {
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

	piniaPersistedstate: {
		storage: 'localStorage',
	},
	pinia: {
		storesDirs: ['./stores/**'],
	},

	imports: {
		dirs: ['stores'],
	},

	router: {
		middleware: ['auth'],
	},
});
