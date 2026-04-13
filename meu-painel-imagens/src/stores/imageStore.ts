import { defineStore } from "pinia";
import { reactive, computed } from "vue";

export type ImageStatus = "pending" | "processing" | "completed" | "error";

export interface ProcessingImage {
    file: string;
    status: ImageStatus;
}

export const useImageStore = defineStore("imageStore", () => {
    
    const images = reactive<Record<string, ProcessingImage>>({
        'img1': {file: 'image1.jpg', status: 'pending'},
        'img2': {file: 'image2.jpg', status: 'pending'},
        'img3': {file: 'image3.jpg', status: 'pending'},
    })

    const totalCompleted = computed(() => {
        return Object.values(images).filter(img => img.status === 'completed').length;
    })

    async function processImage(id: string) {
        if (images[id]?.status !== 'pending') return;

        images[id].status = 'processing';
        await new Promise(resolve => setTimeout(resolve, 3000));
        images[id].status = 'completed';
    }

    return {images, totalCompleted, processImage};
})