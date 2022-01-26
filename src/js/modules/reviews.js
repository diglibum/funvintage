export default class Reviews {
  constructor(id) {
    this.id = id;
    this.trigger = document.querySelector(`${this.id} .reviews__more-btn`);
    this.items = document.querySelectorAll(`${this.id} .reviews-item`);
    this.itemWidth = this.items[0].clientWidth;
    this.itemsInRow = 3;
    this.curRow = 0;
  }

  init() {
    this.hideItems();
    this.countItemsInRows();
    this.showRows();

    this.trigger.addEventListener("click", () => {
      this.showRows();
    });
  }

  reRender() {
    this.hideItems();
    this.countItemsInRows();
    this.showRows(0, false);
  }

  hideItems() {
    this.items.forEach((item) => {
      item.classList.add("hidden");
      item.classList.add("reviews-item_rolled");
    });
  }

  showRows(startIndex = this.curRow * this.itemsInRow, increase = true) {
    if (increase) {
      this.curRow += 1;
    }

    const endIndex = this.curRow * this.itemsInRow;

    for (let i = startIndex; i < endIndex; i++) {
      if (this.items[i]) {
        this.items[i].classList.remove("hidden");
        setTimeout(() => {
          this.items[i].classList.remove("reviews-item_rolled");
        }, 4);
        this.showTriggerBtn();
      } else {
        this.hideTriggerBtn();
      }
    }
  }

  countItemsInRows() {
    const rowWidth = document.querySelector(
      `${this.id} .reviews-list`
    ).clientWidth;
    this.itemsInRow = Math.floor(rowWidth / this.itemWidth);
  }

  hideTriggerBtn() {
    this.trigger.style.display = "none";
  }

  showTriggerBtn() {
    this.trigger.style.display = "flex";
  }
}
