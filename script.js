async function comprar(courseId) {
  console.log("Iniciando compra para:", courseId);

  const email = prompt("Ingresá tu correo para recibir el curso:");
  if (!email) return alert("Necesitamos un correo para enviarte el contenido.");

  try {
    const res = await fetch("https://backend-hcc8.onrender.com/create-preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId, buyerEmail: email })
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Respuesta del servidor:", text);
      alert("Error al crear preferencia. Ver consola.");
      return;
    }

    const data = await res.json();
    console.log("Respuesta de backend:", data);

    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      alert("No se recibió el enlace de pago. Ver consola.");
    }
  } catch (error) {
    console.error("Error al conectar con backend:", error);
    alert("No se pudo conectar con el servidor.");
  }
}
