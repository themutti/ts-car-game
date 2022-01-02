import {
    getCustomProperty,
    setCustomProperty
} from "./updateCustomProperty.js"

export default abstract class GameObject {
    private readonly objElem: HTMLElement;

    constructor(objElem: HTMLElement) {
        this.objElem = objElem;
    }

    get x(): number {
        return getCustomProperty(this.objElem, "--x");
    }

    set x(value: number) {
        setCustomProperty(this.objElem, "--x", value);
    }

    get y(): number {
        return getCustomProperty(this.objElem, "--y");
    }

    set y(value: number) {
        setCustomProperty(this.objElem, "--y", value);
    }

    rect(): DOMRect {
        return this.objElem.getBoundingClientRect();
    }

    abstract update(deltaTime: number, speedScale: number): void;

    protected px2vw(px: number) {
        return px * 100 / document.documentElement.clientWidth
    }
}
