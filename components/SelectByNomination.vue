<template>
	<Listbox
		as="div"
		:disabled="isLoaded"
		v-model="selectedFilters"
		@update:model-value="someFilterDataByNomination = selectedFilters"
	>
		<div class="relative mt-2">
			<ListboxButton
				class="relative w-[180px] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:text-sm sm:leading-6"
			>
				<span class="block truncate">
					{{ selectedFilters.name }}
				</span>
				<span
					class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
				>
					<ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
				</span>
			</ListboxButton>

			<transition
				leave-active-class="transition ease-in duration-300"
				leave-from-class="opacity-100"
				leave-to-class="opacity-0"
			>
				<ListboxOptions
					class="absolute w-[180px] z-10 mt-1 max-h-60 truncate rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
				>
					<ListboxOption
						as="template"
						v-for="nomination in nominations"
						:key="nomination.id"
						:value="nomination"
						v-slot="{ active, selectedFilters }"
					>
						<li
							:class="[
								active ? 'bg-indigo-600 text-white' : 'text-gray-900',
								'relative cursor-default select-none py-2 pl-3 pr-9',
							]"
						>
							<span
								:class="[
									selectedFilters ? 'font-semibold' : 'font-normal',
									'block truncate',
								]"
								>{{ nomination.name }}</span
							>

							<span
								v-if="selectedFilters"
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

const nominations = [
	{ id: 1, name: 'Все' },
	{ id: 2, name: 'Живопись' },
	{ id: 3, name: 'Рисунок' },
	{ id: 4, name: 'Фотография' },
	{ id: 5, name: 'ДПИ (Декоративно-прикладное искусство)' },
];

const someFilterDataByNomination = storeToRefs(
	useMyFetchItemsStore(),
).someFilterDataByNomination;

const isLoaded = ref(false);

const selectedFilters = ref(nominations[0]);
</script>
