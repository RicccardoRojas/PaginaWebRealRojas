window.addEventListener('scroll', function() {
    let navbar = document.getElementById('navbar');
    
    if (window.scrollY > 400) { // Cambiar después de hacer scroll más de 50px
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
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
                gourmet: "pdf/Menú Gourmet - Noza.pdf",
                clasico: "pdf/BANQUETES REAL ROJAS.pdf"
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
                mobiliario: "pdf/MOBILIARIO REAL ROJAS.pdf"
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

