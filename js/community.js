const tab = document.querySelector('#tab');
const tabTitles = tab.querySelectorAll('dt');
const tabContents = tab.querySelectorAll('dd');
const faqOffset = document.querySelector('.faqHeaderSection').offsetTop;
const base = -300;


// window.addEventListener('scroll', e=>{
//     let scroll = window.scrollY || window.pageYOffset;

//     if(scroll >= faqOffset + base){
//         tabTitles.forEach((tabTitle, idx)=>{
//             let Line = tabTitle.querySelector('.line');
            
//             Line.style.animationPlayState = 'running';
//         })
//     }
// })


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

        const faq = tabContents[idx].querySelector('#faq');
        if(faq != null){
            const lis = faq.querySelectorAll('li');
            for(let li of lis){
                li.addEventListener('click', e=>{
                    e.preventDefault();
                    const isOn = e.currentTarget.classList.contains('on');
                    if(isOn){
                        e.currentTarget.classList.remove('on');
                        console.log('있음');
                    }else {
                        for(let el of lis){
                            el.classList.remove('on');
                        }
                        e.currentTarget.classList.add('on');
                        console.log('없음');
                    }
                })
            }
        }
    })
})

tabContents.forEach((tabContent, idx)=>{
    let isOn = tabContent.classList.contains('on');
    if(isOn){
        const faq = tabContent.querySelector('#faq');
        if(faq != null){
            const li = faq.querySelectorAll('li');
        }

    }
})
