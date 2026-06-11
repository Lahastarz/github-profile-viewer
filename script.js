let username = document.getElementById("profviewer");
let button = document.getElementById("button");
let result = document.getElementById("result");
button.addEventListener("click", function()
{
    let uname = username.value;
    fetch(`https://api.github.com/users/${uname}`)
    .then(function(response)
    {
        return response.json();
    })
    .then(function(data)
    {
        if(data.message==='Not Found')
        {
            result.innerText = "Username Not found in the Records";
            return;
        }
        result.innerHTML = `
            <img src="${data.avatar_url}" width="100px">
            <h2>${data.name}</h2>
            <p>${data.bio}</p>
            <p>Followers: ${data.followers}</p>
            <p>Following: ${data.following}</p>
            <p>Public Repos: ${data.public_repos}</p>
            <a href="${data.html_url}" target="_blank">View on GitHub</a>
        `;
        return fetch(`https://api.github.com/users/${uname}/repos?sort=updated&per_page=5`)
    })
    .then(function(response)
    {
        return response.json();
    })
    .then(function(repos)
    {
        let reposHTML = "";
    repos.forEach(function(repo) {
        reposHTML += `
            <div>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                <p>${repo.description || "No description"}</p>
                <p>⭐ ${repo.stargazers_count} | 🌐 ${repo.language || "Unknown"}</p>
            </div>
        `;
    });
    document.getElementById("repos").innerHTML = reposHTML;
    })
    .catch(function(error)
    {
        console.log(error);
        result.innerText= "Something went wrong"

    })
});