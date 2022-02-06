const hambergur = document.querySelector('.hambergur');
const menuMo = document.querySelector('.menuMo');
const close = menuMo.querySelector('.btnClose');

hambergur.addEventListener('click', e=>{
    menuMo.classList.add('on');
})

close.addEventListener('click', e=>{
    menuMo.classList.remove('on');
})