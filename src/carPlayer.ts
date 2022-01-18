import GameObject, { px2vw } from "./gameObject.js";

const SPEED = 0.04;

export default class CarPlayer extends GameObject {
    private readonly pressedKeys = {
        up: false,
        down: false,
        left: false,
        right: false
    };

    constructor(gameWrapperElem: HTMLElement, carElem: HTMLElement) {
        super(gameWrapperElem, carElem);
        document.addEventListener("keydown", (e: KeyboardEvent): void => this.onKey(e, true));
        document.addEventListener("keyup", (e: KeyboardEvent): void => this.onKey(e, false));
        this.reset();
    }

    reset(): void {
        this.x = 5;
        this.y = 19;
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
        // check top-left collisions with the road
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        // convert car width and height from px to vw
        const width = px2vw(this.rect().width);
        const height = px2vw(this.rect().height);
        // convert game wrapper width and height from px to vw
        const gameWrapperWidth = px2vw(this.gameWrapperElem.clientWidth);
        const gameWrapperHeight = px2vw(this.gameWrapperElem.clientHeight);
        // check bottom-right collisions with the road
        if (x+width > gameWrapperWidth) x = gameWrapperWidth - width; 
        if (y+height > gameWrapperHeight) y = gameWrapperHeight - height; 

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
