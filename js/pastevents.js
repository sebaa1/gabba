async function cargarEventosPasados() {
try {
    const response = await fetch('https://gabbaapp.s3.us-east-1.amazonaws.com/pastevents.json?t=' + Date.now());
    const eventos = await response.json();

    const contenedor = document.querySelector('.past-events-section');
    contenedor.innerHTML = '';

    eventos.forEach(evento => {
    const eventoDiv = document.createElement('div');
    eventoDiv.classList.add('past-events-event');

    let galeriaHTML = '';
    if (evento.galeria && evento.galeria.length > 0) {
        galeriaHTML = `<div class="gallery">` +
        evento.galeria.map(url => `<img src="${url}" alt="">`).join('') +
        `</div>`;
}
    let youtubeIconHTML = '';
    if (evento.videoResumen) {
        youtubeIconHTML = `
            <a href="${evento.videoResumen}" target="_blank" rel="noopener noreferrer" class="youtube-icon" title="Ver resumen en YouTube" style="margin-left: 8px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube" width="20px" height="20px" style="vertical-align: middle;">
            </a>
        `;
    }


    eventoDiv.innerHTML = `
<img src="${evento.imagen}" alt="${evento.nombre}" class="past-events-flyer">
<h3 class="past-events-name">
    ${evento.nombre}
</h3>
<p class="past-events-date">${evento.fecha}</p>
    ${evento.videoResumen ? `<a href="${evento.videoResumen}" target="_blank" title="Ver video resumen" style="display:flex; align-items: center; gap: 10px; text-decoration: none; font-family:'Oswald'";><img src="https://img.icons8.com/?size=100&id=31939&format=png&color=000000" class="past-events-icon"> <p>VER RESUMEN EN YOUTUBE</p></a>` : ''}
<p class="past-events-description">${evento.descripcion}</p>
${galeriaHTML}
`;


    contenedor.appendChild(eventoDiv);
    });
} catch (error) {
    console.error('Error cargando eventos pasados:', error);
}
}

document.addEventListener('DOMContentLoaded', cargarEventosPasados);
