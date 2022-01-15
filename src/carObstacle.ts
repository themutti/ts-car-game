import GameObject, { px2vw } from "./gameObject.js";
import CarPlayer from "./carPlayer.js";

// const MIN_CAR_TIME = 500;
// const MAX_CAR_TIME = 2000;

export default class CarObstacle extends GameObject {
    private readonly speed: number;
    private readonly flipped: boolean;

    constructor(gameWrapperElem: HTMLElement) {
        super(gameWrapperElem, document.createElement("img") as HTMLImageElement);
        this.speed = randint(3, 5) / 100;
        this.flipped = randint(0, 1) === 1;
        this.buildElem();
    }

    private buildElem(): void {
        this.element.onload = (): void => this.initPos();
        (<HTMLImageElement>this.element).src = "./assets/blue_car.png";
        this.gameWrapperElem.append(this.element);
        if (this.flipped) {
            this.element.classList.add("flipped");
        }
    }

    // must call after car image has loaded
    private initPos(): void {
        if (this.flipped) {
            this.x = px2vw(this.gameWrapperElem.clientWidth);
        } else {
            this.x = px2vw(-this.rect().width);
        }
        this.y = randint(0, px2vw(this.gameWrapperElem.clientHeight - this.rect().height));
    }

    update(deltaTime: number, speedScale: number): void {
        this.x += deltaTime * speedScale * this.speed * (this.flipped ? -1 : 1);
        if (this.flipped && this.x < px2vw(-this.rect().width) ||
            !this.flipped && this.x > px2vw(this.gameWrapperElem.clientWidth)) {
            this.element.remove();
        }
    }
}

// function updateCarObstacles(deltaTime: number, speedScale: number, carPlayer: CarPlayer): void {
//     // iteranting in reverse to allow removing elements during the loop
//     for (let i = cars.length-1; i >= 0; i--) {
//         const car = cars[i];
//         car.update(deltaTime, speedScale);
//         if (!car.exists) {
//             cars.splice(i, 1);
//         }
//     }
// }

/* returns a random number beetween min and max (both inclusive) */
function randint(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
