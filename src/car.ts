import {
    getCustomProperty,
    setCustomProperty
} from "./updateCustomProperty.js"

const SPEED = 0.06;

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
        this.y = 19;
    }

    update(deltaTime: number, gameWrapperWidth: number, gameWrapperHeight: number): void {
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

        let x = this.x + xVel * deltaTime;
        let y = this.y + yVel * deltaTime;
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        // convert car width and height from px to vw
        const width = this.rect().width * 100 / document.documentElement.clientWidth;
        const height = this.rect().height * 100 / document.documentElement.clientWidth;
        // convert game wrapper width and height from px to vw
        gameWrapperWidth *= 100 / document.documentElement.clientWidth;
        gameWrapperHeight *= 100 / document.documentElement.clientWidth;
        if (x + width > gameWrapperWidth) x = gameWrapperWidth - width; 
        if (y + height > gameWrapperHeight) y = gameWrapperHeight - height; 

        this.x = x;
        this.y = y;
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
