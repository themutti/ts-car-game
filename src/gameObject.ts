import {
    getCustomProperty,
    setCustomProperty
} from "./updateCustomProperty.js"

export default abstract class GameObject {
    protected readonly gameWrapperElem: HTMLElement;
    protected readonly element: HTMLElement;

    constructor(gameWrapperElem: HTMLElement, objElem: HTMLElement) {
        this.gameWrapperElem = gameWrapperElem;
        this.element = objElem;
        objElem.setAttribute("draggable", "false");
        objElem.classList.add("game-object");
    }

    get x(): number {
        return getCustomProperty(this.element, "--x");
    }

    set x(value: number) {
        setCustomProperty(this.element, "--x", value);
    }

    get y(): number {
        return getCustomProperty(this.element, "--y");
    }

    set y(value: number) {
        setCustomProperty(this.element, "--y", value);
    }

    get exists(): boolean {
        return document.contains(this.element);
    }

    rect(): DOMRect {
        return this.element.getBoundingClientRect();
    }

    remove(): void {
        this.element.remove();
    }

    abstract update(deltaTime: number, speedScale: number): void;
}

export function px2vw(px: number): number {
    return px * 100 / document.documentElement.clientWidth;
}
