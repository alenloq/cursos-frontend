async function comprar(courseId) {
  const email = prompt("Ingresá tu correo para recibir el curso:");
  if (!email) return alert("Necesitamos un correo para enviarte el contenido.");

  const res = await fetch("https://backend-hcc8.onrender.com/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ courseId, buyerEmail: email })
  });

  const data = await res.json();
  if (data.init_point) window.location.href = data.init_point;
  else alert("Error al crear la preferencia de pago.");
}
