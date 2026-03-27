<script setup lang="ts">
import { useImageStore } from '@/stores/imageStore';

const imageStore = useImageStore();
</script>

<template>
    <div class="gallery-container">
        <h2>Minha Galeria Global</h2>
        <p>Imagens Concluídas: {{ imageStore.totalCompleted }}</p>

        <div class="gallery">
            <div v-for="(image, id) in imageStore.images" :key="id" class="card">
                <p><strong>Arquivo:</strong>{{ image.file }}</p>
                <p><strong>Status:</strong>{{ image.status }}</p>
                <p><strong>ID:</strong>{{ id }}</p>

                <button @click="imageStore.updateImageStatus(id, 'completed')">Marcar como Concluído</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.gallery{
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 8px;
    background-color: #f9f9f9;
}

button {
  cursor: pointer;
  padding: 8px;
  background-color: #2b772e;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>