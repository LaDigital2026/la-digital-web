export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nombre, email, servicio, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: "API key no configurada" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "LA DIGITAL Web <onboarding@resend.dev>",
        to: "info@la-digital.es",
        subject: `Nuevo lead: ${nombre} — ${servicio || "Sin servicio"}`,
        html: `<div style="font-family:-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1a1a1a"><div style="border-bottom:2px solid #5A9A6E;padding-bottom:16px;margin-bottom:24px"><h1 style="font-size:20px;font-weight:600;margin:0">Nuevo lead desde ladigital.es</h1></div><table style="width:100%;border-collapse:collapse"><tr><td style="padding:10px 0;font-size:13px;color:#7a7a72;width:100px">Nombre</td><td style="padding:10px 0;font-size:15px;font-weight:500">${nombre}</td></tr><tr><td style="padding:10px 0;font-size:13px;color:#7a7a72">Email</td><td style="padding:10px 0;font-size:15px"><a href="mailto:${email}" style="color:#5A9A6E">${email}</a></td></tr><tr><td style="padding:10px 0;font-size:13px;color:#7a7a72">Servicio</td><td style="padding:10px 0;font-size:15px">${servicio || "No especificado"}</td></tr><tr><td style="padding:10px 0;font-size:13px;color:#7a7a72">Mensaje</td><td style="padding:10px 0;font-size:15px;line-height:1.6">${mensaje.replace(/\n/g, "<br>")}</td></tr></table><div style="margin-top:24px;padding-top:16px;border-top:1px solid #e8e8e4;font-size:11px;color:#7a7a72">Enviado desde el formulario de contacto de ladigital.es</div></div>`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: "Error al enviar el email" });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
}
