import GameObject, { px2vw } from "./gameObject.js";

const BASE_SPEED = 0.01;
const MIN_CAR_TIME = 80;
const MAX_CAR_TIME = 1000;
const MAX_CARS = 10;

const gameWrapperElem: HTMLElement = document.getElementById("game-wrapper");
const cars: CarObstacle[] = [];
let nextCarTime: number;

export default class CarObstacle extends GameObject {
    private readonly speed: number;
    private readonly flipped: boolean;

    constructor(gameWrapperElem: HTMLElement, curSpeedScale: number) {
        super(gameWrapperElem, document.createElement("img") as HTMLImageElement);
        this.flipped = randint(0, 1) !== 0;
        this.speed = randint(10, 20) / 1000;
        this.buildElem((): void => this.initPos(curSpeedScale));
    }

    private buildElem(onload: () => void): void {
        this.element.onload = onload;
        (<HTMLImageElement>this.element).src = "./assets/blue_car.png";
        this.gameWrapperElem.append(this.element);
        if (this.flipped) {
            this.element.classList.add("flipped");
        }
    }

    // must call after car image has loaded
    private initPos(curSpeedScale: number): void {
        const gameWrapperHeight = px2vw(this.gameWrapperElem.clientHeight);
        const carheight = px2vw(this.rect().height);
        if (this.flipped) {
            this.y = randint(0, gameWrapperHeight/2 - carheight);
        } else {
            if (this.speed <= curSpeedScale * BASE_SPEED) {
                this.x = px2vw(this.gameWrapperElem.clientWidth);
            } else {
                this.x = px2vw(-this.rect().width);
            }
            this.y = randint(gameWrapperHeight/2, gameWrapperHeight - carheight);
        }
    }

    update(deltaTime: number, speedScale: number): void {
        this.x += deltaTime * this.speed * (this.flipped ? -1 : 1) - deltaTime * speedScale * BASE_SPEED;
        const rectWidth = px2vw(this.rect().width);
        const gameWrapperWidth = px2vw(this.gameWrapperElem.clientWidth);
        // give the car double its width of space on the sides outside of the screen so it won't get removed after spawned
        if (this.x < -rectWidth * 2 ||
            this.x > gameWrapperWidth + rectWidth) {
            this.element.remove();
        }
    }
}

export function getCarObstaclesRects(): DOMRect[] {
    return cars.map(car => {
        return car.rect()
    });
}

export function resetCarObstacles(): void {
    nextCarTime = MIN_CAR_TIME;
    for (const car of cars) {
        car.remove();
    }
    cars.splice(0, cars.length);
}

export function updateCarObstacles(deltaTime: number, speedScale: number): void {
    // iteranting in reverse to allow removing elements during the loop
    for (let i = cars.length-1; i >= 0; i--) {
        const car = cars[i];
        car.update(deltaTime, speedScale);
        if (!car.exists) {
            cars.splice(i, 1);
            continue;
        }
        car.update(deltaTime, speedScale);
    }

    if (cars.length <= MAX_CARS) {
        if (nextCarTime <= 0) {
            cars.push(new CarObstacle(gameWrapperElem, speedScale));
            // subtract speedScale*50 from MAX_CAR_TIME to make the game harder the faster it goes
            nextCarTime = randint(MIN_CAR_TIME, MAX_CAR_TIME + speedScale*50);
        }
        nextCarTime -= deltaTime;
    }
}

/* returns a random integer beetween min and max (both inclusive) */
function randint(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
