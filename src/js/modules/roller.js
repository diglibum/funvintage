export default class Roller {
  constructor(id) {
    this.id = id;
    this.items = document.querySelectorAll(`${id} .roller-item`);
  }

  init() {
    this.items.forEach((item) => {
      item
        .querySelector(".roller-item__header")
        .addEventListener("click", () => {
          item.classList.toggle("roller-item_unrolled");
        });
    });
  }
}
