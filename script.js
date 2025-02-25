window.addEventListener('scroll', function() {
    let navbar = document.getElementById('navbar');
    
    if (window.scrollY > 400) { // Cambiar después de hacer scroll más de 50px
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  function abrirModal() {
    var miModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    miModal.show();
  }

  //Abrir Modal de PDF 
  document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("exampleModal");
    var pdfContainer = document.getElementById("pdfContainer");
    var btnGourmet = document.getElementById("btnGourmet");
    var btnClasico = document.getElementById("btnClasico");

    var pdfs = {
        gourmet: "pdf/Menú Gourmet - Noza.pdf",
        clasico: "pdf/BANQUETES REAL ROJAS.pdf"
    };

    var pdfActual = "";

    function cargarPDF(tipo) {
        if (pdfActual === tipo) return;
        pdfActual = tipo;
        var url = pdfs[tipo];

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

        // Cambiar estilos de botones
        btnGourmet.classList.toggle("btn-primary", tipo === "gourmet");
        btnGourmet.classList.toggle("btn-outline-primary", tipo !== "gourmet");
        btnClasico.classList.toggle("btn-primary", tipo === "clasico");
        btnClasico.classList.toggle("btn-outline-primary", tipo !== "clasico");
    }

    btnGourmet.addEventListener("click", function () {
        cargarPDF("gourmet");
    });

    btnClasico.addEventListener("click", function () {
        cargarPDF("clasico");
    });

    modal.addEventListener("shown.bs.modal", function () {
        cargarPDF("gourmet");
    });

    modal.addEventListener("hidden.bs.modal", function () {
        pdfContainer.innerHTML = "";
        pdfActual = "";
    });
});


function abrirModalSensillo() {
  var miModal = new bootstrap.Modal(document.getElementById("modalsensillo"));
  miModal.show();
}

// Abrir Modal de PDF
document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("modalsensillo");
  var pdfContainer = document.getElementById("pdfContainerSensillo");

  var pdfs = {
      mobiliario: "pdf/MOBILIARIO REAL ROJAS.pdf",
  };

  var pdfActual = "";

  function cargarPDF(tipo) {
      if (pdfActual === tipo) return;
      pdfActual = tipo;
      var url = pdfs[tipo];

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

  }

  modal.addEventListener("shown.bs.modal", function () {
      cargarPDF("mobiliario");
  });

  modal.addEventListener("hidden.bs.modal", function () {
      pdfContainer.innerHTML = "";
      pdfActual = "";
  });
});
