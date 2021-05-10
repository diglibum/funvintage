import Roller from './modules/roller';
import Reviews from './modules/reviews';
import Slider from './modules/slider/slider';
import Modals from './modules/modals/modals';
import Forms from './modules/forms/forms';


window.addEventListener("DOMContentLoaded", () => {
    const roller = new Roller("#questions");
    roller.init();

    const reviews = new Reviews("#reviews");
    reviews.init();

    // window.addEventListener("resize", () => {
    //     reviews.reRender();
    // });

    const slider = new Slider({ container: ".artists__slider" });
    slider.init();

    const orderModal = new Modals("#order", ".header__contacts-cart");
    orderModal.init();

    const feedbackModal = new Modals("#feedback", "[data-modal='feedback']");
    feedbackModal.init();

    const forms = new Forms();
    forms.init();

});