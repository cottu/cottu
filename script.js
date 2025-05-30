let slideIndex = 1;

// Inizializza le slide
document.addEventListener('DOMContentLoaded', function() {
  showSlide(slideIndex);
});

// Cambia slide (avanti/indietro)
function changeSlide(n) {
  showSlide(slideIndex += n);
}

// Vai a una slide specifica
function currentSlide(n) {
  showSlide(slideIndex = n);
}

// Mostra la slide corrente con animazione
function showSlide(n) {
  const slides = document.getElementsByClassName('slide');
  const dots = document.getElementsByClassName('dot');
  
  // Gestione dell'indice circolare
  if (n > slides.length) {
    slideIndex = 1;
  } else if (n < 1) {
    slideIndex = slides.length;
  }
  
  // Nascondi tutte le slide
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  
  // Rimuovi la classe active da tutti i dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  
  // Mostra la slide corrente e attiva il dot corrispondente
  slides[slideIndex - 1].classList.add('active');
  dots[slideIndex - 1].classList.add('active');
  
  // Aggiungi animazione agli elementi della slide attiva
  animateSlideContent(slides[slideIndex - 1]);
  
  // Abilita lo scorrimento se necessario
  setTimeout(enableScrolling, 600); // Attendi che l'animazione sia completata
}

// Funzione per animare gli elementi della slide
function animateSlideContent(slide) {
  const content = slide.querySelector('.slide-content');
  content.style.opacity = 0;
  content.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    content.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    content.style.opacity = 1;
    content.style.transform = 'translateY(0)';
  }, 100);
}

// Funzione migliorata per gestire lo scorrimento nelle slide con molto contenuto
function enableScrolling() {
  const activeSlide = document.querySelector('.slide.active');
  if (!activeSlide) return;
  
  const content = activeSlide.querySelector('.slide-content');
  if (!content) return;
  
  // Forza lo stile overflow-y a auto
  content.style.overflowY = 'auto';
  
  // Verifica se il contenuto necessita di scorrimento
  const needsScrolling = content.scrollHeight > content.clientHeight;
  
  // Gestisci l'indicatore di scorrimento
  const indicator = activeSlide.querySelector('.scroll-indicator');
  if (indicator) {
    if (needsScrolling) {
      indicator.style.display = 'block';
    } else {
      indicator.style.display = 'none';
    }
  }
  
  // Debug - rimuovi questo in produzione
  console.log('Slide ' + slideIndex + ' needs scrolling: ' + needsScrolling);
  console.log('Content height: ' + content.clientHeight + 'px, Content scroll height: ' + content.scrollHeight + 'px');
}

// Gestione tastiera (frecce sinistra/destra)
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') {
    changeSlide(-1);
  } else if (e.key === 'ArrowRight') {
    changeSlide(1);
  }
});

// Chiama enableScrolling anche all'inizializzazione
document.addEventListener('DOMContentLoaded', function() {
  showSlide(slideIndex);
  setTimeout(enableScrolling, 600);
});