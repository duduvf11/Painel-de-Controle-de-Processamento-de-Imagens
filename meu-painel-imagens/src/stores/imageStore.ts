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
        'img2': {file: 'image2.jpg', status: 'completed'},
        'img3': {file: 'image3.jpg', status: 'processing'},
    })

    const totalCompleted = computed(() => {
        return Object.values(images).filter(img => img.status === 'completed').length;
    })

    function updateImageStatus(id: string, newStatus: ImageStatus) {
        if (images[id]) {
            images[id].status = newStatus;
        }
    }

    return {images, totalCompleted, updateImageStatus};
})