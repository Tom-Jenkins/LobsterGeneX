import { useEffect, useRef } from "react";

export default function Modal({ modalOpen, renderCloseBtn=true, renderCloseX=true, onClose, children }) {
    const modalRef = useRef(null);

    useEffect(() => {
        // Get reference to the modal DOM element
        const modalElement = modalRef.current;
        if (!modalElement) return; // guard clause

        // Open modal when 'modalOpen' changes to true
        if (modalOpen) {
            modalElement.showModal();
            modalElement.classList.add("modal--active");
            modalElement.focus();

        } else {
            // Fade out first, then close modal
            modalElement.classList.remove("modal--active");

            setTimeout(() => {
                modalElement.close();
            }, 400); // must match transition on modal class            
        };

    }, [modalOpen]);

    // Utility function that changes modalOpen state to false
    function handleCloseModal() {
        onClose && onClose();
    }

    // Close modal and change state when escape key pressed
    function handleKeydown(e) {
        if (e.key === "Escape") {
            handleCloseModal();
        };
    };

    return (
            <dialog 
                ref={modalRef}
                className="modal"
                onKeyDown={handleKeydown}
                >
                <div className="modal__container">
                    {renderCloseX &&
                        <a onClick={handleCloseModal} className="modal__closeX">
                            &times;
                        </a>
                    }
                    {children}
                    {renderCloseBtn &&
                        <button onClick={handleCloseModal} className="modal__closeBtn">
                            Close
                        </button>
                    }
                </div>
            </dialog>
    );
}
