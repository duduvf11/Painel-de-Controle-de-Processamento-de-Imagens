<script setup lang="ts">
import { ref } from 'vue';
import { useImageStore } from '@/stores/imageStore';

const imageStore = useImageStore();

const newFileName = ref('');

const handleAddImage = () => {
  const trimmedFileName = newFileName.value.trim();
  if (trimmedFileName === '') return;

  imageStore.addImage(trimmedFileName);
    newFileName.value = '';
}

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
    <h2>Painel de Controle de Imagens</h2>
    
    <div class="upload-section">
      <input 
        v-model="newFileName" 
        type="text" 
        placeholder="Digite o nome do arquivo (ex: ressonancia_torax.png)"
        @keyup.enter="handleAddImage" 
      />
      <button class="add-btn" @click="handleAddImage">
        Adicionar Imagem
      </button>
    </div>

    <h3>Na Fila ({{ imageStore.totalCompleted }} Concluídas)</h3>

    <div class="gallery">
      <div v-for="(image, id) in imageStore.images" :key="id" class="card">
        <p><strong>Arquivo:</strong> {{ image.file }}</p>
        <p><strong>Status:</strong> {{ formatStatus(image.status) }}</p>
        
        <button 
          @click="imageStore.processImage(String(id))"
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
.gallery-container { font-family: sans-serif; padding: 20px; max-width: 900px; margin: auto; }

.upload-section { 
    display: flex; 
    gap: 10px; 
    margin-bottom: 30px; 
    padding-bottom: 20px;
    border-bottom: 1px solid oklch(94.912% 0.00011 271.152);
}

.upload-section input { 
    flex: 1; 
    padding: 10px; 
    border: 1px solid oklch(84.522% 0.0001 271.152); 
    border-radius: 4px; 
    font-size: 16px;
}

.add-btn { 
    background-color: oklch(63.879% 0.18937 145.818); 
    color: oklch(100% 0.00011 271.152); 
    padding: 10px 20px; 
    border: none; 
    border-radius: 4px; 
    cursor: pointer; 
    font-weight: bold;
}
.add-btn:hover { background-color: oklch(55.147% 0.14891 146.811); }

.gallery { display: flex; gap: 15px; flex-wrap: wrap; }
.card { border: 1px solid oklch(84.522% 0.0001 271.152); padding: 15px; border-radius: 8px; width: 250px; background-color: oklch(98.212% 0.00011 271.152);}
button { 
  margin-top: 15px; padding: 8px 12px; cursor: pointer; 
  background-color: oklch(48.089% 0.15266 255.259); color: oklch(100% 0.00011 271.152); border: none; border-radius: 4px; width: 100%;
}
button:disabled:not(.processing-btn) { background-color: oklch(39.896% 0.12138 144.187); cursor: not-allowed; }
button.processing-btn:disabled { background-color: oklch(84.416% 0.17209 84.936); color: oklch(0% 0 0); cursor: wait; }
</style>