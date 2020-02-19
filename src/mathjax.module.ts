import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathjaxComponent } from './mathjax.component';
import { deepExtend } from '@demacia/cmjs-lib';

export const MathjaxConfig = new InjectionToken<MathJax.Config>('mathjax.config');

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MathjaxComponent
    ],
    exports: [
        CommonModule,
        MathjaxComponent
    ]
})
export class MathjaxModule {

    constructor(@Optional() @SkipSelf() parentModule: MathjaxModule,
                @Inject(MathjaxConfig)  config: MathJax.Config) {
        if (!parentModule) {
            // 插入配置参数脚本
            (() => {
                const defaultConfig: MathJax.Config = {
                    config: [ 'TeX-AMS_HTML.js' ],
                    skipStartupTypeset: true,
                    messageStyle: 'none',
                    tex2jax: {
                        inlineMath: [
                            [ '$', '$' ],
                            [ '\\(', '\\)' ]
                        ],
                        preview: 'none'
                    }
                };
                const finalConfig = deepExtend(defaultConfig, config);
                const script = document.createElement('script') as HTMLScriptElement;
                script.type = 'text/javascript';
                script.text = `window.MathJax = ${JSON.stringify(finalConfig)};`;
                document.getElementsByTagName('head')[ 0 ].appendChild(script);
            })();

            // 插入 mathjax 脚本
            (() => {
                const script = document.createElement('script') as HTMLScriptElement;
                script.type = 'text/javascript';
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js';
                document.getElementsByTagName('head')[ 0 ].appendChild(script);
            })();
        }
    }

    static forRoot(config?: MathJax.Config): ModuleWithProviders {
        return {
            ngModule: MathjaxModule,
            providers: [
                {
                    provide: MathjaxConfig,
                    useValue: config
                }
            ]
        };
    }
}