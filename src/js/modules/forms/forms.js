import FormSelect from "./formSelect";

export default class Forms {
    constructor() {
        this.selects = document.querySelectorAll(".dropdown select");
    }

    hideSelects() {
        this.selects.forEach(select => {
            select.hidden = true;
        });
    }

    init() {
        this.hideSelects();
        this.selects.forEach((select) => {
            new FormSelect(select).init();
        });
    }
}