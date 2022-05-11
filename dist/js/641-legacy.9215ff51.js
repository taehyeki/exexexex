"use strict";(self["webpackChunkvuetify_with"]=self["webpackChunkvuetify_with"]||[]).push([[641],{41641:function(t,e,i){i.d(e,{Z:function(){return U},l:function(){return K}});var n=i(62032),s=i(23796),o=i(4367),a=(i(92222),i(41539),i(39714),i(47042),i(74916),i(23123),i(73210),i(51532),i(78783),i(33948),i(91038),i(34553),i(38862),i(68309),i(21249),i(57327),i(23157),i(26699),i(32023),i(40561),i(69845),i(95424)),r=a.Z,l=i(68932),h=(i(9653),i(69826),i(43242)),c=i(25795),u=i(44561),d=i(65907),f=i(95703),p=i(93536),m=i(83944),v=i(73325),g=i(4589),x=(0,v.Z)(f.Z,(0,p.d)(["top","right","bottom","left","absolute"]),c.Z,m.Z),I=x.extend().extend({name:"menuable",props:{allowOverflow:Boolean,light:Boolean,dark:Boolean,maxWidth:{type:[Number,String],default:"auto"},minWidth:[Number,String],nudgeBottom:{type:[Number,String],default:0},nudgeLeft:{type:[Number,String],default:0},nudgeRight:{type:[Number,String],default:0},nudgeTop:{type:[Number,String],default:0},nudgeWidth:{type:[Number,String],default:0},offsetOverflow:Boolean,positionX:{type:Number,default:null},positionY:{type:Number,default:null},zIndex:{type:[Number,String],default:null}},data:function(){return{activatorNode:[],absoluteX:0,absoluteY:0,activatedBy:null,activatorFixed:!1,dimensions:{activator:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0,offsetLeft:0},content:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0}},relativeYOffset:0,hasJustFocused:!1,hasWindow:!1,inputActivator:!1,isContentActive:!1,pageWidth:0,pageYOffset:0,stackClass:"v-menu__content--active",stackMinZIndex:6}},computed:{computedLeft:function(){var t=this.dimensions.activator,e=this.dimensions.content,i=(!1!==this.attach?t.offsetLeft:t.left)||0,n=Math.max(t.width,e.width),s=0;if(s+=i,(this.left||this.$vuetify.rtl&&!this.right)&&(s-=n-t.width),this.offsetX){var o=isNaN(Number(this.maxWidth))?t.width:Math.min(t.width,Number(this.maxWidth));s+=this.left?-o:t.width}return this.nudgeLeft&&(s-=parseInt(this.nudgeLeft)),this.nudgeRight&&(s+=parseInt(this.nudgeRight)),s},computedTop:function(){var t=this.dimensions.activator,e=this.dimensions.content,i=0;return this.top&&(i+=t.height-e.height),!1!==this.attach?i+=t.offsetTop:i+=t.top+this.pageYOffset,this.offsetY&&(i+=this.top?-t.height:t.height),this.nudgeTop&&(i-=parseInt(this.nudgeTop)),this.nudgeBottom&&(i+=parseInt(this.nudgeBottom)),i},hasActivator:function(){return!!this.$slots.activator||!!this.$scopedSlots.activator||!!this.activator||!!this.inputActivator},absoluteYOffset:function(){return this.pageYOffset-this.relativeYOffset}},watch:{disabled:function(t){t&&this.callDeactivate()},isActive:function(t){this.disabled||(t?this.callActivate():this.callDeactivate())},positionX:"updateDimensions",positionY:"updateDimensions"},beforeMount:function(){this.hasWindow="undefined"!==typeof window,this.hasWindow&&window.addEventListener("resize",this.updateDimensions,!1)},beforeDestroy:function(){this.hasWindow&&window.removeEventListener("resize",this.updateDimensions,!1)},methods:{absolutePosition:function(){return{offsetTop:this.positionY||this.absoluteY,offsetLeft:this.positionX||this.absoluteX,scrollHeight:0,top:this.positionY||this.absoluteY,bottom:this.positionY||this.absoluteY,left:this.positionX||this.absoluteX,right:this.positionX||this.absoluteX,height:0,width:0}},activate:function(){},calcLeft:function(t){return(0,g.kb)(!1!==this.attach?this.computedLeft:this.calcXOverflow(this.computedLeft,t))},calcTop:function(){return(0,g.kb)(!1!==this.attach?this.computedTop:this.calcYOverflow(this.computedTop))},calcXOverflow:function(t,e){var i=t+e-this.pageWidth+12;return t=(!this.left||this.right)&&i>0?Math.max(t-i,0):Math.max(t,12),t+this.getOffsetLeft()},calcYOverflow:function(t){var e=this.getInnerHeight(),i=this.absoluteYOffset+e,n=this.dimensions.activator,s=this.dimensions.content.height,o=t+s,a=i<o;return a&&this.offsetOverflow&&n.top>s?t=this.pageYOffset+(n.top-s):a&&!this.allowOverflow?t=i-s-12:t<this.absoluteYOffset&&!this.allowOverflow&&(t=this.absoluteYOffset+12),t<12?12:t},callActivate:function(){this.hasWindow&&this.activate()},callDeactivate:function(){this.isContentActive=!1,this.deactivate()},checkForPageYOffset:function(){this.hasWindow&&(this.pageYOffset=this.activatorFixed?0:this.getOffsetTop())},checkActivatorFixed:function(){if(!1===this.attach){var t=this.getActivator();while(t){if("fixed"===window.getComputedStyle(t).position)return void(this.activatorFixed=!0);t=t.offsetParent}this.activatorFixed=!1}},deactivate:function(){},genActivatorListeners:function(){var t=this,e=c.Z.options.methods.genActivatorListeners.call(this),i=e.click;return i&&(e.click=function(e){t.openOnClick&&i&&i(e),t.absoluteX=e.clientX,t.absoluteY=e.clientY}),e},getInnerHeight:function(){return this.hasWindow?window.innerHeight||document.documentElement.clientHeight:0},getOffsetLeft:function(){return this.hasWindow?window.pageXOffset||document.documentElement.scrollLeft:0},getOffsetTop:function(){return this.hasWindow?window.pageYOffset||document.documentElement.scrollTop:0},getRoundedBoundedClientRect:function(t){var e=t.getBoundingClientRect();return{top:Math.round(e.top),left:Math.round(e.left),bottom:Math.round(e.bottom),right:Math.round(e.right),width:Math.round(e.width),height:Math.round(e.height)}},measure:function(t){if(!t||!this.hasWindow)return null;var e=this.getRoundedBoundedClientRect(t);if(!1!==this.attach){var i=window.getComputedStyle(t);e.left=parseInt(i.marginLeft),e.top=parseInt(i.marginTop)}return e},sneakPeek:function(t){var e=this;requestAnimationFrame((function(){var i=e.$refs.content;i&&"none"===i.style.display?(i.style.display="inline-block",t(),i.style.display="none"):t()}))},startTransition:function(){var t=this;return new Promise((function(e){return requestAnimationFrame((function(){t.isContentActive=t.hasJustFocused=t.isActive,e()}))}))},updateDimensions:function(){var t=this;this.hasWindow="undefined"!==typeof window,this.checkActivatorFixed(),this.checkForPageYOffset(),this.pageWidth=document.documentElement.clientWidth;var e={activator:(0,o.Z)({},this.dimensions.activator),content:(0,o.Z)({},this.dimensions.content)};if(!this.hasActivator||this.absolute)e.activator=this.absolutePosition();else{var i=this.getActivator();if(!i)return;e.activator=this.measure(i),e.activator.offsetLeft=i.offsetLeft,!1!==this.attach?e.activator.offsetTop=i.offsetTop:e.activator.offsetTop=0}this.sneakPeek((function(){if(t.$refs.content){if(t.$refs.content.offsetParent){var i=t.getRoundedBoundedClientRect(t.$refs.content.offsetParent);t.relativeYOffset=window.pageYOffset+i.top,e.activator.top-=t.relativeYOffset,e.activator.left-=window.pageXOffset+i.left}e.content=t.measure(t.$refs.content)}t.dimensions=e}))}}}),b=i(60423),T=i(93712),y=i(48085),$=i(45600),C=i(549),w=i(71824),k=i(71439),A=(0,v.Z)(d.Z,u.Z,b.Z,T.Z,y.Z,I),D=A.extend({name:"v-menu",directives:{ClickOutside:$.Z,Resize:C.Z},provide:function(){return{isInMenu:!0,theme:this.theme}},props:{auto:Boolean,closeOnClick:{type:Boolean,default:!0},closeOnContentClick:{type:Boolean,default:!0},disabled:Boolean,disableKeys:Boolean,maxHeight:{type:[Number,String],default:"auto"},offsetX:Boolean,offsetY:Boolean,openOnHover:Boolean,origin:{type:String,default:"top left"},transition:{type:[Boolean,String],default:"v-menu-transition"}},data:function(){return{calculatedTopAuto:0,defaultOffset:8,hasJustFocused:!1,listIndex:-1,resizeTimeout:0,selectedIndex:null,tiles:[]}},computed:{activeTile:function(){return this.tiles[this.listIndex]},calculatedLeft:function(){var t=Math.max(this.dimensions.content.width,parseFloat(this.calculatedMinWidth));return this.auto?(0,g.kb)(this.calcXOverflow(this.calcLeftAuto(),t))||"0":this.calcLeft(t)||"0"},calculatedMaxHeight:function(){var t=this.auto?"200px":(0,g.kb)(this.maxHeight);return t||"0"},calculatedMaxWidth:function(){return(0,g.kb)(this.maxWidth)||"0"},calculatedMinWidth:function(){if(this.minWidth)return(0,g.kb)(this.minWidth)||"0";var t=Math.min(this.dimensions.activator.width+Number(this.nudgeWidth)+(this.auto?16:0),Math.max(this.pageWidth-24,0)),e=isNaN(parseInt(this.calculatedMaxWidth))?t:parseInt(this.calculatedMaxWidth);return(0,g.kb)(Math.min(e,t))||"0"},calculatedTop:function(){var t=this.auto?(0,g.kb)(this.calcYOverflow(this.calculatedTopAuto)):this.calcTop();return t||"0"},hasClickableTiles:function(){return Boolean(this.tiles.find((function(t){return t.tabIndex>-1})))},styles:function(){return{maxHeight:this.calculatedMaxHeight,minWidth:this.calculatedMinWidth,maxWidth:this.calculatedMaxWidth,top:this.calculatedTop,left:this.calculatedLeft,transformOrigin:this.origin,zIndex:this.zIndex||this.activeZIndex}}},watch:{isActive:function(t){t||(this.listIndex=-1)},isContentActive:function(t){this.hasJustFocused=t},listIndex:function(t,e){if(t in this.tiles){var i=this.tiles[t];i.classList.add("v-list-item--highlighted");var n=this.$refs.content.scrollTop,s=this.$refs.content.clientHeight;n>i.offsetTop-8?(0,k.Z)(i.offsetTop-i.clientHeight,{appOffset:!1,duration:300,container:this.$refs.content}):n+s<i.offsetTop+i.clientHeight+8&&(0,k.Z)(i.offsetTop-s+2*i.clientHeight,{appOffset:!1,duration:300,container:this.$refs.content})}e in this.tiles&&this.tiles[e].classList.remove("v-list-item--highlighted")}},created:function(){this.$attrs.hasOwnProperty("full-width")&&(0,w.Jk)("full-width",this)},mounted:function(){this.isActive&&this.callActivate()},methods:{activate:function(){var t=this;this.updateDimensions(),requestAnimationFrame((function(){t.startTransition().then((function(){t.$refs.content&&(t.calculatedTopAuto=t.calcTopAuto(),t.auto&&(t.$refs.content.scrollTop=t.calcScrollPosition()))}))}))},calcScrollPosition:function(){var t=this.$refs.content,e=t.querySelector(".v-list-item--active"),i=t.scrollHeight-t.offsetHeight;return e?Math.min(i,Math.max(0,e.offsetTop-t.offsetHeight/2+e.offsetHeight/2)):t.scrollTop},calcLeftAuto:function(){return parseInt(this.dimensions.activator.left-2*this.defaultOffset)},calcTopAuto:function(){var t=this.$refs.content,e=t.querySelector(".v-list-item--active");if(e||(this.selectedIndex=null),this.offsetY||!e)return this.computedTop;this.selectedIndex=Array.from(this.tiles).indexOf(e);var i=e.offsetTop-this.calcScrollPosition(),n=t.querySelector(".v-list-item").offsetTop;return this.computedTop-i-n-1},changeListIndex:function(t){if(this.getTiles(),this.isActive&&this.hasClickableTiles)if(t.keyCode!==g.Do.tab){if(t.keyCode===g.Do.down)this.nextTile();else if(t.keyCode===g.Do.up)this.prevTile();else if(t.keyCode===g.Do.end)this.lastTile();else if(t.keyCode===g.Do.home)this.firstTile();else{if(t.keyCode!==g.Do.enter||-1===this.listIndex)return;this.tiles[this.listIndex].click()}t.preventDefault()}else this.isActive=!1},closeConditional:function(t){var e=t.target;return this.isActive&&!this._isDestroyed&&this.closeOnClick&&!this.$refs.content.contains(e)},genActivatorAttributes:function(){var t=c.Z.options.methods.genActivatorAttributes.call(this);return this.activeTile&&this.activeTile.id?(0,o.Z)((0,o.Z)({},t),{},{"aria-activedescendant":this.activeTile.id}):t},genActivatorListeners:function(){var t=I.options.methods.genActivatorListeners.call(this);return this.disableKeys||(t.keydown=this.onKeyDown),t},genTransition:function(){var t=this.genContent();return this.transition?this.$createElement("transition",{props:{name:this.transition}},[t]):t},genDirectives:function(){var t=this,e=[{name:"show",value:this.isContentActive}];return!this.openOnHover&&this.closeOnClick&&e.push({name:"click-outside",value:{handler:function(){t.isActive=!1},closeConditional:this.closeConditional,include:function(){return[t.$el].concat((0,l.Z)(t.getOpenDependentElements()))}}}),e},genContent:function(){var t=this,e={attrs:(0,o.Z)((0,o.Z)({},this.getScopeIdAttrs()),{},{role:"role"in this.$attrs?this.$attrs.role:"menu"}),staticClass:"v-menu__content",class:(0,o.Z)((0,o.Z)((0,o.Z)({},this.rootThemeClasses),this.roundedClasses),{},(0,s.Z)({"v-menu__content--auto":this.auto,"v-menu__content--fixed":this.activatorFixed,menuable__content__active:this.isActive},this.contentClass.trim(),!0)),style:this.styles,directives:this.genDirectives(),ref:"content",on:{click:function(e){var i=e.target;i.getAttribute("disabled")||t.closeOnContentClick&&(t.isActive=!1)},keydown:this.onKeyDown}};return this.$listeners.scroll&&(e.on=e.on||{},e.on.scroll=this.$listeners.scroll),!this.disabled&&this.openOnHover&&(e.on=e.on||{},e.on.mouseenter=this.mouseEnterHandler),this.openOnHover&&(e.on=e.on||{},e.on.mouseleave=this.mouseLeaveHandler),this.$createElement("div",e,this.getContentSlot())},getTiles:function(){this.$refs.content&&(this.tiles=Array.from(this.$refs.content.querySelectorAll(".v-list-item, .v-divider, .v-subheader")))},mouseEnterHandler:function(){var t=this;this.runDelay("open",(function(){t.hasJustFocused||(t.hasJustFocused=!0)}))},mouseLeaveHandler:function(t){var e=this;this.runDelay("close",(function(){var i;null!=(i=e.$refs.content)&&i.contains(t.relatedTarget)||requestAnimationFrame((function(){e.isActive=!1,e.callDeactivate()}))}))},nextTile:function(){var t=this.tiles[this.listIndex+1];if(!t){if(!this.tiles.length)return;return this.listIndex=-1,void this.nextTile()}this.listIndex++,-1===t.tabIndex&&this.nextTile()},prevTile:function(){var t=this.tiles[this.listIndex-1];if(!t){if(!this.tiles.length)return;return this.listIndex=this.tiles.length,void this.prevTile()}this.listIndex--,-1===t.tabIndex&&this.prevTile()},lastTile:function(){var t=this.tiles[this.tiles.length-1];t&&(this.listIndex=this.tiles.length-1,-1===t.tabIndex&&this.prevTile())},firstTile:function(){var t=this.tiles[0];t&&(this.listIndex=0,-1===t.tabIndex&&this.nextTile())},onKeyDown:function(t){var e=this;if(t.keyCode===g.Do.esc){setTimeout((function(){e.isActive=!1}));var i=this.getActivator();this.$nextTick((function(){return i&&i.focus()}))}else!this.isActive&&[g.Do.up,g.Do.down].includes(t.keyCode)&&(this.isActive=!0);this.$nextTick((function(){return e.changeListIndex(t)}))},onResize:function(){this.isActive&&(this.$refs.content.offsetWidth,this.updateDimensions(),clearTimeout(this.resizeTimeout),this.resizeTimeout=window.setTimeout(this.updateDimensions,100))}},render:function(t){var e=this,i={staticClass:"v-menu",class:{"v-menu--attached":""===this.attach||!0===this.attach||"attach"===this.attach},directives:[{arg:"500",name:"resize",value:this.onResize}]};return t("div",i,[!this.activator&&this.genActivator(),this.showLazyContent((function(){return[e.$createElement(h.Z,{props:{root:!0,light:e.light,dark:e.dark}},[e.genTransition()])]}))])}}),S=D,O=(i(69600),i(47941),i(54747),i(46286)),Z=i(20144),M=i(96428),L=i(46952),B=i(76290),F=Z.Z.extend({name:"v-simple-checkbox",functional:!0,directives:{ripple:O.Z},props:(0,o.Z)((0,o.Z)((0,o.Z)({},L.Z.options.props),y.Z.options.props),{},{disabled:Boolean,ripple:{type:Boolean,default:!0},value:Boolean,indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},onIcon:{type:String,default:"$checkboxOn"},offIcon:{type:String,default:"$checkboxOff"}}),render:function(t,e){var i=e.props,n=e.data,s=(e.listeners,[]),o=i.offIcon;if(i.indeterminate?o=i.indeterminateIcon:i.value&&(o=i.onIcon),s.push(t(M.Z,L.Z.options.methods.setTextColor(i.value&&i.color,{props:{disabled:i.disabled,dark:i.dark,light:i.light}}),o)),i.ripple&&!i.disabled){var a=t("div",L.Z.options.methods.setTextColor(i.color,{staticClass:"v-input--selection-controls__ripple",directives:[{name:"ripple",value:{center:!0}}]}));s.push(a)}return t("div",(0,B.ZP)(n,{class:{"v-simple-checkbox":!0,"v-simple-checkbox--disabled":i.disabled},on:{click:function(t){t.stopPropagation(),n.on&&n.on.input&&!i.disabled&&(0,g.TI)(n.on.input).forEach((function(t){return t(!i.value)}))}}}),[t("div",{staticClass:"v-input--selection-controls__input"},s)])}}),V=i(11418),P=V.Z,H=i(55533),W=H.Z,_=i(80413),E=i(97620),Y=i(83099),N=i(16816),X=(0,v.Z)(L.Z,y.Z).extend({name:"v-select-list",directives:{ripple:O.Z},props:{action:Boolean,dense:Boolean,hideSelected:Boolean,items:{type:Array,default:function(){return[]}},itemDisabled:{type:[String,Array,Function],default:"disabled"},itemText:{type:[String,Array,Function],default:"text"},itemValue:{type:[String,Array,Function],default:"value"},noDataText:String,noFilter:Boolean,searchInput:null,selectedItems:{type:Array,default:function(){return[]}}},computed:{parsedItems:function(){var t=this;return this.selectedItems.map((function(e){return t.getValue(e)}))},tileActiveClass:function(){return Object.keys(this.setTextColor(this.color).class||{}).join(" ")},staticNoDataTile:function(){var t={attrs:{role:void 0},on:{mousedown:function(t){return t.preventDefault()}}};return this.$createElement(E.Z,t,[this.genTileContent(this.noDataText)])}},methods:{genAction:function(t,e){var i=this;return this.$createElement(Y.Z,[this.$createElement(F,{props:{color:this.color,value:e,ripple:!1},on:{input:function(){return i.$emit("select",t)}}})])},genDivider:function(t){return this.$createElement(P,{props:t})},genFilteredText:function(t){if(t=t||"",!this.searchInput||this.noFilter)return(0,g.r)(t);var e=this.getMaskedCharacters(t),i=e.start,n=e.middle,s=e.end;return"".concat((0,g.r)(i)).concat(this.genHighlight(n)).concat((0,g.r)(s))},genHeader:function(t){return this.$createElement(W,{props:t},t.header)},genHighlight:function(t){return'<span class="v-list-item__mask">'.concat((0,g.r)(t),"</span>")},getMaskedCharacters:function(t){var e=(this.searchInput||"").toString().toLocaleLowerCase(),i=t.toLocaleLowerCase().indexOf(e);if(i<0)return{start:t,middle:"",end:""};var n=t.slice(0,i),s=t.slice(i,i+e.length),o=t.slice(i+e.length);return{start:n,middle:s,end:o}},genTile:function(t){var e=this,i=t.item,n=t.index,s=t.disabled,a=void 0===s?null:s,r=t.value,l=void 0!==r&&r;l||(l=this.hasItem(i)),i===Object(i)&&(a=null!==a?a:this.getDisabled(i));var h={attrs:{"aria-selected":String(l),id:"list-item-".concat(this._uid,"-").concat(n),role:"option"},on:{mousedown:function(t){t.preventDefault()},click:function(){return a||e.$emit("select",i)}},props:{activeClass:this.tileActiveClass,disabled:a,ripple:!0,inputValue:l}};if(!this.$scopedSlots.item)return this.$createElement(E.Z,h,[this.action&&!this.hideSelected&&this.items.length>0?this.genAction(i,l):null,this.genTileContent(i,n)]);var c=this,u=this.$scopedSlots.item({parent:c,item:i,attrs:(0,o.Z)((0,o.Z)({},h.attrs),h.props),on:h.on});return this.needsTile(u)?this.$createElement(E.Z,h,u):u},genTileContent:function(t){var e=this.genFilteredText(this.getText(t));return this.$createElement(_.km,[this.$createElement(_.V9,{domProps:{innerHTML:e}})])},hasItem:function(t){return this.parsedItems.indexOf(this.getValue(t))>-1},needsTile:function(t){return 1!==t.length||null==t[0].componentOptions||"v-list-item"!==t[0].componentOptions.Ctor.options.name},getDisabled:function(t){return Boolean((0,g.qF)(t,this.itemDisabled,!1))},getText:function(t){return String((0,g.qF)(t,this.itemText,t))},getValue:function(t){return(0,g.qF)(t,this.itemValue,this.getText(t))}},render:function(){for(var t=[],e=this.items.length,i=0;i<e;i++){var n=this.items[i];this.hideSelected&&this.hasItem(n)||(null==n?t.push(this.genTile({item:n,index:i})):n.header?t.push(this.genHeader(n)):n.divider?t.push(this.genDivider(n)):t.push(this.genTile({item:n,index:i})))}return t.length||t.push(this.$slots["no-data"]||this.staticNoDataTile),this.$slots["prepend-item"]&&t.unshift(this.$slots["prepend-item"]),this.$slots["append-item"]&&t.push(this.$slots["append-item"]),this.$createElement(N.Z,{staticClass:"v-select-list",class:this.themeClasses,attrs:{role:"listbox",tabindex:-1},props:{dense:this.dense}},t)}}),z=i(58230),q=i(40314),R=i(34419),J=Z.Z.extend({name:"filterable",props:{noDataText:{type:String,default:"$vuetify.noDataText"}}}),K={closeOnClick:!1,closeOnContentClick:!1,disableKeys:!0,openOnClick:!1,maxHeight:304},j=(0,v.Z)(q.Z,R.Z,d.Z,J),U=j.extend().extend({name:"v-select",directives:{ClickOutside:$.Z},props:{appendIcon:{type:String,default:"$dropdown"},attach:{type:null,default:!1},cacheItems:Boolean,chips:Boolean,clearable:Boolean,deletableChips:Boolean,disableLookup:Boolean,eager:Boolean,hideSelected:Boolean,items:{type:Array,default:function(){return[]}},itemColor:{type:String,default:"primary"},itemDisabled:{type:[String,Array,Function],default:"disabled"},itemText:{type:[String,Array,Function],default:"text"},itemValue:{type:[String,Array,Function],default:"value"},menuProps:{type:[String,Array,Object],default:function(){return K}},multiple:Boolean,openOnClear:Boolean,returnObject:Boolean,smallChips:Boolean},data:function(){return{cachedItems:this.cacheItems?this.items:[],menuIsBooted:!1,isMenuActive:!1,lastItem:20,lazyValue:void 0!==this.value?this.value:this.multiple?[]:void 0,selectedIndex:-1,selectedItems:[],keyboardLookupPrefix:"",keyboardLookupLastTime:0}},computed:{allItems:function(){return this.filterDuplicates(this.cachedItems.concat(this.items))},classes:function(){return(0,o.Z)((0,o.Z)({},q.Z.options.computed.classes.call(this)),{},{"v-select":!0,"v-select--chips":this.hasChips,"v-select--chips--small":this.smallChips,"v-select--is-menu-active":this.isMenuActive,"v-select--is-multi":this.multiple})},computedItems:function(){return this.allItems},computedOwns:function(){return"list-".concat(this._uid)},computedCounterValue:function(){var t=this.multiple?this.selectedItems:(this.getText(this.selectedItems[0])||"").toString();return"function"===typeof this.counterValue?this.counterValue(t):t.length},directives:function(){var t=this;return this.isFocused?[{name:"click-outside",value:{handler:this.blur,closeConditional:this.closeConditional,include:function(){return t.getOpenDependentElements()}}}]:void 0},dynamicHeight:function(){return"auto"},hasChips:function(){return this.chips||this.smallChips},hasSlot:function(){return Boolean(this.hasChips||this.$scopedSlots.selection)},isDirty:function(){return this.selectedItems.length>0},listData:function(){var t=this.$vnode&&this.$vnode.context.$options._scopeId,e=t?(0,s.Z)({},t,!0):{};return{attrs:(0,o.Z)((0,o.Z)({},e),{},{id:this.computedOwns}),props:{action:this.multiple,color:this.itemColor,dense:this.dense,hideSelected:this.hideSelected,items:this.virtualizedItems,itemDisabled:this.itemDisabled,itemText:this.itemText,itemValue:this.itemValue,noDataText:this.$vuetify.lang.t(this.noDataText),selectedItems:this.selectedItems},on:{select:this.selectItem},scopedSlots:{item:this.$scopedSlots.item}}},staticList:function(){return(this.$slots["no-data"]||this.$slots["prepend-item"]||this.$slots["append-item"])&&(0,w.N6)("assert: staticList should not be called if slots are used"),this.$createElement(X,this.listData)},virtualizedItems:function(){return this.$_menuProps.auto?this.computedItems:this.computedItems.slice(0,this.lastItem)},menuCanShow:function(){return!0},$_menuProps:function(){var t="string"===typeof this.menuProps?this.menuProps.split(","):this.menuProps;return Array.isArray(t)&&(t=t.reduce((function(t,e){return t[e.trim()]=!0,t}),{})),(0,o.Z)((0,o.Z)({},K),{},{eager:this.eager,value:this.menuCanShow&&this.isMenuActive,nudgeBottom:t.offsetY?1:0},t)}},watch:{internalValue:function(t){var e=this;this.initialValue=t,this.setSelectedItems(),this.multiple&&this.$nextTick((function(){var t;null==(t=e.$refs.menu)||t.updateDimensions()}))},isMenuActive:function(t){var e=this;window.setTimeout((function(){return e.onMenuActiveChange(t)}))},items:{immediate:!0,handler:function(t){var e=this;this.cacheItems&&this.$nextTick((function(){e.cachedItems=e.filterDuplicates(e.cachedItems.concat(t))})),this.setSelectedItems()}}},methods:{blur:function(t){q.Z.options.methods.blur.call(this,t),this.isMenuActive=!1,this.isFocused=!1,this.selectedIndex=-1,this.setMenuIndex(-1)},activateMenu:function(){this.isInteractive&&!this.isMenuActive&&(this.isMenuActive=!0)},clearableCallback:function(){var t=this;this.setValue(this.multiple?[]:null),this.setMenuIndex(-1),this.$nextTick((function(){return t.$refs.input&&t.$refs.input.focus()})),this.openOnClear&&(this.isMenuActive=!0)},closeConditional:function(t){return!this.isMenuActive||!this._isDestroyed&&(!this.getContent()||!this.getContent().contains(t.target))&&this.$el&&!this.$el.contains(t.target)&&t.target!==this.$el},filterDuplicates:function(t){for(var e=new Map,i=0;i<t.length;++i){var n=t[i];if(null!=n)if(n.header||n.divider)e.set(n,n);else{var s=this.getValue(n);!e.has(s)&&e.set(s,n)}}return Array.from(e.values())},findExistingIndex:function(t){var e=this,i=this.getValue(t);return(this.internalValue||[]).findIndex((function(t){return e.valueComparator(e.getValue(t),i)}))},getContent:function(){return this.$refs.menu&&this.$refs.menu.$refs.content},genChipSelection:function(t,e){var i=this,n=this.isDisabled||this.getDisabled(t),s=!n&&this.isInteractive;return this.$createElement(r,{staticClass:"v-chip--select",attrs:{tabindex:-1},props:{close:this.deletableChips&&s,disabled:n,inputValue:e===this.selectedIndex,small:this.smallChips},on:{click:function(t){s&&(t.stopPropagation(),i.selectedIndex=e)},"click:close":function(){return i.onChipInput(t)}},key:JSON.stringify(this.getValue(t))},this.getText(t))},genCommaSelection:function(t,e,i){var n=e===this.selectedIndex&&this.computedColor,s=this.isDisabled||this.getDisabled(t);return this.$createElement("div",this.setTextColor(n,{staticClass:"v-select__selection v-select__selection--comma",class:{"v-select__selection--disabled":s},key:JSON.stringify(this.getValue(t))}),"".concat(this.getText(t)).concat(i?"":", "))},genDefaultSlot:function(){var t=this.genSelections(),e=this.genInput();return Array.isArray(t)?t.push(e):(t.children=t.children||[],t.children.push(e)),[this.genFieldset(),this.$createElement("div",{staticClass:"v-select__slot",directives:this.directives},[this.genLabel(),this.prefix?this.genAffix("prefix"):null,t,this.suffix?this.genAffix("suffix"):null,this.genClearIcon(),this.genIconSlot(),this.genHiddenInput()]),this.genMenu(),this.genProgress()]},genIcon:function(t,e,i){var n=z.Z.options.methods.genIcon.call(this,t,e,i);return"append"===t&&(n.children[0].data=(0,B.ZP)(n.children[0].data,{attrs:{tabindex:n.children[0].componentOptions.listeners&&"-1","aria-hidden":"true","aria-label":void 0}})),n},genInput:function(){var t=q.Z.options.methods.genInput.call(this);return delete t.data.attrs.name,t.data=(0,B.ZP)(t.data,{domProps:{value:null},attrs:{readonly:!0,type:"text","aria-readonly":String(this.isReadonly),"aria-activedescendant":(0,g.vO)(this.$refs.menu,"activeTile.id"),autocomplete:(0,g.vO)(t.data,"attrs.autocomplete","off"),placeholder:this.isDirty||!this.persistentPlaceholder&&!this.isFocused&&this.hasLabel?void 0:this.placeholder},on:{keypress:this.onKeyPress}}),t},genHiddenInput:function(){return this.$createElement("input",{domProps:{value:this.lazyValue},attrs:{type:"hidden",name:this.attrs$.name}})},genInputSlot:function(){var t=q.Z.options.methods.genInputSlot.call(this);return t.data.attrs=(0,o.Z)((0,o.Z)({},t.data.attrs),{},{role:"button","aria-haspopup":"listbox","aria-expanded":String(this.isMenuActive),"aria-owns":this.computedOwns}),t},genList:function(){return this.$slots["no-data"]||this.$slots["prepend-item"]||this.$slots["append-item"]?this.genListWithSlot():this.staticList},genListWithSlot:function(){var t=this,e=["prepend-item","no-data","append-item"].filter((function(e){return t.$slots[e]})).map((function(e){return t.$createElement("template",{slot:e},t.$slots[e])}));return this.$createElement(X,(0,o.Z)({},this.listData),e)},genMenu:function(){var t=this,e=this.$_menuProps;return e.activator=this.$refs["input-slot"],""===this.attach||!0===this.attach||"attach"===this.attach?e.attach=this.$el:e.attach=this.attach,this.$createElement(S,{attrs:{role:void 0},props:e,on:{input:function(e){t.isMenuActive=e,t.isFocused=e},scroll:this.onScroll},ref:"menu"},[this.genList()])},genSelections:function(){var t,e=this.selectedItems.length,i=new Array(e);t=this.$scopedSlots.selection?this.genSlotSelection:this.hasChips?this.genChipSelection:this.genCommaSelection;while(e--)i[e]=t(this.selectedItems[e],e,e===i.length-1);return this.$createElement("div",{staticClass:"v-select__selections"},i)},genSlotSelection:function(t,e){var i=this;return this.$scopedSlots.selection({attrs:{class:"v-chip--select"},parent:this,item:t,index:e,select:function(t){t.stopPropagation(),i.selectedIndex=e},selected:e===this.selectedIndex,disabled:!this.isInteractive})},getMenuIndex:function(){return this.$refs.menu?this.$refs.menu.listIndex:-1},getDisabled:function(t){return(0,g.qF)(t,this.itemDisabled,!1)},getText:function(t){return(0,g.qF)(t,this.itemText,t)},getValue:function(t){return(0,g.qF)(t,this.itemValue,this.getText(t))},onBlur:function(t){t&&this.$emit("blur",t)},onChipInput:function(t){this.multiple?this.selectItem(t):this.setValue(null),0===this.selectedItems.length?this.isMenuActive=!0:this.isMenuActive=!1,this.selectedIndex=-1},onClick:function(t){this.isInteractive&&(this.isAppendInner(t.target)||(this.isMenuActive=!0),this.isFocused||(this.isFocused=!0,this.$emit("focus")),this.$emit("click",t))},onEscDown:function(t){t.preventDefault(),this.isMenuActive&&(t.stopPropagation(),this.isMenuActive=!1)},onKeyPress:function(t){var e=this;if(!this.multiple&&this.isInteractive&&!this.disableLookup){var i=1e3,n=performance.now();n-this.keyboardLookupLastTime>i&&(this.keyboardLookupPrefix=""),this.keyboardLookupPrefix+=t.key.toLowerCase(),this.keyboardLookupLastTime=n;var s=this.allItems.findIndex((function(t){var i=(e.getText(t)||"").toString();return i.toLowerCase().startsWith(e.keyboardLookupPrefix)})),o=this.allItems[s];-1!==s&&(this.lastItem=Math.max(this.lastItem,s+5),this.setValue(this.returnObject?o:this.getValue(o)),this.$nextTick((function(){return e.$refs.menu.getTiles()})),setTimeout((function(){return e.setMenuIndex(s)})))}},onKeyDown:function(t){var e=this;if(!this.isReadonly||t.keyCode===g.Do.tab){var i=t.keyCode,n=this.$refs.menu;if(this.$emit("keydown",t),n)return this.isMenuActive&&[g.Do.up,g.Do.down,g.Do.home,g.Do.end,g.Do.enter].includes(i)&&this.$nextTick((function(){n.changeListIndex(t),e.$emit("update:list-index",n.listIndex)})),[g.Do.enter,g.Do.space].includes(i)&&this.activateMenu(),!this.isMenuActive&&[g.Do.up,g.Do.down,g.Do.home,g.Do.end].includes(i)?this.onUpDown(t):i===g.Do.esc?this.onEscDown(t):i===g.Do.tab?this.onTabDown(t):i===g.Do.space?this.onSpaceDown(t):void 0}},onMenuActiveChange:function(t){if(!(this.multiple&&!t||this.getMenuIndex()>-1)){var e=this.$refs.menu;if(e&&this.isDirty){this.$refs.menu.getTiles();for(var i=0;i<e.tiles.length;i++)if("true"===e.tiles[i].getAttribute("aria-selected")){this.setMenuIndex(i);break}}}},onMouseUp:function(t){var e=this;this.hasMouseDown&&3!==t.which&&this.isInteractive&&this.isAppendInner(t.target)&&this.$nextTick((function(){return e.isMenuActive=!e.isMenuActive})),q.Z.options.methods.onMouseUp.call(this,t)},onScroll:function(){var t=this;if(this.isMenuActive){if(this.lastItem>this.computedItems.length)return;var e=this.getContent().scrollHeight-(this.getContent().scrollTop+this.getContent().clientHeight)<200;e&&(this.lastItem+=20)}else requestAnimationFrame((function(){return t.getContent().scrollTop=0}))},onSpaceDown:function(t){t.preventDefault()},onTabDown:function(t){var e=this.$refs.menu;if(e){var i=e.activeTile;!this.multiple&&i&&this.isMenuActive?(t.preventDefault(),t.stopPropagation(),i.click()):this.blur(t)}},onUpDown:function(t){var e=this,i=this.$refs.menu;if(i){if(t.preventDefault(),this.multiple)return this.activateMenu();var n=t.keyCode;i.isBooted=!0,window.requestAnimationFrame((function(){if(i.getTiles(),!i.hasClickableTiles)return e.activateMenu();switch(n){case g.Do.up:i.prevTile();break;case g.Do.down:i.nextTile();break;case g.Do.home:i.firstTile();break;case g.Do.end:i.lastTile();break}e.selectItem(e.allItems[e.getMenuIndex()])}))}},selectItem:function(t){var e=this;if(this.multiple){var i=(this.internalValue||[]).slice(),n=this.findExistingIndex(t);if(-1!==n?i.splice(n,1):i.push(t),this.setValue(i.map((function(t){return e.returnObject?t:e.getValue(t)}))),this.hideSelected)this.setMenuIndex(-1);else{var s=this.allItems.indexOf(t);~s&&(this.$nextTick((function(){return e.$refs.menu.getTiles()})),setTimeout((function(){return e.setMenuIndex(s)})))}}else this.setValue(this.returnObject?t:this.getValue(t)),this.isMenuActive=!1},setMenuIndex:function(t){this.$refs.menu&&(this.$refs.menu.listIndex=t)},setSelectedItems:function(){var t,e=this,i=[],s=this.multiple&&Array.isArray(this.internalValue)?this.internalValue:[this.internalValue],o=(0,n.Z)(s);try{var a=function(){var n=t.value,s=e.allItems.findIndex((function(t){return e.valueComparator(e.getValue(t),e.getValue(n))}));s>-1&&i.push(e.allItems[s])};for(o.s();!(t=o.n()).done;)a()}catch(r){o.e(r)}finally{o.f()}this.selectedItems=i},setValue:function(t){this.valueComparator(t,this.internalValue)||(this.internalValue=t,this.$emit("change",t))},isAppendInner:function(t){var e=this.$refs["append-inner"];return e&&(e===t||e.contains(t))}}})}}]);
//# sourceMappingURL=641-legacy.9215ff51.js.map