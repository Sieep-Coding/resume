// script.js
function fetchGitHubRepos() {
  const username = 'sieep-coding';
  const apiUrl = `https://api.github.com/users/${username}/repos`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const repoContainer = document.querySelector('.github');
      const reposWithDescription = data.filter(repo => repo.description && repo.description.trim() !== "");

      reposWithDescription.sort((a, b) => b.stargazers_count - a.stargazers_count);

      reposWithDescription.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.classList.add('repo-card');

        const repoName = document.createElement('h4');
        repoName.textContent = repo.name;

        const repoDescription = document.createElement('p');
        repoDescription.textContent = repo.description;

        const repoStars = document.createElement('p');
        repoStars.classList.add('repo-stars');
        repoStars.textContent = `Stars: ${repo.stargazers_count}`;

        const repoLink = document.createElement('a');
        repoLink.href = repo.html_url;
        repoLink.target = '_blank';
        repoLink.textContent = 'View on GitHub';

        repoCard.appendChild(repoName);
        repoCard.appendChild(repoDescription);
        repoCard.appendChild(repoStars);
        repoCard.appendChild(repoLink);

        repoContainer.appendChild(repoCard);
      });
    })
    .catch(error => {
      console.error('Error fetching GitHub repositories:', error);
    });
}


  function fetchMediumPosts() {
    const rssUrl = 'https://medium.com/feed/@nick-stambaugh';
    const proxyUrl = 'https://api.allorigins.win/get?url=';
  
    fetch(proxyUrl + encodeURIComponent(rssUrl))
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        const xmlString = data.contents;
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlString, 'application/xml');
        const items = xml.querySelectorAll('item');
        const blogPostContainer = document.querySelector('.blog');
  
        items.forEach(item => {
          const titleElement = item.querySelector('title');
          const linkElement = item.querySelector('link');
          const descriptionElement = item.querySelector('description');
  
          if (titleElement && linkElement && descriptionElement) {
            const title = titleElement.textContent;
            const link = linkElement.textContent;
            const description = descriptionElement.textContent;
  
            const blogPostCard = document.createElement('div');
            blogPostCard.classList.add('blog-post-card');
  
            const blogPostTitle = document.createElement('h4');
            blogPostTitle.textContent = title;
  
            const blogPostDescription = document.createElement('p');
            blogPostDescription.textContent = description;
  
            const blogPostLink = document.createElement('a');
            blogPostLink.href = link;
            blogPostLink.target = '_blank';
            blogPostLink.textContent = 'Read on Medium';
  
            blogPostCard.appendChild(blogPostTitle);
            blogPostCard.appendChild(blogPostDescription);
            blogPostCard.appendChild(blogPostLink);
  
            blogPostContainer.appendChild(blogPostCard);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching Medium blog posts:', error);
      });
  }
  
  // Call the functions to fetch data and populate the sections
  fetchGitHubRepos();
  fetchMediumPosts();

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Function to fade in elements
  function fadeInElements() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
      if (isInViewport(element)) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
  }
  
  // Add scroll event listener
  document.addEventListener('scroll', fadeInElements);
  
  // Initial check
  fadeInElements();