import { Resend } from "resend";

export const config = { path: "/success" };

export default async function joinWaitList(req) {
  const formData = await req.formData();
  const email = formData.get("email");
  const resendKey = Netlify.env.get("RESEND_KEY");
  const resend = new Resend(resendKey);
  try {
    const { error } = await resend.emails.send({
      from: "Nurl <noreply@nurl.app>",
      to: [email, "admin@nurl.app"],
      subject: "You're on the list! 🚀",
      html: "<h1>Thanks for joining the waiting list!</h1><p>We'll let you know when we're ready to launch.</p><p>In the meantime, follow us on <a href='https://twitter.com/nurlapp'>Twitter</a> for updates (or any other social platform - choose your destiny).</p><p>-- <br> Nurl Team</p>",
    });
    const { data, error: audienceError } = await resend.contacts.create({
      email,
      audienceId: "be0906d7-afca-4a26-a631-98b970ff8388",
    });

    console.log("new contact", email, data);

    if (error) {
      throw new Error(error);
    }
    if (audienceError) {
      throw new Error(audienceError);
    }

    const resp = new Response();
    return resp.redirect(302, "/thanks");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
