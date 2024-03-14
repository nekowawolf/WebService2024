function getProfile() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch('https://api.github.com/users/herobuxx', requestOptions)
        .then(response => {
            console.log('Raw Response:', response);
            return response.json();
        })
        .then(data => {
            displayProfile(data);
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
}

function displayProfile(data) {
    const tableBody = document.getElementById('profile-card');
    tableBody.innerHTML = '';

    const card = document.createElement('div');

    if (data.company === null) {
        var company = "Not Available"
    }

    if (data.hireable === null) {
        var hireable = "No"
    } else {
        var hireable = "Yes"
    }

    const createdAt = new Date(data.created_at).toLocaleString();
    const updatedAt = new Date(data.updated_at).toLocaleString();

    card.innerHTML = `
        <div class="h-screen flex items-center justify-center">
        <div class="bg-zinc-950 py-8 rounded-xl text-white flex">
            <div class="mx-8">
                <img src="${data.avatar_url}" class="block mx-auto rounded-full w-36 h-auto">
                <div class="text-center pt-4">
                    <h2 class="text-xl font-bold">${data.name}</h2>
                    <h5 class="text-sm text-zinc-400">@${data.login}</h5>
                    <div class="mt-1">
                        <h5 class="text-xs text-zinc-400"><span class="text-white font-bold">${data.followers}</span> Followers • <span class="text-white font-bold">${data.following}</span> Following</h5>
                    </div>
                    <a href="https://github.com/${data.login}">
                        <button class="bg-zinc-800 hover:bg-zinc-700 text-white mt-3 py-1 px-4 rounded-full text-sm w-full">
                            Open GitHub
                        </button>                                
                    </a>
                </div>
            </div>
            <div>
                <div class="my-2 w-full">
                    <div class="mx-6 w-64">
                        <h2 class="text-xs font-bold">Bio</h2>
                        <h5 class="text-sm text-zinc-400">${data.bio}</h5>        
                    </div>      
                </div>
                <div class="my-2 w-full">
                    <div class="mx-6 w-64">
                        <h2 class="text-xs font-bold">Location</h2>
                        <h5 class="text-sm text-zinc-400">${data.location}</h5>        
                    </div>      
                </div>
                <div class="flex my-2 mt-4 w-full">
                    <div class="mx-6 w-32">
                        <h2 class="text-xs font-bold">Public Repos</h2>
                        <h5 class="text-sm text-zinc-400">${data.public_repos}</h5>        
                    </div>
                    <div class="w-32">
                        <h2 class="text-xs font-bold">Gist</h2>
                        <h5 class="text-sm text-zinc-400">${data.public_gists}</h5>        
                    </div>        
                </div>

                <div class="flex my-2 w-full">
                    <div class="mx-6 w-32">
                        <h2 class="text-xs font-bold">Joined at</h2>
                        <h5 class="text-sm text-zinc-400">${createdAt}</h5>        
                    </div>
                    <div class="w-32">
                        <h2 class="text-xs font-bold">Updated at</h2>
                        <h5 class="text-sm text-zinc-400">${updatedAt}</h5>        
                    </div>        
                </div>

                <div class="flex my-2 w-full">
                    <div class="mx-6 w-32">
                        <h2 class="text-xs font-bold">Company</h2>
                        <h5 class="text-sm text-zinc-400">${company}</h5>        
                    </div>
                    <div class="w-32">
                        <h2 class="text-xs font-bold">Hireable?</h2>
                        <h5 class="text-sm text-zinc-400">${hireable}</h5>        
                    </div>        
                </div>
            </div>
        </div>
    </div>  
        `;
    tableBody.appendChild(card);
}

window.onload = getProfile;