import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MathjaxModule } from '../src/mathjax.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        MathjaxModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}