<script setup lang="ts">
import { useImageStore } from '@/stores/imageStore';

const imageStore = useImageStore();

const formatStatus = (status: string) => {
    switch (status) {
        case 'pending':
            return 'Pendente';
        case 'processing':
            return 'Processando';
        case 'completed':
            return 'Concluído';
        default:
            return status;
    }
}

</script>

<template>
    <div class="gallery-container">
        <h2>Minha Galeria Global</h2>
        <p>Imagens Concluídas: {{ imageStore.totalCompleted }}</p>

        <div class="gallery">
            <div v-for="(image, id) in imageStore.images" :key="id" class="card">
                <p><strong>Arquivo:</strong>{{ image.file }}</p>
                <p><strong>Status:</strong>{{ formatStatus(image.status) }}</p>
                <p><strong>ID:</strong>{{ id }}</p>

                <button @click="imageStore.processImage(String(id))"
                        :disabled="image.status !== 'pending'"
                        :class="{ 'processing-btn': image.status === 'processing' }"
                >
                    {{ 
                        image.status === 'pending' ? 'Iniciar Processamento' : 
                        image.status === 'processing' ? 'Processando (Aguarde)...' : 
                        'Finalizado' 
                    }}
                </button>
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