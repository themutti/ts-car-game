import GameObject from "./gameObject.js";

const SPEED = 0.06;

export default class CarPlayer extends GameObject {
    private readonly gameWrapperElem: HTMLElement;
    private readonly pressedKeys = {
        up: false,
        down: false,
        left: false,
        right: false
    };

    constructor(carElem: HTMLElement, gameWrapperElem: HTMLElement) {
        super(carElem);
        this.gameWrapperElem = gameWrapperElem;
        document.addEventListener("keydown", (e: KeyboardEvent): void => this.onKey(e, true));
        document.addEventListener("keyup", (e: KeyboardEvent): void => this.onKey(e, false));
        this.reset();
    }

    reset(): void {
        this.x = 5;
        this.y = 19;
    }

    isCollision(objs: GameObject[]): boolean {
        return false;
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

        let x = this.x + xVel * deltaTime;
        let y = this.y + yVel * deltaTime;
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        // convert car width and height from px to vw
        const width = this.px2vw(this.rect().width);
        const height = this.px2vw(this.rect().height);
        // convert game wrapper width and height from px to vw
        const gameWrapperWidth = this.px2vw(this.gameWrapperElem.clientWidth);
        const gameWrapperHeight = this.px2vw(this.gameWrapperElem.clientHeight);
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
