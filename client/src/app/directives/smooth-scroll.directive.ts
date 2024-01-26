import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[smoothScroll]',
  standalone: true,
})
export class SmoothScrollDirective {
  @Input() duration = 500;

  @HostListener('click')
  onClick(): void {
    const targetPosition = 0;
    this.scrollTo(targetPosition, this.duration);
  }

  private scrollTo(target: number, duration: number): void {
    const start = window.scrollY;
    const startTime = performance.now();

    function scrollStep(timestamp: number): void {
      const elapsed = timestamp - startTime;

      window.scrollTo(
        0,
        easeInOutCubic(elapsed, start, target - start, duration)
      );

      if (elapsed < duration) {
        window.requestAnimationFrame(scrollStep);
      }
    }

    function easeInOutCubic(
      t: number,
      b: number,
      c: number,
      d: number
    ): number {
      t /= d;
      return -c * t * (t - 2) + b;
    }

    window.requestAnimationFrame(scrollStep);
  }
}
