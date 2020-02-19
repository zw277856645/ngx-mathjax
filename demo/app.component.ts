import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <mathjax fontSize="20">$$ \\sideset&#123;^1_2&#125;&#123;^3_4&#125;\\bigotimes $$</mathjax>
        <mathjax [expression]="exp"></mathjax>
    `
})
export class AppComponent {

    exp = '$$ ax^2 + bx + c = 0 $$';
}