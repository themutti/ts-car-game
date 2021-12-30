import {
    getCustomProperty,
    setCustomProperty,
    incrementCustomProperty
} from "./updateCustomProperty.js"

const SPEED = 0.02;

export default class Road {
    private readonly roadElems: HTMLElement[];

    constructor(roadElems: HTMLElement[]) {
        this.roadElems = roadElems;
        this.reset();
    }

    reset(): void {
        setCustomProperty(this.roadElems[0], "--left", 0);
        setCustomProperty(this.roadElems[1], "--left", 199);
    }

    update(deltaTime: number, speedScale: number): void {
        for (const road of this.roadElems) {
            incrementCustomProperty(road, "--left", deltaTime * speedScale * SPEED * -1);
            if (getCustomProperty(road, "--left") <= -199) {
                setCustomProperty(road, "--left", 199);
            }
        }
    }
}
