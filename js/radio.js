async function cargarProgramas() {
    try {
        const response = await fetch('https://gabbaapp.s3.us-east-1.amazonaws.com/radio.json?t=' + Date.now());

        const programas = await response.json();

        const container = document.getElementById('radio-container');
        container.innerHTML = '';

        let temporadaActual = null;
        let esPrimerVideo = true;

        programas.forEach(programa => {
            if (programa.temporada !== temporadaActual) {
                
                if (!esPrimerVideo) {
                    const seasonBlock = document.createElement("div");
                    seasonBlock.className = "video-item";
                    seasonBlock.innerHTML = `<div class="video-placeholder">TEMPORADA ${programa.temporada} ></div>`;
                    container.appendChild(seasonBlock);
                }

                temporadaActual = programa.temporada;
            }

            
            const item = document.createElement("div");
            item.classList.add("video-item");
            item.setAttribute("data-temporada", programa.temporada);
            item.setAttribute("data-tags", programa.etiquetas || '');

            item.innerHTML = `
                <a href="${programa.url}">
                    <div class="duration">${programa.duracion}</div>
                    <img src="${programa.imagen}" alt="${programa.titulo}" loading="lazy">
                </a>
                <div class="video-title">${programa.titulo}</div>
            `;

            container.appendChild(item);

            esPrimerVideo = false;
        });
    } catch (error) {
        console.error('Error cargando programas:', error);
    }
}

document.addEventListener('DOMContentLoaded', cargarProgramas);