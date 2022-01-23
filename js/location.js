/*
key : 9c03dc4ca7f0907cbe4777780120f513
*/
const spots = document.querySelectorAll('article');

const mapContainer = document.getElementById('map');
const mapOptions = {
    center: new kakao.maps.LatLng(37.5048632, 126.7633616),
    level: 3,
};

const map = new kakao.maps.Map(mapContainer, mapOptions);

const imgSrc = 'img/logo.png';
const imgSize = new kakao.maps.Size(40, 40);
const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize);

let positions = [
    {
        title: '부천점',
        latlng: new kakao.maps.LatLng(37.5048632, 126.7633616),
    },
    {
        title: '홍대점',
        latlng: new kakao.maps.LatLng(37.5614033, 126.9196564),
    },
    {
        title: '건대점',
        latlng: new kakao.maps.LatLng(37.5406289, 127.0631309),
    },
    {
        title: '안양점',
        latlng: new kakao.maps.LatLng(37.3945622, 126.9206691),
    }
]

for(let i=0;  i<positions.length; i++){
    const marker = new kakao.maps.Marker({
        map: map,
        position: positions[i].latlng,
        title: positions[i].title,
        image: markerImg,
    })
}

spots.forEach((spot, index)=>{
    spot.addEventListener('click', e=>{
        let moveLatLon = positions[index].latlng;
        map.setCenter(moveLatLon);
    })
})






