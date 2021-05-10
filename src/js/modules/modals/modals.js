export default class Modals {
    constructor(modalSelector, trigger) {
        this.overlay = document.querySelector(".overlay");
        this.modal = document.querySelector(modalSelector);
        this.modals = document.querySelectorAll(".modal");
        this.triggers = document.querySelectorAll(trigger);
        this.closeBtns = document.querySelectorAll(".modal__close");
    }

    bindTriggers() {
        this.triggers.forEach(trigger => {
            trigger.addEventListener("click", (e) => {
                this.show();
            });
        });

        this.closeBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                this.closeAllModals();
            });
        });

        this.overlay.addEventListener("click", (e) => {
            if (e.target == this.overlay) {
                this.closeAllModals();
            }
        });

    }
    closeAllModals() {
        this.modals.forEach(modal => {
            this.hide(modal);
        });
    }
    show() {
        document.body.style.overflow = "hidden";
        this.overlay.style.display = "block";
        this.modal.style.display = "block";
    }

    hide(modal) {
        document.body.style.overflow = "visible";
        this.overlay.style.display = "none";
        modal.style.display = "none";
    }

    init() {
        this.bindTriggers();
    }
}