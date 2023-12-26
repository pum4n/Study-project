// Додаємо подію (event listener) для кнопки "Login"
document.getElementById('loginButton').addEventListener('click', login);

// Функції openLoginModal, closeLoginModal і login без змін
function openLoginModal() {
  document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}

function login() {
  var username = document.getElementById('usernameInput').value.trim();

  if (username !== '') {
    // Close the login modal
    closeLoginModal();

    // Add your login logic here
    // For demonstration purposes, we'll just show an alert
    alert('Login successful. Welcome, ' + username + '!');
  } else {
    alert('Please enter a username.');
  }
}
