var timeoutId;
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
        clearTimeout(timeoutId);
        showRefresh();

        timeoutId = setTimeout(() => {
            loadMoreImages();
        }, 1000); 
    }
});
function loadMoreImages() {
    var key="YOUR_API_KEY";
    fetch('https://api.unsplash.com/search/photos?query=lotr&client_id='+key)
            .then(response => response.json())
            .then(data => {
                
        setTimeout(hideRefresh, 3000);
        const p1 = document.getElementById('p1');
        
        const sr = document.getElementById('srodek');
        const p2 = document.getElementById('p2');

        data.results.forEach(imageData => {
            sr.innerHTML+="<div class=\"gallery\"><a href=\""+imageData.urls.regular+"\"  data-lightbox=\"galeria\" data-title=\""+imageData.alt_description+"\">"+
                    "<img src=\""+imageData.urls.regular+"\" alt=\""+imageData.alt_description+"\"></a><div class=\"desc\">"+imageData.alt_description+"</div></div>";
            });
        })
        .catch(error => {console.error('Wystąpił błąd podczas pobierania zdjęć:', error);});
}

const srodek = document.getElementById('srodek');
const refresh = document.getElementById('refresh');

function showRefresh() {
    refresh.classList.add('show');
}

function hideRefresh() {
    refresh.classList.remove('show');
}
