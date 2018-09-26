Vue.filter('upText', function (text) {
    return text.toUpperCase();
});

Vue.filter('upFirstChar', function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
});
