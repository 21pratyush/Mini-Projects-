const usernameInput = document.getElementById('username');
const searchIcon = document.querySelector('.search-icon');
const crossIcon = document.querySelector('.cross-icon');
const profileDetails = document.querySelector('.profile-details');
const avatar = document.getElementById('avatar');
const profileUsername = document.getElementById('profileUsername');
const profileLink = document.getElementById('profileLink');
const notFound = document.getElementById('notFound');

searchIcon.addEventListener('click', () => {
  usernameInput.focus();
  searchProfile();
});

crossIcon.addEventListener('click', () => {
  usernameInput.value = '';
  crossIcon.style.display = 'none';
  searchIcon.style.display = 'block';
  profileDetails.style.display = 'none';
  notFound.style.display = 'none';
});

usernameInput.addEventListener('input', () => {
  if (usernameInput.value !== '') {
    crossIcon.style.display = 'block';
    searchIcon.style.display = 'none';
  } else {
    crossIcon.style.display = 'none';
    searchIcon.style.display = 'block';
  }
});

usernameInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    searchProfile();
  }
});

async function searchProfile() {
  const username = usernameInput.value.trim(); // Remove leading/trailing spaces

  if (username === '') {
    errorMessage.textContent = 'Please enter an username';
    return;
  }

  if (username.includes(' ')) {
    errorMessage.textContent = 'Username cannot contain spaces';
    return;
  }

  if (/^\d+$/.test(username)) {
    errorMessage.textContent = 'Username cannot consist of only numbers';
    return;
  }

  errorMessage.textContent = ''; // Clear any previous error message

  const apiUrl = `https://api.github.com/users/${username}`;

  try {
    overlay.style.display = 'block'; // Show the overlay
    loader.style.display = 'block'; // Show the loader

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('User not found');
    }

    const userData = await response.json();
    console.log(userData)
    avatar.src = userData.avatar_url;
    profileUsername.textContent = userData.name || userData.login;
    bio.textContent = userData.bio || '';
    profileLink.href = userData.html_url;
    location.textContent = userData.location || '';
    followers.textContent = `Followers: ${userData.followers}`;
    publicRepos.textContent = `Public Repos: ${userData.public_repos}`;
    company.textContent = userData.company || '';
    notFound.style.display = 'none';
    profileDetails.style.display = 'block';
  } catch (error) {
    avatar.src = '';
    profileUsername.textContent = '';
    profileLink.href = '';
    notFound.style.display = 'block';
    profileDetails.style.display = 'none';
  } finally {
    overlay.style.display = 'none'; // Hide the overlay
    loader.style.display = 'none'; // Hide the loader
  }
}




