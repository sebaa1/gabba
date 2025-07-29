async function cargarNoticias() {
  try {
    const response = await fetch('https://gabbaapp.s3.us-east-1.amazonaws.com/news.json?t' + Date.now());
    const noticias = await response.json();
    const wrapper = document.querySelector('.news-wrapper');
    
    const header = wrapper.querySelector('.news-header');
    wrapper.innerHTML = '';
    wrapper.appendChild(header);
    
    noticias.forEach(noticia => {
      if (noticia.categoria === 'main') {
        const mainDiv = crearNoticiaMain(noticia);
        wrapper.appendChild(mainDiv);
      } else {
        const itemDiv = crearNoticiaItem(noticia);
        wrapper.appendChild(itemDiv);
      }
    });
  } catch (error) {
    console.error('Error cargando noticias:', error);
  }
}

function crearNoticiaMain(noticia) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('news-main');
  
  const imagen = document.createElement('img');
  imagen.src = noticia.imagen + (noticia.imagen.includes('?') ? '&' : '?') + 't=' + Date.now();
  imagen.alt = noticia.titulo;
  
  const titulo = document.createElement('h4');
  titulo.textContent = noticia.titulo;
  
  const descripcion = document.createElement('p');
  descripcion.textContent = noticia.descripcion;
  
  mainDiv.appendChild(imagen);
  mainDiv.appendChild(titulo);
  mainDiv.appendChild(descripcion);
  
  if (noticia.link) {
    mainDiv.style.cursor = 'pointer';
    mainDiv.addEventListener('click', () => {
      window.open(noticia.link, '_blank');
    });
  }
  
  return mainDiv;
}

function crearNoticiaItem(noticia) {
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('news-item');
  
  const imagen = document.createElement('img');
  imagen.classList.add('news-image');
  imagen.src = noticia.imagen + (noticia.imagen.includes('?') ? '&' : '?') + 't=' + Date.now();
  imagen.alt = noticia.titulo;
  
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('news-content');
  
  const titulo = document.createElement('h3');
  titulo.classList.add('news-title');
  titulo.textContent = noticia.titulo;
  
  const descripcion = document.createElement('p');
  descripcion.classList.add('news-description');
  descripcion.textContent = noticia.descripcion;
  
  contentDiv.appendChild(titulo);
  contentDiv.appendChild(descripcion);
  
  if (noticia.tag) {
    const tag = document.createElement('p');
    tag.classList.add('news-tag');
    tag.textContent = noticia.tag;
    contentDiv.appendChild(tag);
  }
  
  itemDiv.appendChild(imagen);
  itemDiv.appendChild(contentDiv);
  
  if (noticia.link) {
    itemDiv.style.cursor = 'pointer';
    itemDiv.addEventListener('click', () => {
      window.open(noticia.link, '_blank');
    });
  }
  
  return itemDiv;
}

document.addEventListener('DOMContentLoaded', cargarNoticias);