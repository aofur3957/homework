const swiper = new Swiper(".mainSwiper", {
    slidesPerView: 'auto',
    spaceBetween: 30,
    speed: 700,
    loop: true,
    centeredSlides: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

});

const mapSwiper = new Swiper(".mapSwiper ", {
  slidesPerView: 'auto',
  spaceBetween: 30,
  speed: 700,
  centeredSlides: true
})