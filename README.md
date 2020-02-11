# 数学公式渲染插件 [mathjax](https://www.mathjax.org/) 的 angular 组件

## 📦 安装

> npm install @demacia/ngx-mathjax --save

## 🔨 使用

引入module

``` js
import { MathjaxModule } from '@demacia/ngx-mathjax';

@NgModule({
    imports: [
        MathjaxModule
    ],
        
    /* 修改默认配置（可选），详情参考 [Mathjax Docs](https://docs.mathjax.org/en/v2.7-latest/configuration.html)
     *
     *  默认配置如下：
     *  {
     *      config: [ 'TeX-AMS_HTML.js' ],
     *      skipStartupTypeset: true,
     *      messageStyle: 'none',
     *      tex2jax: {
     *          inlineMath: [
     *              [ '$', '$' ],
     *              [ '\\(', '\\)' ]
     *          ],
     *          preview: 'none'
     *      }
     *  }
     */
    providers: [
        {
            provide: MATH_JAX_CONFIG,
            useValue: {
                config: [ 'TeX-AMS_SVG.js' ],
                ...
            }
        }
    ]
})
export class AppModule {
}
```

静态表达式

``` html
<mathjax>$$ ax^2 + bx + c = 0 $$</mathjax>
```

动态表达式

``` html
<mathjax [expression]="'$$ ax^2 + bx + c = 0 $$'"></mathjax>
```

## 🔗 链接
- [Mathjax Docs](https://docs.mathjax.org/en/v2.7-latest/index.html)(`本插件依赖的 mathjax 版本为 2.7，注意 3.x 版本与 2.x 版本不兼容，请参考 2.x 版本的文档`)
- [LaTeX 公式示例](https://www.jianshu.com/p/a7fa1ed4ca20)