export function findParentNode(tag:HTMLElement, className: string): HTMLElement {
    while (tag.className !== className) {
        tag = tag.parentNode as HTMLElement;
    }
    return tag;
}
