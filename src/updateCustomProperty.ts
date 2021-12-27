export function getCustomProperty(element: HTMLElement, property: string): number {
    return parseFloat(getComputedStyle(element).getPropertyValue(property));
}

export function setCustomProperty(element: HTMLElement, property: string, value: number): void {
    element.style.setProperty(property, value.toString());
}

export function incrementCustomProperty(element: HTMLElement, property: string, increment: number): void {
    setCustomProperty(element, property, getCustomProperty(element, property) + increment);
}
