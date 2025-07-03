async function cargarEventos() {
    try {
        const response = await fetch('https://gabbaapp.s3.us-east-1.amazonaws.com/eventos.json?t' + Date.now());

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const eventos = await response.json();
        const container = document.getElementById('event-container');

        if (!container) {
            console.error('Error: No se encontró el contenedor "event-container" en el DOM.');
            return;
        }

        if (!Array.isArray(eventos) || eventos.length === 0) {
            const mensaje = document.createElement('div');
            mensaje.classList.add('event-empty');
            mensaje.innerHTML = 'Estate atento a nuestro <a href="https://instagram.com/gabba.gabba.fest" target="_blank" class="event-empty-link">Instagram</a> que estaremos anunciando una nueva fecha próximamente!';
            container.appendChild(mensaje);
            return;
        }


        eventos.forEach(evento => {
            const item = document.createElement('div');
            item.classList.add('event-item');

            const imagen = document.createElement('img');
            imagen.src = evento.imagen;
            imagen.alt = evento.titulo;
            imagen.style.cursor = "pointer";

            imagen.addEventListener('click', () => {
                const overlay = document.getElementById('imageOverlay');
                const overlayImg = document.getElementById('overlayImg');
                overlayImg.src = evento.imagen;
                overlay.style.display = 'flex';
            });

            const info = document.createElement('div');
            info.classList.add('event-info');
            info.innerHTML = `
                <div class="event-title">${evento.titulo}</div>
                <div class="event-date">${evento.fecha}, ${evento.hora}</div>
                <div class="event-location">${evento.lugar}
                    <a href="${evento.ubicacion}" target="_blank">
                        <img class="event-location-info" src="../assets/images/location.png" style="width: 20px; height: 20px; border-radius: 50%; border:none; background: #54fb54; padding: 5px;"alt="Ubicación">
                    </a>
                </div>
            `;

            item.appendChild(imagen);
            item.appendChild(info);
            container.appendChild(item);

            const boton = document.createElement('a');
            boton.href = evento.link_compra;
            boton.classList.add('event-button');
            boton.target = "_blank";
            boton.innerText = "COMPRAR ENTRADAS";
            container.appendChild(boton);
        });

        const overlay = document.getElementById('imageOverlay');
        const overlayImg = document.getElementById('overlayImg');
        const closeBtn = document.getElementById('closeBtn');

        closeBtn.addEventListener('click', () => {
            overlay.style.display = 'none';
            overlayImg.src = '';
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
                overlayImg.src = '';
            }
        });

    } catch (warn) {
        console.warn('No hay ningún evento disponible:', warn);

        const container = document.getElementById('event-container');
        if (container) {
            container.innerHTML = '';
            const mensaje = document.createElement('div');
            mensaje.classList.add('event-empty');
            mensaje.innerHTML = 'Estate atento a nuestro <a href="https://instagram.com/gabba.gabba.fest" target="_blank" class="event-empty-link">Instagram</a> que estaremos anunciando una nueva fecha próximamente!';
            container.appendChild(mensaje);
        }
    }
}

document.addEventListener('DOMContentLoaded', cargarEventos);
