

import { ref } from 'vue';

const showModal = ref(false);
const showHumanCheck = ref(false);
const showSignatureModal = ref(false);

export function useModals() {
    const openModal = () => {
        showModal.value = true;
    };

    const closeModal = () => {
        showModal.value = false;
    };

    const openHumanCheck = () => {
        showHumanCheck.value = true;
    };

    const closeHumanCheck = () => {
        showHumanCheck.value = false;
    };

    const openSignatureModal = () => {
        showSignatureModal.value = true;
    };

    const closeSignatureModal = () => {
        showSignatureModal.value = false;
    };

    return {
        showModal,
        openModal,
        closeModal,
        showHumanCheck,
        openHumanCheck,
        closeHumanCheck,
        showSignatureModal,
        openSignatureModal,
        closeSignatureModal,
    };
}