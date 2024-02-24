import { Resend } from "resend";

export const config = { path: "/success" };

export default async function joinWaitList() {
  const resendKey = Netlify.env.get("RESEND_KEY");
  console.log("Resend Key: ", resendKey);
  const resend = new Resend(resendKey);
  try {
    const { error } = await resend.emails.send({
      from: "Nurl <noreply@nurl.app>",
      to: ["caseybaggz@gmail.com", "admin@nurl.app"],
      subject: "You're on the list! 🚀",
      html: "<h1>Thanks for joining the waiting list!</h1><p>We'll let you know when we're ready to launch.</p><p>In the meantime, follow us on <a href='https://twitter.com/nurlapp'>Twitter</a> for updates (or any other social platform - choose your destiny).</p><p>-- <br> Nurl Team</p>",
    });

    if (error) {
      throw new Error(error);
    }

    const resp = new Response();
    return resp.redirect(302, "/thanks");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
