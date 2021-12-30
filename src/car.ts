import {
    getCustomProperty,
    setCustomProperty
} from "./updateCustomProperty.js"

const SPEED = 0.02;

export default class CarPlayer {
    private readonly carElem: HTMLElement;

    constructor(carElem) {
        this.carElem = carElem;
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
        
    }
}
