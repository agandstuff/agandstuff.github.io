const imagesToLoad = document.querySelectorAll('img[data-src]');

const loadImages = function(image) {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onLoad = function() {
        image.removeAttribute('data-src');
    };
};
if('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(items, observer) {
        items.forEach(function(item) {
            if(item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);
            }
        });
    });
    imagesToLoad.forEach(function(img) {
        observer.observe(img);
    });
} else {
    imagesToLoad.forEach(function(img) {
        loadImages(img);
    });
}