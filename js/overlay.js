document.addEventListener('click', function (e) {
  const img = e.target;

  if (img.matches('.event-item img:not(.event-location-info), .past-events-flyer:not(.event-location-info), .gallery img:not(.event-location-info)')) {
  const overlay = document.getElementById('imageOverlay');
  const overlayImg = document.getElementById('overlayImg');
  overlayImg.src = img.src;
  overlay.style.display = 'flex';
}
});

document.getElementById('closeBtn').addEventListener('click', () => {
  document.getElementById('imageOverlay').style.display = 'none';
});
