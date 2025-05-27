import { useEffect, useRef } from "react";

export default function Modal({ isOpen, renderCloseBtn = true, onClose, children }) {
    const modalRef = useRef(null);

    useEffect(() => {
        // Get reference to the modal DOM element
        const modalElement = modalRef.current;
        if (!modalElement) return; // guard clause

        // Open modal when 'isOpen' changes to true
        isOpen ? modalElement.showModal() : modalElement.close();

    }, [isOpen]);

    function handleCloseModal() {
        onClose && onClose();
    }

    function handleEscKeydown(e) {
        if (e.key === "Escape") handleCloseModal();
    }

    return (
        <dialog ref={modalRef} className="modal" onKeyDown={handleEscKeydown}>
            {children}
            {renderCloseBtn &&
                <button onClick={handleCloseModal} className="modal-close-btn">
                    Close
                </button>
            }
        </dialog>
    );
}
