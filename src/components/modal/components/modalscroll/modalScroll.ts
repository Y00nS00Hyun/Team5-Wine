export function disableScroll() {
  const currentScrollY = window.scrollY;
  document.body.style.cssText = `
      overflow: hidden;
      top: -${currentScrollY}px;
    `;
  return currentScrollY;
}

export function activateScroll(currentScrollY: number) {
  document.body.style.cssText = '';
  window.scrollTo(0, currentScrollY);
}
