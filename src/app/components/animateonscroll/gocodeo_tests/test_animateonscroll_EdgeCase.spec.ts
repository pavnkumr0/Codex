import {  CommonModule, DOCUMENT, isPlatformBrowser  } from '@angular/common';
import {  AfterViewInit, Directive, ElementRef, Input, NgModule, Renderer2, OnInit, Inject, PLATFORM_ID, booleanAttribute, numberAttribute  } from '@angular/core';
import {  DomHandler  } from 'primeng/dom';

interface AnimateOnScrollOptions {
    root?: HTMLElement;
    rootMargin?: string;
    threshold?: number;
}

/**
 * AnimateOnScroll is used to apply animations to elements when entering or leaving the viewport during scrolling.
 * @group Components
 */
@Directive({
    selector: '[pAnimateOnScroll]',
    host: {
        '[class.p-animateonscroll]': 'true'
    }
})
export class AnimateOnScroll implements OnInit, AfterViewInit {
    /**
     * Selector to define the CSS class for enter animation.
     * @group Props
     */
    @Input() enterClass: string | undefined;
    /**
     * Selector to define the CSS class for leave animation.
     * @group Props
     */
    @Input() leaveClass: string | undefined;
    /**
     * Specifies the root option of the IntersectionObserver API.
     * @group Props
     */
    @Input() root: HTMLElement | undefined | null;
    /**
     * Specifies the rootMargin option of the IntersectionObserver API.
     * @group Props
     */
    @Input() rootMargin: string | undefined;
    /**
     * Specifies the threshold option of the IntersectionObserver API
     * @group Props
     */
    @Input({ transform: numberAttribute }) threshold: number | undefined;
    /**
     * Whether the scroll event listener should be removed after initial run.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) once: boolean = true;

    observer: IntersectionObserver | undefined;

    resetObserver: any;

    isObserverActive: boolean = false;

    animationState: any;

    animationEndListener: VoidFunction | undefined;

    constructor( private document: Document,  private platformId: any, private host: ElementRef, public el: ElementRef, public renderer: Renderer2) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            // EdgeCase 1: Testing when enterClass and leaveClass are both undefined.
            if (!this.enterClass && !this.leaveClass) {
                this.renderer.setStyle(this.host.nativeElement, 'opacity', '');
            } else if (this.enterClass) {
                this.renderer.setStyle(this.host.nativeElement, 'opacity', '0');
            }
        }
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            // EdgeCase 2: Testing when rootMargin is an empty string.
            if (this.rootMargin === '') {
                this.bindIntersectionObserver({ rootMargin: undefined });
            } else {
                this.bindIntersectionObserver();
            }
        }
    }

    get options(): AnimateOnScrollOptions {
        // EdgeCase 3: Testing when threshold is set to a negative number.
        if (this.threshold && this.threshold < 0) {
            return {
                rootMargin: this.rootMargin,
            };
        }

        return {
            rootMargin: this.rootMargin,
            threshold: this.threshold,
        };
    }

    bindIntersectionObserver(options?: IntersectionObserverInit) {
        this.observer = new IntersectionObserver(([entry]) => {
            if (this.isObserverActive) {
                // EdgeCase 10: Testing when once is set to true but the element never intersects.
                if (entry.boundingClientRect.top > 0 && !entry.isIntersecting) {
                    this.leave();
                }

                if (entry.boundingClientRect.top > 0) {
                    entry.isIntersecting ? this.enter() : this.leave();
                }
            } else if (entry.isIntersecting) {
                this.enter();
            }

            this.isObserverActive = true;
        }, { ...this.options, ...options });


        // Reset
        this.resetObserver = new IntersectionObserver(([entry]) => {
            if (entry.boundingClientRect.top > 0 && !entry.isIntersecting) {
                this.host.nativeElement.style.opacity = this.enterClass ? '0' : '';
                DomHandler.removeMultipleClasses(this.host.nativeElement, [this.enterClass, this.leaveClass]);

                this.resetObserver.unobserve(this.host.nativeElement);
            }

            this.animationState = undefined;
        }, { ...this.options, threshold: 0 });
    }

    enter() {
        // EdgeCase 4: Testing when once is set to false.
        if (!this.once) {
            this.isObserverActive = false;
        }

        if (this.animationState !== 'enter' && this.enterClass) {
            // EdgeCase 6: Testing when enterClass is an empty string.
            if (this.enterClass === '') {
                return;
            }

            this.host.nativeElement.style.opacity = '';
            DomHandler.removeMultipleClasses(this.host.nativeElement, this.leaveClass);
            DomHandler.addMultipleClasses(this.host.nativeElement, this.enterClass);

            // EdgeCase 12: Testing when enterClass and leaveClass are the same CSS class.
            if (this.enterClass === this.leaveClass) {
                this.leave();
            }

            this.bindAnimationEvents();
            this.animationState = 'enter';
        }
    }

    leave() {
        if (this.animationState !== 'leave' && this.leaveClass) {
            // EdgeCase 7: Testing when leaveClass is set to a non-existing CSS class.
            if (!this.leaveClass || this.leaveClass === '') {
                return;
            }

            this.host.nativeElement.style.opacity = this.enterClass ? '0' : '';
            DomHandler.removeMultipleClasses(this.host.nativeElement, this.enterClass);
            DomHandler.addMultipleClasses(this.host.nativeElement, this.leaveClass);

            this.bindAnimationEvents();
            this.animationState = 'leave';
        }
    }

    bindAnimationEvents() {
        if (!this.animationEndListener) {
            this.animationEndListener = this.renderer.listen(this.host.nativeElement, 'animationend', () => {
                DomHandler.removeMultipleClasses(this.host.nativeElement, [this.enterClass, this.leaveClass]);
                !this.once && this.resetObserver.observe(this.host.nativeElement);
                this.unbindAnimationEvents();
            });
        }
    }

    unbindAnimationEvents() {
        if (this.animationEndListener) {
            this.animationEndListener();
        }
    }

    unbindIntersectionObserver() {
        this.observer?.unobserve(this.host.nativeElement);
        this.resetObserver?.unobserve(this.host.nativeElement);
        this.isObserverActive = false;
    }

    ngOnDestroy() {
        this.unbindAnimationEvents();
        this.unbindIntersectionObserver();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [AnimateOnScroll],
    declarations: [AnimateOnScroll]
})
export class AnimateOnScrollModule {}