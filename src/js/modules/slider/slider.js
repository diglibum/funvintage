export default class Slider {
    constructor({
        container = ".slider",
        nextBtn = ".slider__controls-next",
        prevBtn = ".slider__controls-prev",
        slideBy = "page"

    } = {}) {

        this.container = document.querySelector(`${container} .slider__content`);
        this.slides = this.container.children;
        this.prevBtn = document.querySelector(prevBtn);
        this.nextBtn = document.querySelector(nextBtn);
        this.slideBy = (slideBy === "page") ? this.countSlidesOnPage() : slideBy;

    }

    bindTriggers() {
        this.nextBtn.addEventListener("click", () => {
            this.nextSlide();
        });
        this.prevBtn.addEventListener("click", () => {
            this.prevSlide();
        });


        // swipe

        const swipe = (el, settings = {}) => {
            // настройки по умолчанию
            const swipeSettings = Object.assign({}, {
                minDist: 60,  // минимальная дистанция, которую должен пройти указатель, чтобы жест считался как свайп (px)
                maxDist: 120, // максимальная дистанция, не превышая которую может пройти указатель, чтобы жест считался как свайп (px)
                maxTime: 700, // максимальное время, за которое должен быть совершен свайп (ms)
                minTime: 50   // минимальное время, за которое должен быть совершен свайп (ms)
            }, settings);

            // коррекция времени при ошибочных значениях
            if (swipeSettings.maxTime < settings.minTime) swipeSettings.maxTime = swipeSettings.minTime + 500;
            if (swipeSettings.maxTime < 100 || swipeSettings.minTime < 50) {
                swipeSettings.maxTime = 700;
                swipeSettings.minTime = 50;
            }

            let dir,                // направление свайпа (horizontal, vertical)
                swipeType,            // тип свайпа (up, down, left, right)
                dist,                 // дистанция, пройденная указателем
                startX = 0,           // начало координат по оси X (pageX)
                distX = 0,            // дистанция, пройденная указателем по оси X
                startY = 0,           // начало координат по оси Y (pageY)
                distY = 0,            // дистанция, пройденная указателем по оси Y
                startTime = 0;


            const checkStart = function (e) {
                if (e.touches.length !== 1) return;

                dir = "none";
                swipeType = "none";
                dist = 0;
                startX = e.touches[0].pageX;
                startY = e.touches[0].pageY;
                startTime = new Date().getTime();
            };

            var checkMove = function (e) {
                distX = e.touches[0].pageX - startX;
                distY = e.touches[0].pageY - startY;
                if (Math.abs(distX) > Math.abs(distY)) dir = (distX < 0) ? "left" : "right";
                else dir = (distY < 0) ? "up" : "down";
            };


            const checkEnd = function (e) {
                var endTime = new Date().getTime();
                var time = endTime - startTime;
                if (time >= settings.minTime && time <= settings.maxTime) { // проверка времени жеста
                    if (Math.abs(distX) >= settings.minDist && Math.abs(distY) <= settings.maxDist) {
                        swipeType = dir; // опредление типа свайпа как "left" или "right"
                    } else if (Math.abs(distY) >= settings.minDist && Math.abs(distX) <= settings.maxDist) {
                        swipeType = dir; // опредление типа свайпа как "top" или "down"
                    }
                }
                dist = (dir === "left" || dir === "right") ? Math.abs(distX) : Math.abs(distY); // опредление пройденной указателем дистанции

                // генерация кастомного события swipe
                if (swipeType !== "none" && dist >= swipeSettings.minDist) {
                    const swipeEvent = new CustomEvent("swipe", {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            full: e, // полное событие Event
                            dir: swipeType, // направление свайпа
                            dist: dist, // дистанция свайпа
                            time: time // время, потраченное на свайп
                        }
                    });
                    el.dispatchEvent(swipeEvent);
                }
            }

            // добавление обработчиков на элемент
            el.addEventListener("touchstart", checkStart);
            el.addEventListener("touchmove", checkMove);
            el.addEventListener("touchend", checkEnd);
        }

        swipe(this.container, { maxTime: 1000, minTime: 100, maxDist: 1000, minDist: 60 });

        this.container.addEventListener("swipe", (e) => {
            if (e.detail.dir === "left") {
                this.nextSlide();
            }
            if (e.detail.dir === "right") {
                this.prevSlide();
            }
        });

    }
    nextSlide() {
        for (let i = 0; i < this.slideBy; i++) {
            this.container.appendChild(this.container.firstChild);
        }
    }
    prevSlide() {
        for (let i = 0; i < this.slideBy; i++) {
            this.container.insertBefore(this.container.lastChild, this.container.firstChild);
        }
    }
    countSlidesOnPage() {
        return Math.floor(this.container.clientWidth / this.container.firstChild.clientWidth);
    }
    init() {
        this.bindTriggers();
    }
}