<template>
	<Listbox
		as="div"
		v-model="selectedPointsFilters"
		@update:model-value="
			someFilterByPoints = selectedPointsFilters
		"
	>
		<div class="relative mt-2">
			<ListboxButton
				class="relative w-[180px] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:text-sm sm:leading-6"
			>
				<span class="block truncate">{{ selectedPointsFilters.name }}</span>
				<span
					class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
				>
					<ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
				</span>
			</ListboxButton>

			<transition
				leave-active-class="transition ease-in duration-100"
				leave-from-class="opacity-100"
				leave-to-class="opacity-0"
			>
				<ListboxOptions
					class="absolute w-[180px] mt-1 max-h-60 truncate rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
				>
					<ListboxOption
						as="template"
						v-for="marked in marks"
						:key="marked.id"
						:value="marked"
						v-slot="{ active, selectedPointsFilters }"
					>
						<li
							:class="[
								active ? 'bg-indigo-600 text-white' : 'text-gray-900',
								'relative cursor-default select-none py-2 pl-3 pr-9',
							]"
						>
							<span
								:class="[
									selectedPointsFilters ? 'font-semibold' : 'font-normal',
									'block truncate',
								]"
								>{{ marked.name }}</span
							>

							<span
								v-if="selectedPointsFilters"
								:class="[
									active ? 'text-white' : 'text-indigo-600',
									'absolute inset-y-0 right-0 flex items-center pr-4',
								]"
							>
								<CheckIcon class="h-5 w-5" aria-hidden="true" />
							</span>
						</li>
					</ListboxOption>
				</ListboxOptions>
			</transition>
		</div>
	</Listbox>
</template>

<script setup>
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

const marks = [
	{ id: 1, name: 'Все' },
	{ id: 2, name: 'Без оценки' },
	{ id: 3, name: 'С оценкой' },
];

const someFilterByPoints = storeToRefs(useMyFetchItemsStore()).someFilterByPoints;

const selectedPointsFilters = ref(marks[0]);


const filterCardsWithPointsFuc = (item) => {
	console.log('filterCardsWithPointsFuc');

	switch (selectedPointsFilters.value) {
		case 'Все':
			return true;
		case 'Без оценки':
			return item.points == 0;
		case 'С оценкой':
			return item.points > 0;
	}
};
</script>
