(function(c,b,a,e){var d=c(b);c.fn.lazyload=function(f){var h=this;var i;var g={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:false,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};function j(){var k=0;h.each(function(){var l=c(this);if(g.skip_invisible&&!l.is(":visible")){return}if(c.abovethetop(this,g)||c.leftofbegin(this,g)){}else{if(!c.belowthefold(this,g)&&!c.rightoffold(this,g)){l.trigger("appear");k=0}else{if(++k>g.failure_limit){return false}}}})}if(f){if(e!==f.failurelimit){f.failure_limit=f.failurelimit;delete f.failurelimit}if(e!==f.effectspeed){f.effect_speed=f.effectspeed;delete f.effectspeed}c.extend(g,f)}i=(g.container===e||g.container===b)?d:c(g.container);if(0===g.event.indexOf("scroll")){i.bind(g.event,function(){return j()})}this.each(function(){var k=this;var l=c(k);k.loaded=false;if(l.attr("src")===e||l.attr("src")===false){if(l.is("img")){l.attr("src",g.placeholder)}}l.one("appear",function(){if(!this.loaded){if(g.appear){var m=h.length;g.appear.call(k,m,g)}c("<img />").bind("load",function(){var o=l.attr("data-"+g.data_attribute);l.hide();if(l.is("img")){l.attr("src",o)}else{l.css("background-image","url('"+o+"')")}l[g.effect](g.effect_speed);k.loaded=true;var n=c.grep(h,function(q){return!q.loaded});h=c(n);if(g.load){var p=h.length;g.load.call(k,p,g)}}).attr("src",l.attr("data-"+g.data_attribute))}});if(0!==g.event.indexOf("scroll")){l.bind(g.event,function(){if(!k.loaded){l.trigger("appear")}})}});d.bind("resize",function(){j()});if((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)){d.bind("pageshow",function(k){if(k.originalEvent&&k.originalEvent.persisted){h.each(function(){c(this).trigger("appear")})}})}c(a).ready(function(){j()});return this};c.belowthefold=function(g,h){var f;if(h.container===e||h.container===b){f=(b.innerHeight?b.innerHeight:d.height())+d.scrollTop()}else{f=c(h.container).offset().top+c(h.container).height()}return f<=c(g).offset().top-h.threshold};c.rightoffold=function(g,h){var f;if(h.container===e||h.container===b){f=d.width()+d.scrollLeft()}else{f=c(h.container).offset().left+c(h.container).width()}return f<=c(g).offset().left-h.threshold};c.abovethetop=function(g,h){var f;if(h.container===e||h.container===b){f=d.scrollTop()}else{f=c(h.container).offset().top}return f>=c(g).offset().top+h.threshold+c(g).height()};c.leftofbegin=function(g,h){var f;if(h.container===e||h.container===b){f=d.scrollLeft()}else{f=c(h.container).offset().left}return f>=c(g).offset().left+h.threshold+c(g).width()};c.inviewport=function(f,g){return!c.rightoffold(f,g)&&!c.leftofbegin(f,g)&&!c.belowthefold(f,g)&&!c.abovethetop(f,g)};c.extend(c.expr[":"],{"below-the-fold":function(f){return c.belowthefold(f,{threshold:0})},"above-the-top":function(f){return!c.belowthefold(f,{threshold:0})},"right-of-screen":function(f){return c.rightoffold(f,{threshold:0})},"left-of-screen":function(f){return!c.rightoffold(f,{threshold:0})},"in-viewport":function(f){return c.inviewport(f,{threshold:0})},"above-the-fold":function(f){return!c.belowthefold(f,{threshold:0})},"right-of-fold":function(f){return c.rightoffold(f,{threshold:0})},"left-of-fold":function(f){return!c.rightoffold(f,{threshold:0})}})})(jQuery,window,document);
(function(a){if(typeof define==="function"&&define.amd){define(a)}else{if(typeof exports==="object"){module.exports=a()}else{var c=window.Cookies;var b=window.Cookies=a();b.noConflict=function(){window.Cookies=c;return b}}}}(function(){function b(){var f=0;var c={};for(;f<arguments.length;f++){var d=arguments[f];for(var e in d){c[e]=d[e]}}return c}function a(d){function c(o,n,k){var r;if(arguments.length>1){k=b({path:"/"},c.defaults,k);if(typeof k.expires==="number"){var h=new Date();h.setMilliseconds(h.getMilliseconds()+k.expires*86400000);k.expires=h}try{r=JSON.stringify(n);if(/^[\{\[]/.test(r)){n=r}}catch(m){}n=encodeURIComponent(String(n));n=n.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent);o=encodeURIComponent(String(o));o=o.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent);o=o.replace(/[\(\)]/g,escape);return(document.cookie=[o,"=",n,k.expires&&"; expires="+k.expires.toUTCString(),k.path&&"; path="+k.path,k.domain&&"; domain="+k.domain,k.secure?"; secure":""].join(""))}if(!o){r={}}var q=document.cookie?document.cookie.split("; "):[];var p=/(%[0-9A-Z]{2})+/g;var l=0;for(;l<q.length;l++){var j=q[l].split("=");var f=j[0].replace(p,decodeURIComponent);var g=j.slice(1).join("=");if(g.charAt(0)==='"'){g=g.slice(1,-1)}try{g=d&&d(g,f)||g.replace(p,decodeURIComponent);if(this.json){try{g=JSON.parse(g)}catch(m){}}if(o===f){r=g;break}if(!o){r[f]=g}}catch(m){}}return r}c.get=c.set=c;c.getJSON=function(){return c.apply({json:true},[].slice.call(arguments))};c.defaults={};c.remove=function(f,e){c(f,"",b(e,{expires:-1}))};c.withConverter=a;return c}return a()}));
(function(f,h,j,b){var d=function(n){var m=n.length;var l=f("head");while(m--){if(l.has("."+n[m]).length===0){l.append('<meta class="'+n[m]+'" />')}}};d(["foundation-mq-small","foundation-mq-medium","foundation-mq-large","foundation-mq-xlarge","foundation-mq-xxlarge","foundation-data-attribute-namespace"]);f(function(){if(typeof FastClick!=="undefined"){if(typeof j.body!=="undefined"){FastClick.attach(j.body)}}});var e=function(m,n){if(typeof m==="string"){if(n){var l;if(n.jquery){l=n[0];if(!l){return n}}else{l=n}return f(l.querySelectorAll(m))}return f(j.querySelectorAll(m))}return f(m,n)};var k=function(m){var l=[];if(!m){l.push("data")}if(this.namespace.length>0){l.push(this.namespace)}l.push(this.name);return l.join("-")};var g=function(o){var n=o.split("-"),m=n.length,l=[];while(m--){if(m!==0){l.push(n[m])}else{if(this.namespace.length>0){l.push(this.namespace,n[m])}else{l.push(n[m])}}}return l.reverse().join("-")};var a=function(o,m){var l=this,n=!e(this).data(this.attr_name(true));if(e(this.scope).is("["+this.attr_name()+"]")){e(this.scope).data(this.attr_name(true)+"-init",f.extend({},this.settings,(m||o),this.data_options(e(this.scope))));if(n){this.events(this.scope)}}else{e("["+this.attr_name()+"]",this.scope).each(function(){var p=!e(this).data(l.attr_name(true)+"-init");e(this).data(l.attr_name(true)+"-init",f.extend({},l.settings,(m||o),l.data_options(e(this))));if(p){l.events(this)}})}if(typeof o==="string"){return this[o].call(this,m)}};var c=function(n,o){function l(){o(n[0])}function m(){this.one("load",l);if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var q=this.attr("src"),p=q.match(/\?/)?"&":"?";p+="random="+(new Date()).getTime();this.attr("src",q+p)}}if(!n.attr("src")){l();return}if(n[0].complete||n[0].readyState===4){l()}else{m.call(n)}};h.matchMedia=h.matchMedia||(function(p){var n,l=p.documentElement,m=l.firstElementChild||l.firstChild,o=p.createElement("body"),q=p.createElement("div");q.id="mq-test-1";q.style.cssText="position:absolute;top:-100em";o.style.background="none";o.appendChild(q);return function(r){q.innerHTML='&shy;<style media="'+r+'"> #mq-test-1 { width: 42px; }</style>';l.insertBefore(o,m);n=q.offsetWidth===42;l.removeChild(o);return{matches:n,media:r}}}(j));(function(n){var l,o=0,s=["webkit","moz"],r=h.requestAnimationFrame,q=h.cancelAnimationFrame,m="undefined"!==typeof jQuery.fx;for(;o<s.length&&!r;o++){r=h[s[o]+"RequestAnimationFrame"];q=q||h[s[o]+"CancelAnimationFrame"]||h[s[o]+"CancelRequestAnimationFrame"]}function p(){if(l){r(p);if(m){jQuery.fx.tick()}}}if(r){h.requestAnimationFrame=r;h.cancelAnimationFrame=q;if(m){jQuery.fx.timer=function(t){if(t()&&jQuery.timers.push(t)&&!l){l=true;p()}};jQuery.fx.stop=function(){l=false}}}else{h.requestAnimationFrame=function(w){var t=new Date().getTime(),u=Math.max(0,16-(t-o)),v=h.setTimeout(function(){w(t+u)},u);o=t+u;return v};h.cancelAnimationFrame=function(t){clearTimeout(t)}}}(jQuery));function i(l){if(typeof l==="string"||l instanceof String){l=l.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g,"")}return l}h.Foundation={name:"Foundation",version:"5.4.7",media_queries:{small:e(".foundation-mq-small").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),medium:e(".foundation-mq-medium").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),large:e(".foundation-mq-large").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),xlarge:e(".foundation-mq-xlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),xxlarge:e(".foundation-mq-xxlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,"")},stylesheet:f("<style></style>").appendTo("head")[0].sheet,global:{namespace:b},init:function(p,m,s,o,l){var n=[p,s,o,l],q=[];this.rtl=/rtl/i.test(e("html").attr("dir"));this.scope=p||this.scope;this.set_namespace();if(m&&typeof m==="string"&&!/reflow/i.test(m)){if(this.libs.hasOwnProperty(m)){q.push(this.init_lib(m,n))}}else{for(var r in this.libs){q.push(this.init_lib(r,m))}}e(h).load(function(){e(h).trigger("resize.fndtn.clearing").trigger("resize.fndtn.dropdown").trigger("resize.fndtn.equalizer").trigger("resize.fndtn.interchange").trigger("resize.fndtn.joyride").trigger("resize.fndtn.magellan").trigger("resize.fndtn.topbar").trigger("resize.fndtn.slider")});return p},init_lib:function(m,l){if(this.libs.hasOwnProperty(m)){this.patch(this.libs[m]);if(l&&l.hasOwnProperty(m)){if(typeof this.libs[m].settings!=="undefined"){f.extend(true,this.libs[m].settings,l[m])}else{if(typeof this.libs[m].defaults!=="undefined"){f.extend(true,this.libs[m].defaults,l[m])}}return this.libs[m].init.apply(this.libs[m],[this.scope,l[m]])}l=l instanceof Array?l:new Array(l);return this.libs[m].init.apply(this.libs[m],l)}return function(){}},patch:function(l){l.scope=this.scope;l.namespace=this.global.namespace;l.rtl=this.rtl;l.data_options=this.utils.data_options;l.attr_name=k;l.add_namespace=g;l.bindings=a;l.S=this.utils.S},inherit:function(o,m){var l=m.split(" "),n=l.length;while(n--){if(this.utils.hasOwnProperty(l[n])){o[l[n]]=this.utils[l[n]]}}},set_namespace:function(){var l=(this.global.namespace===b)?f(".foundation-data-attribute-namespace").css("font-family"):this.global.namespace;this.global.namespace=(l===b||/false/i.test(l))?"":l},libs:{},utils:{S:e,throttle:function(m,l){var n=null;return function(){var p=this,o=arguments;if(n==null){n=setTimeout(function(){m.apply(p,o);n=null},l)}}},debounce:function(o,n,m){var p,l;return function(){var t=this,s=arguments;var r=function(){p=null;if(!m){l=o.apply(t,s)}};var q=m&&!p;clearTimeout(p);p=setTimeout(r,n);if(q){l=o.apply(t,s)}return l}},data_options:function(n,q){q=q||"options";var l={},t,m,v,s=function(w){var p=Foundation.global.namespace;if(p.length>0){return w.data(p+"-"+q)}return w.data(q)};var r=s(n);if(typeof r==="object"){return r}v=(r||":").split(";");t=v.length;function u(p){return!isNaN(p-0)&&p!==null&&p!==""&&p!==false&&p!==true}function o(p){if(typeof p==="string"){return f.trim(p)}return p}while(t--){m=v[t].split(":");m=[m[0],m.slice(1).join(":")];if(/true/i.test(m[1])){m[1]=true}if(/false/i.test(m[1])){m[1]=false}if(u(m[1])){if(m[1].indexOf(".")===-1){m[1]=parseInt(m[1],10)}else{m[1]=parseFloat(m[1])}}if(m.length===2&&m[0].length>0){l[o(m[0])]=o(m[1])}}return l},register_media:function(m,l){if(Foundation.media_queries[m]===b){f("head").append('<meta class="'+l+'"/>');Foundation.media_queries[m]=i(f("."+l).css("font-family"))}},add_custom_rule:function(n,m){if(m===b&&Foundation.stylesheet){Foundation.stylesheet.insertRule(n,Foundation.stylesheet.cssRules.length)}else{var l=Foundation.media_queries[m];if(l!==b){Foundation.stylesheet.insertRule("@media "+Foundation.media_queries[m]+"{ "+n+" }")}}},image_loaded:function(l,o){var m=this,n=l.length;if(n===0){o(l)}l.each(function(){c(m.S(this),function(){n-=1;if(n===0){o(l)}})})},random_str:function(){if(!this.fidx){this.fidx=0}this.prefix=this.prefix||[(this.name||"F"),(+new Date).toString(36)].join("-");return this.prefix+(this.fidx++).toString(36)}}};f.fn.foundation=function(){var l=Array.prototype.slice.call(arguments,0);return this.each(function(){Foundation.init.apply(Foundation,[this].concat(l));return this})}}(jQuery,window,window.document));(function(c,b,a,d){Foundation.libs.slider={name:"slider",version:"5.4.7",settings:{start:0,end:100,step:1,initial:null,display_selector:"",vertical:false,on_change:function(){}},cache:{},init:function(f,g,e){Foundation.inherit(this,"throttle");this.bindings(g,e);this.reflow()},events:function(){var e=this;c(this.scope).off(".slider").on("mousedown.fndtn.slider touchstart.fndtn.slider pointerdown.fndtn.slider","["+e.attr_name()+"]:not(.disabled, [disabled]) .range-slider-handle",function(f){if(!e.cache.active){f.preventDefault();e.set_active_slider(c(f.target))}}).on("mousemove.fndtn.slider touchmove.fndtn.slider pointermove.fndtn.slider",function(g){if(!!e.cache.active){g.preventDefault();if(c.data(e.cache.active[0],"settings").vertical){var f=0;if(!g.pageY){f=b.scrollY}e.calculate_position(e.cache.active,(g.pageY||g.originalEvent.clientY||g.originalEvent.touches[0].clientY||g.currentPoint.y)+f)}else{e.calculate_position(e.cache.active,g.pageX||g.originalEvent.clientX||g.originalEvent.touches[0].clientX||g.currentPoint.x)}}}).on("mouseup.fndtn.slider touchend.fndtn.slider pointerup.fndtn.slider",function(f){e.remove_active_slider()}).on("change.fndtn.slider",function(f){e.settings.on_change()});e.S(b).on("resize.fndtn.slider",e.throttle(function(f){e.reflow()},300))},set_active_slider:function(e){this.cache.active=e},remove_active_slider:function(){this.cache.active=null},calculate_position:function(l,j){var f=this,h=c.data(l[0],"settings"),g=c.data(l[0],"handle_l"),e=c.data(l[0],"handle_o"),k=c.data(l[0],"bar_l"),i=c.data(l[0],"bar_o");requestAnimationFrame(function(){var n;if(Foundation.rtl&&!h.vertical){n=f.limit_to(((i+k-j)/k),0,1)}else{n=f.limit_to(((j-i)/k),0,1)}n=h.vertical?1-n:n;var m=f.normalized_value(n,h.start,h.end,h.step);f.set_ui(l,m)})},set_ui:function(l,g){var f=c.data(l[0],"settings"),e=c.data(l[0],"handle_l"),k=c.data(l[0],"bar_l"),i=this.normalized_percentage(g,f.start,f.end),h=i*(k-e)-1,j=i*100;if(Foundation.rtl&&!f.vertical){h=-h}h=f.vertical?-h+k-e+1:h;this.set_translate(l,h,f.vertical);if(f.vertical){l.siblings(".range-slider-active-segment").css("height",j+"%")}else{l.siblings(".range-slider-active-segment").css("width",j+"%")}l.parent().attr(this.attr_name(),g).trigger("change").trigger("change.fndtn.slider");l.parent().children("input[type=hidden]").val(g);if(!l[0].hasAttribute("aria-valuemin")){l.attr({"aria-valuemin":f.start,"aria-valuemax":f.end})}l.attr("aria-valuenow",g);if(f.display_selector!=""){c(f.display_selector).each(function(){if(this.hasOwnProperty("value")){c(this).val(g)}else{c(this).text(g)}})}},normalized_percentage:function(f,g,e){return Math.min(1,(f-g)/(e-g))},normalized_value:function(f,e,h,g){var i=h-e,k=f*i,j=(k-(k%g))/g,l=k%g,m=(l>=g*0.5?g:0);return(j*g+m)+e},set_translate:function(f,g,e){if(e){c(f).css("-webkit-transform","translateY("+g+"px)").css("-moz-transform","translateY("+g+"px)").css("-ms-transform","translateY("+g+"px)").css("-o-transform","translateY("+g+"px)").css("transform","translateY("+g+"px)")}else{c(f).css("-webkit-transform","translateX("+g+"px)").css("-moz-transform","translateX("+g+"px)").css("-ms-transform","translateX("+g+"px)").css("-o-transform","translateX("+g+"px)").css("transform","translateX("+g+"px)")}},limit_to:function(g,f,e){return Math.min(Math.max(g,f),e)},initialize_settings:function(f){var e=c.extend({},this.settings,this.data_options(c(f).parent()));if(e.vertical){c.data(f,"bar_o",c(f).parent().offset().top);c.data(f,"bar_l",c(f).parent().outerHeight());c.data(f,"handle_o",c(f).offset().top);c.data(f,"handle_l",c(f).outerHeight())}else{c.data(f,"bar_o",c(f).parent().offset().left);c.data(f,"bar_l",c(f).parent().outerWidth());c.data(f,"handle_o",c(f).offset().left);c.data(f,"handle_l",c(f).outerWidth())}c.data(f,"bar",c(f).parent());c.data(f,"settings",e)},set_initial_position:function(g){var f=c.data(g.children(".range-slider-handle")[0],"settings"),e=(!!f.initial?f.initial:Math.floor((f.end-f.start)*0.5/f.step)*f.step+f.start),h=g.children(".range-slider-handle");this.set_ui(h,e)},set_value:function(f){var e=this;c("["+e.attr_name()+"]",this.scope).each(function(){c(this).attr(e.attr_name(),f)});if(!!c(this.scope).attr(e.attr_name())){c(this.scope).attr(e.attr_name(),f)}e.reflow()},reflow:function(){var e=this;e.S("["+this.attr_name()+"]").each(function(){var f=c(this).children(".range-slider-handle")[0],g=c(this).attr(e.attr_name());e.initialize_settings(f);if(g){e.set_ui(c(f),parseFloat(g))}else{e.set_initial_position(c(this))}})}}}(jQuery,window,window.document));(function(c,b,a,e){var d=d||false;Foundation.libs.joyride={name:"joyride",version:"5.4.7",defaults:{expose:false,modal:true,keyboard:true,tip_location:"bottom",nub_position:"auto",scroll_speed:1500,scroll_animation:"linear",timer:0,start_timer_on_click:true,start_offset:0,next_button:true,prev_button:true,tip_animation:"fade",pause_after:[],exposed:[],tip_animation_fade_speed:300,cookie_monster:false,cookie_name:"joyride",cookie_domain:false,cookie_expires:365,tip_container:"body",abort_on_close:true,tip_location_patterns:{top:["bottom"],bottom:[],left:["right","top","bottom"],right:["left","top","bottom"]},post_ride_callback:function(){},post_step_callback:function(){},pre_step_callback:function(){},pre_ride_callback:function(){},post_expose_callback:function(){},template:{link:'<a href="#close" class="joyride-close-tip">&times;</a>',timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',wrapper:'<div class="joyride-content-wrapper"></div>',button:'<a href="#" class="small button joyride-next-tip"></a>',prev_button:'<a href="#" class="small button joyride-prev-tip"></a>',modal:'<div class="joyride-modal-bg"></div>',expose:'<div class="joyride-expose-wrapper"></div>',expose_cover:'<div class="joyride-expose-cover"></div>'},expose_add_class:""},init:function(g,h,f){Foundation.inherit(this,"throttle random_str");this.settings=this.settings||c.extend({},this.defaults,(f||h));this.bindings(h,f)},go_next:function(){if(this.settings.$li.next().length<1){this.end()}else{if(this.settings.timer>0){clearTimeout(this.settings.automate);this.hide();this.show();this.startTimer()}else{this.hide();this.show()}}},go_prev:function(){if(this.settings.$li.prev().length<1){}else{if(this.settings.timer>0){clearTimeout(this.settings.automate);this.hide();this.show(null,true);this.startTimer()}else{this.hide();this.show(null,true)}}},events:function(){var f=this;c(this.scope).off(".joyride").on("click.fndtn.joyride",".joyride-next-tip, .joyride-modal-bg",function(g){g.preventDefault();this.go_next()}.bind(this)).on("click.fndtn.joyride",".joyride-prev-tip",function(g){g.preventDefault();this.go_prev()}.bind(this)).on("click.fndtn.joyride",".joyride-close-tip",function(g){g.preventDefault();this.end(this.settings.abort_on_close)}.bind(this)).on("keyup.fndtn.joyride",function(g){if(!this.settings.keyboard||!this.settings.riding){return}switch(g.which){case 39:g.preventDefault();this.go_next();break;case 37:g.preventDefault();this.go_prev();break;case 27:g.preventDefault();this.end(this.settings.abort_on_close)}}.bind(this));c(b).off(".joyride").on("resize.fndtn.joyride",f.throttle(function(){if(c("["+f.attr_name()+"]").length>0&&f.settings.$next_tip&&f.settings.riding){if(f.settings.exposed.length>0){var g=c(f.settings.exposed);g.each(function(){var h=c(this);f.un_expose(h);f.expose(h)})}if(f.is_phone()){f.pos_phone()}else{f.pos_default(false)}}},100))},start:function(){var g=this,i=c("["+this.attr_name()+"]",this.scope),f=["timer","scrollSpeed","startOffset","tipAnimationFadeSpeed","cookieExpires"],h=f.length;if(!i.length>0){return}if(!this.settings.init){this.events()}this.settings=i.data(this.attr_name(true)+"-init");this.settings.$content_el=i;this.settings.$body=c(this.settings.tip_container);this.settings.body_offset=c(this.settings.tip_container).position();this.settings.$tip_content=this.settings.$content_el.find("> li");this.settings.paused=false;this.settings.attempts=0;this.settings.riding=true;if(typeof c.cookie!=="function"){this.settings.cookie_monster=false}if(!this.settings.cookie_monster||this.settings.cookie_monster&&!c.cookie(this.settings.cookie_name)){this.settings.$tip_content.each(function(j){var l=c(this);this.settings=c.extend({},g.defaults,g.data_options(l));var k=h;while(k--){g.settings[f[k]]=parseInt(g.settings[f[k]],10)}g.create({$li:l,index:j})});if(!this.settings.start_timer_on_click&&this.settings.timer>0){this.show("init");this.startTimer()}else{this.show("init")}}},resume:function(){this.set_li();this.show()},tip_template:function(g){var h,f;g.tip_class=g.tip_class||"";h=c(this.settings.template.tip).addClass(g.tip_class);f=c.trim(c(g.li).html())+this.prev_button_text(g.prev_button_text,g.index)+this.button_text(g.button_text)+this.settings.template.link+this.timer_instance(g.index);h.append(c(this.settings.template.wrapper));h.first().attr(this.add_namespace("data-index"),g.index);c(".joyride-content-wrapper",h).append(f);return h[0]},timer_instance:function(g){var f;if((g===0&&this.settings.start_timer_on_click&&this.settings.timer>0)||this.settings.timer===0){f=""}else{f=c(this.settings.template.timer)[0].outerHTML}return f},button_text:function(f){if(this.settings.tip_settings.next_button){f=c.trim(f)||"Next";f=c(this.settings.template.button).append(f)[0].outerHTML}else{f=""}return f},prev_button_text:function(g,f){if(this.settings.tip_settings.prev_button){g=c.trim(g)||"Previous";if(f==0){g=c(this.settings.template.prev_button).append(g).addClass("disabled")[0].outerHTML}else{g=c(this.settings.template.prev_button).append(g)[0].outerHTML}}else{g=""}return g},create:function(i){this.settings.tip_settings=c.extend({},this.settings,this.data_options(i.$li));var h=i.$li.attr(this.add_namespace("data-button"))||i.$li.attr(this.add_namespace("data-text")),g=i.$li.attr(this.add_namespace("data-button-prev"))||i.$li.attr(this.add_namespace("data-prev-text")),f=i.$li.attr("class"),j=c(this.tip_template({tip_class:f,index:i.index,button_text:h,prev_button_text:g,li:i.$li}));c(this.settings.tip_container).append(j)},show:function(h,f){var g=null;if(this.settings.$li===e||(c.inArray(this.settings.$li.index(),this.settings.pause_after)===-1)){if(this.settings.paused){this.settings.paused=false}else{this.set_li(h,f)}this.settings.attempts=0;if(this.settings.$li.length&&this.settings.$target.length>0){if(h){this.settings.pre_ride_callback(this.settings.$li.index(),this.settings.$next_tip);if(this.settings.modal){this.show_modal()}}this.settings.pre_step_callback(this.settings.$li.index(),this.settings.$next_tip);if(this.settings.modal&&this.settings.expose){this.expose()}this.settings.tip_settings=c.extend({},this.settings,this.data_options(this.settings.$li));this.settings.timer=parseInt(this.settings.timer,10);this.settings.tip_settings.tip_location_pattern=this.settings.tip_location_patterns[this.settings.tip_settings.tip_location];if(!/body/i.test(this.settings.$target.selector)){this.scroll_to()}if(this.is_phone()){this.pos_phone(true)}else{this.pos_default(true)}g=this.settings.$next_tip.find(".joyride-timer-indicator");if(/pop/i.test(this.settings.tip_animation)){g.width(0);if(this.settings.timer>0){this.settings.$next_tip.show();setTimeout(function(){g.animate({width:g.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fade_speed)}else{this.settings.$next_tip.show()}}else{if(/fade/i.test(this.settings.tip_animation)){g.width(0);if(this.settings.timer>0){this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed).show();setTimeout(function(){g.animate({width:g.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fade_speed)}else{this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed)}}}this.settings.$current_tip=this.settings.$next_tip}else{if(this.settings.$li&&this.settings.$target.length<1){this.show(h,f)}else{this.end()}}}else{this.settings.paused=true}},is_phone:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},hide:function(){if(this.settings.modal&&this.settings.expose){this.un_expose()}if(!this.settings.modal){c(".joyride-modal-bg").hide()}this.settings.$current_tip.css("visibility","hidden");setTimeout(c.proxy(function(){this.hide();this.css("visibility","visible")},this.settings.$current_tip),0);this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip)},set_li:function(g,f){if(g){this.settings.$li=this.settings.$tip_content.eq(this.settings.start_offset);this.set_next_tip();this.settings.$current_tip=this.settings.$next_tip}else{if(f){this.settings.$li=this.settings.$li.prev()}else{this.settings.$li=this.settings.$li.next()}this.set_next_tip()}this.set_target()},set_next_tip:function(){this.settings.$next_tip=c(".joyride-tip-guide").eq(this.settings.$li.index());this.settings.$next_tip.data("closed","")},set_target:function(){var f=this.settings.$li.attr(this.add_namespace("data-class")),h=this.settings.$li.attr(this.add_namespace("data-id")),g=function(){if(h){return c(a.getElementById(h))}else{if(f){return c("."+f).first()}else{return c("body")}}};this.settings.$target=g()},scroll_to:function(){var g,f;g=c(b).height()/2;f=Math.ceil(this.settings.$target.offset().top-g+this.settings.$next_tip.outerHeight());if(f!=0){c("html, body").stop().animate({scrollTop:f},this.settings.scroll_speed,"swing")}},paused:function(){return(c.inArray((this.settings.$li.index()+1),this.settings.pause_after)===-1)},restart:function(){this.hide();this.settings.$li=e;this.show("init")},pos_default:function(k){var j=this.settings.$next_tip.find(".joyride-nub"),i=Math.ceil(j.outerWidth()/2),l=Math.ceil(j.outerHeight()/2),f=k||false;if(f){this.settings.$next_tip.css("visibility","hidden");this.settings.$next_tip.show()}if(!/body/i.test(this.settings.$target.selector)){var g=this.settings.tip_settings.tipAdjustmentY?parseInt(this.settings.tip_settings.tipAdjustmentY):0,h=this.settings.tip_settings.tipAdjustmentX?parseInt(this.settings.tip_settings.tipAdjustmentX):0;if(this.bottom()){if(this.rtl){this.settings.$next_tip.css({top:(this.settings.$target.offset().top+l+this.settings.$target.outerHeight()+g),left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()+h})}else{this.settings.$next_tip.css({top:(this.settings.$target.offset().top+l+this.settings.$target.outerHeight()+g),left:this.settings.$target.offset().left+h})}this.nub_position(j,this.settings.tip_settings.nub_position,"top")}else{if(this.top()){if(this.rtl){this.settings.$next_tip.css({top:(this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-l+g),left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()})}else{this.settings.$next_tip.css({top:(this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-l+g),left:this.settings.$target.offset().left+h})}this.nub_position(j,this.settings.tip_settings.nub_position,"bottom")}else{if(this.right()){this.settings.$next_tip.css({top:this.settings.$target.offset().top+g,left:(this.settings.$target.outerWidth()+this.settings.$target.offset().left+i+h)});this.nub_position(j,this.settings.tip_settings.nub_position,"left")}else{if(this.left()){this.settings.$next_tip.css({top:this.settings.$target.offset().top+g,left:(this.settings.$target.offset().left-this.settings.$next_tip.outerWidth()-i+h)});this.nub_position(j,this.settings.tip_settings.nub_position,"right")}}}}if(!this.visible(this.corners(this.settings.$next_tip))&&this.settings.attempts<this.settings.tip_settings.tip_location_pattern.length){j.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left");this.settings.tip_settings.tip_location=this.settings.tip_settings.tip_location_pattern[this.settings.attempts];this.settings.attempts++;this.pos_default()}}else{if(this.settings.$li.length){this.pos_modal(j)}}if(f){this.settings.$next_tip.hide();this.settings.$next_tip.css("visibility","visible")}},pos_phone:function(k){var j=this.settings.$next_tip.outerHeight(),i=this.settings.$next_tip.offset(),h=this.settings.$target.outerHeight(),g=c(".joyride-nub",this.settings.$next_tip),l=Math.ceil(g.outerHeight()/2),f=k||false;g.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left");if(f){this.settings.$next_tip.css("visibility","hidden");this.settings.$next_tip.show()}if(!/body/i.test(this.settings.$target.selector)){if(this.top()){this.settings.$next_tip.offset({top:this.settings.$target.offset().top-j-l});g.addClass("bottom")}else{this.settings.$next_tip.offset({top:this.settings.$target.offset().top+h+l});g.addClass("top")}}else{if(this.settings.$li.length){this.pos_modal(g)}}if(f){this.settings.$next_tip.hide();this.settings.$next_tip.css("visibility","visible")}},pos_modal:function(f){this.center();f.hide();this.show_modal()},show_modal:function(){if(!this.settings.$next_tip.data("closed")){var f=c(".joyride-modal-bg");if(f.length<1){c("body").append(this.settings.template.modal).show()}if(/pop/i.test(this.settings.tip_animation)){f.show()}else{f.fadeIn(this.settings.tip_animation_fade_speed)}}},expose:function(){var g,j,i,k,f,h="expose-"+this.random_str(6);if(arguments.length>0&&arguments[0]instanceof c){i=arguments[0]}else{if(this.settings.$target&&!/body/i.test(this.settings.$target.selector)){i=this.settings.$target}else{return false}}if(i.length<1){if(b.console){console.error("element not valid",i)}return false}g=c(this.settings.template.expose);this.settings.$body.append(g);g.css({top:i.offset().top,left:i.offset().left,width:i.outerWidth(true),height:i.outerHeight(true)});j=c(this.settings.template.expose_cover);k={zIndex:i.css("z-index"),position:i.css("position")};f=i.attr("class")==null?"":i.attr("class");i.css("z-index",parseInt(g.css("z-index"))+1);if(k.position=="static"){i.css("position","relative")}i.data("expose-css",k);i.data("orig-class",f);i.attr("class",f+" "+this.settings.expose_add_class);j.css({top:i.offset().top,left:i.offset().left,width:i.outerWidth(true),height:i.outerHeight(true)});if(this.settings.modal){this.show_modal()}this.settings.$body.append(j);g.addClass(h);j.addClass(h);i.data("expose",h);this.settings.post_expose_callback(this.settings.$li.index(),this.settings.$next_tip,i);this.add_exposed(i)},un_expose:function(){var f,j,h,k,g,i=false;if(arguments.length>0&&arguments[0]instanceof c){j=arguments[0]}else{if(this.settings.$target&&!/body/i.test(this.settings.$target.selector)){j=this.settings.$target}else{return false}}if(j.length<1){if(b.console){console.error("element not valid",j)}return false}f=j.data("expose");h=c("."+f);if(arguments.length>1){i=arguments[1]}if(i===true){c(".joyride-expose-wrapper,.joyride-expose-cover").remove()}else{h.remove()}k=j.data("expose-css");if(k.zIndex=="auto"){j.css("z-index","")}else{j.css("z-index",k.zIndex)}if(k.position!=j.css("position")){if(k.position=="static"){j.css("position","")}else{j.css("position",k.position)}}g=j.data("orig-class");j.attr("class",g);j.removeData("orig-classes");j.removeData("expose");j.removeData("expose-z-index");this.remove_exposed(j)},add_exposed:function(f){this.settings.exposed=this.settings.exposed||[];if(f instanceof c||typeof f==="object"){this.settings.exposed.push(f[0])}else{if(typeof f=="string"){this.settings.exposed.push(f)}}},remove_exposed:function(h){var g,f;if(h instanceof c){g=h[0]}else{if(typeof h=="string"){g=h}}this.settings.exposed=this.settings.exposed||[];f=this.settings.exposed.length;while(f--){if(this.settings.exposed[f]==g){this.settings.exposed.splice(f,1);return}}},center:function(){var f=c(b);this.settings.$next_tip.css({top:(((f.height()-this.settings.$next_tip.outerHeight())/2)+f.scrollTop()),left:(((f.width()-this.settings.$next_tip.outerWidth())/2)+f.scrollLeft())});return true},bottom:function(){return/bottom/i.test(this.settings.tip_settings.tip_location)},top:function(){return/top/i.test(this.settings.tip_settings.tip_location)},right:function(){return/right/i.test(this.settings.tip_settings.tip_location)},left:function(){return/left/i.test(this.settings.tip_settings.tip_location)},corners:function(j){var f=c(b),m=f.height()/2,k=Math.ceil(this.settings.$target.offset().top-m+this.settings.$next_tip.outerHeight()),i=f.width()+f.scrollLeft(),h=f.height()+k,g=f.height()+f.scrollTop(),l=f.scrollTop();if(k<l){if(k<0){l=0}else{l=k}}if(h>g){g=h}return[j.offset().top<l,i<j.offset().left+j.outerWidth(),g<j.offset().top+j.outerHeight(),f.scrollLeft()>j.offset().left]},visible:function(f){var g=f.length;while(g--){if(f[g]){return false}}return true},nub_position:function(f,h,g){if(h==="auto"){f.addClass(g)}else{f.addClass(h)}},startTimer:function(){if(this.settings.$li.length){this.settings.automate=setTimeout(function(){this.hide();this.show();this.startTimer()}.bind(this),this.settings.timer)}else{clearTimeout(this.settings.automate)}},end:function(f){if(this.settings.cookie_monster){c.cookie(this.settings.cookie_name,"ridden",{expires:this.settings.cookie_expires,domain:this.settings.cookie_domain})}if(this.settings.timer>0){clearTimeout(this.settings.automate)}if(this.settings.modal&&this.settings.expose){this.un_expose()}c(this.scope).off("keyup.joyride");this.settings.$next_tip.data("closed",true);this.settings.riding=false;c(".joyride-modal-bg").hide();this.settings.$current_tip.hide();if(typeof f==="undefined"||f===false){this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip);this.settings.post_ride_callback(this.settings.$li.index(),this.settings.$current_tip)}c(".joyride-tip-guide").remove()},off:function(){c(this.scope).off(".joyride");c(b).off(".joyride");c(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride");c(".joyride-tip-guide, .joyride-modal-bg").remove();clearTimeout(this.settings.automate);this.settings={}},reflow:function(){}}}(jQuery,window,window.document));(function(c,b,a,d){Foundation.libs.equalizer={name:"equalizer",version:"5.4.7",settings:{use_tallest:true,before_height_change:c.noop,after_height_change:c.noop,equalize_on_stack:false},init:function(f,g,e){Foundation.inherit(this,"image_loaded");this.bindings(g,e);this.reflow()},events:function(){this.S(b).off(".equalizer").on("resize.fndtn.equalizer",function(f){this.reflow()}.bind(this))},equalize:function(f){var l=false,k=f.find("["+this.attr_name()+"-watch]:visible"),i=f.data(this.attr_name(true)+"-init");if(k.length===0){return}var h=k.first().offset().top;i.before_height_change();f.trigger("before-height-change").trigger("before-height-change.fndth.equalizer");k.height("inherit");k.each(function(){var m=c(this);if(m.offset().top!==h){l=true}});if(i.equalize_on_stack===false){if(l){return}}var j=k.map(function(){return c(this).outerHeight(false)}).get();if(i.use_tallest){var e=Math.max.apply(null,j);k.css("height",e)}else{var g=Math.min.apply(null,j);k.css("height",g)}i.after_height_change();f.trigger("after-height-change").trigger("after-height-change.fndtn.equalizer")},reflow:function(){var e=this;this.S("["+this.attr_name()+"]",this.scope).each(function(){var f=c(this);e.image_loaded(e.S("img",this),function(){e.equalize(f)})})}}})(jQuery,window,window.document);(function(c,b,a,d){Foundation.libs.dropdown={name:"dropdown",version:"5.4.7",settings:{active_class:"open",disabled_class:"disabled",mega_class:"mega",align:"bottom",is_hover:false,opened:function(){},closed:function(){}},init:function(f,g,e){Foundation.inherit(this,"throttle");this.bindings(g,e)},events:function(g){var e=this,f=e.S;f(this.scope).off(".dropdown").on("click.fndtn.dropdown","["+this.attr_name()+"]",function(i){var h=f(this).data(e.attr_name(true)+"-init")||e.settings;if(!h.is_hover||Modernizr.touch){i.preventDefault();e.toggle(c(this))}}).on("mouseenter.fndtn.dropdown","["+this.attr_name()+"], ["+this.attr_name()+"-content]",function(k){var j=f(this),l,i;clearTimeout(e.timeout);if(j.data(e.data_attr())){l=f("#"+j.data(e.data_attr()));i=j}else{l=j;i=f("["+e.attr_name()+"='"+l.attr("id")+"']")}var h=i.data(e.attr_name(true)+"-init")||e.settings;if(f(k.target).data(e.data_attr())&&h.is_hover){e.closeall.call(e)}if(h.is_hover){e.open.apply(e,[l,i])}}).on("mouseleave.fndtn.dropdown","["+this.attr_name()+"], ["+this.attr_name()+"-content]",function(i){var h=f(this);e.timeout=setTimeout(function(){if(h.data(e.data_attr())){var j=h.data(e.data_attr(true)+"-init")||e.settings;if(j.is_hover){e.close.call(e,f("#"+h.data(e.data_attr())))}}else{var k=f("["+e.attr_name()+'="'+f(this).attr("id")+'"]'),j=k.data(e.attr_name(true)+"-init")||e.settings;if(j.is_hover){e.close.call(e,h)}}}.bind(this),150)}).on("click.fndtn.dropdown",function(i){var h=f(i.target).closest("["+e.attr_name()+"-content]");if(f(i.target).closest("["+e.attr_name()+"]").length>0){return}if(!(f(i.target).data("revealId"))&&(h.length>0&&(f(i.target).is("["+e.attr_name()+"-content]")||c.contains(h.first()[0],i.target)))){i.stopPropagation();return}e.close.call(e,f("["+e.attr_name()+"-content]"))}).on("opened.fndtn.dropdown","["+e.attr_name()+"-content]",function(){e.settings.opened.call(this)}).on("closed.fndtn.dropdown","["+e.attr_name()+"-content]",function(){e.settings.closed.call(this)});f(b).off(".dropdown").on("resize.fndtn.dropdown",e.throttle(function(){e.resize.call(e)},50));this.resize()},close:function(f){var e=this;f.each(function(){var g=c("["+e.attr_name()+"="+f[0].id+"]")||c("aria-controls="+f[0].id+"]");g.attr("aria-expanded","false");if(e.S(this).hasClass(e.settings.active_class)){e.S(this).css(Foundation.rtl?"right":"left","-99999px").attr("aria-hidden","true").removeClass(e.settings.active_class).prev("["+e.attr_name()+"]").removeClass(e.settings.active_class).removeData("target");e.S(this).trigger("closed").trigger("closed.fndtn.dropdown",[f])}})},closeall:function(){var e=this;c.each(e.S("["+this.attr_name()+"-content]"),function(){e.close.call(e,e.S(this))})},open:function(f,e){this.css(f.addClass(this.settings.active_class),e);f.prev("["+this.attr_name()+"]").addClass(this.settings.active_class);f.data("target",e.get(0)).trigger("opened").trigger("opened.fndtn.dropdown",[f,e]);f.attr("aria-hidden","false");e.attr("aria-expanded","true");f.focus()},data_attr:function(){if(this.namespace.length>0){return this.namespace+"-"+this.name}return this.name},toggle:function(e){if(e.hasClass(this.settings.disabled_class)){return}var f=this.S("#"+e.data(this.data_attr()));if(f.length===0){return}this.close.call(this,this.S("["+this.attr_name()+"-content]").not(f));if(f.hasClass(this.settings.active_class)){this.close.call(this,f);if(f.data("target")!==e.get(0)){this.open.call(this,f,e)}}else{this.open.call(this,f,e)}},resize:function(){var f=this.S("["+this.attr_name()+"-content].open"),e=this.S("["+this.attr_name()+"='"+f.attr("id")+"']");if(f.length&&e.length){this.css(f,e)}},css:function(i,h){var e=Math.max((h.width()-i.width())/2,8),f=h.data(this.attr_name(true)+"-init")||this.settings;this.clear_idx();if(this.small()){var g=this.dirs.bottom.call(i,h,f);i.attr("style","").removeClass("drop-left drop-right drop-top").css({position:"absolute",width:"95%","max-width":"none",top:g.top});i.css(Foundation.rtl?"right":"left",e)}else{this.style(i,h,f)}return i},style:function(h,g,f){var e=c.extend({position:"absolute"},this.dirs[f.align].call(h,g,f));h.attr("style","").css(e)},dirs:{_base:function(e){var f=this.offsetParent(),h=f.offset(),g=e.offset();g.top-=h.top;g.left-=h.left;return g},top:function(f,g){var e=Foundation.libs.dropdown,h=e.dirs._base.call(this,f);this.addClass("drop-top");if(f.outerWidth()<this.outerWidth()||e.small()||this.hasClass(g.mega_menu)){e.adjust_pip(this,f,g,h)}if(Foundation.rtl){return{left:h.left-this.outerWidth()+f.outerWidth(),top:h.top-this.outerHeight()}}return{left:h.left,top:h.top-this.outerHeight()}},bottom:function(f,g){var e=Foundation.libs.dropdown,h=e.dirs._base.call(this,f);if(f.outerWidth()<this.outerWidth()||e.small()||this.hasClass(g.mega_menu)){e.adjust_pip(this,f,g,h)}if(e.rtl){return{left:h.left-this.outerWidth()+f.outerWidth(),top:h.top+f.outerHeight()}}return{left:h.left,top:h.top+f.outerHeight()}},left:function(e,f){var g=Foundation.libs.dropdown.dirs._base.call(this,e);this.addClass("drop-left");return{left:g.left-this.outerWidth(),top:g.top}},right:function(e,f){var g=Foundation.libs.dropdown.dirs._base.call(this,e);this.addClass("drop-right");return{left:g.left+e.outerWidth(),top:g.top}}},adjust_pip:function(n,i,f,g){var j=Foundation.stylesheet,m=8;if(n.hasClass(f.mega_class)){m=g.left+(i.outerWidth()/2)-8}else{if(this.small()){m+=g.left-8}}this.rule_idx=j.cssRules.length;var l=".f-dropdown.open:before",h=".f-dropdown.open:after",e="left: "+m+"px;",k="left: "+(m-1)+"px;";if(j.insertRule){j.insertRule([l,"{",e,"}"].join(" "),this.rule_idx);j.insertRule([h,"{",k,"}"].join(" "),this.rule_idx+1)}else{j.addRule(l,e,this.rule_idx);j.addRule(h,k,this.rule_idx+1)}},clear_idx:function(){var e=Foundation.stylesheet;if(typeof this.rule_idx!=="undefined"){e.deleteRule(this.rule_idx);e.deleteRule(this.rule_idx);delete this.rule_idx}},small:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},off:function(){this.S(this.scope).off(".fndtn.dropdown");this.S("html, body").off(".fndtn.dropdown");this.S(b).off(".fndtn.dropdown");this.S("[data-dropdown-content]").off(".fndtn.dropdown")},reflow:function(){}}}(jQuery,window,window.document));(function(c,b,a,d){Foundation.libs.clearing={name:"clearing",version:"5.4.7",settings:{templates:{viewing:'<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" /><p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a><a href="#" class="clearing-main-next"><span></span></a></div>'},close_selectors:".clearing-close, div.clearing-blackout",open_selectors:"",skip_selector:"",touch_label:"",init:false,locked:false},init:function(g,h,f){var e=this;Foundation.inherit(this,"throttle image_loaded");this.bindings(h,f);if(e.S(this.scope).is("["+this.attr_name()+"]")){this.assemble(e.S("li",this.scope))}else{e.S("["+this.attr_name()+"]",this.scope).each(function(){e.assemble(e.S("li",this))})}},events:function(g){var e=this,f=e.S,h=c(".scroll-container");if(h.length>0){this.scope=h}f(this.scope).off(".clearing").on("click.fndtn.clearing","ul["+this.attr_name()+"] li "+this.settings.open_selectors,function(n,m,l){var m=m||f(this),l=l||m,j=m.next("li"),i=m.closest("["+e.attr_name()+"]").data(e.attr_name(true)+"-init"),k=f(n.target);n.preventDefault();if(!i){e.init();i=m.closest("["+e.attr_name()+"]").data(e.attr_name(true)+"-init")}if(l.hasClass("visible")&&m[0]===l[0]&&j.length>0&&e.is_open(m)){l=j;k=f("img",l)}e.open(k,m,l);e.update_paddles(l)}).on("click.fndtn.clearing",".clearing-main-next",function(i){e.nav(i,"next")}).on("click.fndtn.clearing",".clearing-main-prev",function(i){e.nav(i,"prev")}).on("click.fndtn.clearing",this.settings.close_selectors,function(i){Foundation.libs.clearing.close(i,this)});c(a).on("keydown.fndtn.clearing",function(i){e.keydown(i)});f(b).off(".clearing").on("resize.fndtn.clearing",function(){e.resize()});this.swipe_events(g)},swipe_events:function(g){var e=this,f=e.S;f(this.scope).on("touchstart.fndtn.clearing",".visible-img",function(i){if(!i.touches){i=i.originalEvent}var h={start_page_x:i.touches[0].pageX,start_page_y:i.touches[0].pageY,start_time:(new Date()).getTime(),delta_x:0,is_scrolling:d};f(this).data("swipe-transition",h);i.stopPropagation()}).on("touchmove.fndtn.clearing",".visible-img",function(j){if(!j.touches){j=j.originalEvent}if(j.touches.length>1||j.scale&&j.scale!==1){return}var h=f(this).data("swipe-transition");if(typeof h==="undefined"){h={}}h.delta_x=j.touches[0].pageX-h.start_page_x;if(Foundation.rtl){h.delta_x=-h.delta_x}if(typeof h.is_scrolling==="undefined"){h.is_scrolling=!!(h.is_scrolling||Math.abs(h.delta_x)<Math.abs(j.touches[0].pageY-h.start_page_y))}if(!h.is_scrolling&&!h.active){j.preventDefault();var i=(h.delta_x<0)?"next":"prev";h.active=true;e.nav(j,i)}}).on("touchend.fndtn.clearing",".visible-img",function(h){f(this).data("swipe-transition",{});h.stopPropagation()})},assemble:function(j){var m=j.parent();if(m.parent().hasClass("carousel")){return}m.after('<div id="foundationClearingHolder"></div>');var e=m.detach(),l="";if(e[0]==null){return}else{l=e[0].outerHTML}var k=this.S("#foundationClearingHolder"),h=m.data(this.attr_name(true)+"-init"),i={grid:'<div class="carousel">'+l+"</div>",viewing:h.templates.viewing},f='<div class="clearing-assembled"><div>'+i.viewing+i.grid+"</div></div>",g=this.settings.touch_label;if(Modernizr.touch){f=c(f).find(".clearing-touch-label").html(g).end()}k.after(f).remove()},open:function(f,k,l){var q=this,j=c(a.body),n=l.closest(".clearing-assembled"),e=q.S("div",n).first(),i=q.S(".visible-img",e),h=q.S("img",i).not(f),p=q.S(".clearing-touch-label",e),m=false;c("body").on("touchmove",function(r){r.preventDefault()});h.error(function(){m=true});function o(){setTimeout(function(){this.image_loaded(h,function(){if(h.outerWidth()===1&&!m){o.call(this)}else{g.call(this,h)}}.bind(this))}.bind(this),100)}function g(s){var r=c(s);r.css("visibility","visible");j.css("overflow","hidden");n.addClass("clearing-blackout");e.addClass("clearing-container");i.show();this.fix_height(l).caption(q.S(".clearing-caption",i),q.S("img",l)).center_and_label(s,p).shift(k,l,function(){l.closest("li").siblings().removeClass("visible");l.closest("li").addClass("visible")});i.trigger("opened.fndtn.clearing")}if(!this.locked()){i.trigger("open.fndtn.clearing");h.attr("src",this.load(f)).css("visibility","hidden");o.call(this)}},close:function(k,j){k.preventDefault();var h=(function(e){if(/blackout/.test(e.selector)){return e}else{return e.closest(".clearing-blackout")}}(c(j))),f=c(a.body),g,i;if(j===k.target&&h){f.css("overflow","");g=c("div",h).first();i=c(".visible-img",g);i.trigger("close.fndtn.clearing");this.settings.prev_index=0;c("ul["+this.attr_name()+"]",h).attr("style","").closest(".clearing-blackout").removeClass("clearing-blackout");g.removeClass("clearing-container");i.hide();i.trigger("closed.fndtn.clearing")}c("body").off("touchmove");return false},is_open:function(e){return e.parent().prop("style").length>0},keydown:function(j){var i=c(".clearing-blackout ul["+this.attr_name()+"]"),h=this.rtl?37:39,g=this.rtl?39:37,f=27;if(j.which===h){this.go(i,"next")}if(j.which===g){this.go(i,"prev")}if(j.which===f){this.S("a.clearing-close").trigger("click").trigger("click.fndtn.clearing")}},nav:function(h,g){var f=c("ul["+this.attr_name()+"]",".clearing-blackout");h.preventDefault();this.go(f,g)},resize:function(){var f=c("img",".clearing-blackout .visible-img"),e=c(".clearing-touch-label",".clearing-blackout");if(f.length){this.center_and_label(f,e);f.trigger("resized.fndtn.clearing")}},fix_height:function(g){var f=g.parent().children(),e=this;f.each(function(){var h=e.S(this),i=h.find("img");if(h.height()>i.outerHeight()){h.addClass("fix-height")}}).closest("ul").width(f.length*100+"%");return this},update_paddles:function(f){f=f.closest("li");var e=f.closest(".carousel").siblings(".visible-img");if(f.next().length>0){this.S(".clearing-main-next",e).removeClass("disabled")}else{this.S(".clearing-main-next",e).addClass("disabled")}if(f.prev().length>0){this.S(".clearing-main-prev",e).removeClass("disabled")}else{this.S(".clearing-main-prev",e).addClass("disabled")}},center_and_label:function(f,e){if(!this.rtl){f.css({marginLeft:-(f.outerWidth()/2),marginTop:-(f.outerHeight()/2)});if(e.length>0){e.css({marginLeft:-(e.outerWidth()/2),marginTop:-(f.outerHeight()/2)-e.outerHeight()-10})}}else{f.css({marginRight:-(f.outerWidth()/2),marginTop:-(f.outerHeight()/2),left:"auto",right:"50%"});if(e.length>0){e.css({marginRight:-(e.outerWidth()/2),marginTop:-(f.outerHeight()/2)-e.outerHeight()-10,left:"auto",right:"50%"})}}return this},load:function(f){var e;if(f[0].nodeName==="A"){e=f.attr("href")}else{e=f.parent().attr("href")}this.preload(f);if(e){return e}return f.attr("src")},preload:function(e){this.img(e.closest("li").next()).img(e.closest("li").prev())},img:function(e){if(e.length){var f=new Image(),g=this.S("a",e);if(g.length){f.src=g.attr("href")}else{f.src=this.S("img",e).attr("src")}}return this},caption:function(e,g){var f=g.attr("data-caption");if(f){e.html(f).show()}else{e.text("").hide()}return this},go:function(e,h){var g=this.S(".visible",e),f=g[h]();if(this.settings.skip_selector&&f.find(this.settings.skip_selector).length!=0){f=f[h]()}if(f.length){this.S("img",f).trigger("click",[g,f]).trigger("click.fndtn.clearing",[g,f]).trigger("change.fndtn.clearing")}},shift:function(j,k,o){var l=k.parent(),i=this.settings.prev_index||k.index(),m=this.direction(l,j,k),h=this.rtl?"right":"left",g=parseInt(l.css("left"),10),f=k.outerWidth(),n;var e={};if(k.index()!==i&&!/skip/.test(m)){if(/left/.test(m)){this.lock();e[h]=g+f;l.animate(e,300,this.unlock())}else{if(/right/.test(m)){this.lock();e[h]=g-f;l.animate(e,300,this.unlock())}}}else{if(/skip/.test(m)){n=k.index()-this.settings.up_count;this.lock();if(n>0){e[h]=-(n*f);l.animate(e,300,this.unlock())}else{e[h]=0;l.animate(e,300,this.unlock())}}}o()},direction:function(h,j,i){var g=this.S("li",h),f=g.outerWidth()+(g.outerWidth()/4),k=Math.floor(this.S(".clearing-container").outerWidth()/f)-1,l=g.index(i),e;this.settings.up_count=k;if(this.adjacent(this.settings.prev_index,l)){if((l>k)&&l>this.settings.prev_index){e="right"}else{if((l>k-1)&&l<=this.settings.prev_index){e="left"}else{e=false}}}else{e="skip"}this.settings.prev_index=l;return e},adjacent:function(g,f){for(var e=f+1;e>=f-1;e--){if(e===g){return true}}return false},lock:function(){this.settings.locked=true},unlock:function(){this.settings.locked=false},locked:function(){return this.settings.locked},off:function(){this.S(this.scope).off(".fndtn.clearing");this.S(b).off(".fndtn.clearing")},reflow:function(){this.init()}}}(jQuery,window,window.document));(function(c,f,g,b){var i=function(){};var a=function(o,p){if(o.hasClass(p.slides_container_class)){return this}var u=this,k,j=o,v,t,n,s=0,m,l,q=false,r=false;u.slides=function(){return j.children(p.slide_selector)};u.slides().first().addClass(p.active_slide_class);u.update_slide_number=function(w){if(p.slide_number){v.find("span:first").text(parseInt(w)+1);v.find("span:last").text(u.slides().length)}if(p.bullets){t.children().removeClass(p.bullets_active_class);c(t.children().get(w)).addClass(p.bullets_active_class)}};u.update_active_link=function(w){var x=c('[data-orbit-link="'+u.slides().eq(w).attr("data-orbit-slide")+'"]');x.siblings().removeClass(p.bullets_active_class);x.addClass(p.bullets_active_class)};u.build_markup=function(){j.wrap('<div class="'+p.container_class+'"></div>');k=j.parent();j.addClass(p.slides_container_class);if(p.stack_on_small){k.addClass(p.stack_on_small_class)}if(p.navigation_arrows){k.append(c('<a href="#"><span></span></a>').addClass(p.prev_class));k.append(c('<a href="#"><span></span></a>').addClass(p.next_class))}if(p.timer){n=c("<div>").addClass(p.timer_container_class);n.append("<span>");n.append(c("<div>").addClass(p.timer_progress_class));n.addClass(p.timer_paused_class);k.append(n)}if(p.slide_number){v=c("<div>").addClass(p.slide_number_class);v.append("<span></span> "+p.slide_number_text+" <span></span>");k.append(v)}if(p.bullets){t=c("<ol>").addClass(p.bullets_container_class);k.append(t);t.wrap('<div class="orbit-bullets-container"></div>');u.slides().each(function(w,y){var x=c("<li>").attr("data-orbit-slide",w).on("click",u.link_bullet);t.append(x)})}};u._goto=function(C,B){if(C===s){return false}if(typeof l==="object"){l.restart()}var z=u.slides();var x="next";q=true;if(C<s){x="prev"}if(C>=z.length){if(!p.circular){return false}C=0}else{if(C<0){if(!p.circular){return false}C=z.length-1}}var A=c(z.get(s));var y=c(z.get(C));A.css("zIndex",2);A.removeClass(p.active_slide_class);y.css("zIndex",4).addClass(p.active_slide_class);j.trigger("before-slide-change.fndtn.orbit");p.before_slide_change();u.update_active_link(C);var D=function(){var E=function(){s=C;q=false;if(B===true){l=u.create_timer();l.start()}u.update_slide_number(s);j.trigger("after-slide-change.fndtn.orbit",[{slide_number:s,total_slides:z.length}]);p.after_slide_change(s,z.length)};if(j.height()!=y.height()&&p.variable_height){j.animate({height:y.height()},250,"linear",E)}else{E()}};if(z.length===1){D();return false}var w=function(){if(x==="next"){m.next(A,y,D)}if(x==="prev"){m.prev(A,y,D)}};if(y.height()>j.height()&&p.variable_height){j.animate({height:y.height()},250,"linear",w)}else{w()}};u.next=function(w){w.stopImmediatePropagation();w.preventDefault();u._goto(s+1)};u.prev=function(w){w.stopImmediatePropagation();w.preventDefault();u._goto(s-1)};u.link_custom=function(y){y.preventDefault();var x=c(this).attr("data-orbit-link");if((typeof x==="string")&&(x=c.trim(x))!=""){var w=k.find("[data-orbit-slide="+x+"]");if(w.index()!=-1){u._goto(w.index())}}};u.link_bullet=function(y){var x=c(this).attr("data-orbit-slide");if((typeof x==="string")&&(x=c.trim(x))!=""){if(isNaN(parseInt(x))){var w=k.find("[data-orbit-slide="+x+"]");if(w.index()!=-1){u._goto(w.index()+1)}}else{u._goto(parseInt(x))}}};u.timer_callback=function(){u._goto(s+1,true)};u.compute_dimensions=function(){var x=c(u.slides().get(s));var w=x.height();if(!p.variable_height){u.slides().each(function(){if(c(this).height()>w){w=c(this).height()}})}j.height(w)};u.create_timer=function(){var w=new h(k.find("."+p.timer_container_class),p,u.timer_callback);return w};u.stop_timer=function(){if(typeof l==="object"){l.stop()}};u.toggle_timer=function(){var w=k.find("."+p.timer_container_class);if(w.hasClass(p.timer_paused_class)){if(typeof l==="undefined"){l=u.create_timer()}l.start()}else{if(typeof l==="object"){l.stop()}}};u.init=function(){u.build_markup();if(p.timer){l=u.create_timer();Foundation.utils.image_loaded(this.slides().children("img"),l.start)}m=new e(p,j);if(p.animation==="slide"){m=new d(p,j)}k.on("click","."+p.next_class,u.next);k.on("click","."+p.prev_class,u.prev);if(p.next_on_click){k.on("click","."+p.slides_container_class+" [data-orbit-slide]",u.link_bullet)}k.on("click",u.toggle_timer);if(p.swipe){k.on("touchstart.fndtn.orbit",function(x){if(!x.touches){x=x.originalEvent}var w={start_page_x:x.touches[0].pageX,start_page_y:x.touches[0].pageY,start_time:(new Date()).getTime(),delta_x:0,is_scrolling:b};k.data("swipe-transition",w);x.stopPropagation()}).on("touchmove.fndtn.orbit",function(y){if(!y.touches){y=y.originalEvent}if(y.touches.length>1||y.scale&&y.scale!==1){return}var w=k.data("swipe-transition");if(typeof w==="undefined"){w={}}w.delta_x=y.touches[0].pageX-w.start_page_x;if(typeof w.is_scrolling==="undefined"){w.is_scrolling=!!(w.is_scrolling||Math.abs(w.delta_x)<Math.abs(y.touches[0].pageY-w.start_page_y))}if(!w.is_scrolling&&!w.active){y.preventDefault();var x=(w.delta_x<0)?(s+1):(s-1);w.active=true;u._goto(x)}}).on("touchend.fndtn.orbit",function(w){k.data("swipe-transition",{});w.stopPropagation()})}k.on("mouseenter.fndtn.orbit",function(w){if(p.timer&&p.pause_on_hover){u.stop_timer()}}).on("mouseleave.fndtn.orbit",function(w){if(p.timer&&p.resume_on_mouseout){l.start()}});c(g).on("click","[data-orbit-link]",u.link_custom);c(f).on("load resize",u.compute_dimensions);Foundation.utils.image_loaded(this.slides().children("img"),u.compute_dimensions);Foundation.utils.image_loaded(this.slides().children("img"),function(){k.prev("."+p.preloader_class).css("display","none");u.update_slide_number(0);u.update_active_link(0);j.trigger("ready.fndtn.orbit")})};u.init()};var h=function(l,n,q){var r=this,o=n.timer_speed,j=l.find("."+n.timer_progress_class),k,p,m=-1;this.update_progress=function(s){var t=j.clone();t.attr("style","");t.css("width",s+"%");j.replaceWith(t);j=t};this.restart=function(){clearTimeout(p);l.addClass(n.timer_paused_class);m=-1;r.update_progress(0)};this.start=function(){if(!l.hasClass(n.timer_paused_class)){return true}m=(m===-1)?o:m;l.removeClass(n.timer_paused_class);k=new Date().getTime();j.animate({width:"100%"},m,"linear");p=setTimeout(function(){r.restart();q()},m);l.trigger("timer-started.fndtn.orbit")};this.stop=function(){if(l.hasClass(n.timer_paused_class)){return true}clearTimeout(p);l.addClass(n.timer_paused_class);var t=new Date().getTime();m=m-(t-k);var s=100-((m/o)*100);r.update_progress(s);l.trigger("timer-stopped.fndtn.orbit")}};var d=function(m,j){var o=m.animation_speed;var l=(c("html[dir=rtl]").length===1);var n=l?"marginRight":"marginLeft";var k={};k[n]="0%";this.next=function(q,p,r){q.animate({marginLeft:"-100%"},o);p.animate(k,o,function(){q.css(n,"100%");r()})};this.prev=function(q,p,r){q.animate({marginLeft:"100%"},o);p.css(n,"-100%");p.animate(k,o,function(){q.css(n,"100%");r()})}};var e=function(l,j){var n=l.animation_speed;var k=(c("html[dir=rtl]").length===1);var m=k?"marginRight":"marginLeft";this.next=function(p,o,q){o.css({margin:"0%",opacity:"0.01"});o.animate({opacity:"1"},n,"linear",function(){p.css("margin","100%");q()})};this.prev=function(p,o,q){o.css({margin:"0%",opacity:"0.01"});o.animate({opacity:"1"},n,"linear",function(){p.css("margin","100%");q()})}};Foundation.libs=Foundation.libs||{};Foundation.libs.orbit={name:"orbit",version:"5.4.7",settings:{animation:"slide",timer_speed:10000,pause_on_hover:true,resume_on_mouseout:false,next_on_click:true,animation_speed:500,stack_on_small:false,navigation_arrows:true,slide_number:true,slide_number_text:"of",container_class:"orbit-container",stack_on_small_class:"orbit-stack-on-small",next_class:"orbit-next",prev_class:"orbit-prev",timer_container_class:"orbit-timer",timer_paused_class:"paused",timer_progress_class:"orbit-progress",slides_container_class:"orbit-slides-container",preloader_class:"preloader",slide_selector:"*",bullets_container_class:"orbit-bullets",bullets_active_class:"active",slide_number_class:"orbit-slide-number",caption_class:"orbit-caption",active_slide_class:"active",orbit_transition_class:"orbit-transitioning",bullets:true,circular:true,timer:true,variable_height:false,swipe:true,before_slide_change:i,after_slide_change:i},init:function(l,m,k){var j=this;this.bindings(m,k)},events:function(j){var k=new a(this.S(j),this.S(j).data("orbit-init"));this.S(j).data(this.name+"-instance",k)},reflow:function(){var k=this;if(k.S(k.scope).is("[data-orbit]")){var l=k.S(k.scope);var j=l.data(k.name+"-instance");j.compute_dimensions()}else{k.S("[data-orbit]",k.scope).each(function(n,p){var o=k.S(p);var q=k.data_options(o);var m=o.data(k.name+"-instance");m.compute_dimensions()})}}}}(jQuery,window,window.document));(function(c,b,a,d){Foundation.libs.offcanvas={name:"offcanvas",version:"5.4.7",settings:{open_method:"move",close_on_click:false},init:function(f,g,e){this.bindings(g,e)},events:function(){var f=this,h=f.S,g="",i="",e="";if(this.settings.open_method==="move"){g="move-";i="right";e="left"}else{if(this.settings.open_method==="overlap_single"){g="offcanvas-overlap-";i="right";e="left"}else{if(this.settings.open_method==="overlap"){g="offcanvas-overlap"}}}h(this.scope).off(".offcanvas").on("click.fndtn.offcanvas",".left-off-canvas-toggle",function(j){f.click_toggle_class(j,g+i);if(f.settings.open_method!=="overlap"){h(".left-submenu").removeClass(g+i)}c(".left-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".left-off-canvas-menu a",function(l){var k=f.get_settings(l);var j=h(this).parent();if(k.close_on_click&&!j.hasClass("has-submenu")&&!j.hasClass("back")){f.hide.call(f,g+i,f.get_wrapper(l));j.parent().removeClass(g+i)}else{if(h(this).parent().hasClass("has-submenu")){l.preventDefault();h(this).siblings(".left-submenu").toggleClass(g+i)}else{if(j.hasClass("back")){l.preventDefault();j.parent().removeClass(g+i)}}}c(".left-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".right-off-canvas-toggle",function(j){f.click_toggle_class(j,g+e);if(f.settings.open_method!=="overlap"){h(".right-submenu").removeClass(g+e)}c(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".right-off-canvas-menu a",function(l){var k=f.get_settings(l);var j=h(this).parent();if(k.close_on_click&&!j.hasClass("has-submenu")&&!j.hasClass("back")){f.hide.call(f,g+e,f.get_wrapper(l));j.parent().removeClass(g+e)}else{if(h(this).parent().hasClass("has-submenu")){l.preventDefault();h(this).siblings(".right-submenu").toggleClass(g+e)}else{if(j.hasClass("back")){l.preventDefault();j.parent().removeClass(g+e)}}}c(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".exit-off-canvas",function(j){f.click_remove_class(j,g+e);h(".right-submenu").removeClass(g+e);if(i){f.click_remove_class(j,g+i);h(".left-submenu").removeClass(g+e)}c(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".exit-off-canvas",function(j){f.click_remove_class(j,g+e);c(".left-off-canvas-toggle").attr("aria-expanded","false");if(i){f.click_remove_class(j,g+i);c(".right-off-canvas-toggle").attr("aria-expanded","false")}})},toggle:function(f,e){e=e||this.get_wrapper();if(e.is("."+f)){this.hide(f,e)}else{this.show(f,e)}},show:function(f,e){e=e||this.get_wrapper();e.trigger("open").trigger("open.fndtn.offcanvas");e.addClass(f)},hide:function(f,e){e=e||this.get_wrapper();e.trigger("close").trigger("close.fndtn.offcanvas");e.removeClass(f)},click_toggle_class:function(h,g){h.preventDefault();var f=this.get_wrapper(h);this.toggle(g,f)},click_remove_class:function(h,g){h.preventDefault();var f=this.get_wrapper(h);this.hide(g,f)},get_settings:function(g){var f=this.S(g.target).closest("["+this.attr_name()+"]");return f.data(this.attr_name(true)+"-init")||this.settings},get_wrapper:function(g){var f=this.S(g?g.target:this.scope).closest(".off-canvas-wrap");if(f.length===0){f=this.S(".off-canvas-wrap")}return f},reflow:function(){}}}(jQuery,window,window.document));(function(c,b,a,d){Foundation.libs.alert={name:"alert",version:"5.4.7",settings:{callback:function(){}},init:function(f,g,e){this.bindings(g,e)},events:function(){var e=this,f=this.S;c(this.scope).off(".alert").on("click.fndtn.alert","["+this.attr_name()+"] .close",function(i){var g=f(this).closest("["+e.attr_name()+"]"),h=g.data(e.attr_name(true)+"-init")||e.settings;i.preventDefault();if(Modernizr.csstransitions){g.addClass("alert-close");g.on("transitionend webkitTransitionEnd oTransitionEnd",function(j){f(this).trigger("close").trigger("close.fndtn.alert").remove();h.callback()})}else{g.fadeOut(300,function(){f(this).trigger("close").trigger("close.fndtn.alert").remove();h.callback()})}})},reflow:function(){}}}(jQuery,window,window.document));(function(d,c,a,e){Foundation.libs.reveal={name:"reveal",version:"5.4.7",locked:false,settings:{animation:"fadeAndPop",animation_speed:250,close_on_background_click:true,close_on_esc:true,dismiss_modal_class:"close-reveal-modal",bg_class:"reveal-modal-bg",root_element:"body",open:function(){},opened:function(){},close:function(){},closed:function(){},bg:d(".reveal-modal-bg"),css:{open:{opacity:0,visibility:"visible",display:"block"},close:{opacity:1,visibility:"hidden",display:"none"}}},init:function(g,h,f){d.extend(true,this.settings,h,f);this.bindings(h,f)},events:function(h){var f=this,g=f.S;g(this.scope).off(".reveal").on("click.fndtn.reveal","["+this.add_namespace("data-reveal-id")+"]:not([disabled])",function(l){l.preventDefault();if(!f.locked){var j=g(this),k=j.data(f.data_attr("reveal-ajax"));f.locked=true;if(typeof k==="undefined"){f.open.call(f,j)}else{var i=k===true?j.attr("href"):k;f.open.call(f,j,{url:i})}}});g(a).on("click.fndtn.reveal",this.close_targets(),function(j){j.preventDefault();if(!f.locked){var i=g("["+f.attr_name()+"].open").data(f.attr_name(true)+"-init")||f.settings,k=g(j.target)[0]===g("."+i.bg_class)[0];if(k){if(i.close_on_background_click){j.stopPropagation()}else{return}}f.locked=true;f.close.call(f,k?g("["+f.attr_name()+"].open"):g(this).closest("["+f.attr_name()+"]"))}});if(g("["+f.attr_name()+"]",this.scope).length>0){g(this.scope).on("open.fndtn.reveal",this.settings.open).on("opened.fndtn.reveal",this.settings.opened).on("opened.fndtn.reveal",this.open_video).on("close.fndtn.reveal",this.settings.close).on("closed.fndtn.reveal",this.settings.closed).on("closed.fndtn.reveal",this.close_video)}else{g(this.scope).on("open.fndtn.reveal","["+f.attr_name()+"]",this.settings.open).on("opened.fndtn.reveal","["+f.attr_name()+"]",this.settings.opened).on("opened.fndtn.reveal","["+f.attr_name()+"]",this.open_video).on("close.fndtn.reveal","["+f.attr_name()+"]",this.settings.close).on("closed.fndtn.reveal","["+f.attr_name()+"]",this.settings.closed).on("closed.fndtn.reveal","["+f.attr_name()+"]",this.close_video)}return true},key_up_on:function(g){var f=this;f.S("body").off("keyup.fndtn.reveal").on("keyup.fndtn.reveal",function(j){var h=f.S("["+f.attr_name()+"].open"),i=h.data(f.attr_name(true)+"-init")||f.settings;if(i&&j.which===27&&i.close_on_esc&&!f.locked){f.close.call(f,h)}});return true},key_up_off:function(f){this.S("body").off("keyup.fndtn.reveal");return true},open:function(j,k){var g=this,i;if(j){if(typeof j.selector!=="undefined"){i=g.S("#"+j.data(g.data_attr("reveal-id"))).first()}else{i=g.S(this.scope);k=j}}else{i=g.S(this.scope)}var h=i.data(g.attr_name(true)+"-init");h=h||this.settings;if(i.hasClass("open")&&j.attr("data-reveal-id")==i.attr("id")){return g.close(i)}if(!i.hasClass("open")){var f=g.S("["+g.attr_name()+"].open");if(typeof i.data("css-top")==="undefined"){i.data("css-top",parseInt(i.css("top"),10)).data("offset",this.cache_offset(i))}this.key_up_on(i);i.trigger("open").trigger("open.fndtn.reveal");if(f.length<1){this.toggle_bg(i,true)}if(typeof k==="string"){k={url:k}}if(typeof k==="undefined"||!k.url){if(f.length>0){this.hide(f,h.css.close)}this.show(i,h.css.open)}else{var l=typeof k.success!=="undefined"?k.success:null;d.extend(k,{success:function(n,o,m){if(d.isFunction(l)){l(n,o,m)}i.html(n);g.S(i).foundation("section","reflow");g.S(i).children().foundation();if(f.length>0){g.hide(f,h.css.close)}g.show(i,h.css.open)}});d.ajax(k)}}g.S(c).trigger("resize")},close:function(h){var h=h&&h.length?h:this.S(this.scope),g=this.S("["+this.attr_name()+"].open"),f=h.data(this.attr_name(true)+"-init")||this.settings;if(g.length>0){this.locked=true;this.key_up_off(h);h.trigger("close").trigger("close.fndtn.reveal");this.toggle_bg(h,false);this.hide(g,f.css.close,f)}},close_targets:function(){var f="."+this.settings.dismiss_modal_class;if(this.settings.close_on_background_click){return f+", ."+this.settings.bg_class}return f},toggle_bg:function(f,g){if(this.S("."+this.settings.bg_class).length===0){this.settings.bg=d("<div />",{"class":this.settings.bg_class}).appendTo("body").hide()}var h=this.settings.bg.filter(":visible").length>0;if(g!=h){if(g==e?h:!g){this.hide(this.settings.bg)}else{this.show(this.settings.bg)}}},show:function(k,i){if(i){var j=k.data(this.attr_name(true)+"-init")||this.settings,h=j.root_element;if(k.parent(h).length===0){var l=k.wrap('<div style="display: none;" />').parent();k.on("closed.fndtn.reveal.wrapped",function(){k.detach().appendTo(l);k.unwrap().unbind("closed.fndtn.reveal.wrapped")});k.detach().appendTo(h)}var g=b(j.animation);if(!g.animate){this.locked=false}if(g.pop){i.top=d(c).scrollTop()-k.data("offset")+"px";var f={top:d(c).scrollTop()+k.data("css-top")+"px",opacity:1};return setTimeout(function(){return k.css(i).animate(f,j.animation_speed,"linear",function(){this.locked=false;k.trigger("opened").trigger("opened.fndtn.reveal")}.bind(this)).addClass("open")}.bind(this),j.animation_speed/2)}if(g.fade){i.top=d(c).scrollTop()+k.data("css-top")+"px";var f={opacity:1};return setTimeout(function(){return k.css(i).animate(f,j.animation_speed,"linear",function(){this.locked=false;k.trigger("opened").trigger("opened.fndtn.reveal")}.bind(this)).addClass("open")}.bind(this),j.animation_speed/2)}return k.css(i).show().css({opacity:1}).addClass("open").trigger("opened").trigger("opened.fndtn.reveal")}var j=this.settings;if(b(j.animation).fade){return k.fadeIn(j.animation_speed/2)}this.locked=false;return k.show()},hide:function(j,h){if(h){var i=j.data(this.attr_name(true)+"-init");i=i||this.settings;var g=b(i.animation);if(!g.animate){this.locked=false}if(g.pop){var f={top:-d(c).scrollTop()-j.data("offset")+"px",opacity:0};return setTimeout(function(){return j.animate(f,i.animation_speed,"linear",function(){this.locked=false;j.css(h).trigger("closed").trigger("closed.fndtn.reveal")}.bind(this)).removeClass("open")}.bind(this),i.animation_speed/2)}if(g.fade){var f={opacity:0};return setTimeout(function(){return j.animate(f,i.animation_speed,"linear",function(){this.locked=false;j.css(h).trigger("closed").trigger("closed.fndtn.reveal")}.bind(this)).removeClass("open")}.bind(this),i.animation_speed/2)}return j.hide().css(h).removeClass("open").trigger("closed").trigger("closed.fndtn.reveal")}var i=this.settings;if(b(i.animation).fade){return j.fadeOut(i.animation_speed/2)}return j.hide()},close_video:function(h){var g=d(".flex-video",h.target),f=d("iframe",g);if(f.length>0){f.attr("data-src",f[0].src);f.attr("src",f.attr("src"));g.hide()}},open_video:function(h){var g=d(".flex-video",h.target),f=g.find("iframe");if(f.length>0){var j=f.attr("data-src");if(typeof j==="string"){f[0].src=f.attr("data-src")}else{var i=f[0].src;f[0].src=e;f[0].src=i}g.show()}},data_attr:function(f){if(this.namespace.length>0){return this.namespace+"-"+f}return f},cache_offset:function(f){var g=f.show().height()+parseInt(f.css("top"),10);f.hide();return g},off:function(){d(this.scope).off(".fndtn.reveal")},reflow:function(){}};function b(h){var g=/fade/i.test(h);var f=/pop/i.test(h);return{animate:g||f,pop:f,fade:g}}}(jQuery,window,window.document));(function(c,b,a,d){Foundation.libs.interchange={name:"interchange",version:"5.4.7",cache:{},images_loaded:false,nodes_loaded:false,settings:{load_attr:"interchange",named_queries:{"default":"only screen",small:Foundation.media_queries.small,medium:Foundation.media_queries.medium,large:Foundation.media_queries.large,xlarge:Foundation.media_queries.xlarge,xxlarge:Foundation.media_queries.xxlarge,landscape:"only screen and (orientation: landscape)",portrait:"only screen and (orientation: portrait)",retina:"only screen and (-webkit-min-device-pixel-ratio: 2),only screen and (min--moz-device-pixel-ratio: 2),only screen and (-o-min-device-pixel-ratio: 2/1),only screen and (min-device-pixel-ratio: 2),only screen and (min-resolution: 192dpi),only screen and (min-resolution: 2dppx)"},directives:{replace:function(h,j,f){if(/IMG/.test(h[0].nodeName)){var g=h[0].src;if(new RegExp(j,"i").test(g)){return}h[0].src=j;return f(h[0].src)}var i=h.data(this.data_attr+"-last-path"),e=this;if(i==j){return}if(/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i.test(j)){c(h).css("background-image","url("+j+")");h.data("interchange-last-path",j);return f(j)}return c.get(j,function(k){h.html(k);h.data(e.data_attr+"-last-path",j);f()})}}},init:function(f,g,e){Foundation.inherit(this,"throttle random_str");this.data_attr=this.set_data_attr();c.extend(true,this.settings,g,e);this.bindings(g,e);this.load("images");this.load("nodes")},get_media_hash:function(){var e="";for(var f in this.settings.named_queries){e+=matchMedia(this.settings.named_queries[f]).matches.toString()}return e},events:function(){var f=this,e;c(b).off(".interchange").on("resize.fndtn.interchange",f.throttle(function(){var g=f.get_media_hash();if(g!==e){f.resize()}e=g},50));return this},resize:function(){var e=this.cache;if(!this.images_loaded||!this.nodes_loaded){setTimeout(c.proxy(this.resize,this),50);return}for(var f in e){if(e.hasOwnProperty(f)){var g=this.results(f,e[f]);if(g){this.settings.directives[g.scenario[1]].call(this,g.el,g.scenario[0],function(){if(arguments[0]instanceof Array){var h=arguments[0]}else{var h=Array.prototype.slice.call(arguments,0)}g.el.trigger(g.scenario[1],h)})}}}},results:function(g,j){var h=j.length;if(h>0){var f=this.S("["+this.add_namespace("data-uuid")+'="'+g+'"]');while(h--){var e,i=j[h][2];if(this.settings.named_queries.hasOwnProperty(i)){e=matchMedia(this.settings.named_queries[i])}else{e=matchMedia(i)}if(e.matches){return{el:f,scenario:j[h]}}}}return false},load:function(f,e){if(typeof this["cached_"+f]==="undefined"||e){this["update_"+f]()}return this["cached_"+f]},update_images:function(){var e=this.S("img["+this.data_attr+"]"),j=e.length,h=j,g=0,f=this.data_attr;this.cache={};this.cached_images=[];this.images_loaded=(j===0);while(h--){g++;if(e[h]){var k=e[h].getAttribute(f)||"";if(k.length>0){this.cached_images.push(e[h])}}if(g===j){this.images_loaded=true;this.enhance("images")}}return this},update_nodes:function(){var e=this.S("["+this.data_attr+"]").not("img"),j=e.length,h=j,g=0,f=this.data_attr;this.cached_nodes=[];this.nodes_loaded=(j===0);while(h--){g++;var k=e[h].getAttribute(f)||"";if(k.length>0){this.cached_nodes.push(e[h])}if(g===j){this.nodes_loaded=true;this.enhance("nodes")}}return this},enhance:function(f){var e=this["cached_"+f].length;while(e--){this.object(c(this["cached_"+f][e]))}return c(b).trigger("resize").trigger("resize.fndtn.interchange")},convert_directive:function(f){var e=this.trim(f);if(e.length>0){return e}return"replace"},parse_scenario:function(g){var e=g[0].match(/(.+),\s*(\w+)\s*$/),j=g[1];if(e){var h=e[1],i=e[2]}else{var f=g[0].split(/,\s*$/),h=f[0],i=""}return[this.trim(h),this.convert_directive(i),this.trim(j)]},object:function(g){var h=this.parse_data_attr(g),k=[],f=h.length;if(f>0){while(f--){var e=h[f].split(/\((.*?)(\))$/);if(e.length>1){var j=this.parse_scenario(e);k.push(j)}}}return this.store(g,k)},store:function(f,h){var e=this.random_str(),g=f.data(this.add_namespace("uuid",true));if(this.cache[g]){return this.cache[g]}f.attr(this.add_namespace("data-uuid"),e);return this.cache[e]=h},trim:function(e){if(typeof e==="string"){return c.trim(e)}return e},set_data_attr:function(e){if(e){if(this.namespace.length>0){return this.namespace+"-"+this.settings.load_attr}return this.settings.load_attr}if(this.namespace.length>0){return"data-"+this.namespace+"-"+this.settings.load_attr}return"data-"+this.settings.load_attr},parse_data_attr:function(h){var f=h.attr(this.attr_name()).split(/\[(.*?)\]/),g=f.length,e=[];while(g--){if(f[g].replace(/[\W\d]+/,"").length>4){e.push(f[g])}}return e},reflow:function(){this.load("images",true);this.load("nodes",true)}}}(jQuery,window,window.document));(function(c,b,a,d){Foundation.libs["magellan-expedition"]={name:"magellan-expedition",version:"5.4.7",settings:{active_class:"active",threshold:0,destination_threshold:20,throttle_delay:30,fixed_top:0},init:function(f,g,e){Foundation.inherit(this,"throttle");this.bindings(g,e)},events:function(){var e=this,f=e.S,g=e.settings;e.set_expedition_position();f(e.scope).off(".magellan").on("click.fndtn.magellan","["+e.add_namespace("data-magellan-arrival")+'] a[href^="#"]',function(m){m.preventDefault();var l=c(this).closest("["+e.attr_name()+"]"),i=l.data("magellan-expedition-init"),k=this.hash.split("#").join(""),j=c("a[name='"+k+"']");if(j.length===0){j=c("#"+k)}var h=j.offset().top-i.destination_threshold+1;h=h-l.outerHeight();c("html, body").stop().animate({scrollTop:h},700,"swing",function(){if(history.pushState){history.pushState(null,null,"#"+k)}else{location.hash="#"+k}})}).on("scroll.fndtn.magellan",e.throttle(this.check_for_arrivals.bind(this),g.throttle_delay));c(b).on("resize.fndtn.magellan",e.throttle(this.set_expedition_position.bind(this),g.throttle_delay))},check_for_arrivals:function(){var e=this;e.update_arrivals();e.update_expedition_positions()},set_expedition_position:function(){var e=this;c("["+this.attr_name()+"=fixed]",e.scope).each(function(f,j){var l=c(this),i=l.data("magellan-expedition-init"),k=l.attr("styles"),g,h;l.attr("style","");g=l.offset().top+i.threshold;h=parseInt(l.data("magellan-fixed-top"));if(!isNaN(h)){e.settings.fixed_top=h}l.data(e.data_attr("magellan-top-offset"),g);l.attr("style",k)})},update_expedition_positions:function(){var f=this,e=c(b).scrollTop();c("["+this.attr_name()+"=fixed]",f.scope).each(function(){var j=c(this),h=j.data("magellan-expedition-init"),i=j.attr("style"),g=j.data("magellan-top-offset");if(e+f.settings.fixed_top>=g){var k=j.prev("["+f.add_namespace("data-magellan-expedition-clone")+"]");if(k.length===0){k=j.clone();k.removeAttr(f.attr_name());k.attr(f.add_namespace("data-magellan-expedition-clone"),"");j.before(k)}j.css({position:"fixed",top:h.fixed_top}).addClass("fixed")}else{j.prev("["+f.add_namespace("data-magellan-expedition-clone")+"]").remove();j.attr("style",i).css("position","").css("top","").removeClass("fixed")}})},update_arrivals:function(){var f=this,e=c(b).scrollTop();c("["+this.attr_name()+"]",f.scope).each(function(){var k=c(this),g=k.data(f.attr_name(true)+"-init"),i=f.offsets(k,e),j=k.find("["+f.add_namespace("data-magellan-arrival")+"]"),h=false;i.each(function(l,m){if(m.viewport_offset>=m.top_offset){var n=k.find("["+f.add_namespace("data-magellan-arrival")+"]");n.not(m.arrival).removeClass(g.active_class);m.arrival.addClass(g.active_class);h=true;return true}});if(!h){j.removeClass(g.active_class)}})},offsets:function(i,e){var f=this,g=i.data(f.attr_name(true)+"-init"),h=e;return i.find("["+f.add_namespace("data-magellan-arrival")+"]").map(function(j,n){var m=c(this).data(f.data_attr("magellan-arrival")),l=c("["+f.add_namespace("data-magellan-destination")+"="+m+"]");if(l.length>0){var k=Math.floor(l.offset().top-g.destination_threshold-i.outerHeight());return{destination:l,arrival:c(this),top_offset:k,viewport_offset:h}}}).sort(function(k,j){if(k.top_offset<j.top_offset){return-1}if(k.top_offset>j.top_offset){return 1}return 0})},data_attr:function(e){if(this.namespace.length>0){return this.namespace+"-"+e}return e},off:function(){this.S(this.scope).off(".magellan");this.S(b).off(".magellan")},reflow:function(){var e=this;c("["+e.add_namespace("data-magellan-expedition-clone")+"]",e.scope).remove()}}}(jQuery,window,window.document));(function(c,b,a,d){Foundation.libs.accordion={name:"accordion",version:"5.4.7",settings:{content_class:"content",active_class:"active",multi_expand:false,toggleable:true,callback:function(){}},init:function(f,g,e){this.bindings(g,e)},events:function(){var e=this;var f=this.S;f(this.scope).off(".fndtn.accordion").on("click.fndtn.accordion","["+this.attr_name()+"] > dd > a",function(m){var g=f(this).closest("["+e.attr_name()+"]"),h=e.attr_name()+"="+g.attr(e.attr_name()),j=g.data(e.attr_name(true)+"-init"),l=f("#"+this.href.split("#")[1]),k=c("> dd",g),n=k.children("."+j.content_class),i=n.filter("."+j.active_class);m.preventDefault();if(g.attr(e.attr_name())){n=n.add("["+h+"] dd > ."+j.content_class);k=k.add("["+h+"] dd")}if(j.toggleable&&l.is(i)){l.parent("dd").toggleClass(j.active_class,false);l.toggleClass(j.active_class,false);j.callback(l);l.triggerHandler("toggled",[g]);g.triggerHandler("toggled",[l]);return}if(!j.multi_expand){n.removeClass(j.active_class);k.removeClass(j.active_class)}l.addClass(j.active_class).parent().addClass(j.active_class);j.callback(l);l.triggerHandler("toggled",[g]);g.triggerHandler("toggled",[l])})},off:function(){},reflow:function(){}}}(jQuery,window,window.document));(function(c,b,a,d){Foundation.libs.topbar={name:"topbar",version:"5.4.7",settings:{index:0,sticky_class:"sticky",custom_back_text:true,back_text:"Back",mobile_show_parent_link:true,is_hover:true,scrolltop:true,sticky_on:"all"},init:function(g,h,f){Foundation.inherit(this,"add_custom_rule register_media throttle");var e=this;e.register_media("topbar","foundation-mq-topbar");this.bindings(h,f);e.S("["+this.attr_name()+"]",this.scope).each(function(){var i=c(this),j=i.data(e.attr_name(true)+"-init"),l=e.S("section, .top-bar-section",this);i.data("index",0);var k=i.parent();if(k.hasClass("fixed")||e.is_sticky(i,k,j)){e.settings.sticky_class=j.sticky_class;e.settings.sticky_topbar=i;i.data("height",k.outerHeight());i.data("stickyoffset",k.offset().top)}else{i.data("height",i.outerHeight())}if(!j.assembled){e.assemble(i)}if(j.is_hover){e.S(".has-dropdown",i).addClass("not-click")}else{e.S(".has-dropdown",i).removeClass("not-click")}e.add_custom_rule(".f-topbar-fixed { padding-top: "+i.data("height")+"px }");if(k.hasClass("fixed")){e.S("body").addClass("f-topbar-fixed")}})},is_sticky:function(e,g,f){var h=g.hasClass(f.sticky_class);if(h&&f.sticky_on==="all"){return true}else{if(h&&this.small()&&f.sticky_on==="small"){return(matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches&&!matchMedia(Foundation.media_queries.large).matches)}else{if(h&&this.medium()&&f.sticky_on==="medium"){return(matchMedia(Foundation.media_queries.small).matches&&matchMedia(Foundation.media_queries.medium).matches&&!matchMedia(Foundation.media_queries.large).matches)}else{if(h&&this.large()&&f.sticky_on==="large"){return(matchMedia(Foundation.media_queries.small).matches&&matchMedia(Foundation.media_queries.medium).matches&&matchMedia(Foundation.media_queries.large).matches)}}}}return false},toggle:function(e){var g=this,f;if(e){f=g.S(e).closest("["+this.attr_name()+"]")}else{f=g.S("["+this.attr_name()+"]")}var h=f.data(this.attr_name(true)+"-init");var i=g.S("section, .top-bar-section",f);if(g.breakpoint()){if(!g.rtl){i.css({left:"0%"});c(">.name",i).css({left:"100%"})}else{i.css({right:"0%"});c(">.name",i).css({right:"100%"})}g.S("li.moved",i).removeClass("moved");f.data("index",0);f.toggleClass("expanded").css("height","")}if(h.scrolltop){if(!f.hasClass("expanded")){if(f.hasClass("fixed")){f.parent().addClass("fixed");f.removeClass("fixed");g.S("body").addClass("f-topbar-fixed")}}else{if(f.parent().hasClass("fixed")){if(h.scrolltop){f.parent().removeClass("fixed");f.addClass("fixed");g.S("body").removeClass("f-topbar-fixed");b.scrollTo(0,0)}else{f.parent().removeClass("expanded")}}}}else{if(g.is_sticky(f,f.parent(),h)){f.parent().addClass("fixed")}if(f.parent().hasClass("fixed")){if(!f.hasClass("expanded")){f.removeClass("fixed");f.parent().removeClass("expanded");g.update_sticky_positioning()}else{f.addClass("fixed");f.parent().addClass("expanded");g.S("body").addClass("f-topbar-fixed")}}}},timer:null,events:function(g){var e=this,f=this.S;f(this.scope).off(".topbar").on("click.fndtn.topbar","["+this.attr_name()+"] .toggle-topbar",function(h){h.preventDefault();e.toggle(this)}).on("click.fndtn.topbar",'.top-bar .top-bar-section li a[href^="#"],['+this.attr_name()+'] .top-bar-section li a[href^="#"]',function(i){var h=c(this).closest("li");if(e.breakpoint()&&!h.hasClass("back")&&!h.hasClass("has-dropdown")){e.toggle()}}).on("click.fndtn.topbar","["+this.attr_name()+"] li.has-dropdown",function(l){var h=f(this),k=f(l.target),i=h.closest("["+e.attr_name()+"]"),j=i.data(e.attr_name(true)+"-init");if(k.data("revealId")){e.toggle();return}if(e.breakpoint()){return}if(j.is_hover&&!Modernizr.touch){return}l.stopImmediatePropagation();if(h.hasClass("hover")){h.removeClass("hover").find("li").removeClass("hover");h.parents("li.hover").removeClass("hover")}else{h.addClass("hover");c(h).siblings().removeClass("hover");if(k[0].nodeName==="A"&&k.parent().hasClass("has-dropdown")){l.preventDefault()}}}).on("click.fndtn.topbar","["+this.attr_name()+"] .has-dropdown>a",function(m){if(e.breakpoint()){m.preventDefault();var l=f(this),i=l.closest("["+e.attr_name()+"]"),k=i.find("section, .top-bar-section"),j=l.next(".dropdown").outerHeight(),h=l.closest("li");i.data("index",i.data("index")+1);h.addClass("moved");if(!e.rtl){k.css({left:-(100*i.data("index"))+"%"});k.find(">.name").css({left:100*i.data("index")+"%"})}else{k.css({right:-(100*i.data("index"))+"%"});k.find(">.name").css({right:100*i.data("index")+"%"})}i.css("height",l.siblings("ul").outerHeight(true)+i.data("height"))}});f(b).off(".topbar").on("resize.fndtn.topbar",e.throttle(function(){e.resize.call(e)},50)).trigger("resize").trigger("resize.fndtn.topbar").load(function(){f(this).trigger("resize.fndtn.topbar")});f("body").off(".topbar").on("click.fndtn.topbar",function(i){var h=f(i.target).closest("li").closest("li.hover");if(h.length>0){return}f("["+e.attr_name()+"] li.hover").removeClass("hover")});f(this.scope).on("click.fndtn.topbar","["+this.attr_name()+"] .has-dropdown .back",function(n){n.preventDefault();var m=f(this),i=m.closest("["+e.attr_name()+"]"),l=i.find("section, .top-bar-section"),k=i.data(e.attr_name(true)+"-init"),j=m.closest("li.moved"),h=j.parent();i.data("index",i.data("index")-1);if(!e.rtl){l.css({left:-(100*i.data("index"))+"%"});l.find(">.name").css({left:100*i.data("index")+"%"})}else{l.css({right:-(100*i.data("index"))+"%"});l.find(">.name").css({right:100*i.data("index")+"%"})}if(i.data("index")===0){i.css("height","")}else{i.css("height",h.outerHeight(true)+i.data("height"))}setTimeout(function(){j.removeClass("moved")},300)});f(this.scope).find(".dropdown a").focus(function(){c(this).parents(".has-dropdown").addClass("hover")}).blur(function(){c(this).parents(".has-dropdown").removeClass("hover")})},resize:function(){var e=this;e.S("["+this.attr_name()+"]").each(function(){var g=e.S(this),i=g.data(e.attr_name(true)+"-init");var h=g.parent("."+e.settings.sticky_class);var j;if(!e.breakpoint()){var f=g.hasClass("expanded");g.css("height","").removeClass("expanded").find("li").removeClass("hover");if(f){e.toggle(g)}}if(e.is_sticky(g,h,i)){if(h.hasClass("fixed")){h.removeClass("fixed");j=h.offset().top;if(e.S(a.body).hasClass("f-topbar-fixed")){j-=g.data("height")}g.data("stickyoffset",j);h.addClass("fixed")}else{j=h.offset().top;g.data("stickyoffset",j)}}})},breakpoint:function(){return!matchMedia(Foundation.media_queries.topbar).matches},small:function(){return matchMedia(Foundation.media_queries.small).matches},medium:function(){return matchMedia(Foundation.media_queries.medium).matches},large:function(){return matchMedia(Foundation.media_queries.large).matches},assemble:function(f){var e=this,g=f.data(this.attr_name(true)+"-init"),h=e.S("section, .top-bar-section",f);h.detach();e.S(".has-dropdown>a",h).each(function(){var i=e.S(this),l=i.siblings(".dropdown"),j=i.attr("href"),k;if(!l.find(".title.back").length){if(g.mobile_show_parent_link==true&&j){k=c('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li class="parent-link show-for-small"><a class="parent-link js-generated" href="'+j+'">'+i.html()+"</a></li>")}else{k=c('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5>')}if(g.custom_back_text==true){c("h5>a",k).html(g.back_text)}else{c("h5>a",k).html("&laquo; "+i.html())}l.prepend(k)}});h.appendTo(f);this.sticky();this.assembled(f)},assembled:function(e){e.data(this.attr_name(true),c.extend({},e.data(this.attr_name(true)),{assembled:true}))},height:function(f){var g=0,e=this;c("> li",f).each(function(){g+=e.S(this).outerHeight(true)});return g},sticky:function(){var e=this;this.S(b).on("scroll",function(){e.update_sticky_positioning()})},update_sticky_positioning:function(){var e="."+this.settings.sticky_class,g=this.S(b),f=this;if(f.settings.sticky_topbar&&f.is_sticky(this.settings.sticky_topbar,this.settings.sticky_topbar.parent(),this.settings)){var h=this.settings.sticky_topbar.data("stickyoffset");if(!f.S(e).hasClass("expanded")){if(g.scrollTop()>(h)){if(!f.S(e).hasClass("fixed")){f.S(e).addClass("fixed");f.S("body").addClass("f-topbar-fixed")}}else{if(g.scrollTop()<=h){if(f.S(e).hasClass("fixed")){f.S(e).removeClass("fixed");f.S("body").removeClass("f-topbar-fixed")}}}}}},off:function(){this.S(this.scope).off(".fndtn.topbar");this.S(b).off(".fndtn.topbar")},reflow:function(){}}}(jQuery,window,window.document));(function(c,b,a,d){Foundation.libs.tab={name:"tab",version:"5.4.7",settings:{active_class:"active",callback:function(){},deep_linking:false,scroll_to_content:true,is_hover:false},default_tab_hashes:[],init:function(h,i,f){var e=this,g=this.S;this.bindings(i,f);this.handle_location_hash_change();g("["+this.attr_name()+"] > .active > a",this.scope).each(function(){e.default_tab_hashes.push(this.hash)})},events:function(){var f=this,g=this.S;var e=function(i){var h=g(this).closest("["+f.attr_name()+"]").data(f.attr_name(true)+"-init");if(!h.is_hover||Modernizr.touch){i.preventDefault();i.stopPropagation();f.toggle_active_tab(g(this).parent())}};g(this.scope).off(".tab").on("focus.fndtn.tab","["+this.attr_name()+"] > * > a",e).on("click.fndtn.tab","["+this.attr_name()+"] > * > a",e).on("mouseenter.fndtn.tab","["+this.attr_name()+"] > * > a",function(i){var h=g(this).closest("["+f.attr_name()+"]").data(f.attr_name(true)+"-init");if(h.is_hover){f.toggle_active_tab(g(this).parent())}});g(b).on("hashchange.fndtn.tab",function(h){h.preventDefault();f.handle_location_hash_change()})},handle_location_hash_change:function(){var e=this,f=this.S;f("["+this.attr_name()+"]",this.scope).each(function(){var i=f(this).data(e.attr_name(true)+"-init");if(i.deep_linking){var k;if(i.scroll_to_content){k=e.scope.location.hash}else{k=e.scope.location.hash.replace("fndtn-","")}if(k!=""){var h=f(k);if(h.hasClass("content")&&h.parent().hasClass("tabs-content")){e.toggle_active_tab(c("["+e.attr_name()+"] > * > a[href="+k+"]").parent())}else{var g=h.closest(".content").attr("id");if(g!=d){e.toggle_active_tab(c("["+e.attr_name()+"] > * > a[href=#"+g+"]").parent(),k)}}}else{for(var j=0;j<e.default_tab_hashes.length;j++){e.toggle_active_tab(c("["+e.attr_name()+"] > * > a[href="+e.default_tab_hashes[j]+"]").parent())}}}})},toggle_active_tab:function(f,k){var i=this.S,m=f.closest("["+this.attr_name()+"]"),h=f.find("a"),j=f.children("a").first(),o="#"+j.attr("href").split("#")[1],l=i(o),n=f.siblings(),g=m.data(this.attr_name(true)+"-init"),e=function(t){var s=c(this);var r=c(this).parents("li").prev().children('[role="tab"]');var q=c(this).parents("li").next().children('[role="tab"]');var p;switch(t.keyCode){case 37:p=r;break;case 39:p=q;break;default:p=false;break}if(p.length){s.attr({tabindex:"-1","aria-selected":null});p.attr({tabindex:"0","aria-selected":true}).focus()}c('[role="tabpanel"]').attr("aria-hidden","true");c("#"+c(a.activeElement).attr("href").substring(1)).attr("aria-hidden",null)};if(i(this).data(this.data_attr("tab-content"))){o="#"+i(this).data(this.data_attr("tab-content")).split("#")[1];l=i(o)}if(g.deep_linking){if(g.scroll_to_content){b.location.hash=k||o;if(k==d||k==o){f.parent()[0].scrollIntoView()}else{i(o)[0].scrollIntoView()}}else{if(k!=d){b.location.hash="fndtn-"+k.replace("#","")}else{b.location.hash="fndtn-"+o.replace("#","")}}}f.addClass(g.active_class).triggerHandler("opened");h.attr({"aria-selected":"true",tabindex:0});n.removeClass(g.active_class);n.find("a").attr({"aria-selected":"false",tabindex:-1});l.siblings().removeClass(g.active_class).attr({"aria-hidden":"true",tabindex:-1});l.addClass(g.active_class).attr("aria-hidden","false").removeAttr("tabindex");g.callback(f);l.triggerHandler("toggled",[f]);m.triggerHandler("toggled",[l]);h.off("keydown").on("keydown",e)},data_attr:function(e){if(this.namespace.length>0){return this.namespace+"-"+e}return e},off:function(){},reflow:function(){}}}(jQuery,window,window.document));(function(c,b,a,d){Foundation.libs.abide={name:"abide",version:"5.4.7",settings:{live_validate:true,focus_on_invalid:true,error_labels:true,error_class:"error",timeout:1000,patterns:{alpha:/^[a-zA-Z]+$/,alpha_numeric:/^[a-zA-Z0-9]+$/,integer:/^[-+]?\d+$/,number:/^[-+]?\d*(?:[\.\,]\d+)?$/,card:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,cvv:/^([0-9]){3,4}$/,email:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,url:/^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,domain:/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,datetime:/^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,date:/(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,time:/^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,dateISO:/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,month_day_year:/^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,day_month_year:/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,color:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/},validators:{equalTo:function(f,h,e){var j=a.getElementById(f.getAttribute(this.add_namespace("data-equalto"))).value,i=f.value,g=(j===i);return g}}},timer:null,init:function(f,g,e){this.bindings(g,e)},events:function(g){var e=this,h=e.S(g).attr("novalidate","novalidate"),f=h.data(this.attr_name(true)+"-init")||{};this.invalid_attr=this.add_namespace("data-invalid");h.off(".abide").on("submit.fndtn.abide validate.fndtn.abide",function(j){var i=/ajax/i.test(e.S(this).attr(e.attr_name()));return e.validate(e.S(this).find("input, textarea, select").get(),j,i)}).on("reset",function(){return e.reset(c(this))}).find("input, textarea, select").off(".abide").on("blur.fndtn.abide change.fndtn.abide",function(i){e.validate([this],i)}).on("keydown.fndtn.abide",function(i){if(f.live_validate===true){clearTimeout(e.timer);e.timer=setTimeout(function(){e.validate([this],i)}.bind(this),f.timeout)}})},reset:function(e){e.removeAttr(this.invalid_attr);c(this.invalid_attr,e).removeAttr(this.invalid_attr);c("."+this.settings.error_class,e).not("small").removeClass(this.settings.error_class)},validate:function(l,n,f){var k=this.parse_patterns(l),j=k.length,m=this.S(l[0]).closest("form"),g=/submit/.test(n.type);for(var h=0;h<j;h++){if(!k[h]&&(g||f)){if(this.settings.focus_on_invalid){l[h].focus()}m.trigger("invalid");this.S(l[h]).closest("form").attr(this.invalid_attr,"");return false}}if(g||f){m.trigger("valid")}m.removeAttr(this.invalid_attr);if(f){return false}return true},parse_patterns:function(g){var f=g.length,e=[];while(f--){e.push(this.pattern(g[f]))}return this.check_validation_and_apply_styles(e)},pattern:function(f){var e=f.getAttribute("type"),h=typeof f.getAttribute("required")==="string";var g=f.getAttribute("pattern")||"";if(this.settings.patterns.hasOwnProperty(g)&&g.length>0){return[f,this.settings.patterns[g],h]}else{if(g.length>0){return[f,new RegExp(g),h]}}if(this.settings.patterns.hasOwnProperty(e)){return[f,this.settings.patterns[e],h]}g=/.*/;return[f,g,h]},check_validation_and_apply_styles:function(p){var u=p.length,j=[],g=this.S(p[0][0]).closest("[data-"+this.attr_name(true)+"]"),x=g.data(this.attr_name(true)+"-init")||{};while(u--){var f=p[u][0],q=p[u][2],t=f.value.trim(),v=this.S(f).parent(),l=f.getAttribute(this.add_namespace("data-abide-validator")),e=f.type==="radio",r=f.type==="checkbox",n=this.S('label[for="'+f.getAttribute("id")+'"]'),h=(q)?(f.value.length>0):true,m=[];var o,s;if(f.getAttribute(this.add_namespace("data-equalto"))){l="equalTo"}if(!v.is("label")){o=v}else{o=v.parent()}if(l){s=this.settings.validators[l].apply(this,[f,q,o]);m.push(s)}if(e&&q){m.push(this.valid_radio(f,q))}else{if(r&&q){m.push(this.valid_checkbox(f,q))}else{if(p[u][1].test(t)&&h||!q&&f.value.length<1||c(f).attr("disabled")){m.push(true)}else{m.push(false)}m=[m.every(function(i){return i})];if(m[0]){this.S(f).removeAttr(this.invalid_attr);f.setAttribute("aria-invalid","false");f.removeAttribute("aria-describedby");o.removeClass(this.settings.error_class);if(n.length>0&&this.settings.error_labels){n.removeClass(this.settings.error_class).removeAttr("role")}c(f).triggerHandler("valid")}else{this.S(f).attr(this.invalid_attr,"");f.setAttribute("aria-invalid","true");var k=o.find("small."+this.settings.error_class,"span."+this.settings.error_class);var w=k.length>0?k[0].id:"";if(w.length>0){f.setAttribute("aria-describedby",w)}o.addClass(this.settings.error_class);if(n.length>0&&this.settings.error_labels){n.addClass(this.settings.error_class).attr("role","alert")}c(f).triggerHandler("invalid")}}}j.push(m[0])}j=[j.every(function(i){return i})];return j},valid_checkbox:function(e,g){var e=this.S(e),f=(e.is(":checked")||!g);if(f){e.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class)}else{e.attr(this.invalid_attr,"").parent().addClass(this.settings.error_class)}return f},valid_radio:function(g,l){var e=g.getAttribute("name"),k=this.S(g).closest("[data-"+this.attr_name(true)+"]").find("[name='"+e+"']"),j=k.length,h=false;for(var f=0;f<j;f++){if(k[f].checked){h=true}}for(var f=0;f<j;f++){if(h){this.S(k[f]).removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class)}else{this.S(k[f]).attr(this.invalid_attr,"").parent().addClass(this.settings.error_class)}}return h},valid_equal:function(f,h,e){var j=a.getElementById(f.getAttribute(this.add_namespace("data-equalto"))).value,i=f.value,g=(j===i);if(g){this.S(f).removeAttr(this.invalid_attr);e.removeClass(this.settings.error_class);if(label.length>0&&settings.error_labels){label.removeClass(this.settings.error_class)}}else{this.S(f).attr(this.invalid_attr,"");e.addClass(this.settings.error_class);if(label.length>0&&settings.error_labels){label.addClass(this.settings.error_class)}}return g},valid_oneof:function(h,j,g,e){var h=this.S(h),f=this.S("["+this.add_namespace("data-oneof")+"]"),i=f.filter(":checked").length>0;if(i){h.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class)}else{h.attr(this.invalid_attr,"").parent().addClass(this.settings.error_class)}if(!e){var k=this;f.each(function(){k.valid_oneof.call(k,this,null,null,true)})}return i}}}(jQuery,window,window.document));(function(c,b,a,d){Foundation.libs.tooltip={name:"tooltip",version:"5.4.7",settings:{additional_inheritable_classes:[],tooltip_class:".tooltip",append_to:"body",touch_close_text:"Tap To Close",disable_for_touch:false,hover_delay:200,show_on:"all",tip_template:function(e,f){return'<span data-selector="'+e+'" id="'+e+'" class="'+Foundation.libs.tooltip.settings.tooltip_class.substring(1)+'" role="tooltip">'+f+'<span class="nub"></span></span>'}},cache:{},init:function(f,g,e){Foundation.inherit(this,"random_str");this.bindings(g,e)},should_show:function(g,f){var e=c.extend({},this.settings,this.data_options(g));if(e.show_on==="all"){return true}else{if(this.small()&&e.show_on==="small"){return true}else{if(this.medium()&&e.show_on==="medium"){return true}else{if(this.large()&&e.show_on==="large"){return true}}}}return false},medium:function(){return matchMedia(Foundation.media_queries.medium).matches},large:function(){return matchMedia(Foundation.media_queries.large).matches},events:function(e){var f=this,g=f.S;f.create(this.S(e));c(this.scope).off(".tooltip").on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"]",function(k){var j=g(this),i=c.extend({},f.settings,f.data_options(j)),h=false;if(Modernizr.touch&&/touchstart|MSPointerDown/i.test(k.type)&&g(k.target).is("a")){return false}if(/mouse/i.test(k.type)&&f.ie_touch(k)){return false}if(j.hasClass("open")){if(Modernizr.touch&&/touchstart|MSPointerDown/i.test(k.type)){k.preventDefault()}f.hide(j)}else{if(i.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(k.type)){return}else{if(!i.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(k.type)){k.preventDefault();g(i.tooltip_class+".open").hide();h=true}}if(/enter|over/i.test(k.type)){this.timer=setTimeout(function(){var l=f.showTip(j)}.bind(this),f.settings.hover_delay)}else{if(k.type==="mouseout"||k.type==="mouseleave"){clearTimeout(this.timer);f.hide(j)}else{f.showTip(j)}}}}).on("mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"].open",function(h){if(/mouse/i.test(h.type)&&f.ie_touch(h)){return false}if(c(this).data("tooltip-open-event-type")=="touch"&&h.type=="mouseleave"){return}else{if(c(this).data("tooltip-open-event-type")=="mouse"&&/MSPointerDown|touchstart/i.test(h.type)){f.convert_to_touch(c(this))}else{f.hide(c(this))}}}).on("DOMNodeRemoved DOMAttrModified","["+this.attr_name()+"]:not(a)",function(h){f.hide(g(this))})},ie_touch:function(f){return false},showTip:function(e){var f=this.getTip(e);if(this.should_show(e,f)){return this.show(e)}return},getTip:function(f){var e=this.selector(f),g=c.extend({},this.settings,this.data_options(f)),h=null;if(e){h=this.S('span[data-selector="'+e+'"]'+g.tooltip_class)}return(typeof h==="object")?h:false},selector:function(e){var g=e.attr("id"),f=e.attr(this.attr_name())||e.attr("data-selector");if((g&&g.length<1||!g)&&typeof f!="string"){f=this.random_str(6);e.attr("data-selector",f).attr("aria-describedby",f)}return(g&&g.length>0)?g:f},create:function(e){var g=this,i=c.extend({},this.settings,this.data_options(e)),f=this.settings.tip_template;if(typeof i.tip_template==="string"&&b.hasOwnProperty(i.tip_template)){f=b[i.tip_template]}var j=c(f(this.selector(e),c("<div></div>").html(e.attr("title")).html())),h=this.inheritable_classes(e);j.addClass(h).appendTo(i.append_to);if(Modernizr.touch){j.append('<span class="tap-to-close">'+i.touch_close_text+"</span>");j.on("touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip",function(k){g.hide(e)})}e.removeAttr("title").attr("title","")},reposition:function(j,m,h){var e,n,l,i,g,k;m.css("visibility","hidden").show();e=j.data("width");n=m.children(".nub");l=n.outerHeight();i=n.outerHeight();if(this.small()){m.css({width:"100%"})}else{m.css({width:(e)?e:"auto"})}k=function(t,s,p,o,r,q){return t.css({top:(s)?s:"auto",bottom:(o)?o:"auto",left:(r)?r:"auto",right:(p)?p:"auto"}).end()};k(m,(j.offset().top+j.outerHeight()+10),"auto","auto",j.offset().left);if(this.small()){k(m,(j.offset().top+j.outerHeight()+10),"auto","auto",12.5,c(this.scope).width());m.addClass("tip-override");k(n,-l,"auto","auto",j.offset().left)}else{var f=j.offset().left;if(Foundation.rtl){n.addClass("rtl");f=j.offset().left+j.outerWidth()-m.outerWidth()}k(m,(j.offset().top+j.outerHeight()+10),"auto","auto",f);m.removeClass("tip-override");if(h&&h.indexOf("tip-top")>-1){if(Foundation.rtl){n.addClass("rtl")}k(m,(j.offset().top-m.outerHeight()),"auto","auto",f).removeClass("tip-override")}else{if(h&&h.indexOf("tip-left")>-1){k(m,(j.offset().top+(j.outerHeight()/2)-(m.outerHeight()/2)),"auto","auto",(j.offset().left-m.outerWidth()-l)).removeClass("tip-override");n.removeClass("rtl")}else{if(h&&h.indexOf("tip-right")>-1){k(m,(j.offset().top+(j.outerHeight()/2)-(m.outerHeight()/2)),"auto","auto",(j.offset().left+j.outerWidth()+l)).removeClass("tip-override");n.removeClass("rtl")}}}}m.css("visibility","visible").hide()},small:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},inheritable_classes:function(e){var h=c.extend({},this.settings,this.data_options(e)),i=["tip-top","tip-left","tip-bottom","tip-right","radius","round"].concat(h.additional_inheritable_classes),g=e.attr("class"),f=g?c.map(g.split(" "),function(k,j){if(c.inArray(k,i)!==-1){return k}}).join(" "):"";return c.trim(f)},convert_to_touch:function(e){var f=this,h=f.getTip(e),g=c.extend({},f.settings,f.data_options(e));if(h.find(".tap-to-close").length===0){h.append('<span class="tap-to-close">'+g.touch_close_text+"</span>");h.on("click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose",function(i){f.hide(e)})}e.data("tooltip-open-event-type","touch")},show:function(e){var f=this.getTip(e);if(e.data("tooltip-open-event-type")=="touch"){this.convert_to_touch(e)}this.reposition(e,f,e.attr("class"));e.addClass("open");f.fadeIn(150)},hide:function(e){var f=this.getTip(e);f.fadeOut(150,function(){f.find(".tap-to-close").remove();f.off("click.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose");e.removeClass("open")})},off:function(){var e=this;this.S(this.scope).off(".fndtn.tooltip");this.S(this.settings.tooltip_class).each(function(f){c("["+e.attr_name()+"]").eq(f).attr("title",c(this).text())}).remove()},reflow:function(){}}}(jQuery,window,window.document));
(function(t,e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else if(typeof exports==="object"){module.exports=e(require("jquery"))}else{e(t.jQuery)}})(this,function(t){t.transit={version:"0.9.12",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var e=document.createElement("div");var n={};function i(t){if(t in e.style)return t;var n=["Moz","Webkit","O","ms"];var i=t.charAt(0).toUpperCase()+t.substr(1);for(var r=0;r<n.length;++r){var s=n[r]+i;if(s in e.style){return s}}}function r(){e.style[n.transform]="";e.style[n.transform]="rotateY(90deg)";return e.style[n.transform]!==""}var s=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;n.transition=i("transition");n.transitionDelay=i("transitionDelay");n.transform=i("transform");n.transformOrigin=i("transformOrigin");n.filter=i("Filter");n.transform3d=r();var a={transition:"transitionend",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var o=n.transitionEnd=a[n.transition]||null;for(var u in n){if(n.hasOwnProperty(u)&&typeof t.support[u]==="undefined"){t.support[u]=n[u]}}e=null;t.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeInCubic:"cubic-bezier(.550,.055,.675,.190)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};t.cssHooks["transit:transform"]={get:function(e){return t(e).data("transform")||new f},set:function(e,i){var r=i;if(!(r instanceof f)){r=new f(r)}if(n.transform==="WebkitTransform"&&!s){e.style[n.transform]=r.toString(true)}else{e.style[n.transform]=r.toString()}t(e).data("transform",r)}};t.cssHooks.transform={set:t.cssHooks["transit:transform"].set};t.cssHooks.filter={get:function(t){return t.style[n.filter]},set:function(t,e){t.style[n.filter]=e}};if(t.fn.jquery<"1.8"){t.cssHooks.transformOrigin={get:function(t){return t.style[n.transformOrigin]},set:function(t,e){t.style[n.transformOrigin]=e}};t.cssHooks.transition={get:function(t){return t.style[n.transition]},set:function(t,e){t.style[n.transition]=e}}}p("scale");p("scaleX");p("scaleY");p("translate");p("rotate");p("rotateX");p("rotateY");p("rotate3d");p("perspective");p("skewX");p("skewY");p("x",true);p("y",true);function f(t){if(typeof t==="string"){this.parse(t)}return this}f.prototype={setFromString:function(t,e){var n=typeof e==="string"?e.split(","):e.constructor===Array?e:[e];n.unshift(t);f.prototype.set.apply(this,n)},set:function(t){var e=Array.prototype.slice.apply(arguments,[1]);if(this.setter[t]){this.setter[t].apply(this,e)}else{this[t]=e.join(",")}},get:function(t){if(this.getter[t]){return this.getter[t].apply(this)}else{return this[t]||0}},setter:{rotate:function(t){this.rotate=b(t,"deg")},rotateX:function(t){this.rotateX=b(t,"deg")},rotateY:function(t){this.rotateY=b(t,"deg")},scale:function(t,e){if(e===undefined){e=t}this.scale=t+","+e},skewX:function(t){this.skewX=b(t,"deg")},skewY:function(t){this.skewY=b(t,"deg")},perspective:function(t){this.perspective=b(t,"px")},x:function(t){this.set("translate",t,null)},y:function(t){this.set("translate",null,t)},translate:function(t,e){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(t!==null&&t!==undefined){this._translateX=b(t,"px")}if(e!==null&&e!==undefined){this._translateY=b(e,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var t=(this.scale||"1,1").split(",");if(t[0]){t[0]=parseFloat(t[0])}if(t[1]){t[1]=parseFloat(t[1])}return t[0]===t[1]?t[0]:t},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var e=0;e<=3;++e){if(t[e]){t[e]=parseFloat(t[e])}}if(t[3]){t[3]=b(t[3],"deg")}return t}},parse:function(t){var e=this;t.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,n,i){e.setFromString(n,i)})},toString:function(t){var e=[];for(var i in this){if(this.hasOwnProperty(i)){if(!n.transform3d&&(i==="rotateX"||i==="rotateY"||i==="perspective"||i==="transformOrigin")){continue}if(i[0]!=="_"){if(t&&i==="scale"){e.push(i+"3d("+this[i]+",1)")}else if(t&&i==="translate"){e.push(i+"3d("+this[i]+",0)")}else{e.push(i+"("+this[i]+")")}}}}return e.join(" ")}};function c(t,e,n){if(e===true){t.queue(n)}else if(e){t.queue(e,n)}else{t.each(function(){n.call(this)})}}function l(e){var i=[];t.each(e,function(e){e=t.camelCase(e);e=t.transit.propertyMap[e]||t.cssProps[e]||e;e=h(e);if(n[e])e=h(n[e]);if(t.inArray(e,i)===-1){i.push(e)}});return i}function d(e,n,i,r){var s=l(e);if(t.cssEase[i]){i=t.cssEase[i]}var a=""+y(n)+" "+i;if(parseInt(r,10)>0){a+=" "+y(r)}var o=[];t.each(s,function(t,e){o.push(e+" "+a)});return o.join(", ")}t.fn.transition=t.fn.transit=function(e,i,r,s){var a=this;var u=0;var f=true;var l=t.extend(true,{},e);if(typeof i==="function"){s=i;i=undefined}if(typeof i==="object"){r=i.easing;u=i.delay||0;f=typeof i.queue==="undefined"?true:i.queue;s=i.complete;i=i.duration}if(typeof r==="function"){s=r;r=undefined}if(typeof l.easing!=="undefined"){r=l.easing;delete l.easing}if(typeof l.duration!=="undefined"){i=l.duration;delete l.duration}if(typeof l.complete!=="undefined"){s=l.complete;delete l.complete}if(typeof l.queue!=="undefined"){f=l.queue;delete l.queue}if(typeof l.delay!=="undefined"){u=l.delay;delete l.delay}if(typeof i==="undefined"){i=t.fx.speeds._default}if(typeof r==="undefined"){r=t.cssEase._default}i=y(i);var p=d(l,i,r,u);var h=t.transit.enabled&&n.transition;var b=h?parseInt(i,10)+parseInt(u,10):0;if(b===0){var g=function(t){a.css(l);if(s){s.apply(a)}if(t){t()}};c(a,f,g);return a}var m={};var v=function(e){var i=false;var r=function(){if(i){a.unbind(o,r)}if(b>0){a.each(function(){this.style[n.transition]=m[this]||null})}if(typeof s==="function"){s.apply(a)}if(typeof e==="function"){e()}};if(b>0&&o&&t.transit.useTransitionEnd){i=true;a.bind(o,r)}else{window.setTimeout(r,b)}a.each(function(){if(b>0){this.style[n.transition]=p}t(this).css(l)})};var z=function(t){this.offsetWidth;v(t)};c(a,f,z);return this};function p(e,i){if(!i){t.cssNumber[e]=true}t.transit.propertyMap[e]=n.transform;t.cssHooks[e]={get:function(n){var i=t(n).css("transit:transform");return i.get(e)},set:function(n,i){var r=t(n).css("transit:transform");r.setFromString(e,i);t(n).css({"transit:transform":r})}}}function h(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}function b(t,e){if(typeof t==="string"&&!t.match(/^[\-0-9\.]+$/)){return t}else{return""+t+e}}function y(e){var n=e;if(typeof n==="string"&&!n.match(/^[\-0-9\.]+/)){n=t.fx.speeds[n]||t.fx.speeds._default}return b(n,"ms")}t.transit.getTransitionValue=d;return t});
(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(f){var y="1.6.9",p="left",o="right",e="up",x="down",c="in",A="out",m="none",s="auto",l="swipe",t="pinch",B="tap",j="doubletap",b="longtap",z="hold",E="horizontal",u="vertical",i="all",r=10,g="start",k="move",h="end",q="cancel",a="ontouchstart"in window,v=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,d=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,C="TouchSwipe";var n={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe",preventDefaultEvents:true};f.fn.swipe=function(H){var G=f(this),F=G.data(C);if(F&&typeof H==="string"){if(F[H]){return F[H].apply(this,Array.prototype.slice.call(arguments,1))}else{f.error("Method "+H+" does not exist on jQuery.swipe")}}else{if(!F&&(typeof H==="object"||!H)){return w.apply(this,arguments)}}return G};f.fn.swipe.version=y;f.fn.swipe.defaults=n;f.fn.swipe.phases={PHASE_START:g,PHASE_MOVE:k,PHASE_END:h,PHASE_CANCEL:q};f.fn.swipe.directions={LEFT:p,RIGHT:o,UP:e,DOWN:x,IN:c,OUT:A};f.fn.swipe.pageScroll={NONE:m,HORIZONTAL:E,VERTICAL:u,AUTO:s};f.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:i};function w(F){if(F&&(F.allowPageScroll===undefined&&(F.swipe!==undefined||F.swipeStatus!==undefined))){F.allowPageScroll=m}if(F.click!==undefined&&F.tap===undefined){F.tap=F.click}if(!F){F={}}F=f.extend({},f.fn.swipe.defaults,F);return this.each(function(){var H=f(this);var G=H.data(C);if(!G){G=new D(this,F);H.data(C,G)}})}function D(a5,aw){var aA=(a||d||!aw.fallbackToMouseEvents),K=aA?(d?(v?"MSPointerDown":"pointerdown"):"touchstart"):"mousedown",az=aA?(d?(v?"MSPointerMove":"pointermove"):"touchmove"):"mousemove",V=aA?(d?(v?"MSPointerUp":"pointerup"):"touchend"):"mouseup",T=aA?null:"mouseleave",aE=(d?(v?"MSPointerCancel":"pointercancel"):"touchcancel");var ah=0,aQ=null,ac=0,a2=0,a0=0,H=1,ar=0,aK=0,N=null;var aS=f(a5);var aa="start";var X=0;var aR=null;var U=0,a3=0,a6=0,ae=0,O=0;var aX=null,ag=null;try{aS.bind(K,aO);aS.bind(aE,ba)}catch(al){f.error("events not supported "+K+","+aE+" on jQuery.swipe")}this.enable=function(){aS.bind(K,aO);aS.bind(aE,ba);return aS};this.disable=function(){aL();return aS};this.destroy=function(){aL();aS.data(C,null);aS=null};this.option=function(bd,bc){if(aw[bd]!==undefined){if(bc===undefined){return aw[bd]}else{aw[bd]=bc}}else{f.error("Option "+bd+" does not exist on jQuery.swipe.options")}return null};function aO(be){if(aC()){return}if(f(be.target).closest(aw.excludedElements,aS).length>0){return}var bf=be.originalEvent?be.originalEvent:be;var bd,bg=bf.touches,bc=bg?bg[0]:bf;aa=g;if(bg){X=bg.length}else{be.preventDefault()}ah=0;aQ=null;aK=null;ac=0;a2=0;a0=0;H=1;ar=0;aR=ak();N=ab();S();if(!bg||(X===aw.fingers||aw.fingers===i)||aY()){aj(0,bc);U=au();if(X==2){aj(1,bg[1]);a2=a0=av(aR[0].start,aR[1].start)}if(aw.swipeStatus||aw.pinchStatus){bd=P(bf,aa)}}else{bd=false}if(bd===false){aa=q;P(bf,aa);return bd}else{if(aw.hold){ag=setTimeout(f.proxy(function(){aS.trigger("hold",[bf.target]);if(aw.hold){bd=aw.hold.call(aS,bf,bf.target)}},this),aw.longTapThreshold)}ap(true)}return null}function a4(bf){var bi=bf.originalEvent?bf.originalEvent:bf;if(aa===h||aa===q||an()){return}var be,bj=bi.touches,bd=bj?bj[0]:bi;var bg=aI(bd);a3=au();if(bj){X=bj.length}if(aw.hold){clearTimeout(ag)}aa=k;if(X==2){if(a2==0){aj(1,bj[1]);a2=a0=av(aR[0].start,aR[1].start)}else{aI(bj[1]);a0=av(aR[0].end,aR[1].end);aK=at(aR[0].end,aR[1].end)}H=a8(a2,a0);ar=Math.abs(a2-a0)}if((X===aw.fingers||aw.fingers===i)||!bj||aY()){aQ=aM(bg.start,bg.end);am(bf,aQ);ah=aT(bg.start,bg.end);ac=aN();aJ(aQ,ah);if(aw.swipeStatus||aw.pinchStatus){be=P(bi,aa)}if(!aw.triggerOnTouchEnd||aw.triggerOnTouchLeave){var bc=true;if(aw.triggerOnTouchLeave){var bh=aZ(this);bc=F(bg.end,bh)}if(!aw.triggerOnTouchEnd&&bc){aa=aD(k)}else{if(aw.triggerOnTouchLeave&&!bc){aa=aD(h)}}if(aa==q||aa==h){P(bi,aa)}}}else{aa=q;P(bi,aa)}if(be===false){aa=q;P(bi,aa)}}function M(bc){var bd=bc.originalEvent?bc.originalEvent:bc,be=bd.touches;if(be){if(be.length){G();return true}}if(an()){X=ae}a3=au();ac=aN();if(bb()||!ao()){aa=q;P(bd,aa)}else{if(aw.triggerOnTouchEnd||(aw.triggerOnTouchEnd==false&&aa===k)){bc.preventDefault();aa=h;P(bd,aa)}else{if(!aw.triggerOnTouchEnd&&a7()){aa=h;aG(bd,aa,B)}else{if(aa===k){aa=q;P(bd,aa)}}}}ap(false);return null}function ba(){X=0;a3=0;U=0;a2=0;a0=0;H=1;S();ap(false)}function L(bc){var bd=bc.originalEvent?bc.originalEvent:bc;if(aw.triggerOnTouchLeave){aa=aD(h);P(bd,aa)}}function aL(){aS.unbind(K,aO);aS.unbind(aE,ba);aS.unbind(az,a4);aS.unbind(V,M);if(T){aS.unbind(T,L)}ap(false)}function aD(bg){var bf=bg;var be=aB();var bd=ao();var bc=bb();if(!be||bc){bf=q}else{if(bd&&bg==k&&(!aw.triggerOnTouchEnd||aw.triggerOnTouchLeave)){bf=h}else{if(!bd&&bg==h&&aw.triggerOnTouchLeave){bf=q}}}return bf}function P(be,bc){var bd,bf=be.touches;if((J()||W())||(Q()||aY())){if(J()||W()){bd=aG(be,bc,l)}if((Q()||aY())&&bd!==false){bd=aG(be,bc,t)}}else{if(aH()&&bd!==false){bd=aG(be,bc,j)}else{if(aq()&&bd!==false){bd=aG(be,bc,b)}else{if(ai()&&bd!==false){bd=aG(be,bc,B)}}}}if(bc===q){ba(be)}if(bc===h){if(bf){if(!bf.length){ba(be)}}else{ba(be)}}return bd}function aG(bf,bc,be){var bd;if(be==l){aS.trigger("swipeStatus",[bc,aQ||null,ah||0,ac||0,X,aR]);if(aw.swipeStatus){bd=aw.swipeStatus.call(aS,bf,bc,aQ||null,ah||0,ac||0,X,aR);if(bd===false){return false}}if(bc==h&&aW()){aS.trigger("swipe",[aQ,ah,ac,X,aR]);if(aw.swipe){bd=aw.swipe.call(aS,bf,aQ,ah,ac,X,aR);if(bd===false){return false}}switch(aQ){case p:aS.trigger("swipeLeft",[aQ,ah,ac,X,aR]);if(aw.swipeLeft){bd=aw.swipeLeft.call(aS,bf,aQ,ah,ac,X,aR)}break;case o:aS.trigger("swipeRight",[aQ,ah,ac,X,aR]);if(aw.swipeRight){bd=aw.swipeRight.call(aS,bf,aQ,ah,ac,X,aR)}break;case e:aS.trigger("swipeUp",[aQ,ah,ac,X,aR]);if(aw.swipeUp){bd=aw.swipeUp.call(aS,bf,aQ,ah,ac,X,aR)}break;case x:aS.trigger("swipeDown",[aQ,ah,ac,X,aR]);if(aw.swipeDown){bd=aw.swipeDown.call(aS,bf,aQ,ah,ac,X,aR)}break}}}if(be==t){aS.trigger("pinchStatus",[bc,aK||null,ar||0,ac||0,X,H,aR]);if(aw.pinchStatus){bd=aw.pinchStatus.call(aS,bf,bc,aK||null,ar||0,ac||0,X,H,aR);if(bd===false){return false}}if(bc==h&&a9()){switch(aK){case c:aS.trigger("pinchIn",[aK||null,ar||0,ac||0,X,H,aR]);if(aw.pinchIn){bd=aw.pinchIn.call(aS,bf,aK||null,ar||0,ac||0,X,H,aR)}break;case A:aS.trigger("pinchOut",[aK||null,ar||0,ac||0,X,H,aR]);if(aw.pinchOut){bd=aw.pinchOut.call(aS,bf,aK||null,ar||0,ac||0,X,H,aR)}break}}}if(be==B){if(bc===q||bc===h){clearTimeout(aX);clearTimeout(ag);if(Z()&&!I()){O=au();aX=setTimeout(f.proxy(function(){O=null;aS.trigger("tap",[bf.target]);if(aw.tap){bd=aw.tap.call(aS,bf,bf.target)}},this),aw.doubleTapThreshold)}else{O=null;aS.trigger("tap",[bf.target]);if(aw.tap){bd=aw.tap.call(aS,bf,bf.target)}}}}else{if(be==j){if(bc===q||bc===h){clearTimeout(aX);O=null;aS.trigger("doubletap",[bf.target]);if(aw.doubleTap){bd=aw.doubleTap.call(aS,bf,bf.target)}}}else{if(be==b){if(bc===q||bc===h){clearTimeout(aX);O=null;aS.trigger("longtap",[bf.target]);if(aw.longTap){bd=aw.longTap.call(aS,bf,bf.target)}}}}}return bd}function ao(){var bc=true;if(aw.threshold!==null){bc=ah>=aw.threshold}return bc}function bb(){var bc=false;if(aw.cancelThreshold!==null&&aQ!==null){bc=(aU(aQ)-ah)>=aw.cancelThreshold}return bc}function af(){if(aw.pinchThreshold!==null){return ar>=aw.pinchThreshold}return true}function aB(){var bc;if(aw.maxTimeThreshold){if(ac>=aw.maxTimeThreshold){bc=false}else{bc=true}}else{bc=true}return bc}function am(bc,bd){if(aw.preventDefaultEvents===false){return}if(aw.allowPageScroll===m){bc.preventDefault()}else{var be=aw.allowPageScroll===s;switch(bd){case p:if((aw.swipeLeft&&be)||(!be&&aw.allowPageScroll!=E)){bc.preventDefault()}break;case o:if((aw.swipeRight&&be)||(!be&&aw.allowPageScroll!=E)){bc.preventDefault()}break;case e:if((aw.swipeUp&&be)||(!be&&aw.allowPageScroll!=u)){bc.preventDefault()}break;case x:if((aw.swipeDown&&be)||(!be&&aw.allowPageScroll!=u)){bc.preventDefault()}break}}}function a9(){var bd=aP();var bc=Y();var be=af();return bd&&bc&&be}function aY(){return!!(aw.pinchStatus||aw.pinchIn||aw.pinchOut)}function Q(){return!!(a9()&&aY())}function aW(){var bf=aB();var bh=ao();var be=aP();var bc=Y();var bd=bb();var bg=!bd&&bc&&be&&bh&&bf;return bg}function W(){return!!(aw.swipe||aw.swipeStatus||aw.swipeLeft||aw.swipeRight||aw.swipeUp||aw.swipeDown)}function J(){return!!(aW()&&W())}function aP(){return((X===aw.fingers||aw.fingers===i)||!a)}function Y(){return aR[0].end.x!==0}function a7(){return!!(aw.tap)}function Z(){return!!(aw.doubleTap)}function aV(){return!!(aw.longTap)}function R(){if(O==null){return false}var bc=au();return(Z()&&((bc-O)<=aw.doubleTapThreshold))}function I(){return R()}function ay(){return((X===1||!a)&&(isNaN(ah)||ah<aw.threshold))}function a1(){return((ac>aw.longTapThreshold)&&(ah<r))}function ai(){return!!(ay()&&a7())}function aH(){return!!(R()&&Z())}function aq(){return!!(a1()&&aV())}function G(){a6=au();ae=event.touches.length+1}function S(){a6=0;ae=0}function an(){var bc=false;if(a6){var bd=au()-a6;if(bd<=aw.fingerReleaseThreshold){bc=true}}return bc}function aC(){return!!(aS.data(C+"_intouch")===true)}function ap(bc){if(bc===true){aS.bind(az,a4);aS.bind(V,M);if(T){aS.bind(T,L)}}else{aS.unbind(az,a4,false);aS.unbind(V,M,false);if(T){aS.unbind(T,L,false)}}aS.data(C+"_intouch",bc===true)}function aj(bd,bc){var be=bc.identifier!==undefined?bc.identifier:0;aR[bd].identifier=be;aR[bd].start.x=aR[bd].end.x=bc.pageX||bc.clientX;aR[bd].start.y=aR[bd].end.y=bc.pageY||bc.clientY;return aR[bd]}function aI(bc){var be=bc.identifier!==undefined?bc.identifier:0;var bd=ad(be);bd.end.x=bc.pageX||bc.clientX;bd.end.y=bc.pageY||bc.clientY;return bd}function ad(bd){for(var bc=0;bc<aR.length;bc++){if(aR[bc].identifier==bd){return aR[bc]}}}function ak(){var bc=[];for(var bd=0;bd<=5;bd++){bc.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return bc}function aJ(bc,bd){bd=Math.max(bd,aU(bc));N[bc].distance=bd}function aU(bc){if(N[bc]){return N[bc].distance}return undefined}function ab(){var bc={};bc[p]=ax(p);bc[o]=ax(o);bc[e]=ax(e);bc[x]=ax(x);return bc}function ax(bc){return{direction:bc,distance:0}}function aN(){return a3-U}function av(bf,be){var bd=Math.abs(bf.x-be.x);var bc=Math.abs(bf.y-be.y);return Math.round(Math.sqrt(bd*bd+bc*bc))}function a8(bc,bd){var be=(bd/bc)*1;return be.toFixed(2)}function at(){if(H<1){return A}else{return c}}function aT(bd,bc){return Math.round(Math.sqrt(Math.pow(bc.x-bd.x,2)+Math.pow(bc.y-bd.y,2)))}function aF(bf,bd){var bc=bf.x-bd.x;var bh=bd.y-bf.y;var be=Math.atan2(bh,bc);var bg=Math.round(be*180/Math.PI);if(bg<0){bg=360-Math.abs(bg)}return bg}function aM(bd,bc){var be=aF(bd,bc);if((be<=45)&&(be>=0)){return p}else{if((be<=360)&&(be>=315)){return p}else{if((be>=135)&&(be<=225)){return o}else{if((be>45)&&(be<135)){return x}else{return e}}}}}function au(){var bc=new Date();return bc.getTime()}function aZ(bc){bc=f(bc);var be=bc.offset();var bd={left:be.left,right:be.left+bc.outerWidth(),top:be.top,bottom:be.top+bc.outerHeight()};return bd}function F(bc,bd){return(bc.x>bd.left&&bc.x<bd.right&&bc.y>bd.top&&bc.y<bd.bottom)}}}));
!function t(e,n,r){function o(l,s){if(!n[l]){if(!e[l]){var a="function"==typeof require&&require;if(!s&&a)return a(l,!0);if(i)return i(l,!0);var c=new Error("Cannot find module '"+l+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[l]={exports:{}};e[l][0].call(u.exports,function(t){var n=e[l][1][t];return o(n?n:t)},u,u.exports,t,e,n,r)}return n[l].exports}for(var i="function"==typeof require&&require,l=0;l<r.length;l++)o(r[l]);return o}({1:[function(t,e){"use strict";function n(t){t.fn.perfectScrollbar=function(e){return this.each(function(){if("object"==typeof e||"undefined"==typeof e){var n=e;o.get(this)||r.initialize(this,n)}else{var i=e;"update"===i?r.update(this):"destroy"===i&&r.destroy(this)}return t(this)})}}var r=t("../main"),o=t("../plugin/instances");if("function"==typeof define&&define.amd)define(["jquery"],n);else{var i=window.jQuery?window.jQuery:window.$;"undefined"!=typeof i&&n(i)}e.exports=n},{"../main":7,"../plugin/instances":18}],2:[function(t,e,n){"use strict";function r(t,e){var n=t.className.split(" ");n.indexOf(e)<0&&n.push(e),t.className=n.join(" ")}function o(t,e){var n=t.className.split(" "),r=n.indexOf(e);r>=0&&n.splice(r,1),t.className=n.join(" ")}n.add=function(t,e){t.classList?t.classList.add(e):r(t,e)},n.remove=function(t,e){t.classList?t.classList.remove(e):o(t,e)},n.list=function(t){return t.classList?t.classList:t.className.split(" ")}},{}],3:[function(t,e,n){"use strict";function r(t,e){return window.getComputedStyle(t)[e]}function o(t,e,n){return"number"==typeof n&&(n=n.toString()+"px"),t.style[e]=n,t}function i(t,e){for(var n in e){var r=e[n];"number"==typeof r&&(r=r.toString()+"px"),t.style[n]=r}return t}n.e=function(t,e){var n=document.createElement(t);return n.className=e,n},n.appendTo=function(t,e){return e.appendChild(t),t},n.css=function(t,e,n){return"object"==typeof e?i(t,e):"undefined"==typeof n?r(t,e):o(t,e,n)},n.matches=function(t,e){return"undefined"!=typeof t.matches?t.matches(e):"undefined"!=typeof t.matchesSelector?t.matchesSelector(e):"undefined"!=typeof t.webkitMatchesSelector?t.webkitMatchesSelector(e):"undefined"!=typeof t.mozMatchesSelector?t.mozMatchesSelector(e):"undefined"!=typeof t.msMatchesSelector?t.msMatchesSelector(e):void 0},n.remove=function(t){"undefined"!=typeof t.remove?t.remove():t.parentNode.removeChild(t)}},{}],4:[function(t,e){"use strict";var n=function(t){this.element=t,this.events={}};n.prototype.bind=function(t,e){"undefined"==typeof this.events[t]&&(this.events[t]=[]),this.events[t].push(e),this.element.addEventListener(t,e,!1)},n.prototype.unbind=function(t,e){var n="undefined"!=typeof e;this.events[t]=this.events[t].filter(function(r){return n&&r!==e?!0:(this.element.removeEventListener(t,r,!1),!1)},this)},n.prototype.unbindAll=function(){for(var t in this.events)this.unbind(t)};var r=function(){this.eventElements=[]};r.prototype.eventElement=function(t){var e=this.eventElements.filter(function(e){return e.element===t})[0];return"undefined"==typeof e&&(e=new n(t),this.eventElements.push(e)),e},r.prototype.bind=function(t,e,n){this.eventElement(t).bind(e,n)},r.prototype.unbind=function(t,e,n){this.eventElement(t).unbind(e,n)},r.prototype.unbindAll=function(){for(var t=0;t<this.eventElements.length;t++)this.eventElements[t].unbindAll()},r.prototype.once=function(t,e,n){var r=this.eventElement(t),o=function(t){r.unbind(e,o),n(t)};r.bind(e,o)},e.exports=r},{}],5:[function(t,e){"use strict";e.exports=function(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}}()},{}],6:[function(t,e,n){"use strict";var r=t("./class"),o=t("./dom");n.toInt=function(t){return"string"==typeof t?parseInt(t,10):~~t},n.clone=function(t){if(null===t)return null;if("object"==typeof t){var e={};for(var n in t)e[n]=this.clone(t[n]);return e}return t},n.extend=function(t,e){var n=this.clone(t);for(var r in e)n[r]=this.clone(e[r]);return n},n.isEditable=function(t){return o.matches(t,"input,[contenteditable]")||o.matches(t,"select,[contenteditable]")||o.matches(t,"textarea,[contenteditable]")||o.matches(t,"button,[contenteditable]")},n.removePsClasses=function(t){for(var e=r.list(t),n=0;n<e.length;n++){var o=e[n];0===o.indexOf("ps-")&&r.remove(t,o)}},n.outerWidth=function(t){return this.toInt(o.css(t,"width"))+this.toInt(o.css(t,"paddingLeft"))+this.toInt(o.css(t,"paddingRight"))+this.toInt(o.css(t,"borderLeftWidth"))+this.toInt(o.css(t,"borderRightWidth"))},n.startScrolling=function(t,e){r.add(t,"ps-in-scrolling"),"undefined"!=typeof e?r.add(t,"ps-"+e):(r.add(t,"ps-x"),r.add(t,"ps-y"))},n.stopScrolling=function(t,e){r.remove(t,"ps-in-scrolling"),"undefined"!=typeof e?r.remove(t,"ps-"+e):(r.remove(t,"ps-x"),r.remove(t,"ps-y"))},n.env={isWebKit:"WebkitAppearance"in document.documentElement.style,supportsTouch:"ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,supportsIePointer:null!==window.navigator.msMaxTouchPoints}},{"./class":2,"./dom":3}],7:[function(t,e){"use strict";var n=t("./plugin/destroy"),r=t("./plugin/initialize"),o=t("./plugin/update");e.exports={initialize:r,update:o,destroy:n}},{"./plugin/destroy":9,"./plugin/initialize":17,"./plugin/update":20}],8:[function(t,e){"use strict";e.exports={wheelSpeed:1,wheelPropagation:!1,swipePropagation:!0,minScrollbarLength:null,maxScrollbarLength:null,useBothWheelAxes:!1,useKeyboard:!0,suppressScrollX:!1,suppressScrollY:!1,scrollXMarginOffset:0,scrollYMarginOffset:0}},{}],9:[function(t,e){"use strict";var n=t("../lib/dom"),r=t("../lib/helper"),o=t("./instances");e.exports=function(t){var e=o.get(t);e.event.unbindAll(),n.remove(e.scrollbarX),n.remove(e.scrollbarY),n.remove(e.scrollbarXRail),n.remove(e.scrollbarYRail),r.removePsClasses(t),o.remove(t)}},{"../lib/dom":3,"../lib/helper":6,"./instances":18}],10:[function(t,e){"use strict";function n(t,e){function n(t){return t.getBoundingClientRect()}var o=window.Event.prototype.stopPropagation.bind;e.event.bind(e.scrollbarY,"click",o),e.event.bind(e.scrollbarYRail,"click",function(o){var l=r.toInt(e.scrollbarYHeight/2),s=o.pageY-n(e.scrollbarYRail).top-l,a=e.containerHeight-e.scrollbarYHeight,c=s/a;0>c?c=0:c>1&&(c=1),t.scrollTop=(e.contentHeight-e.containerHeight)*c,i(t)}),e.event.bind(e.scrollbarX,"click",o),e.event.bind(e.scrollbarXRail,"click",function(o){var l=r.toInt(e.scrollbarXWidth/2),s=o.pageX-n(e.scrollbarXRail).left-l;console.log(o.pageX,e.scrollbarXRail.offsetLeft);var a=e.containerWidth-e.scrollbarXWidth,c=s/a;0>c?c=0:c>1&&(c=1),t.scrollLeft=(e.contentWidth-e.containerWidth)*c,i(t)})}var r=t("../../lib/helper"),o=t("../instances"),i=t("../update-geometry");e.exports=function(t){var e=o.get(t);n(t,e)}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19}],11:[function(t,e){"use strict";function n(t,e){function n(n){var o=r+n,l=e.containerWidth-e.scrollbarXWidth;e.scrollbarXLeft=0>o?0:o>l?l:o;var s=i.toInt(e.scrollbarXLeft*(e.contentWidth-e.containerWidth)/(e.containerWidth-e.scrollbarXWidth));t.scrollLeft=s}var r=null,l=null,a=function(e){n(e.pageX-l),s(t),e.stopPropagation(),e.preventDefault()},c=function(){i.stopScrolling(t,"x"),e.event.unbind(e.ownerDocument,"mousemove",a)};e.event.bind(e.scrollbarX,"mousedown",function(n){l=n.pageX,r=i.toInt(o.css(e.scrollbarX,"left")),i.startScrolling(t,"x"),e.event.bind(e.ownerDocument,"mousemove",a),e.event.once(e.ownerDocument,"mouseup",c),n.stopPropagation(),n.preventDefault()})}function r(t,e){function n(n){var o=r+n,l=e.containerHeight-e.scrollbarYHeight;e.scrollbarYTop=0>o?0:o>l?l:o;var s=i.toInt(e.scrollbarYTop*(e.contentHeight-e.containerHeight)/(e.containerHeight-e.scrollbarYHeight));t.scrollTop=s}var r=null,l=null,a=function(e){n(e.pageY-l),s(t),e.stopPropagation(),e.preventDefault()},c=function(){i.stopScrolling(t,"y"),e.event.unbind(e.ownerDocument,"mousemove",a)};e.event.bind(e.scrollbarY,"mousedown",function(n){l=n.pageY,r=i.toInt(o.css(e.scrollbarY,"top")),i.startScrolling(t,"y"),e.event.bind(e.ownerDocument,"mousemove",a),e.event.once(e.ownerDocument,"mouseup",c),n.stopPropagation(),n.preventDefault()})}var o=t("../../lib/dom"),i=t("../../lib/helper"),l=t("../instances"),s=t("../update-geometry");e.exports=function(t){var e=l.get(t);n(t,e),r(t,e)}},{"../../lib/dom":3,"../../lib/helper":6,"../instances":18,"../update-geometry":19}],12:[function(t,e){"use strict";function n(t,e){function n(n,r){var o=t.scrollTop;if(0===n){if(!e.scrollbarYActive)return!1;if(0===o&&r>0||o>=e.contentHeight-e.containerHeight&&0>r)return!e.settings.wheelPropagation}var i=t.scrollLeft;if(0===r){if(!e.scrollbarXActive)return!1;if(0===i&&0>n||i>=e.contentWidth-e.containerWidth&&n>0)return!e.settings.wheelPropagation}return!0}var o=!1;e.event.bind(t,"mouseenter",function(){o=!0}),e.event.bind(t,"mouseleave",function(){o=!1});var l=!1;e.event.bind(e.ownerDocument,"keydown",function(s){if((!s.isDefaultPrevented||!s.isDefaultPrevented())&&o){var a=document.activeElement?document.activeElement:e.ownerDocument.activeElement;if(a){for(;a.shadowRoot;)a=a.shadowRoot.activeElement;if(r.isEditable(a))return}var c=0,u=0;switch(s.which){case 37:c=-30;break;case 38:u=30;break;case 39:c=30;break;case 40:u=-30;break;case 33:u=90;break;case 32:case 34:u=-90;break;case 35:u=s.ctrlKey?-e.contentHeight:-e.containerHeight;break;case 36:u=s.ctrlKey?t.scrollTop:e.containerHeight;break;default:return}t.scrollTop=t.scrollTop-u,t.scrollLeft=t.scrollLeft+c,i(t),l=n(c,u),l&&s.preventDefault()}})}var r=t("../../lib/helper"),o=t("../instances"),i=t("../update-geometry");e.exports=function(t){var e=o.get(t);n(t,e)}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19}],13:[function(t,e){"use strict";function n(t,e){function n(n,r){var o=t.scrollTop;if(0===n){if(!e.scrollbarYActive)return!1;if(0===o&&r>0||o>=e.contentHeight-e.containerHeight&&0>r)return!e.settings.wheelPropagation}var i=t.scrollLeft;if(0===r){if(!e.scrollbarXActive)return!1;if(0===i&&0>n||i>=e.contentWidth-e.containerWidth&&n>0)return!e.settings.wheelPropagation}return!0}function o(t){var e=t.deltaX,n=-1*t.deltaY;return("undefined"==typeof e||"undefined"==typeof n)&&(e=-1*t.wheelDeltaX/6,n=t.wheelDeltaY/6),t.deltaMode&&1===t.deltaMode&&(e*=10,n*=10),e!==e&&n!==n&&(e=0,n=t.wheelDelta),[e,n]}function l(l){if(r.env.isWebKit||!t.querySelector("select:focus")){var a=o(l),c=a[0],u=a[1];s=!1,e.settings.useBothWheelAxes?e.scrollbarYActive&&!e.scrollbarXActive?(t.scrollTop=u?t.scrollTop-u*e.settings.wheelSpeed:t.scrollTop+c*e.settings.wheelSpeed,s=!0):e.scrollbarXActive&&!e.scrollbarYActive&&(t.scrollLeft=c?t.scrollLeft+c*e.settings.wheelSpeed:t.scrollLeft-u*e.settings.wheelSpeed,s=!0):(t.scrollTop=t.scrollTop-u*e.settings.wheelSpeed,t.scrollLeft=t.scrollLeft+c*e.settings.wheelSpeed),i(t),s=s||n(c,u),s&&(l.stopPropagation(),l.preventDefault())}}var s=!1;"undefined"!=typeof window.onwheel?e.event.bind(t,"wheel",l):"undefined"!=typeof window.onmousewheel&&e.event.bind(t,"mousewheel",l)}var r=t("../../lib/helper"),o=t("../instances"),i=t("../update-geometry");e.exports=function(t){var e=o.get(t);n(t,e)}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19}],14:[function(t,e){"use strict";function n(t,e){e.event.bind(t,"scroll",function(){o(t)})}var r=t("../instances"),o=t("../update-geometry");e.exports=function(t){var e=r.get(t);n(t,e)}},{"../instances":18,"../update-geometry":19}],15:[function(t,e){"use strict";function n(t,e){function n(){var t=window.getSelection?window.getSelection():document.getSelection?document.getSelection():"";return 0===t.toString().length?null:t.getRangeAt(0).commonAncestorContainer}function l(){a||(a=setInterval(function(){return o.get(t)?(t.scrollTop=t.scrollTop+c.top,t.scrollLeft=t.scrollLeft+c.left,void i(t)):void clearInterval(a)},50))}function s(){a&&(clearInterval(a),a=null),r.stopScrolling(t)}var a=null,c={top:0,left:0},u=!1;e.event.bind(e.ownerDocument,"selectionchange",function(){t.contains(n())?u=!0:(u=!1,s())}),e.event.bind(window,"mouseup",function(){u&&(u=!1,s())}),e.event.bind(window,"mousemove",function(e){if(u){var n={x:e.pageX,y:e.pageY},o={left:t.offsetLeft,right:t.offsetLeft+t.offsetWidth,top:t.offsetTop,bottom:t.offsetTop+t.offsetHeight};n.x<o.left+3?(c.left=-5,r.startScrolling(t,"x")):n.x>o.right-3?(c.left=5,r.startScrolling(t,"x")):c.left=0,n.y<o.top+3?(c.top=o.top+3-n.y<5?-5:-20,r.startScrolling(t,"y")):n.y>o.bottom-3?(c.top=n.y-o.bottom+3<5?5:20,r.startScrolling(t,"y")):c.top=0,0===c.top&&0===c.left?s():l()}})}var r=t("../../lib/helper"),o=t("../instances"),i=t("../update-geometry");e.exports=function(t){var e=o.get(t);n(t,e)}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19}],16:[function(t,e){"use strict";function n(t,e,n,i){function l(n,r){var o=t.scrollTop,i=t.scrollLeft,l=Math.abs(n),s=Math.abs(r);if(s>l){if(0>r&&o===e.contentHeight-e.containerHeight||r>0&&0===o)return!e.settings.swipePropagation}else if(l>s&&(0>n&&i===e.contentWidth-e.containerWidth||n>0&&0===i))return!e.settings.swipePropagation;return!0}function s(e,n){t.scrollTop=t.scrollTop-n,t.scrollLeft=t.scrollLeft-e,o(t)}function a(){y=!0}function c(){y=!1}function u(t){return t.targetTouches?t.targetTouches[0]:t}function d(t){return t.targetTouches&&1===t.targetTouches.length?!0:t.pointerType&&"mouse"!==t.pointerType&&t.pointerType!==t.MSPOINTER_TYPE_MOUSE?!0:!1}function p(t){if(d(t)){w=!0;var e=u(t);b.pageX=e.pageX,b.pageY=e.pageY,g=(new Date).getTime(),null!==m&&clearInterval(m),t.stopPropagation()}}function f(t){if(!y&&w&&d(t)){var e=u(t),n={pageX:e.pageX,pageY:e.pageY},r=n.pageX-b.pageX,o=n.pageY-b.pageY;s(r,o),b=n;var i=(new Date).getTime(),a=i-g;a>0&&(v.x=r/a,v.y=o/a,g=i),l(r,o)&&(t.stopPropagation(),t.preventDefault())}}function h(){!y&&w&&(w=!1,clearInterval(m),m=setInterval(function(){return r.get(t)?Math.abs(v.x)<.01&&Math.abs(v.y)<.01?void clearInterval(m):(s(30*v.x,30*v.y),v.x*=.8,void(v.y*=.8)):void clearInterval(m)},10))}var b={},g=0,v={},m=null,y=!1,w=!1;n&&(e.event.bind(window,"touchstart",a),e.event.bind(window,"touchend",c),e.event.bind(t,"touchstart",p),e.event.bind(t,"touchmove",f),e.event.bind(t,"touchend",h)),i&&(window.PointerEvent?(e.event.bind(window,"pointerdown",a),e.event.bind(window,"pointerup",c),e.event.bind(t,"pointerdown",p),e.event.bind(t,"pointermove",f),e.event.bind(t,"pointerup",h)):window.MSPointerEvent&&(e.event.bind(window,"MSPointerDown",a),e.event.bind(window,"MSPointerUp",c),e.event.bind(t,"MSPointerDown",p),e.event.bind(t,"MSPointerMove",f),e.event.bind(t,"MSPointerUp",h)))}var r=t("../instances"),o=t("../update-geometry");e.exports=function(t,e,o){var i=r.get(t);n(t,i,e,o)}},{"../instances":18,"../update-geometry":19}],17:[function(t,e){"use strict";var n=t("../lib/class"),r=t("../lib/helper"),o=t("./instances"),i=t("./update-geometry"),l=t("./handler/click-rail"),s=t("./handler/drag-scrollbar"),a=t("./handler/keyboard"),c=t("./handler/mouse-wheel"),u=t("./handler/native-scroll"),d=t("./handler/selection"),p=t("./handler/touch");e.exports=function(t,e){e="object"==typeof e?e:{},n.add(t,"ps-container");var f=o.add(t);f.settings=r.extend(f.settings,e),l(t),s(t),c(t),u(t),d(t),(r.env.supportsTouch||r.env.supportsIePointer)&&p(t,r.env.supportsTouch,r.env.supportsIePointer),f.settings.useKeyboard&&a(t),i(t)}},{"../lib/class":2,"../lib/helper":6,"./handler/click-rail":10,"./handler/drag-scrollbar":11,"./handler/keyboard":12,"./handler/mouse-wheel":13,"./handler/native-scroll":14,"./handler/selection":15,"./handler/touch":16,"./instances":18,"./update-geometry":19}],18:[function(t,e,n){"use strict";function r(t){var e=this;e.settings=d.clone(a),e.containerWidth=null,e.containerHeight=null,e.contentWidth=null,e.contentHeight=null,e.isRtl="rtl"===s.css(t,"direction"),e.event=new c,e.ownerDocument=t.ownerDocument||document,e.scrollbarXRail=s.appendTo(s.e("div","ps-scrollbar-x-rail"),t),e.scrollbarX=s.appendTo(s.e("div","ps-scrollbar-x"),e.scrollbarXRail),e.scrollbarXActive=null,e.scrollbarXWidth=null,e.scrollbarXLeft=null,e.scrollbarXBottom=d.toInt(s.css(e.scrollbarXRail,"bottom")),e.isScrollbarXUsingBottom=e.scrollbarXBottom===e.scrollbarXBottom,e.scrollbarXTop=e.isScrollbarXUsingBottom?null:d.toInt(s.css(e.scrollbarXRail,"top")),e.railBorderXWidth=d.toInt(s.css(e.scrollbarXRail,"borderLeftWidth"))+d.toInt(s.css(e.scrollbarXRail,"borderRightWidth")),e.railXMarginWidth=d.toInt(s.css(e.scrollbarXRail,"marginLeft"))+d.toInt(s.css(e.scrollbarXRail,"marginRight")),e.railXWidth=null,e.scrollbarYRail=s.appendTo(s.e("div","ps-scrollbar-y-rail"),t),e.scrollbarY=s.appendTo(s.e("div","ps-scrollbar-y"),e.scrollbarYRail),e.scrollbarYActive=null,e.scrollbarYHeight=null,e.scrollbarYTop=null,e.scrollbarYRight=d.toInt(s.css(e.scrollbarYRail,"right")),e.isScrollbarYUsingRight=e.scrollbarYRight===e.scrollbarYRight,e.scrollbarYLeft=e.isScrollbarYUsingRight?null:d.toInt(s.css(e.scrollbarYRail,"left")),e.scrollbarYOuterWidth=e.isRtl?d.outerWidth(e.scrollbarY):null,e.railBorderYWidth=d.toInt(s.css(e.scrollbarYRail,"borderTopWidth"))+d.toInt(s.css(e.scrollbarYRail,"borderBottomWidth")),e.railYMarginHeight=d.toInt(s.css(e.scrollbarYRail,"marginTop"))+d.toInt(s.css(e.scrollbarYRail,"marginBottom")),e.railYHeight=null}function o(t){return"undefined"==typeof t.dataset?t.getAttribute("data-ps-id"):t.dataset.psId}function i(t,e){"undefined"==typeof t.dataset?t.setAttribute("data-ps-id",e):t.dataset.psId=e}function l(t){"undefined"==typeof t.dataset?t.removeAttribute("data-ps-id"):delete t.dataset.psId}var s=t("../lib/dom"),a=t("./default-setting"),c=t("../lib/event-manager"),u=t("../lib/guid"),d=t("../lib/helper"),p={};n.add=function(t){var e=u();return i(t,e),p[e]=new r(t),p[e]},n.remove=function(t){delete p[o(t)],l(t)},n.get=function(t){return p[o(t)]}},{"../lib/dom":3,"../lib/event-manager":4,"../lib/guid":5,"../lib/helper":6,"./default-setting":8}],19:[function(t,e){"use strict";function n(t,e){return t.settings.minScrollbarLength&&(e=Math.max(e,t.settings.minScrollbarLength)),t.settings.maxScrollbarLength&&(e=Math.min(e,t.settings.maxScrollbarLength)),e}function r(t,e){var n={width:e.railXWidth};n.left=e.isRtl?t.scrollLeft+e.containerWidth-e.contentWidth:t.scrollLeft,e.isScrollbarXUsingBottom?n.bottom=e.scrollbarXBottom-t.scrollTop:n.top=e.scrollbarXTop+t.scrollTop,i.css(e.scrollbarXRail,n);var r={top:t.scrollTop,height:e.railYHeight};e.isScrollbarYUsingRight?r.right=e.isRtl?e.contentWidth-t.scrollLeft-e.scrollbarYRight-e.scrollbarYOuterWidth:e.scrollbarYRight-t.scrollLeft:r.left=e.isRtl?t.scrollLeft+2*e.containerWidth-e.contentWidth-e.scrollbarYLeft-e.scrollbarYOuterWidth:e.scrollbarYLeft+t.scrollLeft,i.css(e.scrollbarYRail,r),i.css(e.scrollbarX,{left:e.scrollbarXLeft,width:e.scrollbarXWidth-e.railBorderXWidth}),i.css(e.scrollbarY,{top:e.scrollbarYTop,height:e.scrollbarYHeight-e.railBorderYWidth})}var o=t("../lib/class"),i=t("../lib/dom"),l=t("../lib/helper"),s=t("./instances");e.exports=function(t){var e=s.get(t);e.containerWidth=t.clientWidth,e.containerHeight=t.clientHeight,e.contentWidth=t.scrollWidth,e.contentHeight=t.scrollHeight,!e.settings.suppressScrollX&&e.containerWidth+e.settings.scrollXMarginOffset<e.contentWidth?(e.scrollbarXActive=!0,e.railXWidth=e.containerWidth-e.railXMarginWidth,e.scrollbarXWidth=n(e,l.toInt(e.railXWidth*e.containerWidth/e.contentWidth)),e.scrollbarXLeft=l.toInt(t.scrollLeft*(e.railXWidth-e.scrollbarXWidth)/(e.contentWidth-e.containerWidth))):(e.scrollbarXActive=!1,e.scrollbarXWidth=0,e.scrollbarXLeft=0,t.scrollLeft=0),!e.settings.suppressScrollY&&e.containerHeight+e.settings.scrollYMarginOffset<e.contentHeight?(e.scrollbarYActive=!0,e.railYHeight=e.containerHeight-e.railYMarginHeight,e.scrollbarYHeight=n(e,l.toInt(e.railYHeight*e.containerHeight/e.contentHeight)),e.scrollbarYTop=l.toInt(t.scrollTop*(e.railYHeight-e.scrollbarYHeight)/(e.contentHeight-e.containerHeight))):(e.scrollbarYActive=!1,e.scrollbarYHeight=0,e.scrollbarYTop=0,t.scrollTop=0),e.scrollbarXLeft>=e.railXWidth-e.scrollbarXWidth&&(e.scrollbarXLeft=e.railXWidth-e.scrollbarXWidth),e.scrollbarYTop>=e.railYHeight-e.scrollbarYHeight&&(e.scrollbarYTop=e.railYHeight-e.scrollbarYHeight),r(t,e),o[e.scrollbarXActive?"add":"remove"](t,"ps-active-x"),o[e.scrollbarYActive?"add":"remove"](t,"ps-active-y")}},{"../lib/class":2,"../lib/dom":3,"../lib/helper":6,"./instances":18}],20:[function(t,e){"use strict";var n=t("../lib/dom"),r=t("./destroy"),o=t("./initialize"),i=t("./instances"),l=t("./update-geometry");e.exports=function(t){var e=i.get(t);e.scrollbarXRail&&t.contains(e.scrollbarXRail)&&e.scrollbarYRail&&t.contains(e.scrollbarYRail)?(n.css(e.scrollbarXRail,"display","none"),n.css(e.scrollbarYRail,"display","none"),l(t),n.css(e.scrollbarXRail,"display","block"),n.css(e.scrollbarYRail,"display","block")):(r(t),o(t))}},{"../lib/dom":3,"./destroy":9,"./initialize":17,"./instances":18,"./update-geometry":19}]},{},[1]);
(function(a,b){if(typeof define==="function"&&define.amd){define(b)}else{if(typeof module==="object"&&module.exports){module.exports.Dragdealer=b()}else{a.Dragdealer=b()}}}(this,function(){var j=function(q,p){this.options=this.applyDefaults(p||{});this.bindMethods();this.wrapper=this.getWrapperElement(q);if(!this.wrapper){return}this.handle=this.getHandleElement(this.wrapper,this.options.handleClass);if(!this.handle){return}this.init();this.bindEventListeners()};j.prototype={defaults:{disabled:false,horizontal:true,vertical:false,slide:true,steps:0,snap:false,loose:false,speed:0.1,xPrecision:0,yPrecision:0,handleClass:"handle",css3:true,activeClass:"active",tapping:true},init:function(){if(this.options.css3){o(this.handle)}this.value={prev:[-1,-1],current:[this.options.x||0,this.options.y||0],target:[this.options.x||0,this.options.y||0]};this.offset={wrapper:[0,0],mouse:[0,0],prev:[-999999,-999999],current:[0,0],target:[0,0]};this.dragStartPosition={x:0,y:0};this.change=[0,0];this.stepRatios=this.calculateStepRatios();this.activity=false;this.dragging=false;this.tapping=false;this.reflow();if(this.options.disabled){this.disable()}},applyDefaults:function(q){for(var p in this.defaults){if(!q.hasOwnProperty(p)){q[p]=this.defaults[p]}}return q},getWrapperElement:function(p){if(typeof(p)=="string"){return document.getElementById(p)}else{return p}},getHandleElement:function(t,p){var r,s,q;if(t.getElementsByClassName){r=t.getElementsByClassName(p);if(r.length>0){return r[0]}}else{s=new RegExp("(^|\\s)"+p+"(\\s|$)");r=t.getElementsByTagName("*");for(q=0;q<r.length;q++){if(s.test(r[q].className)){return r[q]}}}},calculateStepRatios:function(){var p=[];if(this.options.steps>=1){for(var q=0;q<=this.options.steps-1;q++){if(this.options.steps>1){p[q]=q/(this.options.steps-1)}else{p[q]=0}}}return p},setWrapperOffset:function(){this.offset.wrapper=c.get(this.wrapper)},calculateBounds:function(){var p={top:this.options.top||0,bottom:-(this.options.bottom||0)+this.wrapper.offsetHeight,left:this.options.left||0,right:-(this.options.right||0)+this.wrapper.offsetWidth};p.availWidth=(p.right-p.left)-this.handle.offsetWidth;p.availHeight=(p.bottom-p.top)-this.handle.offsetHeight;return p},calculateValuePrecision:function(){var p=this.options.xPrecision||Math.abs(this.bounds.availWidth),q=this.options.yPrecision||Math.abs(this.bounds.availHeight);return[p?1/p:0,q?1/q:0]},bindMethods:function(){if(typeof(this.options.customRequestAnimationFrame)==="function"){this.requestAnimationFrame=i(this.options.customRequestAnimationFrame,window)}else{this.requestAnimationFrame=i(h,window)}if(typeof(this.options.customCancelAnimationFrame)==="function"){this.cancelAnimationFrame=i(this.options.customCancelAnimationFrame,window)}else{this.cancelAnimationFrame=i(g,window)}this.animateWithRequestAnimationFrame=i(this.animateWithRequestAnimationFrame,this);this.animate=i(this.animate,this);this.onHandleMouseDown=i(this.onHandleMouseDown,this);this.onHandleTouchStart=i(this.onHandleTouchStart,this);this.onDocumentMouseMove=i(this.onDocumentMouseMove,this);this.onWrapperTouchMove=i(this.onWrapperTouchMove,this);this.onWrapperMouseDown=i(this.onWrapperMouseDown,this);this.onWrapperTouchStart=i(this.onWrapperTouchStart,this);this.onDocumentMouseUp=i(this.onDocumentMouseUp,this);this.onDocumentTouchEnd=i(this.onDocumentTouchEnd,this);this.onHandleClick=i(this.onHandleClick,this);this.onWindowResize=i(this.onWindowResize,this)},bindEventListeners:function(){e(this.handle,"mousedown",this.onHandleMouseDown);e(this.handle,"touchstart",this.onHandleTouchStart);e(document,"mousemove",this.onDocumentMouseMove);e(this.wrapper,"touchmove",this.onWrapperTouchMove);e(this.wrapper,"mousedown",this.onWrapperMouseDown);e(this.wrapper,"touchstart",this.onWrapperTouchStart);e(document,"mouseup",this.onDocumentMouseUp);e(document,"touchend",this.onDocumentTouchEnd);e(this.handle,"click",this.onHandleClick);e(window,"resize",this.onWindowResize);this.animate(false,true);this.interval=this.requestAnimationFrame(this.animateWithRequestAnimationFrame)},unbindEventListeners:function(){b(this.handle,"mousedown",this.onHandleMouseDown);b(this.handle,"touchstart",this.onHandleTouchStart);b(document,"mousemove",this.onDocumentMouseMove);b(this.wrapper,"touchmove",this.onWrapperTouchMove);b(this.wrapper,"mousedown",this.onWrapperMouseDown);b(this.wrapper,"touchstart",this.onWrapperTouchStart);b(document,"mouseup",this.onDocumentMouseUp);b(document,"touchend",this.onDocumentTouchEnd);b(this.handle,"click",this.onHandleClick);b(window,"resize",this.onWindowResize);this.cancelAnimationFrame(this.interval)},onHandleMouseDown:function(p){n.refresh(p);f(p);a(p);this.activity=false;this.startDrag()},onHandleTouchStart:function(p){n.refresh(p);a(p);this.activity=false;this.startDrag()},onDocumentMouseMove:function(p){if((p.clientX-this.dragStartPosition.x)===0&&(p.clientY-this.dragStartPosition.y)===0){return}n.refresh(p);if(this.dragging){this.activity=true;f(p)}},onWrapperTouchMove:function(p){n.refresh(p);if(!this.activity&&this.draggingOnDisabledAxis()){if(this.dragging){this.stopDrag()}return}f(p);this.activity=true},onWrapperMouseDown:function(p){n.refresh(p);f(p);this.startTap()},onWrapperTouchStart:function(p){n.refresh(p);f(p);this.startTap()},onDocumentMouseUp:function(p){this.stopDrag();this.stopTap()},onDocumentTouchEnd:function(p){this.stopDrag();this.stopTap()},onHandleClick:function(p){if(this.activity){f(p);a(p)}},onWindowResize:function(p){this.reflow()},enable:function(){this.disabled=false;this.handle.className=this.handle.className.replace(/\s?disabled/g,"")},disable:function(){this.disabled=true;this.handle.className+=" disabled"},reflow:function(){this.setWrapperOffset();this.bounds=this.calculateBounds();this.valuePrecision=this.calculateValuePrecision();this.updateOffsetFromValue()},getStep:function(){return[this.getStepNumber(this.value.target[0]),this.getStepNumber(this.value.target[1])]},getStepWidth:function(){return Math.abs(this.bounds.availWidth/this.options.steps)},getValue:function(){return this.value.target},setStep:function(q,r,p){this.setValue(this.options.steps&&q>1?(q-1)/(this.options.steps-1):0,this.options.steps&&r>1?(r-1)/(this.options.steps-1):0,p)},setValue:function(q,r,p){this.setTargetValue([q,r||0]);if(p){this.groupCopy(this.value.current,this.value.target);this.updateOffsetFromValue();this.callAnimationCallback()}},startTap:function(){if(this.disabled||!this.options.tapping){return}this.tapping=true;this.setWrapperOffset();this.setTargetValueByOffset([n.x-this.offset.wrapper[0]-(this.handle.offsetWidth/2),n.y-this.offset.wrapper[1]-(this.handle.offsetHeight/2)])},stopTap:function(){if(this.disabled||!this.tapping){return}this.tapping=false;this.setTargetValue(this.value.current)},startDrag:function(){if(this.disabled){return}this.dragging=true;this.setWrapperOffset();this.dragStartPosition={x:n.x,y:n.y};this.offset.mouse=[n.x-c.get(this.handle)[0],n.y-c.get(this.handle)[1]];if(!this.wrapper.className.match(this.options.activeClass)){this.wrapper.className+=" "+this.options.activeClass}this.callDragStartCallback()},stopDrag:function(){if(this.disabled||!this.dragging){return}this.dragging=false;var q=this.bounds.availWidth===0?0:((n.x-this.dragStartPosition.x)/this.bounds.availWidth),p=this.bounds.availHeight===0?0:((n.y-this.dragStartPosition.y)/this.bounds.availHeight),t=[q,p];var s=this.groupClone(this.value.current);if(this.options.slide){var r=this.change;s[0]+=r[0]*4;s[1]+=r[1]*4}this.setTargetValue(s);this.wrapper.className=this.wrapper.className.replace(" "+this.options.activeClass,"");this.callDragStopCallback(t)},callAnimationCallback:function(){var p=this.value.current;if(this.options.snap&&this.options.steps>1){p=this.getClosestSteps(p)}if(!this.groupCompare(p,this.value.prev)){if(typeof(this.options.animationCallback)=="function"){this.options.animationCallback.call(this,p[0],p[1])}this.groupCopy(this.value.prev,p)}},callTargetCallback:function(){if(typeof(this.options.callback)=="function"){this.options.callback.call(this,this.value.target[0],this.value.target[1])}},callDragStartCallback:function(){if(typeof(this.options.dragStartCallback)=="function"){this.options.dragStartCallback.call(this,this.value.target[0],this.value.target[1])}},callDragStopCallback:function(p){if(typeof(this.options.dragStopCallback)=="function"){this.options.dragStopCallback.call(this,this.value.target[0],this.value.target[1],p)}},animateWithRequestAnimationFrame:function(p){if(p){this.timeOffset=this.timeStamp?p-this.timeStamp:0;this.timeStamp=p}else{this.timeOffset=25}this.animate();this.interval=this.requestAnimationFrame(this.animateWithRequestAnimationFrame)},animate:function(s,r){if(s&&!this.dragging){return}if(this.dragging){var p=this.groupClone(this.value.target);var q=[n.x-this.offset.wrapper[0]-this.offset.mouse[0],n.y-this.offset.wrapper[1]-this.offset.mouse[1]];this.setTargetValueByOffset(q,this.options.loose);this.change=[this.value.target[0]-p[0],this.value.target[1]-p[1]]}if(this.dragging||r){this.groupCopy(this.value.current,this.value.target)}if(this.dragging||this.glide()||r){this.updateOffsetFromValue();this.callAnimationCallback()}},glide:function(){var p=[this.value.target[0]-this.value.current[0],this.value.target[1]-this.value.current[1]];if(!p[0]&&!p[1]){return false}if(Math.abs(p[0])>this.valuePrecision[0]||Math.abs(p[1])>this.valuePrecision[1]){this.value.current[0]+=p[0]*Math.min(this.options.speed*this.timeOffset/25,1);this.value.current[1]+=p[1]*Math.min(this.options.speed*this.timeOffset/25,1)}else{this.groupCopy(this.value.current,this.value.target)}return true},updateOffsetFromValue:function(){if(!this.options.snap){this.offset.current=this.getOffsetsByRatios(this.value.current)}else{this.offset.current=this.getOffsetsByRatios(this.getClosestSteps(this.value.current))}if(!this.groupCompare(this.offset.current,this.offset.prev)){this.renderHandlePosition();this.groupCopy(this.offset.prev,this.offset.current)}},renderHandlePosition:function(){var p="";if(this.options.css3&&d.transform){if(this.options.horizontal){p+="translateX("+this.offset.current[0]+"px)"}if(this.options.vertical){p+=" translateY("+this.offset.current[1]+"px)"}this.handle.style[d.transform]=p;return}if(this.options.horizontal){this.handle.style.left=this.offset.current[0]+"px"}if(this.options.vertical){this.handle.style.top=this.offset.current[1]+"px"}},setTargetValue:function(p,r){var q=r?this.getLooseValue(p):this.getProperValue(p);this.groupCopy(this.value.target,q);this.offset.target=this.getOffsetsByRatios(q);this.callTargetCallback()},setTargetValueByOffset:function(r,s){var p=this.getRatiosByOffsets(r);var q=s?this.getLooseValue(p):this.getProperValue(p);this.groupCopy(this.value.target,q);this.offset.target=this.getOffsetsByRatios(q)},getLooseValue:function(q){var p=this.getProperValue(q);return[p[0]+((q[0]-p[0])/4),p[1]+((q[1]-p[1])/4)]},getProperValue:function(q){var p=this.groupClone(q);p[0]=Math.max(p[0],0);p[1]=Math.max(p[1],0);p[0]=Math.min(p[0],1);p[1]=Math.min(p[1],1);if((!this.dragging&&!this.tapping)||this.options.snap){if(this.options.steps>1){p=this.getClosestSteps(p)}}return p},getRatiosByOffsets:function(p){return[this.getRatioByOffset(p[0],this.bounds.availWidth,this.bounds.left),this.getRatioByOffset(p[1],this.bounds.availHeight,this.bounds.top)]},getRatioByOffset:function(r,p,q){return p?(r-q)/p:0},getOffsetsByRatios:function(p){return[this.getOffsetByRatio(p[0],this.bounds.availWidth,this.bounds.left),this.getOffsetByRatio(p[1],this.bounds.availHeight,this.bounds.top)]},getOffsetByRatio:function(q,p,r){return Math.round(q*p)+r},getStepNumber:function(p){return this.getClosestStep(p)*(this.options.steps-1)+1},getClosestSteps:function(p){return[this.getClosestStep(p[0]),this.getClosestStep(p[1])]},getClosestStep:function(s){var p=0;var r=1;for(var q=0;q<=this.options.steps-1;q++){if(Math.abs(this.stepRatios[q]-s)<r){r=Math.abs(this.stepRatios[q]-s);p=q}}return this.stepRatios[p]},groupCompare:function(q,p){return q[0]==p[0]&&q[1]==p[1]},groupCopy:function(q,p){q[0]=p[0];q[1]=p[1]},groupClone:function(p){return[p[0],p[1]]},draggingOnDisabledAxis:function(){return(!this.options.horizontal&&n.xDiff>n.yDiff)||(!this.options.vertical&&n.yDiff>n.xDiff)}};var i=function(q,p){return function(){return q.apply(p,arguments)}};var e=function(p,q,r){if(p.addEventListener){p.addEventListener(q,r,false)}else{if(p.attachEvent){p.attachEvent("on"+q,r)}}};var b=function(p,q,r){if(p.removeEventListener){p.removeEventListener(q,r,false)}else{if(p.detachEvent){p.detachEvent("on"+q,r)}}};var f=function(p){if(!p){p=window.event}if(p.preventDefault){p.preventDefault()}p.returnValue=false};var a=function(p){if(!p){p=window.event}if(p.stopPropagation){p.stopPropagation()}p.cancelBubble=true};var n={x:0,y:0,xDiff:0,yDiff:0,refresh:function(p){if(!p){p=window.event}if(p.type=="mousemove"){this.set(p)}else{if(p.touches){this.set(p.touches[0])}}},set:function(r){var q=this.x,p=this.y;if(r.clientX||r.clientY){this.x=r.clientX;this.y=r.clientY}else{if(r.pageX||r.pageY){this.x=r.pageX-document.body.scrollLeft-document.documentElement.scrollLeft;this.y=r.pageY-document.body.scrollTop-document.documentElement.scrollTop}}this.xDiff=Math.abs(this.x-q);this.yDiff=Math.abs(this.y-p)}};var c={get:function(q){var p={left:0,top:0};if(q.getBoundingClientRect!==undefined){p=q.getBoundingClientRect()}return[p.left,p.top]}};var d={transform:l("transform"),perspective:l("perspective"),backfaceVisibility:l("backfaceVisibility")};function l(s){var r="Webkit Moz ms O".split(" "),q=document.documentElement.style;if(q[s]!==undefined){return s}s=s.charAt(0).toUpperCase()+s.substr(1);for(var p=0;p<r.length;p++){if(q[r[p]+s]!==undefined){return r[p]+s}}}function o(p){if(d.backfaceVisibility&&d.perspective){p.style[d.perspective]="1000px";p.style[d.backfaceVisibility]="hidden"}}var m=["webkit","moz"];var h=window.requestAnimationFrame;var g=window.cancelAnimationFrame;for(var k=0;k<m.length&&!h;++k){h=window[m[k]+"RequestAnimationFrame"];g=window[m[k]+"CancelAnimationFrame"]||window[m[k]+"CancelRequestAnimationFrame"]}if(!h){h=function(p){return setTimeout(p,25)};g=clearTimeout}return j}));
/*jslint sloppy: true*/
/*global $, jQuery, alert*/
function showShade(delay, noClose) {
	if (delay === undefined) {
        delay = 0;
    }
    
	if (noClose === true) {
        jQuery('#shade').addClass('no-close');
    }

	jQuery('#shade').delay(delay).fadeIn();
}

function hideShade(delay) {
	if (delay === undefined) {
        delay = 0;
    }

	jQuery('#shade').delay(delay).removeClass('no-close').fadeOut();
}
jQuery(document).ready(function ($) {
	$('#shade').click(function (e) {
        e.preventDefault();

		if ($(this).hasClass('no-close')) {
            return;
        }

        if ($('.close-me.visible').length > 0) {
            $('.close-me.visible').find('.button-close.open').trigger('click');
        } else {
            $('.close-me').fadeOut();
        }

		hideShade();
	});

    //Hide-Show offices in the footer
    $("#offices-btn").on("click", function (e) {
        e.preventDefault();

        if ($(window).width() < 768 && $('body').hasClass('blog')) {
            $('.c-panel-link a').trigger('click');
        }

        if (!$('#foot').hasClass('expanded')) {
            var $foot = $('#foot'),
                officesHeight = -10; // 20 margin is excess. We don't want to count it in

            // get the total offices height
            $foot.find('.office').each(function () {
                officesHeight += $(this).outerHeight(true);
                if (officesHeight > 230) {
                    officesHeight = 230;
                }
            });

            if (($('body').hasClass('single-post') || $('body').hasClass('page-template-quicklinks-new')) && $(window).width() < 768) {
                officesHeight = 200;
                $('.clickarea').trigger('click');
            }


            $("#arrow").html('&#9650;');
            $foot.height(officesHeight).addClass('expanded');

            // make the cookies go up
            $('.cookies').animate({
                bottom: officesHeight
            }, 300, 'swing');
        } else {
            $('#foot').css({ height: '' }).removeClass('expanded');
            $("#arrow").html('&#9660;');

            $('.cookies').animate({
                bottom: 30
            }, 300, 'linear');
        }
        // $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        return false;
    });

    //Hide-Show development menu
    $("#development-responsive-menu").on("click", function (e) {
        e.preventDefault();

        if (!$('#responsive-dev-menu').is(':visible')) {
            $('#responsive-dev-menu').slideDown(500);
        } else {
            $('#responsive-dev-menu').slideUp(500);
        }
    });

    //Hide-Show team member details
    $(".close-open-details").click(function (e) {
        e.preventDefault();

        $(this).closest(".team-tale-details").slideUp(1000);
    });
});

function showClose(delay, parent) {
    if (delay === undefined) {
        delay = 0;
    }
    if (parent === undefined) {
        parent = 'body';
    }

    setTimeout(function () {
        jQuery(parent).find('.button-close').addClass('open');

        setTimeout(function ($parent) {
            $parent.find('.bg').addClass('open');
        }, delay, jQuery(parent));
    }, delay);
}

jQuery(document).ready(function () {

    /*
     * Grab the .button-close-me click event.
     * If there is any parent with "close-me" class I will close it, otherwise I just ignore the event
     */
    jQuery('.button-close').click(function (e) {
        e.preventDefault();

        if (jQuery(this).parents('.team-info.reveal-modal.open').length > 0) {
            return false;
        }

        if (jQuery(this).parent().attr('id') === 'fees') {
            jQuery('.responsive-grid .item').removeClass('no-flip');
        }

        jQuery(this).removeClass('open');
        jQuery(this).find('.bg').removeClass('open');

        var $parent = jQuery(this).closest('.close-me');
        if ($parent.hasClass('no-close')) {
            return;
        }

        //nothing to do
        if (!$parent) {
            return;
        }

        // if ( jQuery( this ).hasClass( 'button-close' ) ) {
        setTimeout(function () {
            $parent.addClass('close').removeClass('visible open');
            $parent.find('.bg').removeClass('visible');
            hideShade();
        }, 600);
    });
});


/**
 * This function was written originally for parallax page ( about-us )
 */
function animateVisibleContent() {
    /**
     * check if the hidden items are visible, if so show it
     */
    jQuery('.show-me').each(function () {
        //Adjust the left position by adding the left value of the 3d transform
        var offset = jQuery(this).offset().left + getMatrixM41(this),
            offsetRight = offset + this.offsetWidth,
            $animatables = jQuery(this).find('.animate-me'); //Animatable elements

        if (offset >= 0 && offsetRight <= window.innerWidth) {
            //In some cases I can't use delay, for examples on link, otherwise the color change will takes a lot...
            $animatables.each(function () {
                var $this = jQuery(this);

                //remove the reverted animation
                $this.removeClass($this.data('revert'));

                //I have to do it only the first time
                if ($this.data('delay')) {

                    //Still running the timeout?
                    if ($this.data('timeout') != 1) {
                        setTimeout(function ($e) {
                            $e.addClass('show');
                        }, $this.data('delay'), $this);
                    }

                    $this.data('timeout', 1);
                } else {
                    $this.addClass('show');
                }
            });

            // $animatables.addClass( 'show' );

        } else {
            // $animatables.removeClass( 'show' ).data( 'timeout', '' );
            $animatables.data('timeout', '');

            $animatables.each(function () {
                if (jQuery(this).data('revert')) {
                    jQuery(this).addClass(jQuery(this).data('revert'));
                } else {
                    jQuery(this).removeClass('show');
                }
            });
        }
    });
}

/**
 * based on http://jsfiddle.net/duopixel/wzZ5R/
 *
 * get the "transform" property using getComputedStyle and took off the element m41.
 * original code use webkit function, this will work on all browsers ( maybe )
 */
function getMatrixM41(e) {
    var transformer = window.getComputedStyle(e).transform,
        numberPattern = /[-0-9.]+/g, //match all the numbers
        matchNo;

    if (transformer !== undefined) {
        matchNo = transformer.match(numberPattern);

        // console.log( transform, match );
        return (matchNo === null) ? 0 : parseFloat(matchNo[5]);
    }
}

//Y
function getMatrixM40(e) {
    var transform = window.getComputedStyle(e).transform,
        numberPattern = /[-0-9.]+/g, //match all the numbers
        match = transform.match(numberPattern);

    return (match === null) ? 0 : parseFloat(match[4]);
}

/**
 * Return the total width of the selected items
 */
function getTotalWidth($e) {
    var width = 0;

    $e.each(function () {
        width += $e.outerWidth();
    });

    return width;
}


/**
 * Check if the browser is in fullscreen mode
 */
function isFullScreen() {
    return window.innerHeight === screen.height;
}

/**
 * Add the class .show on load
 */
function showOnload() {
    jQuery(window).load(function () {
        jQuery('.show-onload').each(function () {
            jQuery(this).addClass('show');
        });
    });
}

/**
 * Set cookie
 * @param {String}
 * @param {String}
 * @param {int}
 */
function setCookie(cname, cvalue, exdays) {
    var d = new Date(),
        expires;
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

/**
 * Get the cookie stored under cname
 * @param  {String}
 * @return {String}
 */
function getCookie(cname) {
    var name = cname + "=",
        ca = document.cookie.split(';'),
        i,
        c;
    for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Check if cookie is set
 * @return {null}
 */
function checkCookiePolicy() {
    var policy = getCookie("cookiePolicy");
    if (!policy) {
        // show the cookie policy
        jQuery('.cookies').removeClass('hide').addClass('show');
        jQuery('.cookies .button-close').click(function () {
            policy = true;
            setCookie("cookiePolicy", policy, 31622400); // 1 year :)
			jQuery('.cookies').addClass('hide');
        });

    }
}

jQuery(function () {
	jQuery(window).load(function () {
		jQuery("img.lazy").lazyload();
		jQuery('.perfect-scrollbar').perfectScrollbar();
	});

	// this is for the single developments only
	// load images after 5 seconds
	jQuery(function () {
		jQuery("img.lazy").lazyload({
			event: "sporty"
		});
	});

	jQuery(document).ready(function () {
		jQuery('#grid').scroll(function () {
			jQuery("img.lazy").lazyload();
		});

		jQuery('#strips').scroll(function () {
			jQuery('img.lazy').lazyload();
		});
	});

	if (jQuery('body').hasClass('single-developments')) {
		jQuery(window).bind("load", function () {
			var timeout = setTimeout(function () {
				jQuery("img.lazy").trigger("sporty")
			}, 5000);
		});
	}
});

jQuery(document).ready(function ($) {
	$(document).foundation('reflow');

	// check if the cookie policy is set
	checkCookiePolicy();

	// after 2 seconds the quick request should drop down
	$(window).load(function () {
		if ($('#register').length > 0 && $('body').hasClass('page-child')) {
			$('#register').addClass('visible');

			$('#register .title').click(function () {
				$(this).parent().find('.the-content').slideToggle();
			});
		}

		setTimeout(function () {
			$('#register .title').trigger('click');
		}, 2000);

		if ($('body').hasClass('blog') || $('body').hasClass('page-child'))
			return false;

		if ($('body').hasClass('single-developments') && $('body').find('#timetable').length > 0) {
			setTimeout(function () {
				$('#register .title').trigger('click');
			}, 7000);
		} else if (!$('body').hasClass('single-developments')) {
			setTimeout(function () {
				$('#register .title').trigger('click');
				// $( '.quick-request-link' ).trigger( 'click' );
			}, 2000);
		}
	});

	if ($('#myholder').length > 0) {
		$windowHeight = $(window).height();

		var $top = $windowHeight / 2 - 400;
		if ($top < -100) {
			$top = 0;
		}
		// set coverflow height according to the window height
		$('#myholder').css('margin-top', $top);

		if ($windowHeight < 600) {
			$('.bottomlogo2 img').hide();
		}
	}

	// for the single prop views
	// responsive bus view
	if ($('body').hasClass('single-post')) {
		var busW = 550;
		var rentW = 41;
		var sellW = 37.5;
		var clickW = 91;
		var slideW = 67;
		var descW = 935;

		var bus = $('#bus > a');
		var rent = bus.find('.text-rent');
		var sell = bus.find('.text-sell');
		var click = bus.find('.text-click');
		var slide = bus.find('.cycle-slideshow');
		var desc = $('.desc');

		var ratio = 1;

		function busSize() {
			if (desc.width() < 600) {
				ratio = 100 / 600 * desc.width() / 100;
			}

			bus.width(busW * ratio);
			rent.width(rentW * ratio);
			sell.width(sellW * ratio);
			click.width(clickW * ratio);
			slide.width(slideW * ratio);
		}

		busSize();

		$(window).resize(function () {
			busSize();
		});
	}

	//Deferred loading
	$('.load-me').on('loadme', function () {
		var $this = $(this);
		if ($this.hasClass('loaded')) return;

		var src = $this.data('src');

		// console.log( "Deferred: ", this.tagName, src );
		if (this.tagName.toLowerCase() == "video") {
			// if window is mobile size, just don't load the video
			if ($(window).width() < 767) {
				return false;
			}
			var video = document.createElement('video');
			video.id = this.id;
			video.src = src;
			video.setAttribute('type', 'video/mp4');
			// video.setAttribute('class', '');

			if ($this.hasClass('autoplay')) {
				video.setAttribute('autoplay', 'autoplay');
				video.setAttribute('loop', 'loop');
			}

			$(this).parent().append(video);
			$(this).remove();
		} else if (this.tagName.toLowerCase() == "audio") {
			var $source = $('<source>');
			$source.attr('src', src).attr('type', 'audio/mpeg');

			$this.append($source);
		} else {
			$this.attr('src', src);
		}

		$this.addClass('loaded').removeClass('load-later');
	});

	// console.log( "Content to be loaded: ", $( '.load-me' ).length );
	// load this things after window load :)
	$(window).load( function() {
		$('.load-me').each(function () {
			if ($(this).hasClass('load-later')) return;

			$(this).trigger('loadme');
		});
	});

	// load the background images lazyly too
	$(window).load( function() {
		$('.lazy-background').each( function() {
			// the data-background-url contains the bakcground url. LOL
			$bckUrl = $(this).data('background-url');

			// put it as a css background image
			$(this).css({
				backgroundImage: 'url(' + $bckUrl + ')'
			});
		});
	});

	var isiPad = navigator.userAgent.match(/iPad/i) !== null;

	// Top menu open / close
	jQuery('#mtrigger').click(function (e) {
		e.preventDefault();
		jQuery('.slmenu').toggleClass('visible').toggle('fast', 'swing');

		if (jQuery('.slmenu').hasClass('visible') && !jQuery('#menugrayout').is(':visible'))
			jQuery('#menugrayout').fadeIn('fast');

		if (!jQuery('.slmenu').hasClass('visible') && !jQuery('#menugrayout').hasClass('no-close')) {
			jQuery('#menugrayout').fadeOut('fast');
		}

		showClose(500, '#menu');
		jQuery('nav .right .hideme').fadeToggle();

		jQuery('#changethis').toggleText('Menu', 'CLOSE');

	});

	// Footer open / close
	jQuery('.clickarea').click(function (e) {
		e.preventDefault();
		if ($(window).width() > 767) {
			jQuery('.offinfo').toggle('slow');

			/*
			 * in contact-us page the footer is visible by default, so I don't have to show the
			 * shadow on the first click
			 */
			if (!jQuery('#footer-inner').hasClass("expanded")) {
				jQuery('#menugrayout').fadeToggle('slow');
			}

			jQuery('.back-footer-office').fadeToggle('slow');

			jQuery('.bottomlogo img').fadeToggle('slow');

			jQuery('#footer-inner').removeClass("expanded");
		} else {
			jQuery('.offinfo').not($(this).nextAll('.offinfo')).hide('slow');
			jQuery(this).nextAll('.offinfo').toggle('slow');
		}
	});

	jQuery('.c-panel .fa.more').click(function (e) {
		e.preventDefault();
		var speed = (jQuery('.quick-links-content').length > 0 && !jQuery('.fa.more').hasClass('open')) ? 0 : 400;
		jQuery('.c-panel .fa.more').toggleClass('open');
		jQuery('#more-results').slideToggle(speed);

		return false;
	});

	//close open content if scanlines are clicked
	jQuery('#menugrayout').click(function (e) {
		e.preventDefault();
		//TODO: Add no-close class to avoid menugrayout close on click
		if (jQuery(this).hasClass('no-close')) return;

		if (jQuery('.slmenu').is(":visible")) {
			jQuery('.slmenu').toggleClass('visible').toggle('slow');
		}
		if (jQuery('.offinfo').is(":visible")) {
			jQuery('.offinfo').toggle('slow');
		}
		if (jQuery('#quickview').is(":visible")) {
			jQuery('#quickview').fadeOut('slow');
			jQuery('#contentabout').fadeTo(500, 1);
		}

		jQuery('#changethis').toggleText('Menu', 'CLOSE');

		if (jQuery('.close-me').length > 0)
			jQuery('.close-me').trigger('click');

		jQuery('#menugrayout').fadeOut();
	});

	// sound controls
	jQuery('.sound-control').click(function (e) {
		e.preventDefault();

		if (jQuery(this).hasClass('off')) {
			jQuery(this).addClass('on').removeClass('off');
			jQuery(this).find('.state').text('on');
			jQuery('video, audio').each(function () {
				jQuery(this).prop('muted', false);
				Cookies.set('muted', false);
			});
		} else if (jQuery(this).hasClass('on')) {
			jQuery(this).addClass('off').removeClass('on');
			jQuery(this).find('.state').text('off');
			jQuery('video, audio').each(function () {
				jQuery(this).prop('muted', true);
				Cookies.set('muted', true);
			});
		}
	});

	// if the cookie is set to muted, let it be muted :)
	if (Cookies.get('muted') == "true") {
		jQuery('.sound-control').removeClass('on').addClass('off');
		jQuery('.sound-control').find('.state').text('off');

		jQuery('video, audio').each(function () {
			jQuery(this).prop('muted', true);
		});
	}


	if (jQuery('body').find('#parallax').length > 0 || jQuery('body').find('#tablet-parallax').length) {
		jQuery('.back-to-top').remove();
	}

	// Scroll to top
	jQuery('.back-to-top').click(function (e) {
		e.preventDefault();

		jQuery("html, body").animate({
			scrollTop: 0
		}, "slow"); // for normal pages
		jQuery('#grid').animate({
			scrollTop: 0
		}, "slow"); // for the grid layout
		jQuery('#strips').animate({
			scrollTop: 0
		}, "slow"); // and this is for the a-z list layout
	});

	/**
	 * To show the parallaxes, I will change the original link to parallax link
	 * This will ensure if JS is turned off on the browser, the client will see
	 * the page normally, and won't be stucked on parallax
	 */
});

function vmap(lat, lon, content) {
	//point = new google.maps.LatLng(51.52098748772112, -0.14747858047485352);
	point = new google.maps.LatLng(lat, lon);

	map = new google.maps.Map(document.getElementById("mapholder"), {
		center: new google.maps.LatLng(0, 0),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		// panControlOptions: {
		// 	position: google.maps.ControlPosition.LEFT_BOTTOM
		// },
		// mapTypeControl: true,
		// mapTypeControlOptions: {
		// 	style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
		// 	position: google.maps.ControlPosition.LEFT_BOTTOM
		// },
		// zoomControlOptions: {
		// 	style: google.maps.ZoomControlStyle.SMALL,
		// 	position: google.maps.ControlPosition.LEFT_BOTTOM
		// },
		// streetViewControl: true
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.BOTTOM_CENTER
		},
		zoomControl: true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.LEFT_CENTER
		},
		scaleControl: true,
		streetViewControl: true,
		streetViewControlOptions: {
			position: google.maps.ControlPosition.LEFT_BOTTOM
		}
	});

	var bni_style = [
		{
			featureType: "road.arterial",
			stylers: [
				{
					hue: "#a99959"
				},
				{
					visibility: "on"
				},
				{
					saturation: 0
				}
			]
		},
		{
			featureType: "landscape.man_made",
			stylers: [
				{
					visibility: "on"
				},
				{
					hue: "#342F1F"
				},
				{
					saturation: 40
				}
			]
		},
		{
			stylers: [
				{
					visibility: "on"
				},
				{
					hue: "#a99959"
				},
				{
					saturation: -65
				},
				{
					lightness: -7
				}
			]
		}
	];

	// var image = new google.maps.MarkerImage ('/wp-content/themes/new_theme/img/gj-marker-double.png');

	var image = {
		url: '/wp-content/themes/new_theme/img/gj-marker-double.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(42, 76),
		scaledSize: new google.maps.Size(21, 38)
	};

	var marker = new google.maps.Marker({
		position: point,
		map: map,
		animation: google.maps.Animation.DROP,
		icon: image
	});

	if (content) {
		var infowindow = new google.maps.InfoWindow();

		infowindow.setContent(content.html());
		infowindow.open(map, marker);
	}

	map.setCenter(point);
	// map.setOptions({styles: bni_style});

	google.maps.event.addListenerOnce(map, 'idle', function () {
		var map_gradient = document.createElement('div');
		map_gradient.setAttribute('id', 'map-gradient');
		jQuery('#heading div').first().append(map_gradient);
		jQuery('.gmnoprint').css('z-index', '92');
	});
}



function vsv(lat, lon) {
	var fenway = new google.maps.LatLng(lat, lon);

	// Note: constructed panorama objects have visible: true
	// set by default.
	var panoOptions = {
		position: fenway,
		addressControlOptions: {
			position: google.maps.ControlPosition.BOTTOM_CENTER
		},
		pov: {
			heading: 1, // php if (get_field('svhd')){ the_field('svhd'); } else { echo 1; } ,
			pitch: 1
		},

		linksControl: false,
		panControl: false,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL
		},

		enableCloseButton: false
	};

	var panorama = new google.maps.StreetViewPanorama(
		document.getElementById('mapholder'), panoOptions);
}

jQuery.fn.extend({
	toggleText: function (a, b) {
		var isClicked = false;
		var that = this;

		setTimeout(function (that) {
			if (!jQuery('.slmenu').hasClass('visible')) {
				that.text(a);
			} else {
				that.text(b);
			}
		}, 100, this);
	}
});

jQuery('#changethis').toggleText('Menu', 'CLOSE');

//Left subitems menu
jQuery(document).ready(function () {
	jQuery('.submenu li.subitems').each(function () {
		$li = jQuery(this).prev();

		$li.click(function () {
			//Close all the active menus
			jQuery('.submenu > li.show').not(this).each(function () {
				toggleSubmenu(jQuery(this));
			});

			toggleSubmenu(jQuery(this));

			return false;
		});
	});

	//There is some active subitems?
	$active = jQuery('.submenu li.subitems a.active');

	if ($active.length > 0) {
		toggleSubmenu($active.parents('li.subitems').prev());
	}

	//The active main menu has subitems?
	$active = jQuery('.submenu > li a.active');
	if ($active.length > 0) {
		if ($active.parents('li').next().hasClass('subitems')) toggleSubmenu($active.parents('li'));
	}
});

function toggleSubmenu($this) {
	$next = $this.next();

	$this.toggleClass('show');

	var h = ($this.hasClass('show')) ? ($next.find('ul').outerHeight() + 20) : 0;
	$next.animate({
		height: h
	}, 'slow');
}
// footer quick links
jQuery(document).ready(function () {

	jQuery('.c-panel-link a').click(function (e) {
		e.preventDefault();

		if (jQuery('.quick-links-content').length > 0 && !jQuery('.fa.more').hasClass('open') &&
			!jQuery(this).hasClass('close')) {
			jQuery('.fa.more').trigger('click');
		}

		// jQuery( '.c-panel' ).slideToggle();
		if (jQuery('.c-panel').is(':visible')) {
			jQuery('.c-panel').slideUp();
			jQuery('#more-results').slideUp();
			jQuery('.css-big-plus, .css-plus').removeClass('close');
		} else {
			jQuery('.c-panel').slideDown();
			jQuery('#more-results').slideDown();
			jQuery('.css-big-plus, .css-plus').addClass('close');
		}

		jQuery('.c-panel').promise().done(function () {
			if ( jQuery( '.c-panel' ).is(':visible') && jQuery(window).width() > 767 ) {
				jQuery('.clickarea').css('pointer-events', 'none');
			} else {
				jQuery('.clickarea').css('pointer-events', '');
			}
		});

		return false;
	});

});

// form accordian for quick links
jQuery(document).ready(function () {
	jQuery('#toggle-form').click(function () {
		jQuery('#field_11_5, #field_11_6, #field_11_10, #field_11_8').slideToggle();
	});
});

var SimpleLazy = {
	$_items: null,

	init: function () {
		this.$_items = jQuery('.quick-links-content #wording > .row').children();

		setTimeout(function () {
			SimpleLazy.onScroll();
		}, 500);

		this.isFF = navigator.sayswho.toLowerCase().indexOf('firefox') >= 0;

		jQuery(document).scroll(this.onScroll);
	},

	onScroll: function (e) {
		//        jQuery( '.quick-links-content #wording' ).css( { top: - jQuery( document ).scrollTop() } );
		jQuery('.quick-links-content #wording').stop(true, false).transit({
			y: -jQuery(document).scrollTop()
		}, 0);

		/*
		 * There is some issue with ff, probably due a some shit css rules, and so it ignore "fixed" position.
		 * This hack just move all the body in according to scroll position
		 */
		if (SimpleLazy.isFF) {
			jQuery('.page-template-templatesquicklinks-php').css({
				marginTop: jQuery(document).scrollTop()
			});
		}

		setTimeout(function () {
			var j = 0;

			SimpleLazy.$_items.each(function (i) {
				var visible = SimpleLazy.isVisible(jQuery(this));
			});
		}, 100);
	},

	/*
	 * In according to current page scroll value, check if the item is visible
	 */
	isVisible: function ($item) {
		//Page scroll value
		var scroll = jQuery(document).scrollTop();
		var height = window.outerHeight;
		var top = $item.position().top + 85;
		var windowScroll = (height + scroll - 200);


		var visible = top <= windowScroll;

		if (visible && !$item.hasClass('visible')) {
			$item.removeClass('hide-to-top').addClass('visible show-from-bottom');

		}

		//The div is no longer visible ( is above of displayed content )
		scroll += 85;
		var isAbove = top <= scroll;

		if (isAbove) {
			var opacity = (scroll - top) / scroll;

			$item.css({
				opacity: 0.6 - Math.abs(opacity)
			});
		} else {
			if ($item.hasClass('visible'))
				$item.css('opacity', '');
		}

		scroll -= 100;
		isAbove = top <= scroll;

		if (isAbove && !$item.hasClass('hide-to-top')) {
			$item.addClass('hide-to-top').removeClass('visible');
		}

		top += 50;
		if (top > windowScroll) {
			$item.removeClass('visible').removeClass('show-from-bottom').removeClass('hide-to-top');
		}

		return visible;
	}
};

jQuery(document).ready(function () {
	var $ql = jQuery(".quick-links-content");

	$ql.find('.property-image').each(function () {
		jQuery(this).attr('src', jQuery(this).data('src'));
	});
	//
	// if( ! jQuery( 'html' ).hasClass( 'touch' ) ) {
	//     SimpleLazy.init();
	//     var width = $ql.width();
	//
	//     $ql.css( { marginLeft: - width / 2, left: '50%' } );
	//
	//     setTimeout( function() {
	//         $ql.animate( { top: -30, opacity: 1 }, 'slow', function() {
	//             jQuery( '.more-options li.subitems' ).css( { height: 'auto' } );
	//
	//             jQuery( '.div-empty, .scroll-me > .row' ).height( $ql.outerHeight() + jQuery( '.more-options' ).outerHeight() );
	//             jQuery( '.more-options li.subitems' ).css( { height: 0 } );
	//         });
	//     }, 500 );
	//
	// } else {
	//     $ql.show();
	//
	//     //In portrait mode check if the "Contact Us now" div fix in the page
	//     jQuery( document ).resize( function() {
	//         setTimeout( function() {
	//             var $cus = jQuery( '.page-template-templatesquicklinks-php .wiref3' );
	//
	//             //Remove the height attribute in landscape
	//             if( document.body.clientWidth > document.body.clientHeight ) {
	//                 $cus.css( 'height', '' );
	//             } else {
	//                 if( $cus.position().top + $cus.outerHeight() > document.body.clientHeight ) {
	//                     $cus.height( document.body.clientHeight - $cus.position().top - 50 );
	//                 }
	//             }
	//
	//         }, 500 );
	//     });
	// }
});

navigator.sayswho = (function () {
	var ua = navigator.userAgent,
		tem,
		M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return 'IE ' + (tem[1] || '');
	}
	if (M[1] === 'Chrome') {
		tem = ua.match(/\bOPR\/(\d+)/);
		if (tem !== null) return 'Opera ' + tem[1];
	}
	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	if ((tem = ua.match(/version\/(\d+)/i)) !== null) M.splice(1, 1, tem[1]);
	return M.join(' ');
})();

jQuery(document).ready(function () {
	if (jQuery('body.single-post, body.single-2d').length > 0) {
		jQuery(document).scroll(function () {
			jQuery('#heading').css({
				top: -jQuery(document).scrollTop() / 8
			});
		});
	}
});

//Swiper
jQuery(document).ready(function ($) {
	if ($('body').hasClass('single-post')) {
		swiper = new Swiper('.swiper-container', {
			slidesPerView: 1,
			loop: true,
			shadow: false,
			//3D Flow:
			tdFlow: {
				rotate: 30,
				stretch: 10,
				depth: 100,
				modifier: 1,
				shadows: false
			}
		});
		$('#lh2').on('click', function (e) {
			e.preventDefault();
			swiper.swipePrev();
		});
		$('#rh2').on('click', function (e) {
			e.preventDefault();
			swiper.swipeNext();
		});
	}
});

function isElementInViewport(el) {

	//special bonus for those using jQuery
	if (typeof jQuery === "function" && el instanceof jQuery) {
		el = el[0];
	}

	var rect = el.getBoundingClientRect();

	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
		rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
	);
}

function isElementVisible(el) {

	//special bonus for those using jQuery
	if (typeof jQuery === "function" && el instanceof jQuery) {
		el = el[0];
	}

	var rect = el.getBoundingClientRect();

	return (
		rect.top >= 0 &&
		rect.left >= 0 //&&
		// rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
		// rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
	);
}

function showPopup(id) {
	jQuery('#' + id).addClass('visible');
	showShade(500, true);
}


// resize the svg
(function ($) {
	$(document).ready(function () {
		if ($('body').hasClass('home')) {
			var scaleTo = $('.row-home').width();
			var scaleThis = $('.grafity').width();

			var scaling = 100 / scaleThis * scaleTo / 80;
			var prevTransform = $('.grafity').css('transform');
			$('.grafity').css('transform', prevTransform + ' scale(' + scaling + ')');
			// console.log('grafity scaling to: ' + scaling );
		}
	});
})(jQuery);

(function ($) {
	$(window).load(function () {
		if ($('#video1').length) {
			var windowHeight = $(window).height();
			var videoHeight = $('#video1').height();

			var marginTop = (windowHeight - videoHeight) / 2;

			$('#video1').css({
				//marginTop: marginTop
			});
		}
	});
})(jQuery);

/**
 * Add the class .show on load
 */
// function showOnload() {
jQuery(document).ready(function () {
	jQuery('.show-onload').each(function () {
		jQuery(this).addClass('show');
	});
});
// }
// showOnload();

jQuery(window).load(function () {
	(function ($) {
		var minWidth = 300,
			cellWidth = 450,
			ratio = 1.5;
		var resizeInterval = 300;
		var openItems = [];

		var $grid = $('.responsive-grid');

		var get_cell_width = function (items) {
			//30px is the width of the scrollbar
			// return ( window.innerWidth - 15 ) / items;
			return ($('#grid').width()) / items;
		};

		var reflow_grid = function (speed) {
			var items = Math.round(window.innerWidth / cellWidth);
			var width = get_cell_width(items);
			speed = speed || 400;

			/*
			 * I don't want cell smaller than the minimum size.
			 */
			if (width < minWidth && items > 1) {
				items--;
				width = get_cell_width(items);
			}
			var height = width / ratio;

			var position = {
				x: 0,
				y: 0
			};
			var currentItem = 0;
			$('.responsive-grid .item').each(function (i) {
				var $this = $(this);

				if ($this.hasClass('clone')) {
					$original = $this.data('original');

					var style = $original.attr('style');
					var re = /rotateX[^;]*/;

					style = style.replace(re, '');
					$this.attr('style', style).show();

					var $data = $this.find('.back .data');
					$data.css({
						marginTop: ($this.find('.back').outerHeight() - $data.outerHeight()) / 2
					});

					return;
				}

				if ($this.hasClass('hide-me')) {
					$this.stop(true, false).delay(currentItem * 50).transition({
						scale: 0,
						opacity: 0
					});

					return;
				}

				if (currentItem > 0 && (currentItem % items) === 0) {
					position.x = 0;
					position.y += height;
				}

				// $this.data( 'position', position );
				this.dataset.positionX = position.x;
				this.dataset.positionY = position.y;
				// console.log( $( this ).data( 'position' ) );
				$this.transition({
						x: position.x,
						y: position.y,
						width: width,
						height: height,
						scale: 1,
						opacity: 1
					}, speed,
					function () {
						showTheGridItem(this, $(this).index(), $(this).closest('.responsive-grid'));
					});

				position.x += width;
				currentItem++;
			});

			$('#grid .show-more').transition({
				x: '-50%',
				y: position.y + height + 20
			}, speed);
		};

		var showTheGridItem = function (e, index, $grid) {
			if ($(e).hasClass('visible')) return;

			var scrollTop = $(window).scrollTop() + $grid.scrollTop();
			var height = $('body').height();
			// var y = getMatrixM41( e[0] );
			var y = getMatrixM41(e.get(0));
			var isVisible = (y <= scrollTop + height - $grid.outerHeight() / 3.5);

			// console.log( isVisible, y, scrollTop, height, $grid.outerHeight() / 3.5 );

			if (isVisible) {
				var $img = $(e).find('img');
				$img.attr('src', $img.data('src'));

				$(e).addClass('visible');
				$(e).delay(50 * index).animate({
					opacity: 1
				}, 'slow');
			}
		};

		var closeOpenedItems = function () {
			openItems.forEach(function ($item) {

				$item.transition({
					rotateX: '-92deg'
				}, 100, 'linear', function () {

					var $original = $(this).data('original');

					$original.show().transition({
						rotateX: '92deg'
					}, 0).transition({
						rotateX: '0deg'
					}, 100, 'linear');
					$original.removeClass('flipped');
					$(this).remove();
					// $original.transition( { x: position.x, y: position.y, rotateX: '92deg' }, 0 ).transition( { rotateX: '0deg' }, 200, 'linear' );
				});
			});
		};

		var openItem = function (e) {
			if ($(e).hasClass('no-flip')) {
				$(e).removeClass('no-flip');

				return;
			}

			closeOpenedItems();

			var position = {
				x: e.dataset.positionX,
				y: e.dataset.positionY
			};

			$(e).transition({
				rotateX: '-92deg'
			}, 200, 'linear', function () {
				$(this).hide();

				//Duplicate the item
				var $d = $(this).clone();
				$d.attr('z-index', 1);
				$d.find('.front').hide();

				$d.find('.back').show();
				$d.data('original', $(this));
				$d.addClass('clone').show();
				openItems.push($d);

				$grid.append($d);

				// TODO: The plugin override the translate position, so I need to get it from the item
				var $data = $d.find('.back .data');
				// console.log( $d.find( '.back' ), $d.find( '.back' ).outerHeight(), $data.outerHeight(), 2 );
				$data.css({
					marginTop: ($d.find('.back').outerHeight() - $data.outerHeight()) / 2
				});

				$d.transition({
					x: position.x,
					y: position.y,
					rotateX: '92deg'
				}, 0).transition({
					rotateX: '0deg'
				}, 200, 'linear', function () {
					$(this).find('.button-close').addClass('open');
				});
			});
		};

		$(document).ready(function () {
			$('body').on('click', '.responsive-grid .item .fees, .icons .fees, #grid .fees', function () {
				$(this).closest('.item').addClass('no-flip');

				var $fees = $('#fees');
				$fees.css({
					marginLeft: -$fees.outerWidth() / 2,
					marginTop: -$fees.outerHeight() / 2
				});
				$fees.addClass('visible');

				showClose(500, $('#fees'));
				showShade();
			});

			$(document).on('click', '.responsive-grid .item, #grid .item', function (event) {
				if ($(this).hasClass('video-grid')) {
					// play the video automagically
					if ($(this).find('a').each(function () {
						if ($(this).data('revealId')) {
							var popupId = '#' + $(this).data('revealId');
							$(popupId).find('video').get(0).play();
						}
					}));
				}
				
				if ($(this).hasClass('no-back') || $(this).hasClass('video-grid') || $(this).hasClass('no-flip')) {
					return false;
				}

				url = $(this).find('.link a').attr('href');

				if ($(this).parents('article#developments').length > 0) {
					// window.open(url, '_blank')
					window.location.assign($(this).find('.link a').attr('href'));
					return false;
				}

				if ($('body').hasClass('single-developments')) {
					// window.open(url, '_blank')
					window.location.assign($(this).find('.link a').attr('href'));
					return false;
				}

				// no flipping on grid view :)
				// window.open(url, '_blank')
				window.location.assign($(this).find('.link a').attr('href'));
				return false;

				$(this).addClass('flipped');

				//Need to wait that the function .fees apply the classe, if clicked on it...
				setTimeout(function (e) {
					openItem(e);
				}, 50, this);
			});

			$(document).on('click', '.more-video', function () {
				var win = window.open($(this).attr('href'), '_blank');
				win.focus();
			});

			// $( '.responsive-grid .item' ).not( '.clone' ).not( '.no-back' ).not('.video-grid').click( function( event ) {


			// });

			$('body').on('click', '.responsive-grid .back .button-close', function () {
				closeOpenedItems();
			});

			$grid.on('reflow', function () {
				closeOpenedItems();

				reflow_grid('slow');
			}).scroll(function () {
				$('.responsive-grid .item').not('.visible').each(function (i) {
					showTheGridItem($(this), i, $grid);
				});
			});

			reflow_grid();

			if ($('body').hasClass('touchevents')) {
				$('.responsive-grid .item').addClass('visible');
			}
		});

		$('#grid').on('showNewGrid', function () {
			reflow_grid();
		});

		$(window).load(function () {
			var $rg = $('.responsive-grid');
			// $rg.height( $( 'body' ).height() + $( '#foot' ).height() * 4 );
		}).resize(function () {
			clearTimeout(resizeInterval);

			resizeInterval = setTimeout(function () {
				reflow_grid();
			}, 100);
		});

		$('.refine-arrow').click(function () {
			if ($(window).width() < 768) {
				$(this).parents('.refined-search').toggleClass('open')
			} else if ($(window).width() < 910) {
				$(this).parents('.refined-search').find('.table-cell.text-center').slideToggle();
			}
		});

		/**
		 * News tabs on mobile
		 */
		// if ( $( '#news-row' ).length ) {
		//   var nRow = $( '#news-row' );

		//   var titles = nRow.find( '.page-title' );
		//   var columns = nRow.find( '.columns' ).not('.page-title');

		//   var i = 1;

		//   titles.each( function() {
		//     $( this ).data( 'order', i++ );
		//   });

		//   if ( $( window ).width() < 768 ) {
		//     titles.first().addClass( 'active' );
		//     columns.eq(1).addClass( 'active' );
		//   }

		//   titles.click( function() {
		//     if ( $( window ).width() < 768 ) {
		//       titles.removeClass( 'active' );
		//       $( this ).addClass( 'active' );

		//       // get the order
		//       var tabOrder = $( this ).data( 'order' );

		//       columns.each( function() {
		//         if ( $( this ).data( 'order' ) == tabOrder ) {
		//           // remove active from all, and make the found one active
		//           columns.removeClass( 'active' );
		//           $( this ).addClass( 'active' );
		//         }
		//       });
		//     }
		//   });

		//   $( window ).resize( function() {
		//     var nRow = $( '#news-row' );

		//     var titles = nRow.find( '.page-title' );
		//     var columns = nRow.find( '.columns' ).not('.page-title');

		//     if ( $( window ).width() > 768 ) {
		//       titles.removeClass( 'active' );
		//       columns.removeClass( 'active' );
		//     } else {
		//       if ( ! titles.hasClass( 'active' ) ) {
		//         titles.first().addClass( 'active' );
		//         columns.eq(1).addClass( 'active' );
		//       }
		//     }
		//   });
		// }

		$(document).ready(function () {
			$('.single-post .photos.linx, .single-post .map.linx, .single-post .streetview.linx').click(function () {
				if ($(window).width() > 768) {
					$('#details').animate({
						'marginTop': $('#heading').height() - $('#navigation-menu').height() - $('.top-bar').height()
					}, 400);
					$('#register.open .title').trigger('click');
					$('.back-to-details').fadeIn();
				}
			});

			oneTimeOnly = true;
			$(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
				var modal = $(this);

				if (oneTimeOnly && modal.parents('body.single-post.safari').length > 0 && modal.attr('id') == 'worth-popup') {
					modal.css('top', parseInt(modal.css('top')) - parseInt(modal.height()));
					console.log(parseInt(modal.css('top')) - parseInt(modal.height()));
					oneTimeOnly = false;

					setTimeout(function () {
						oneTimeOnly = true;
					}, 500);
				}
			});

			$(".toggle-content-link").click(function () {
				$(this).parent().nextAll(".toggle-content").slideDown();
				$(this).hide();
				$(this).parents(".main").first().css("max-height", "300px").perfectScrollbar()
			});
		});

		$('.single .to-worth').click( function() {
			if ($(window).width() < 767) {
				$('html, body').animate({
					scrollTop: 0
				}, 400);
			}
		});
	})(jQuery);
});
(function() {
	var video = document.getElementById('video');
	if( video === null ) return;

	//Start me video?
	var startMe = video.classList.contains( 'start-me');
	var fadeMeOut = video.classList.contains( 'fade-out');

	/**
	 * Start the video on complete
	 */
	video.onloadeddata = function() {
		if( startMe ) {
			setTimeout( function( video ) {
				jQuery( video ).parent().fadeIn();

				video.play();
			}, 500, video );
		}
	};

	/**
	 * End video event?
	 */
	 video.onended = function() {
	 	//Show the main content, if exists
	 	if( jQuery( '.fade-onended' ) ) {
	 		jQuery( '.fade-onended' ).fadeIn();
	 		// jQuery( '.card img' ).addClass( 'to-screen' );

			jQuery( '.fade-onended' ).promise().done( function() {
				jQuery( '.card img' ).addClass( 'show' );
			});
	 	}

	 	if( ! fadeMeOut ) return;

 		jQuery(video).parent().delay(1000).fadeOut( 600 );
	 };
})();

function playVideo( videoId, onendCallback ) {
    var video2 = document.getElementById( videoId );

    video2.onended = onendCallback;
    video2.play();
}

function resetVideo( videoId ) {
    var video2 = document.getElementById( videoId );

    video2.currentTime = 0;
}

/**
 * Menu.js
 *
 * This script is used to manage the interaction with the website main menu.
 *
 * When I click on menu item, all the Items, except the clicked on, will be scaled. While the active one is flipped and show its sub-menu.
 * To have a better effect we don't scale each single item, but all the container. Before do it we clone the current menu item and hide it.
 * So after we scale all the site-menu element :)
 */
(function($) {

	$( document ).ready( function() {
	var lastScrollTop = 45, delta = 5;
	
	// parallax first page force
	$( '#navigation-menu .first a' ).each( function() {
		if ( $( this ).attr( 'href' ).indexOf( 'news-parallax' ) > -1 ) {
			$( this ).attr( 'href', '/news-parallax/#news' );
		} else if ( $( this ).attr( 'href' ).indexOf( 'knowledge-parallax' ) > -1 ) {
			$( this ).attr( 'href', '/knowledge-parallax/#knowledge' );
		}
	});

	$(window).scroll(function(event){
	
	});
		/**
		 * The flip animation is done.
		 *
		 * @param $e is the item who sent the event
		 */
		$( 'body' ).on( 'flipComplete', function( e, element ) {
			//Has the "menu" sub items?
			var $element = $( '.big-menu-item' ).data( 'origin' );
			var hasSubItems = $element.find( 'ul > li' ).length > 0;

			// //No subitem open the "url" defined in the back-end
			if( ! hasSubItems ) {
				var link = $element.data( 'url' );

				// cokkie skip each parallax...
				var skipParallax
				if ( Cookies.get('_gj_skip_parallax') ) {
					skipParallax = JSON.parse( Cookies.get('_gj_skip_parallax') );
				} else {
					skipParallax = {}
				}

				if ( link == '/knowledge/' && ( ! skipParallax.knowledge ) ) {
					link = '/knowledge-intro/#knowledge';

					skipParallax.knowledge = true;
				}

				Cookies.set('_gj_skip_parallax', JSON.stringify( skipParallax )) ;

				if( link !== "" ) {
					openTheLink( link );

					return false;
				}
			}

			// only check for the parallax links if it wasn't set to be skipped before
			if ( ! Cookies.get( 'skip-parallax' ) || Cookies.get( 'skip-parallax' ) == 0 ) {
				// if the cookies is set to not to skip the parallax, we need to divert the url
				$( '.big-menu-item' ).find( 'ul > li a' ).each( function() {
					var title = $( this ).data( 'title' );

					switch( title ) {
						case 'News':
							$( this ).attr( 'href', '/news-parallax/#news' );
							console.log( this )
							break;
						case 'Blog':
							$( this ).attr( 'href', '/news-parallax/#blog' );
							break;
						case 'Press':
							$( this ).attr( 'href', '/news-parallax/#press' );
							break;
						case 'All about London':
							$( this ).attr( 'href', '/knowledge-parallax/#knowledge' );
							break;
						case 'Video':
							$( this ).attr( 'href', '/developments-parallax/#video' );
							break;
					}
				});
			}
		});

		// on mobile we need to adjust the height to the screen height
		// minimum height has to be 60px
		if ( $( window ).width() < 767 ) {
			var windowH = $( window ).height();
			var headerH = $( '.top-bar' ).height();
			var footerH = $( '.site-footer' ).height();

			var menuH = ( windowH - headerH - footerH ) / 8;

			$( '.site-menu .menu-list .menu-item' ).css({
				height: menuH
			}).data( 'menuH', menuH );
		}

		$( window ).resize( function() {
			// on mobile we need to adjust the height to the screen height
			// minimum height has to be 60px
			if ( $( window ).width() < 767 ) {
				var windowH = $( window ).height();
				var headerH = $( '.top-bar' ).height();
				var footerH = $( '.site-footer' ).height();

				var menuH = ( windowH - headerH - footerH ) / 8;

				$( '.site-menu .menu-list .menu-item' ).css({
					height: menuH
				}).data( 'menuH', menuH );
			} else {
				$( '.site-menu .menu-list .menu-item' ).css({
					height: ''
				});
			}

			// resize the menu holder as well
			var menuH = $( window ).height() - $( '.top-bar' ).height() - $( '.site-footer' ).height();
			$( '#menu' ).css({
				height: menuH
			})
		});


		$( '#mobilemenutrigger a' ).click( function() {
			$( this ).find( '.hamburger' ).toggleClass( 'close' );
			$( '#mtrigger a#changethis' ).trigger( 'click' );
		});

		/**
		 * Show the menu
		 */
		$( '#mtrigger a#changethis, .show-menu' ).click( function() {
			// hide the pigeon
			setTimeout( function() {
				$( '#register' ).toggle();
			}, 250 );

			// apply position: fixed through a class on the menu so it doesn't scroll up & down on some pages
			$( '.top-bar' ).toggleClass( 'expanded' );

			var $site = $( '.site-menu' );

			var isOpen = $site.hasClass( 'visible' );

	      //Hide the bottomlogo2 and show the top one when is
	      //Store if it was visible before hide it
	      var $blogo = $( '.bottomlogo2 img' );
	      var $tlogo = $( '.toplogo' );

	      if( $blogo.data( 'isVisible' ) === undefined ) {
	          $blogo.data( 'isVisible', $blogo.is( ':visible' ) );
	      }

	        if( ! isOpen ) {
				//Calculate the right height
				var height = document.documentElement.clientHeight;
				var navHeight = $( '.top-bar' ).height();

				if ( $( window ).width() < 767 ) {
					height = height - navHeight;
				} else {
					height = height - ( navHeight * 2 ) - 12; // - $( '#foot' ).height();
				}

				$site.height( height ).toggleClass( 'visible' ).css( 'top', navHeight);

				$tlogo.addClass( 'visible' );
				$blogo.fadeOut();

				$( '#foot .gradient' ).fadeOut();

				//Toggle Menu/Close
				$( '#changethis' ).html( "close" );

				showClose( 500, '#menu' );
			} else {
		        $( '.site-menu .button-close' ).trigger( 'click' );

				if( $blogo.data( 'isVisible' ) ) {
					$blogo.fadeIn();
					$tlogo.removeClass( 'visible' );
				}

				$( '#foot .gradient' ).fadeIn();
		      	$( this ).html( "menu" );
			}

			//Toggle Menu/Close
			return false;
		});

		/**
		 * This routine take care about the menu items animation.
		 */
		$( '.site-menu .menu-item' ).click( function() {
			//There is any selected item?
			if( $( '.big-menu-item' ).length > 0 ) {
				destroyBigItem( $( this ) );
			} else {
				flipItem( $( this ) );
			}
		});

		$( '.site-menu .menu-item a' ).click( function() {
			var link = $( this ).attr( 'href' );

			openTheLink( link );

			$( '#mobilemenutrigger a' ).trigger('click');

			$( 'body' ).trigger( 'mobileChangePage' );
		});

		/**
		 * Close the menu
		 */
		$( '.site-menu .button-close' ).click( function() {
			// show the bloody pigeon
			setTimeout( function() {
				$( '#register' ).toggle();
			}, 250 );
			
			var delay = 600;

			$( '#menu .button-close, #menu .button-close *' ).removeClass( 'open' );

			if( $( '.big-menu-item' ).length > 0 ) {
				destroyBigItem( true );

				delay = 600;
			}

			setTimeout( function() {
				$( '.site-menu' ).removeClass( 'visible' );
                $( '#changethis' ).html( "menu" );
			}, delay );
		});

		//Close the big menu item
		$( 'body' ).on( 'click', '.big-menu-item', function () {
			if( $( this ).hasClass( 'loading' ) ) return;

			destroyBigItem( true );
		});

		/**
		 * Open the link
		 */
		$( 'body' ).on( 'click', '.big-menu-item a', function() {
			var link = $( this ).attr( 'href' );

			destroyBigItem( true );

			openTheLink( link );

			return false;
		});

		/*
		 * The menu items that has a video tag, play it on mouse hover
		 */
		// play it only if we are not on mobile
		if ( $( window ).width() > 768 ) {
			 $( '.site-menu .menu-item.has-video' ).mouseenter( function() {
			 	var $this = $( this );
			 	$video = $this.find( 'video' );

		 		if( $( this ).hasClass( 'menu-item-7' ) ) {
		 			$video.css( { left: 'auto', right: 0 } );
		 		} else {
			 		//Center the video in the div
			 		$video.css( { left: ( $this.width() - $video.width() ) / 2 } );
		 		}

			 	$video.addClass( 'play' );

			 	//Dom element
		 		var element = $video.get();
		 		element[0].play();
		 		element[0].currentTime = 0;
			 }).mouseleave( function() {
			 	var $this = $( this );
			 	var $video = $this.find( 'video' );

			 	//Dom element
		 		var element = $video.get();
		 		element[0].pause();
		 		element[0].currentTime = 0;

				$video.removeClass( 'play' );
			 });

			 $( '.site-menu .menu-item.has-music' ).mouseenter( function() {
			 	var $this = $( this );
			 	$music = $this.find( 'audio' );

			 	$music.addClass( 'play' );

			 	//Dom element
		 		var element = $music.get();
		 		element[0].play();
		 		element[0].currentTime = 0;
			 }).mouseleave( function() {
			 	var $this = $( this );
			 	var $music = $this.find( 'audio' );

			 	//Dom element
		 		var element = $music.get();
		 		element[0].pause();
		 		element[0].currentTime = 0;

				$music.removeClass( 'play' );
			 });
		}
	});

	/**
	 * Zoom the "big box" and open the url
	 */
	 var openTheLink = function( link ) {
		var $big = $( '.big-menu-item' );

		$big.addClass( 'loading' );
		$big.fadeOut('slow', function() {
			$(this).remove();
		});

        //Same page, do nothing...
        if( link != window.location ) {
            // $( 'body' ).fadeOut( 'slow', function() {
            // NOTE: Fade out the menu-list instead of the body
            // Body would cause a glitch, where the bck image would fade last, and not together with the rest of the elements. Looks like a Flash
        	$('.menu-list').fadeOut( 'slow', function() {
                //Close the menu first

                window.location.href = link;

                // NOTE: Checking, if the page contains an ID symbol. Usually this means, that it can be accessed from the same page
                if (link.search('#') != -1 ) {
			        $( '.site-menu .button-close' ).trigger( 'click' );
	                $( this ).delay(1000).fadeIn(); // NOTE: if we click the link to the same page, the body goes blank. This should fix it.
	            }
            });


        } else {
	        $( '.site-menu .button-close' ).trigger( 'click' );
	    }
	};

	/*
	 * For the clicked item:
	 *		1) Clone and hide it
	 *		2) Scale the menu "menu-list" element
	 *		3) Flip the cloned item
	*/
	var flipItem = function( $this ) {
		if ( $( window ).width() < 767 ) {
			// first make sure no menu item is opened

			if ( $this.find( 'ul li' ).length == 0 ) {
				window.location.assign( $this.data('url') );
			}

			$( '.site-menu .menu-list .menu-item' ).children( 'h3' ).show();
			$( '.site-menu .menu-list .menu-item' ).children( 'ul' ).hide();
			$( '.site-menu .menu-list .menu-item' ).animate({
				height: parseInt( $( '.site-menu .menu-list .menu-item' ).data( 'menuH' ) )
			}, 600 );

			if ( $this.hasClass( 'open-menu' ) ) {
				$( '.site-menu .menu-list .menu-item' ).removeClass( 'open-menu' );
				return false;
			}
			
			$( '.site-menu .menu-list .menu-item' ).removeClass( 'open-menu' );

			$( $this ).finish().animate({
				height: 285
			}, 600, function() {
				$this.addClass( 'open-menu' )
			} );

			setTimeout( function() {
				$this.children( 'h3' ).fadeOut();
				$this.children( 'ul' ).fadeIn();
			}, 500 );

			return false;
		}

		// 1) Clone the current item
		$clone = $( '<div>' ).append( $this.html() );

		//Set the classes
		$clone.addClass( 'big-menu-item menu-item-' + $this.index() ).data( 'origin', $this );
		$clone.find( 'video' ).remove();

		//Get the background-image
		$clone.css( 'background-image', $this.css( 'background-image' ) );

		//Get the parent offset to get the right absolute position
		var ulOffset = $this.parent().offset();
		var position = $this.position();


		//If a corner element? If so, adjust the left position and void the "gap" with the rest of the menu
		//Left corner items
		if( ( $this.index() ) % 4 === 0 ) {
			/*
			 * The menu final menu size will be 80% of the original one.
			 * So I have to scale the clone left position by the same amount.
			 */
			 var widthDiff = $( '.site-menu .menu-list' ).width();
			 widthDiff -= $( '.site-menu .menu-list' ).width() * 0.89;

			 var nleft = widthDiff / 2;
			//  console.log( "n", nleft );

			 //Store the value in the data, because I need to animate it for a smooth movement
			 $clone.data( 'x', nleft );
		}

		//Right corner items
		if( ( $this.index() + 1 ) % 4 === 0 ) {
			/*
			 * The menu final menu size will be 80% of the original one.
			 * So I have to scale the clone left position by the same amount.
			 */
			 var nleft = position.left * 0.925;

			 $clone.data( 'x', nleft - position.left );
		}

		//Overlay to the current one
		$clone.css( {
						top: position.top + ulOffset.top,
						left: position.left + ulOffset.left,
						width: $this.outerWidth(),
						height: $this.outerHeight()
					} );

		//Hide the original one
		$this.css( { opacity: 0 } );

		//Add the clone to the document
		$( 'body' ).append( $clone );

		// 2) Scale the menu-list element
		var nsize = { width: $this.outerWidth() * 0.8, height: $this.outerHeight() * 0.8 };
		var translate = {
							x: ( $this.outerWidth() - nsize.width ) / 2,
							y: ( $this.outerHeight() - nsize.height ) / 2
						};
		if( $this.offset().top < 100 ) translate.y *= -1;
		if( $this.offset().left < jQuery( document ).width() / 2 ) translate.x *= -1;

		if ( $( window ).width() > 767 ) {
			$( '.site-menu .menu-list' ).addClass( 'zoomed' ).transition( { scale: 0.8, y: translate.y, x: translate.x }, 200, 'linear' );
		} else {
			$( '.site-menu .menu-list' ).addClass( 'zoomed' );
			// need to make the original menu height big
			$( '.big-menu-item' ).css({
				top: $this.offset().top + $this.height() + 35
 			});
			$this.animate({
				height: 285
			}, 375 );
		}
		flipIt( $clone, -90 );

		var close = '<div class="button-close" style="top: 5px; right: 5px;"><div class="circle-arc"><svg width="100%" viewBox="0 0 100 100"><path d="M 50 50 m -43 0 a 43 43 0 1 1 86 0 a 43 43 0 1 1 -86 0"></path></svg></div><div class="bg"><div></div></div><div class="line l-0"></div><div class="line l-1"></div></div>';

		if ( $( window ).width() < 767 ) {
			$clone.append( close );

			showClose( 600, '.big-menu-item' );
		}
	};

	/*
	 * Make the flip animation
	 *
	 * @param $clone item to flip
	 * @param itemToFlip (optional ) boolean/object. If boolean just exit to the loop after the big item is been destroyed.
	 					 							 Object is the next jquery item to be selected
	 */
	var flipIt = function( $clone, angle, itemToFlip ) {
		//Apply the translate only if the "big menu item" is not flip yet.
		var translateX = parseInt( $clone.data( 'x' ) ) * ( angle < 0 );

		/*
		 * Make half animation. When angle:
		 *	< 0: I'm flipping the main face
		 *	> 0: the back ( the menu )
		 */
		if ( $( window ).width() > 767 ) {
			$clone.toggleClass( 'flip' ).transition( { perspective: '1000px', rotateX: angle + 'deg', x: translateX }, 200, 'linear', function() {
				$( this ).toggleClass( 'visible' );
			});
		} else {
			// $clone.toggleClass( 'flip' ).transition( {}, 200, 'linear', function() {
				$clone.toggleClass( 'visible' );
				

				if ( $clone.height() == 285 ) {
					$clone.css({ height: $clone.data( 'height' )  });
				} else {
					$clone.data( 'height', $clone.height() );
					$clone.css({ height: 285 });
					$( 'body' ).trigger( 'flipComplete', $( this ) );
				}

				$clone.addClass( 'active' );
			// });
		}

		/**
		 * Complete the rotation
		 */
		if ( $( window ).width() > 767 ) {
		
			setTimeout( function( $e, angle, itemToFlip ) {
				var eventType = ( itemToFlip === undefined ) ? "flipComplete" : "";

				$e.transition( { rotateX: ( angle * -1 ) + 'deg' }, 0 );
				$e.transition( { rotateX: '0deg' }, 200, 'linear', function() {
					$( this ).addClass( 'active' );

					/*
					 * Send the flipComplete event, so if need to do same manupilation just listen it :)
					 */
					if( eventType ) {
						$( 'body' ).trigger( 'flipComplete', $( this ) );
					}
				} );
			}, 200, $clone, angle, itemToFlip );

		}

		/**
		 * itemToFlip is empty when no other menu item if flipped.
		 * So, if isn't :
		 *		1) I have to return the old selected item in its original position ( unflipping it )
		 *		2) destroy the "big-menu-item" ( I need just one of it )
		 *		3) flip the new item :)
		 */
		if( itemToFlip !== undefined ) {
			setTimeout( function( itemToFlip ) {
				var $big = $( '.big-menu-item' );
				$big.data( 'origin' ).css( { opacity: 1 } );

				$big.remove();

				//Is it object?
				if( typeof( itemToFlip ) == 'object' ) {
					flipItem( itemToFlip );
				}

				$( 'body' ).trigger( 'flipDestroyes' );
			}, 400, itemToFlip );
		}

	};

	/*
	 * Destroy the big menu item, if the parameter is true, just destroy it ( so without select another one )
	 */
	var destroyBigItem = function( next ) {
		//Revert the menu position & size
		$( '.site-menu .menu-list' ).removeClass( 'zoomed' ).transition( { scale: 1, y: 0, x: 0 }, 200, 'linear' );

		if ( $( window ).width() < 767 ) {
			var windowH = $( window ).height();
			var headerH = $( '.top-bar' ).height();
			var footerH = $( '.site-footer' ).height();

			var menuH = ( windowH - headerH - footerH ) / 8;


			$( '.site-menu .menu-list .menu-item' ).animate({
				height: menuH
			}, 200 ).data( 'menuH', menuH );
		}

		//Unflip it
		flipIt( $( '.big-menu-item' ), 90, next );
	};

	$(document).ready(function() {
		// $( '.to-worth.slide' ).click( function() {
		// 	$( '#big-menu' ).addClass( 'open' );

		// 	var scrollTop = $(this).data('scroll-to');
		// 	scrollTop = $( scrollTop ).position().top;

		// 	$('#worth .the-strips').animate({
		// 		scrollTop: scrollTop
		// 	});

		// 	$( '#big-menu' ).find('.button-close').addClass('open');
		// });
		// $( '#big-menu .button-close' ).click( function() {
		// 	$( '#big-menu' ).removeClass( 'open' );
		// });
		//
		$( '#big-menu' ).find( '.button-close' ).click(function() {
			$( this ).removeClass( 'open' );
			$( '#big-menu' ).removeClass( 'open' );
		});

		//Property search popup
		$( '.search-popup' ).click( function() {
			$( '#search-popup' ).addClass( 'visible' );
			showShade( 100 ,true);
			showClose( 1000, '#search-popup' );

			var v = document.getElementById( 'video-search' );
			v.play();
		});
	});
})(jQuery);

jQuery( document ).ready( function() {
(function($){
	var ANIMATION_DELAY = 200;
	var SPAN_DELAY = 100;
	var FAT_SPEED = 900;
	var interval = 0, timeout = 0;
	var $activeItem;

	var animateNavigationMenu = function( $menu ) {
		var middle = $menu.find( '.first' ).width() / 2;
		var $li = $menu.find( '.first li' );
		var length = Math.floor( $li.length / 2 );

		/*
		 * When the # of items is odd, I don't have any item on the center,
		 * so I have to adjust the position in according to the middle ( class ) one.
		 */
		var isEven = $li.length % 2 === 0;
		if( isEven ) {
			var $middle = $( $li.get( length ) );
			middle += ( $middle.position().left - middle ) + ( $middle.outerWidth() / 2 );
		}

		//Translate the item into the middle, and after remove the
		//translation to have a nice animation :)
		$li.each( function( index ) {
			var $this = $( this );
			var position = $this.position();

			var center = middle - ( $this.outerWidth() / 2 );
			// position.left *= ( position.left < center ) ? -1 : -1;
			center -= position.left;

			var translate = "translateX( " + center + "px)";
			$this.css({
			    "webkitTransform": translate,
			    "MozTransform": translate,
			    "msTransform": translate,
			    "OTransform": translate,
			    "transform": translate
			});

			var delayIndex = length - index;
			var delay = ANIMATION_DELAY * Math.abs( delayIndex );

			setTimeout( function( $this, index ) {
				$this.addClass( 'visible' );
				if( index === 0 ) $this.addClass( 'middle' );

				$this.css({
				    "webkitTransform": "",
				    "MozTransform": "",
				    "msTransform": "",
				    "OTransform": "",
				    "transform": ""
				});
			}, delay, $this, delayIndex );
		});

		/*
		 * Calculate the width of the line
		 */
		var lineWidth = $menu.find( '.first' ).outerWidth();
		lineWidth -= $li.first().outerWidth() / 2;
		lineWidth -= $li.last().outerWidth() / 2;

		// 14 is the size of half circle
		setTimeout( function( $menu, lineWidth ) {
			$menu.find( '.line' ).addClass( 'visible' ).width( lineWidth ).css( { marginLeft: -lineWidth / 2 - 5 } );
		}, ANIMATION_DELAY * ( length + 1 ), $menu, lineWidth );

		//Show the labels
		setTimeout( function( $li ) {
			$li.each( function( index ) {
				var $span = $( this ).find( 'span' );

				setTimeout( function() {
					$span.addClass( 'visible' );
				}, index * SPAN_DELAY, $span );
			});

			setTimeout( function() {
				animateSecondNavigationMenu();
			}, ANIMATION_DELAY );
		}, ANIMATION_DELAY * ( length + 2 ), $li );
	};

	var animateSecondNavigationMenu = function() {
		var $li = $( '#navigation-menu .second li' );
		if( $li.length <= 0 ) return;

		$li.each( function( index ) {
			setTimeout( function( $li ) {
				$li.addClass( 'visible' );
			}, index * ( SPAN_DELAY * 2 ), $( this ) );
		});

		var lineWidth = $li.parent().outerWidth();
		lineWidth -= $li.last().outerWidth() / 2;

		var thinWidth = $( '#navigation-menu .second' ).outerWidth();
		thinWidth -= $li.last().outerWidth() / 2;
		thinWidth -= $( '#navigation-menu .second .line-thin' ).position().left;

		setTimeout( function( lineWidth ) {
			$( '#navigation-menu .second .line-fat' ).addClass( 'visible' );
			$( '#navigation-menu .second .street-sign + li a' ).trigger( 'click' );

			setTimeout( function( thinWidth ) {
				$( '#navigation-menu .second .line-thin' ).addClass( 'visible' ).width( thinWidth );
			}, FAT_SPEED, thinWidth );
		}, SPAN_DELAY * $li.length + FAT_SPEED, lineWidth );
	};

	var updateThinAndFatLine = function() {
		var $e = $( '#navigation-menu .second' );
		var $li = $( '#navigation-menu .second li' );
		var thinWidth = $e.outerWidth();

		thinWidth -= $li.last().outerWidth() / 2;
		thinWidth -= $( '#navigation-menu .second .line-thin' ).position().left;

		$( '#navigation-menu .second .line-thin' ).addClass( 'resize' ).width( thinWidth );

		var w = $activeItem.position().left - $( '#navigation-menu .second .line-fat' ).position().left + $activeItem.outerWidth() / 2;
		$( '#navigation-menu .second .line-fat' ).width( w - 10 );
	};

	$( document ).ready( function() {
		$( '.navigation-menu .second a' ).click( function() {
			var $this = $( this );
			var noUpdateWidth = false;

			//Remove all the active items and close the subitems
			$( '#navigation-menu .second a' ).removeClass( 'active full' );
			$( '#navigation-menu .second li' ).removeClass( 'active full' );

			if( ! $this.parent().hasClass( 'sub-item' ) ) {
				if( $( '#navigation-menu .second li.open' ).length > 0 ) {
					$( '#navigation-menu .second li' ).removeClass( 'open' );

					noUpdateWidth = true;
				}
			}

			//Set the full circle to all the
			if( $( this ).closest( '.navigation-menu' ).hasClass( 'noall' ) ) {
				$( this ).closest( '.second' ).find( 'a' ).removeClass( 'full' );
				$( this ).parent().addClass( 'full' );
			} else {
				var index = $this.parent().index();
				for( i = 0; i < index; i++ ) {
					var li = $( '#navigation-menu .second li' ).get( i );

					$( li ).find( 'a' ).addClass( 'full' );
				}
			}

			//Has a subitems?
			if( ! $this.parent().hasClass( 'sub-item' ) &&
			 		$this.parent().next().hasClass( 'sub-item' ) ) {
				var index = $this.parent().index();
				var $li = $( '#navigation-menu .second li' );

				for( i = index + 1; i < $li.length; i++ ) {
					var li = $li.get( i );

					if( ! $( li ).hasClass( 'sub-item' ) ) break;
					$( li ).addClass( 'open' );
				}

				noUpdateWidth = true;
			}

			$this.addClass( 'active' );

			if( ! noUpdateWidth ) {
				var w = $( this ).parent().position().left - $( '#navigation-menu .second .line-fat' ).position().left + $( this ).parent().outerWidth() / 2;
				var v = $( this ).parent().hasClass( 'sub-item' ) ? 3 : 10;
				$( '#navigation-menu .second .line-fat' ).width( w - v );
			} else {
				clearInterval( interval );
				clearTimeout( timeout );
				interval = setInterval( updateThinAndFatLine, 10 );

				timeout = setTimeout( function() {
					clearInterval( interval );

					$( '#navigation-menu .second .line-fat' ).removeClass( 'resize' );

					$active = $( '#navigation-menu li a.active' ).parent();
					var w = $active.position().left - $( '#navigation-menu .second .line-fat' ).position().left + $active.outerWidth() / 2;
					$( '#navigation-menu .second .line-fat' ).width( w - 10 );

					setTimeout( function() {
						var $active = $( '#navigation-menu li a.active' ).parent();
						var $next = $active.next();
						// if( $next.hasClass( 'sub-item' ) ) {
						// 	$next.find( 'a' ).trigger( 'click' );
						// }
					}, 10);

				}, 500 );
			}

			$activeItem = $( '#navigation-menu li a.active' ).parent();

			return false;
		});
	});

	/**
	 * The page with the parallax I'm have to check if it is visible, otherwise I
	 * have to set the bar a static, not fixed.
	 */
	$( document ).ready( function() {
		if( $( '#parallax-wrapper' ).length > 0 ) {
			if( $( '#parallax' ).length <= 0 ) {
				$( '#navigation-menu' ).addClass( 'relative' );
			}
		}

		if( $( '#navigation-menu' ).hasClass( 'onload' ) ) {
			setTimeout( function() {
				$( '.navigation-menu' ).each( function() {
					animateNavigationMenu( $( this ) );
				});
			}, 500 );
		}
	});

	$( window ).load( function() {
		if( ! $( '#navigation-menu' ).hasClass( 'onload' ) ) {
			$( '.navigation-menu' ).each( function() {
				animateNavigationMenu( $( this ) );
			});
		}

		// animateSecondNavigationMenu();
	});
})(jQuery);
});

jQuery( document ).ready( function() {
(function($){
	var DELAY = 100;
	var TITLE_DELAY = 300;
	var DURATION = 1000;
	var LINE_DURATION = 200;

	var showTheTubeLine = function() {
			$( '#back-history .tube' ).each( function( i ) {
				var $this = $( this );
				var width = $this.closest( '.items' ).outerWidth() - $( this ).position().left;
				if( $this.hasClass( 'tube-last' ) ) {
					width /= 2;
				}

				$( this ).delay( DURATION + i * LINE_DURATION ).animate( { width: width }, LINE_DURATION, 'linear' );
			});
	};

	$( '#back-button' ).click( function() {
		$( '#back-history' ).addClass( 'visible' );

		$( '#back-history .items' ).each( function( i ) {
			var $this = $( this ).find( '.shade' );
			var w = $this.data( 'width' );

			$this.delay( DELAY * ( i + 1 ) ).animate( {width: w }, DURATION, 'easeOutExpo' );
		});

		setTimeout( function() {
			$( '#back-history .items' ).each( function( i ) {
				setTimeout( function( $this ) {
					if( $this.find( '.button-close' ).length > 0 ) {
						$this.find( '.button-close' ).addClass( 'open' );

						showTheTubeLine();
					} else {
						$this.find( 'a' ).addClass( 'visible' );
					}
				}, TITLE_DELAY * i, $( this ) );
			});
		}, DURATION * 1 ); // ( $( '#back-history .items' ).length - 4 ) );
	});

	$( '.items.blank' ).click( function() {
		$( '#back-history .button-close' ).trigger( 'click' );
	});

	$( '#back-history .show-menu' ).click( function() {
		$( '#mtrigger' ).trigger( 'click' );
		$( '#back-history .button-close' ).trigger( 'click' );
	});

	$( '#back-history .button-close' ).click( function() {
		var $items = $( '#back-history .items' );
		var length = $items.length - 2;
		var delay = DURATION + 0.4 * ( length + 1 ) * TITLE_DELAY;

		for( i = length; i >= 0; i-- ) {
			setTimeout( function( $this ) {
				$this.find( 'a' ).removeClass( 'visible' );
			}, DURATION + TITLE_DELAY * ( length - i - 1 ), $( $items.get( i ) ) );

			setTimeout( function( $this ) {
				$this.find( '.tube' ).animate( {width: 0}, LINE_DURATION / 2, 'linear' );
			}, DURATION / 2 + TITLE_DELAY * 1, $( $items.get( i ) ) );
			// }, DURATION / 2 + TITLE_DELAY * ( length - i - 1 ), $( $items.get( i ) ) );
		}

		$items = $( '#back-history .items' );
		length = $items.length;
		for( i = length; i >= 0; i-- ) {
				var item = $items.get( i );
				var $item = $( item ).find( '.shade' );
				$item.delay( delay + DELAY * ( length - i ) ).animate( {width: 0}, DURATION / 2, 'easeOutExpo' );
		}

		setTimeout( function() {
			$( '#back-history' ).removeClass( 'visible' );
		}, DURATION + DELAY * length );
	});

	$( window ).load( function() {
		var totalWidth = 0;
		$( '#back-history .items' ).each( function( i ) {
			var $this = $( this ).find( '.shade' );
			var w = $this.width();

			$this.data( 'width', w ).css( { width: 0 } );

			totalWidth += w - 2;
		});

		var blankWidth = $( '#back-history ' ).width() - totalWidth;
		$( '#back-history .items.blank' ).width( blankWidth ).find( '.shade' ).data( 'width', blankWidth ).css( { width: 0 } );

		$( '#back-button' ).addClass( 'visible' );
	});
})(jQuery);
});
(function($) {
	'use strict';

	function loadData( page, ele, find ) {
	    $.ajax({    
	        type: "GET",
	        url: page,             
	        dataType: "html",                   
	        success: function(response){  
	        	ele.find( '.show-more' ).remove();

	        	// first scroll the page to top
	        	$('.back-to-top').trigger('click');

	        	setTimeout( function() {
	        		// then hide the properties
		        	ele.children().fadeOut('fast');

		        	setTimeout( function() {
		        		// at last remove them all & put in the new ones
						ele.children().remove();

						ele.append( $( response ).find( find ) );

						ele.trigger( 'showNewGrid' );
						setTimeout( function() {
						    $( '.lazy' ).lazyload();
						}, 500 );
		        	}, 300);
	        	}, 100);
	        }
	    });
	}

	$( document ).ready( function() {
		// make sure the link is works after ajaxing in
		$( document ).on( 'click', '#grid .show-more a', function( e ) {
			e.preventDefault();

			loadData( $( this ).attr( 'href' ), $( '#grid' ), '.ajax-grid' );
		});

		$( document ).on( 'click', '#strips .show-more a', function( e ) {
			e.preventDefault();

			loadData( $( this ).attr( 'href' ), $( '#strips ul' ), '.the-strips ul li' );
		});
	});
})(jQuery);