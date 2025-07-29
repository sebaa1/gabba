document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

  if (navigator.splashscreen) {
    navigator.splashscreen.hide();
  }

  document.body.classList.add('app-ready');

  setTimeout(() => {
    document.getElementById('deviceready')?.classList.add('ready');
  }, 100);

  // Las notificaciones se manejan completamente por cordova.js
  // No necesitamos hacer nada aquí, solo reportar el estado
  const disabled = localStorage.getItem("notificationsDisabled") === "true";
  console.log('Estado inicial notificaciones - Deshabilitadas:', disabled);
}
