const tab = document.querySelector('#tab');
const tabTitles = tab.querySelectorAll('dt');
const tabContents = tab.querySelectorAll('dd');
const faqOffset = document.querySelector('.faqHeaderSection').offsetTop;
const base = -300;


window.addEventListener('scroll', e=>{
    let scroll = window.scrollY || window.pageYOffset;

    if(scroll >= faqOffset + base){
        tabTitles.forEach((tabTitle, idx)=>{
            let faceLine = tabTitle.querySelector('.cls-2');
            let mouthLine = tabTitle.querySelector('.cls-3');
            
            faceLine.style.animationPlayState = 'running';
            mouthLine.style.animationPlayState = 'running';
        })
    }
})


tabTitles.forEach((tabTitle, idx)=>{
    tabTitle.addEventListener('click', e=>{
        for(let el of tabTitles){
            el.classList.remove('on');
        }
        for(let el of tabContents){
            el.classList.remove('on');
        }
        tabTitles[idx].classList.add('on');
        tabContents[idx].classList.add('on');
    })
})
