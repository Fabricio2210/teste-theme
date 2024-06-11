api.onPageChange((url) => {
    news(url);
});

const news = (url) => {
    if (url.includes('/c/') || url.includes('/t/')) {
        $("#news").hide();
    } else {
        $("#news").show();
    }
};