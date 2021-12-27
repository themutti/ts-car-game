import {
    getCustomProperty,
    setCustomProperty,
    incrementCustomProperty
} from "./updateCustomProperty.js"

export class Road {
    private static readonly SPEED = 0.02;
    private readonly roads: HTMLElement[];

    constructor() {
        this.roads = [...document.querySelectorAll<HTMLElement>(".road")];
        setCustomProperty(this.roads[0], "--left", 0);
        setCustomProperty(this.roads[1], "--left", 199);
    }

    update(deltaTime: number, speedScale: number): void {
        for (const road of this.roads) {
            incrementCustomProperty(road, "--left", deltaTime * speedScale * Road.SPEED * -1);
            if (getCustomProperty(road, "--left") <= -199) {
                setCustomProperty(road, "--left", 199);
            }
        }
    }
}
