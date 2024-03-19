"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail =  async (formData: FormData) => {
  const modelo = formData.get('modelo');
  const tamanho = formData.get('tamanho');
  const telefone = formData.get('telefone');

  const { data } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "luismingati@gmail.com",
    subject: "Novo pedido de tenis!",
    text: `Novo pedido de tenis!\n\nModelo: ${modelo}\nTamanho: ${tamanho}\nTelefone para contato: ${telefone}`
  })
  console.log(data);
}