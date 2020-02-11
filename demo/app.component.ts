import { AfterViewInit, Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

    exp = '$$ ax^2 + bx + c = 0 $$';

    ngAfterViewInit() {
        setInterval(() => this.exp = `$ ax^2 = ${Math.random()} $`, 2000);
    }
}