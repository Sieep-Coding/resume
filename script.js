// script.js
function fetchGitHubRepos() {
    const username = 'sieep-coding';
    const apiUrl = `https://api.github.com/users/${username}/repos`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const repoContainer = document.querySelector('.github');
  
        data.forEach(repo => {
          const repoCard = document.createElement('div');
          repoCard.classList.add('repo-card');
  
          const repoName = document.createElement('h4');
          repoName.textContent = repo.name;
  
          const repoDescription = document.createElement('p');
          repoDescription.textContent = repo.description;
  
          const repoLink = document.createElement('a');
          repoLink.href = repo.html_url;
          repoLink.target = '_blank';
          repoLink.textContent = 'View on GitHub';
  
          repoCard.appendChild(repoName);
          repoCard.appendChild(repoDescription);
          repoCard.appendChild(repoLink);
  
          repoContainer.appendChild(repoCard);
        });
      })
      .catch(error => {
        console.error('Error fetching GitHub repositories:', error);
      });
  }
  
  fetchGitHubRepos();