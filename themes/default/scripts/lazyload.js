;
registerListener('load', setLazy);
registerListener('load', lazyLoad);
registerListener('scroll', lazyLoad);
var lazy = [];
function setLazy(){
    lazy = document.getElementsByClassName('lazy');
}
function lazyLoad(){
    for(var i=0; i<lazy.length; i++){
        if(isInViewport(lazy[i])){
            console.log(lazy[i]);
            if (lazy[i].getAttribute('data-src-webp') && lazy[i].getAttribute('data-src-img')){
                lazy[i].children[0].srcset = lazy[i].getAttribute('data-src-webp');
                lazy[i].children[1].src = lazy[i].getAttribute('data-src-img');
                lazy[i].removeAttribute('data-src-webp');
                lazy[i].removeAttribute('data-src-img');
            } else if(lazy[i].getAttribute('data-src-img')) {
                lazy[i].children[0].src = lazy[i].getAttribute('data-src-img');
                lazy[i].removeAttribute('data-src-img');
            } else if(lazy[i].getAttribute('data-src-webp')) {
                lazy[i].children[0].srcset = lazy[i].getAttribute('data-src-webp');
                lazy[i].removeAttribute('data-src-webp');
            }
        }
    }
    cleanLazy();
}
function cleanLazy(){
    lazy = Array.prototype.filter.call(lazy, function(l){ return (l.getAttribute('data-src-webp') && l.getAttribute('data-src-img'));});
}
function isInViewport(el){
    var rect = el.getBoundingClientRect();

    return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function registerListener(event, func) {
    if (window.addEventListener) {
        window.addEventListener(event, func)
    } else {
        window.attachEvent('on' + event, func)
    }
}