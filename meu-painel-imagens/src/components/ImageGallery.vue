<script setup lang="ts">
import { reactive } from 'vue';

type ImageStatus = 'pending' | 'processing' | 'completed' | 'error';

interface ProcessingImage {
    file: string;
    status: ImageStatus;
}

const images = reactive<Record<string, ProcessingImage>>({
    'img1': { file: 'image1.jpg', status: 'pending' },
    'img2': { file: 'image2.jpg', status: 'completed' },
    'img3': { file: 'image3.jpg', status: 'processing' },
});
</script>

<template>
    <div class="gallery">
        <h2>Minha Galeria</h2>

        <div v-for="(image, id) in images" :key="id" class="card">
            <p><strong>Arquivo:</strong>{{ image.file }}</p>
            <p><strong>Status:</strong>{{ image.status }}</p>
            <p><strong>ID:</strong>{{ id }}</p>
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
</style>