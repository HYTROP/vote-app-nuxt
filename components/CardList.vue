<script setup>
defineProps({
  dataArray: Array,
  isFavorite: Boolean, // for favorites
  onClickFavorite: Function,
  personInfo: Object, //for modal
  showModal: Boolean, // for modal
  selectedPhotoURL: String, // for modal
});
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 lg:m-2 gap-8 sm:m-3 my-3"
  >
    <Skeleton class="max-h-[283px] sm:max-h-[253px]" v-if="!dataArray.length" />
    <CardComp
      v-for="(record, index) in dataArray"
      :key="record.id"
      :photo="record.photo"
      :fio="record.fio"
      :nomination="record.nomination"
      :onClickFavorite="() => $emit('onClickFavorite', record)"
      :isFavorite="record.isFavorite"
      :index="index"
      :showModal="showModal"
    />

    <ModalPhoto
      :onClickFavorite="() => $emit('addToFavorites', record)"
      :isFavorite="isFavorite"
      :info="personInfo"
      :show="showModal"
      :selectedPhotoURL="selectedPhotoURL"
    />
  </div>
</template>
