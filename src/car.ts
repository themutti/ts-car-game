import {
    getCustomProperty,
    setCustomProperty
} from "./updateCustomProperty.js"

const SPEED = 0.03;

export default class CarPlayer {
    private readonly carElem: HTMLElement;
    private readonly pressedKeys = {
        up: false,
        down: false,
        left: false,
        right: false
    };

    constructor(carElem: HTMLElement) {
        this.carElem = carElem;
        document.addEventListener("keydown", (e: KeyboardEvent): void => this.onKey(e, true));
        document.addEventListener("keyup", (e: KeyboardEvent): void => this.onKey(e, false));
        this.reset();
    }

    get x(): number {
        return getCustomProperty(this.carElem, "--x");
    }

    set x(value: number) {
        setCustomProperty(this.carElem, "--x", value);
    }

    get y(): number {
        return getCustomProperty(this.carElem, "--y");
    }

    set y(value: number) {
        setCustomProperty(this.carElem, "--y", value);
    }

    rect(): DOMRect {
        return this.carElem.getBoundingClientRect();
    }

    reset(): void {
        this.x = 5;
        this.y = 55;
    }

    update(deltaTime: number, speedScale: number): void {
        let xVel = 0;
        let yVel = 0;
        if (this.pressedKeys.up) {
            yVel -= SPEED;
        }
        if (this.pressedKeys.down) {
            yVel += SPEED;
        }
        if (this.pressedKeys.right) {
            xVel += SPEED;
        }
        if (this.pressedKeys.left) {
            xVel -= SPEED;
        }
        this.x += xVel * deltaTime * speedScale;
        this.y += yVel * deltaTime * speedScale;
    }

    private onKey(e: KeyboardEvent, isDown: boolean): void {
        switch(e.code) {
            case "KeyW":
            case "ArrowUp": {
                this.pressedKeys.up = isDown;
                break;
            }
            case "KeyS":
            case "ArrowDown": {
                this.pressedKeys.down = isDown;
                break;
            }
            case "KeyA":
            case "ArrowLeft": {
                this.pressedKeys.left = isDown;
                break;
            }
            case "KeyD":
            case "ArrowRight": {
                this.pressedKeys.right = isDown;
                break;
            }
        }
    }
}
