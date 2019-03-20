import { Directive, Input, ElementRef, Renderer, HostListener, OnInit } from '@angular/core';

/**
 * Generated class for the HideHeaderDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[hide-header]', // Attribute selector
//   host: {
//     '(ionScroll)': 'onContentScroll($event)'
//   }
})
export class HideHeaderDirective implements OnInit {

  @Input('header') header: HTMLElement;
  @Input('scrollElement') scrollElement: any;
  @Input('footerElement') footerElement: any;


  headerHeight;
  scrollContent;

  constructor(public element: ElementRef, public renderer: Renderer) {

  }


  ngOnInit() {
    this.headerHeight = this.header.clientHeight;
    this.renderer.setElementStyle(this.header, 'webkitTransition', 'top 700ms');
    this.scrollContent = this.element.nativeElement.getElementsByClassName('scroll-content')[0];
    this.renderer.setElementStyle(this.scrollContent, 'webkitTransition', 'margin-top 700ms');

    this.scrollElement.ionScroll.subscribe((ev) => {
        if (ev.scrollTop > 56) {
          this.renderer.setElementStyle(this.header, 'top', '-64px');
          this.renderer.setElementStyle(this.scrollContent, 'margin-top', '0px');
          document.querySelector('.tabbar')['style'].transition = 'margin-bottom 700ms';
          document.querySelector('.tabbar')['style'].marginBottom = '-100px';
          // this.renderer.setElementStyle(this.footerElement, 'bottom', '-100px');
        } else {
          this.renderer.setElementStyle(this.header, 'top', '0px');
          this.renderer.setElementStyle(this.scrollContent, 'margin-top', '64px');
          document.querySelector('.tabbar')['style'].transition = 'margin-bottom 700ms';
          document.querySelector('.tabbar')['style'].marginBottom = '0';
          // this.renderer.setElementStyle(this.footerElement, 'bottom', '0px');
        }
      });
  }

}
