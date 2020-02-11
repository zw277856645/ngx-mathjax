import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { waitFor } from '@demacia/cmjs-lib';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'mathjax',
    templateUrl: './mathjax.component.html',
    exportAs: 'mathjax'
})
export class MathjaxComponent implements OnDestroy, OnChanges, AfterViewInit {

    @ViewChild('staticExp', { static: false }) staticExp: ElementRef;
    @ViewChild('dynamicExp', { static: false }) dynamicExp: ElementRef;

    @Input() expression: string;

    private staticSub: Subscription;
    private dynamicSub: Subscription;

    ngOnChanges() {
        if (this.dynamicSub) {
            this.dynamicSub.unsubscribe();
        }

        this.dynamicSub = waitFor(() => MathJax && (MathJax as any).isReady).pipe(delay(0)).subscribe(() => {
            if (this.expression) {
                MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, this.dynamicExp.nativeElement ]);
            }
        });
    }

    ngAfterViewInit() {
        this.staticSub = waitFor(() => MathJax && (MathJax as any).isReady).subscribe(() => {
            if ((this.staticExp.nativeElement as HTMLElement).hasChildNodes()) {
                MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, this.staticExp.nativeElement ]);
            }
        });
    }

    ngOnDestroy() {
        if (this.staticSub) {
            this.staticSub.unsubscribe();
        }
        if (this.dynamicSub) {
            this.dynamicSub.unsubscribe();
        }
    }

}