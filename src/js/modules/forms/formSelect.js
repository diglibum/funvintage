export default class FormSelect {
    constructor(select) {
        this.select = select;
        this.isExpand = null;
        this.header = null;
        this.newSelect = null;
        this.options = null;
    }

    buildCustomSelect() {

        this.isExpand = false;
        this.options = this.select.options;
        this.header = document.createElement("div");

        // new select

        this.newSelect = document.createElement("ul");
        this.newSelect.classList.add("dropdown__container");
        this.newSelect.classList.add("dropdown__hidden");


        // new options        

        this.options.forEach((option, ind) => {
            const text = option.innerText,
                selected = option.hasAttribute("selected"),
                disabled = option.disabled;

            const newOption = document.createElement("li");
            newOption.innerText = text;
            newOption.classList.add("dropdown__item");

            if (!disabled) {
                if (selected) {
                    newOption.classList.add("dropdown__item_selected");
                }
                newOption.addEventListener("click", (e) => {
                    // this.header.remove();
                    // this.newSelect.remove();
                    this.changeSelectedOption(ind);
                    this.rollup();
                });
            } else {
                newOption.classList.add("dropdown__item_disabled");
            }
            this.newSelect.appendChild(newOption);
            // new header
            if (selected) {
                this.header.innerText = text;
                this.header.classList.add("dropdown__header");
                this.select.parentNode.insertBefore(this.header, this.select);
            }
        });
        this.select.parentNode.insertBefore(this.newSelect, this.select);

        this.bindTriggers(this.header);

    }

    bindTriggers(trigger) {
        document.querySelector(".overlay").addEventListener("click", (e) => {
            const target = e.target;

            if (target === trigger) {
                if (this.isExpand) {
                    this.rollup();
                }
                else {
                    this.expand();
                }
            }
            else if (this.isExpand && target !== this.newSelect) {
                this.rollup();
            }
        });
    }

    expand(element = this.newSelect) {
        this.isExpand = true;
        element.classList.remove("dropdown__hidden");
        setTimeout(() => {
            element.classList.add("dropdown__show");
        }, 4);
    }

    rollup(element = this.newSelect) {
        this.isExpand = false;
        element.classList.remove("dropdown__show");
        setTimeout(() => {
            element.classList.add("dropdown__hidden");
        }, 301);
    }

    changeSelectedOption(ind) {

        this.options.forEach((option, i) => {
            if (i === ind) {
                option.setAttribute("selected", "selected");
                this.newSelect.childNodes[i].classList.add("dropdown__item_selected");
                this.header.innerText = option.innerText;
            } else {
                option.removeAttribute("selected");
                this.newSelect.childNodes[i].classList.remove("dropdown__item_selected");
            }
        });
        this.select.selectedIndex = ind;
    }

    init() {
        this.buildCustomSelect(this.select);
    }
}