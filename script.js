const coursesContainer = document.getElementById("courses");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const modalImg = document.getElementById("modalImg");
const modalBuy = document.getElementById("modalBuy");

function renderCursos() {
  cursos.forEach(curso => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${curso.imagen}" alt="${curso.titulo}">
      <h2>${curso.titulo}</h2>
      <p><strong>$${curso.precio} ARS</strong></p>
    `;
    card.addEventListener("click", () => abrirModal(curso));
    coursesContainer.appendChild(card);
  });
}

function abrirModal(curso) {
  modalTitle.textContent = curso.titulo;
  modalDesc.textContent = curso.descripcion;
  modalPrice.textContent = `$${curso.precio} ARS`;
  modalImg.src = curso.imagen;
  modalBuy.onclick = () => comprar(curso.id);
  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});

renderCursos();

/* ===== FUNCIÓN COMPRAR ===== */
async function comprar(cursoId) {
  console.log("Iniciando compra para:", cursoId);
  try {
    const response = await fetch("https://cursos-backend-tcfy.onrender.com/create-preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cursoId })
    });
    const data = await response.json();
    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      alert("Error al crear la preferencia de pago.");
    }
  } catch (err) {
    console.error("Error al conectar con backend:", err);
  }
}

