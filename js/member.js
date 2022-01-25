const role = document.querySelector('.role');

fetch('data/members.json')
.then(data=>{
    return data.json();
})
.then(json=>{
    console.log(json);
    const profiles = json.data;

    let tags = '';

    profiles.map((profile)=>{
        tags +=`
                <article class="profile">
                    <div class="pic">
                        <img src=${profile.pic} alt="">
                    </div>
                    <strong>${profile.name}</strong>
                    <p>${profile.position}</p>
                </article>
                    `
    })

    role.innerHTML = tags;
    
})