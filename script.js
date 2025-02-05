window.addEventListener('scroll', function() {
    let navbar = document.getElementById('navbar');
    
    if (window.scrollY > 400) { // Cambiar después de hacer scroll más de 50px
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });