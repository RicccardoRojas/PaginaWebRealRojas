let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            let navbar = document.getElementById('navbar');
            if (window.scrollY > 400) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            ticking = false;
        });
        ticking = true;
    }
});


  document.addEventListener("DOMContentLoaded", function () {
    var pdfActual = "";
    
    // Configuración de PDFs y contenedores por modal
    var modals = {
        exampleModal: {
            modal: document.getElementById("exampleModal"),
            pdfContainer: document.getElementById("pdfContainer"),
            pdfs: {
                gourmet: "https://res.cloudinary.com/dmkdf6q30/image/upload/v1743016547/Men%C3%BA_Gourmet_-_Noza_m8oiih.pdf",
                clasico: "https://res.cloudinary.com/dmkdf6q30/image/upload/v1743016538/BANQUETES_REAL_ROJAS_oplcx8.pdf"
            },
            buttons: {
                gourmet: document.getElementById("btnGourmet"),
                clasico: document.getElementById("btnClasico")
            }
        },
        modalsensillo: {
            modal: document.getElementById("modalsensillo"),
            pdfContainer: document.getElementById("pdfContainerSensillo"),
            pdfs: {
                mobiliario: "https://res.cloudinary.com/dmkdf6q30/image/upload/v1743016539/MOBILIARIO_REAL_ROJAS_agbvkk.pdf"
            },
            buttons: null // No hay botones en este modal
        }
    };
  
    function cargarPDF(tipo, modalId, sensillo) {
        var config = modals[modalId];
        if (!config) return;
        
        if (pdfActual === tipo) return;
        pdfActual = tipo;
        var url = config.pdfs[tipo];
        var pdfContainer = config.pdfContainer;
  
        pdfContainer.innerHTML = "";
  
        // Agregar loader animado
        var loadingMessage = document.createElement("div");
        loadingMessage.classList.add("loader-container");
        loadingMessage.innerHTML = `<div class="loader"></div>`;
        pdfContainer.appendChild(loadingMessage);
  
        pdfjsLib.getDocument(url).promise.then(function (pdf) {
            const totalPages = pdf.numPages;
            let renderPromises = [];
  
            for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                renderPromises.push(
                    pdf.getPage(pageNum).then(function (page) {
                        return new Promise((resolve) => {
                            const scale = window.devicePixelRatio > 1 ? 1.5 : 1;
                            const viewport = page.getViewport({ scale: scale });
  
                            const canvas = document.createElement("canvas");
                            canvas.style.width = "100%";
                            canvas.style.marginBottom = "10px";
  
                            const context = canvas.getContext("2d");
                            canvas.width = viewport.width;
                            canvas.height = viewport.height;
  
                            const renderContext = {
                                canvasContext: context,
                                viewport: viewport
                            };
  
                            page.render(renderContext).promise.then(function () {
                                resolve(canvas);
                            });
                        });
                    })
                );
            }
  
            Promise.all(renderPromises).then((canvases) => {
                pdfContainer.innerHTML = ""; // Eliminar loader
                canvases.forEach((canvas) => pdfContainer.appendChild(canvas));
            });
        });
  
        if (!sensillo && config.buttons) {
            // Cambiar estilos de botones si no es el modal "sensillo"
            Object.keys(config.buttons).forEach((key) => {
                config.buttons[key].classList.toggle("btn-primary", key === tipo);
                config.buttons[key].classList.toggle("btn-outline-primary", key !== tipo);
            });
        }
    }
  
    function abrirModal(modalId, tipo) {
        var config = modals[modalId];
        if (!config) return;
  
        var miModal = new bootstrap.Modal(config.modal);
        miModal.show();
  
        cargarPDF(tipo, modalId, modalId === "modalsensillo");
  
        config.modal.addEventListener("hidden.bs.modal", function () {
            config.pdfContainer.innerHTML = "";
            pdfActual = "";
        });
    }
  
    // Asignar eventos a los botones de selección de PDF
    document.getElementById("btnGourmet")?.addEventListener("click", function () {
        cargarPDF("gourmet", "exampleModal", false);
    });
  
    document.getElementById("btnClasico")?.addEventListener("click", function () {
        cargarPDF("clasico", "exampleModal", false);
    });
  
    modals.exampleModal.modal.addEventListener("shown.bs.modal", function () {
        cargarPDF("gourmet", "exampleModal", false);
    });
  
    modals.modalsensillo.modal.addEventListener("shown.bs.modal", function () {
        cargarPDF("mobiliario", "modalsensillo", true);
    });
  
    // Hacer las funciones accesibles desde el HTML
    window.abrirModal = abrirModal;
  });
  

function abrirModalImagenes() {
    var miModal = new bootstrap.Modal(document.getElementById('modalfotos'));
    miModal.show();
  }

  function cambiarImagen(imgElement, id) {
    // Cambiar la imagen principal
    document.getElementById("imagenPrincipal").src = imgElement.src;

    // Remover la clase "seleccionada" de todas las miniaturas
    document.querySelectorAll(".miniatura").forEach(el => el.classList.remove("seleccionada"));

    // Agregar la clase "seleccionada" a la miniatura activa
    document.getElementById(id).classList.add("seleccionada");
}

function desplazarMiniaturas(direccion) {
    let contenedor = document.querySelector(".miniaturas-container");
    let desplazamiento = 100; // Pixels a mover

    // Si la dirección es -1 (izquierda), desplazamos a la izquierda
    // Si la dirección es 1 (derecha), desplazamos a la derecha
    contenedor.scrollBy({ left: direccion * desplazamiento, behavior: "smooth" });
}

const services = [
    {
        title: "Nuestro Espacio",
        description: "Brindamos el mejor espacio para eventos con atención especial y personalizada, asegurando que cada cliente tenga una experiencia única y satisfactoria.",
        icon: "bi-gem",
        color: "#f39c12",
        image: "https://res.cloudinary.com/dmkdf6q30/image/upload/f_auto,q_auto/v1742404338/Nuestro_Espacio_wdvjc3.jpg"
    },
    {
        title: "Nuestra Prioridad",
        description: "Desde el primer momento, nos dedicamos a entender tus necesidades y asegurarnos de que todo salga perfecto, brindando un ambiente único para ti y tus invitados.",
        icon: "bi-eye",
        color: "#1abc9c",
        image: "https://res.cloudinary.com/dmkdf6q30/image/upload/f_auto,q_auto/v1742404341/Tu_evento_nuestra_prioridad_k6odn2.jpg"
    },
    {
        title: "Ambiente & Estilo",
        description: "Desde el primer contacto, nos enfocamos en crear un ambiente único. Cada detalle está cuidadosamente pensado para ofrecerte una experiencia excepcional.",
        icon: "bi-brush",
        color: "#e74c3c",
        image: "https://res.cloudinary.com/dmkdf6q30/image/upload/f_auto,q_auto/v1742404327/Ambiente_y_Estilo_agcyjc.jpg"
    }
];

const container = document.getElementById("services-container");

services.forEach(service => {
    const card = `
        <div class="col-lg-4 col-md-6 text-center mb-4">
            <div class="service-card shadow p-4 rounded">
                <div class="service-icon mb-3">
                    <i class="bi ${service.icon}" style="font-size: 3rem; color: ${service.color};"></i>
                </div>
                <h4 class="service-title mb-2">${service.title}</h4>
                <p class="text-muted">${service.description}</p>
                <div class="img-container mb-3">
                    <img src="${service.image}" alt="${service.title}" class="img-fluid rounded" style="object-fit: cover; height: 500px; width: 100%;">
                </div>
            </div>
        </div>
    `;
    container.innerHTML += card;
});


const servicios = [
    {
        titulo: "Banquete",
        descripcion: "Ofrecemos menús personalizados para que tu evento cuente con los mejores platillos, adaptados a las necesidades de tus invitados.",
        icono: "bi-patch-check",
        color: "#3498db",
        imagen: "https://res.cloudinary.com/dmkdf6q30/image/upload/v1742404329/BANQUETES_jpjlmr.jpg",
        modalId: "exampleModal",
        modalData: "gourmet"
    },
    {
        titulo: "Mobiliario",
        descripcion: "Ofrecemos mobiliario elegante y versátil que se adapta a cualquier tipo de evento. Desde mesas y sillas sofisticadas hasta mobiliario accesible y de calidad.",
        icono: "bi-emoji-heart-eyes",
        color: "#9b59b6",
        imagen: "https://res.cloudinary.com/dmkdf6q30/image/upload/v1742404336/Mobiliario_zfwacd.jpg",
        modalId: "modalsensillo",
        modalData: "mobiliario"
    },
    {
        titulo: "Sonido e Iluminación",
        descripcion: "Proporcionamos equipos de sonido e iluminación de última generación para crear el ambiente perfecto durante tu evento.",
        icono: "bi-music-note-beamed",
        color: "#f1c40f",
        imagen: "https://res.cloudinary.com/dmkdf6q30/image/upload/v1742404339/Sonido_s3g7vv.jpg"
    }
];

const serviciosContainer = document.getElementById("servicios-container");

servicios.forEach(servicio => {
    const onclickAttribute = servicio.modalId ? `onclick="abrirModal('${servicio.modalId}', '${servicio.modalData}')"` : "";
    
    const card = `
        <div class="col-lg-4 col-md-6 mb-4" ${onclickAttribute}>
            <div class="service-card shadow p-4 rounded">
                <div class="service-icon mb-3">
                    <i class="bi ${servicio.icono}" style="font-size: 3rem; color: ${servicio.color};"></i>
                </div>
                <h4 class="service-title mb-2">${servicio.titulo}</h4>
                <p class="text-muted" style="height: 100px;">${servicio.descripcion}</p>
                <div class="img-container mb-3">
                    <img src="${servicio.imagen}" alt="${servicio.titulo}" class="img-fluid rounded" style="object-fit: cover; height: 500px; width: 100%;">
                </div>
            </div>
        </div>
    `;

    serviciosContainer.innerHTML += card;
});



const imagenesCasino = [
    "https://res.cloudinary.com/dmkdf6q30/image/upload/f_auto,q_auto/v1742404329/CASINO-BG_rradyo.jpg",
    "https://res.cloudinary.com/dmkdf6q30/image/upload/v1742407034/Casino/ajvvngoxnmc25eprkmhx.jpg",
    "https://res.cloudinary.com/dmkdf6q30/image/upload/v1742407034/Casino/vdmunxuip8m9hnavc1gj.jpg",
    "https://res.cloudinary.com/dmkdf6q30/image/upload/v1742407035/Casino/bsb8kaz5htqb5o7cxe3v.jpg",
    "https://res.cloudinary.com/dmkdf6q30/image/upload/v1742407035/Casino/nnyprmpfdzzvvmtpqtz4.jpg",
    "https://res.cloudinary.com/dmkdf6q30/image/upload/v1742407035/Casino/tbpetftr63ckegitqnyc.jpg",
    "https://res.cloudinary.com/dmkdf6q30/image/upload/v1742407040/Casino/mbbnbjxnlmk2ezw6ueco.jpg",
    "https://res.cloudinary.com/dmkdf6q30/image/upload/v1742407036/Casino/vztbo9aasbdzok9n1wjb.jpg",
    "https://res.cloudinary.com/dmkdf6q30/image/upload/v1742407040/Casino/mbbnbjxnlmk2ezw6ueco.jpg",
    "https://res.cloudinary.com/dmkdf6q30/image/upload/v1742407036/Casino/vztbo9aasbdzok9n1wjb.jpg"
];

function abrirModalImagenes(seccion) {
    console.log("Abriendo modal de:", seccion);

    const modalElement = document.getElementById("modalfotos");
    if (!modalElement) {
        console.error("El modal no existe en el DOM");
        return;
    }

    // Mostrar la primera imagen
    const imagenPrincipal = document.getElementById("imagenPrincipal");
    imagenPrincipal.src = imagenesCasino[0];

    // Llenar miniaturas
    const miniaturasContainer = document.querySelector(".miniaturas-container");
    miniaturasContainer.innerHTML = "";

    imagenesCasino.forEach((imagen, index) => {
        const img = document.createElement("img");
        img.src = imagen;
        img.className = "img-thumbnail miniatura";
        img.alt = `Miniatura ${index + 1}`;
        
        // Resaltar la primera miniatura
        if (index === 0) {
            img.classList.add("seleccionada");
        }
        
        img.addEventListener("click", () => cambiarImagen(img));
        miniaturasContainer.appendChild(img);
    });

    // Configurar flechas después de crear las miniaturas
    configurarFlechas();

    // Mostrar modal
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function cambiarImagen(imgElement) {
    // Cambiar imagen principal
    document.getElementById("imagenPrincipal").src = imgElement.src;
    
    // Quitar selección de todas las miniaturas
    document.querySelectorAll(".miniatura").forEach(miniatura => {
        miniatura.classList.remove("seleccionada");
    });
    
    // Añadir selección a la miniatura clickeada
    imgElement.classList.add("seleccionada");
    
    // Hacer scroll para que la miniatura sea visible
    imgElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
    });
}

function configurarFlechas() {
    const miniaturasContainer = document.querySelector(".miniaturas-container");
    const flechaIzquierda = document.getElementById("flechaIzquierda");
    const flechaDerecha = document.getElementById("flechaDerecha");
    
    // Flecha izquierda
    flechaIzquierda.addEventListener("click", () => {
        miniaturasContainer.scrollBy({
            left: -200, // Ajusta este valor según necesidad
            behavior: "smooth"
        });
    });
    
    // Flecha derecha
    flechaDerecha.addEventListener("click", () => {
        miniaturasContainer.scrollBy({
            left: 200, // Ajusta este valor según necesidad
            behavior: "smooth"
        });
    });
    
    // Ocultar flechas si no hay overflow
    const checkOverflow = () => {
        const hasOverflow = miniaturasContainer.scrollWidth > miniaturasContainer.clientWidth;
        flechaIzquierda.style.display = hasOverflow ? "block" : "none";
        flechaDerecha.style.display = hasOverflow ? "block" : "none";
    };
    
    // Verificar overflow al cargar y al redimensionar
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
}



const secciones = [
    { nombre: "Jardín", clase: "bg-jardin" },
    { nombre: "Cocina", clase: "bg-cocina" },
    { nombre: "Baños", clase: "bg-banos" },
    { nombre: "Casino", clase: "bg-casino" },
    { nombre: "Estacionamiento", clase: "bg-estacionamiento" },
    { nombre: "Palapas", clase: "bg-palapas" }
];

document.addEventListener("DOMContentLoaded", () => {
    const containersecc = document.getElementById("secciones-container");

    secciones.forEach((seccion, index) => {
        const colClass = index % 3 === 0 ? "col-12 col-md-12 col-lg-4" : "col-12 col-md-6 col-lg-4";
        const div = document.createElement("div");
        div.className = `${colClass}`;
        div.innerHTML = `
            <div class="seccion ${seccion.clase}">
                <h3>${seccion.nombre}</h3>
            </div>
        `;

        // Asignar evento manualmente
        div.querySelector(".seccion").addEventListener("click", () => abrirModalImagenes(seccion.nombre));

        containersecc.appendChild(div);
    });
});



