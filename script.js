// script.js
function fetchGitHubRepos() {
  const username = 'sieep-coding';
  const apiUrl = `https://api.github.com/users/${username}/repos`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const repoContainer = document.querySelector('.github');
      const reposWithDescription = data.filter(repo => repo.description && repo.description.trim() !== "" && repo.stargazers_count !== 0);
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
        repoStars.textContent = `⭐: ${repo.stargazers_count} 🍴: ${repo.forks_count}`;
        
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


// function fetchMediumPublications(userId, accessToken) {
//   const apiUrl = `https://api.medium.com/v1/users/${userId}/publications`;

//   fetch(apiUrl, {
//     headers: {
//       'Authorization': `Bearer ${accessToken}`
//     }
//   })
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error('Network response was not ok.');
//     })
//     .then(data => {
//       const publications = data.data;

//       // Now you have the list of publications, you can proceed with further actions
//       // For example, displaying the publications on the page
//       displayPublications(publications);
//     })
//     .catch(error => {
//       console.error('Error fetching Medium publications:', error);
//     });
// }

// function displayPublications(publications) {
//   const publicationContainer = document.querySelector('.publications');

//   publications.forEach(publication => {
//     const publicationId = publication.id;
//     const name = publication.name;
//     const description = publication.description;
//     const url = publication.url;
//     const imageUrl = publication.imageUrl;

//     const publicationCard = document.createElement('div');
//     publicationCard.classList.add('publication-card');

//     const publicationName = document.createElement('h3');
//     publicationName.textContent = name;

//     const publicationDescription = document.createElement('p');
//     publicationDescription.textContent = description;

//     const publicationLink = document.createElement('a');
//     publicationLink.href = url;
//     publicationLink.target = '_blank';
//     publicationLink.textContent = 'Visit Publication';

//     const publicationImage = document.createElement('img');
//     publicationImage.src = imageUrl;
//     publicationImage.alt = name;

//     publicationCard.appendChild(publicationImage);
//     publicationCard.appendChild(publicationName);
//     publicationCard.appendChild(publicationDescription);
//     publicationCard.appendChild(publicationLink);

//     publicationContainer.appendChild(publicationCard);
//   });
// }

// // Usage
// const userId = 'nick-stambaugh'; // Replace with the user ID
// const accessToken = '2aae72863f8bb9d3f940fc7097c60fbfa8d8db98e06c1a1fdc5f61d0a02d46de2'; // Replace with your access token
// fetchMediumPublications(userId, accessToken);


  
  // Call the functions to fetch data and populate the sections
  fetchGitHubRepos();
  // fetchMediumPublications();

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