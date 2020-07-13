# 商城已全部完成(包含分类与我的部分)，感谢王红元(coderwhy)老师的开源。

### 学习视频[链接](https://www.bilibili.com/video/BV15741177Eh).老师项目[coderwhy](https://github.com/coderwhy/HYMiniMall).

# 问题回答

## - 项目完成情况
未完成部分：px2vw-css单位转化插件，(fastclick.js建议不安装因为快速双击会报错)  
已完成部分：  
划分目录结构，导航栏的封装，请求商品数据并保存，使用Better-Scroll滑动效果，  
完成首页、分类、购物车、我的、详情页等页面制作，返回顶部代码的制作与封装，  
完成图片懒加载，将项目打包提交在云服务器的nginx中，可访问[这里](http://xdsy.ren/).。

## - 版本问题
本人学习使用的是Vue2.6版本，老师使用的是2.5版本，主要差别在slot改为v-slot，本人全部使用v-slot。

## - 接口问题
这份项目的最新接口链接我已删除，需要的朋友可以在学习视频的简介与置顶找的购买方法，全程只需9元。  
如果您有最新接口可以将接口放置在(src/networt/request.js)中的baseURL处。

## - 复制老师的分类和我的出现很多Bug怎么解决
首先分类页面：复制了category(分类)文件夹首先要整理import链接的路径有可能路径不同  
  在子组件里的import也需要整理，不止Category文件夹，GridView.vue也是分类需要的,  
  最重要的是分类商品的图片链接是goodsItem.img，因此在使用GoodsListItem组件循环展示时报大量的错。  
  解决方法
return this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img  
(this.goodsItem.img是分类商品的img链接，放在第三条会循环报错)

其次我的页面：复制老师的profile(我的)文件夹也是要整理import的链接，老师的路径不相同  
整理后在运行时会出现图标无法显示的问题，这是由于这些SVG是老师另外整理的存储在Icon文件夹中  
需要复制到你自己的项目里，import导入，老师是在App.vue里导入组件并引用，我在profile(我的)文件引用成功  

  
## 项目设置
```
npm install
```

### 编译以及加载
```
npm run serve
```

### 打包
```
npm run build
```

### 自定义设置
更多设置请点击 [Configuration Reference](https://cli.vuejs.org/config/).
