<script setup>
const props = defineProps({
	recordsArr: Array,
});

const { recordsArr } = toRefs(props);

const showModal = ref(false);
const personInfo = ref([]);
const selectedPhotoURL = ref('');
const currentIndex = ref(0);

// ---------------------

const openModal = (modalPhotoURL, index) => {
	selectedPhotoURL.value = modalPhotoURL;
	showModal.value = true;
	currentIndex.value = index;
	personInfo.value = recordsArr.value.find(
		(item) => item.photo === modalPhotoURL,
	);

	document.body.style.overflow = 'hidden';
};

const closeModal = () => {
	showModal.value = false;
	selectedPhotoURL.value = null;

	document.body.style.overflow = 'auto';
};

const nextImage = () => {
	const currentPhotoURL = selectedPhotoURL.value;

	const currentIndexInArr = recordsArr.value.findIndex(
		(item) => item.photo === currentPhotoURL,
	);
	const nextIndex =
		currentIndexInArr < recordsArr.value.length - 1 ? currentIndexInArr + 1 : 0;

	selectedPhotoURL.value = recordsArr.value[nextIndex].photo;
	personInfo.value = recordsArr.value[nextIndex];
};

const prevImage = () => {
	const currentPhotoURL = selectedPhotoURL.value;

	const currentIndexInArr = recordsArr.value.findIndex(
		(item) => item.photo === currentPhotoURL,
	);

	const prevIndex =
		currentIndexInArr > 1 ? currentIndexInArr - 1 : recordsArr.value.length - 1;

	selectedPhotoURL.value = recordsArr.value[prevIndex].photo;
	personInfo.value = recordsArr.value[prevIndex];
};
</script>

<template>
	<div
		class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:m-2 gap-8 sm:m-2 my-3"
	>
		<CardComp
			v-for="record in recordsArr"
			:key="record.id"
			:record="record"
			@openModal="openModal"
		/>

		<ModalPhoto
			:showModal="showModal"
			@closeModal="closeModal"
			@nextImage="nextImage"
			@prevImage="prevImage"
			:personInfo="personInfo"
		/>
	</div>
</template>
