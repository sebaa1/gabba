function goToAboutPage() {
  const settingsPage = document.getElementById('settingsPage');
  const aboutPage = document.getElementById('aboutPage');
  const navBar = document.getElementById('navBar');
  const settingsTitle = document.getElementById('settings');
  const footer = document.getElementById('footer');

  aboutPage.classList.remove('hidden');
  aboutPage.classList.add('slide-in-from-right');
  navBar.classList.add('hidden');
  settingsTitle.classList.add('hidden');
  footer.classList.add('hidden');

  void aboutPage.offsetWidth;

  aboutPage.classList.remove('slide-in-from-right');
  aboutPage.classList.add('slide-in');

  settingsPage.classList.add('slide-out-to-left');

  setTimeout(() => {
    settingsPage.classList.add('hidden');
    settingsPage.classList.remove('slide-out-to-left');
    aboutPage.classList.remove('slide-in');
  }, 400);
}

function goBackToSettings() {
  const settingsPage = document.getElementById('settingsPage');
  const aboutPage = document.getElementById('aboutPage');
  const navBar = document.getElementById('navBar');
  const settingsTitle = document.getElementById('settings');

  settingsPage.classList.remove('hidden');
  settingsPage.classList.add('slide-in-from-left');
  navBar.classList.remove('hidden');
  settingsTitle.classList.remove('hidden');
  footer.classList.remove('hidden');

  void settingsPage.offsetWidth;

  settingsPage.classList.remove('slide-in-from-left');
  settingsPage.classList.add('slide-in');

  aboutPage.classList.add('slide-out-to-right');

  setTimeout(() => {
    aboutPage.classList.add('hidden');
    aboutPage.classList.remove('slide-out-to-right');
    settingsPage.classList.remove('slide-in');
  }, 400);
}
