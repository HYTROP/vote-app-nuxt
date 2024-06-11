<template>
	<nav
		class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0"
	>
		<div class="-mt-px sm:flex w-full flex-1 hidden">
			<a
				href="#"
				@click.prevent="previousPage"
				class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-md font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
			>
				<ArrowLongLeftIcon
					class="mx-1 h-6 w-12 text-gray-400 hover:text-indigo-600 hover:scale-125 transition duration-300 ease-in-out"
					aria-hidden="true"
				/>
			</a>
		</div>

		<div class="md:-mt-px flex overflow-x-auto scroll">
			<span
				v-for="page in totalPages"
				:key="page"
				:class="
					page === currentPage
						? 'border-indigo-500  text-indigo-600 transition-all duration-300'
						: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
				"
				class="inline-flex items-center border-t-2 cursor-pointer border-transparent px-5 pt-5 text-md font-medium"
				@click="currentPage = page"
				>{{ page }}
			</span>
		</div>

		<div class="-mt-px sm:flex hidden w-full flex-1 justify-end">
			<a
				@click.prevent="nextPage"
				href="#"
				class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-md font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
			>
				<ArrowLongRightIcon
					class="mx-1 h-6 w-12 text-gray-400 hover:text-indigo-600 hover:scale-125 transition duration-300 ease-in-out"
					aria-hidden="true"
				/>
			</a>
		</div>
	</nav>
</template>

<script setup>
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid';

const {currentPage, totalPages} = storeToRefs(useMyFetchItemsStore());

const nextPage = () => {
	if (currentPage.value < totalPages.value) ++currentPage.value
};

const previousPage = () => {
	if (currentPage.value > 1) --currentPage.value
};
</script>

<style scoped>
.scroll::-webkit-scrollbar {
	width: 0;
	height: 0;
}
</style>
