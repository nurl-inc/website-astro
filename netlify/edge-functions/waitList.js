import { Resend } from "resend";
import verifier from "verifier-node";
export const config = { path: "/success" };

export default async function joinWaitList(req) {
  const formData = await req.formData();
  const email = formData.get("email");
  const verifierKey = Netlify.env.get("VERIFIER_KEY");
  const resendKey = Netlify.env.get("RESEND_KEY");
  const audienceId = "be0906d7-afca-4a26-a631-98b970ff8388";
  const resend = new Resend(resendKey);

  const badDomains = ["vtext.com", "txt.att.net", "googlemail.com"];
  let isValid = true;

  if (badDomains.includes(email.split("@")[1])) {
    isValid = false;
    return new Response("Invalid email", { status: 400 });
  }

  if (/^\d/.test(email)) {
    isValid = false;
    return new Response("Invalid email", { status: 400 });
  }

  // verify email
  try {
    const response = await verifier.verify(email, verifierKey);
    console.log("recaptcha data", response, response.valid());
    isValid = response.valid();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  if (!isValid) {
    return new Response("Invalid email", { status: 400 });
  }

  try {
    const { data: listData, error: listError } = await resend.contacts.list({
      audienceId,
    });
    if (listError) {
      throw new Error(listError);
    }
    const contact = listData.data.find((contact) => contact.email === email);
    if (contact) {
      const url = new URL("/thanks", req.url);
      return Response.redirect(url, 302);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  try {
    const { error } = await resend.emails.send({
      from: "Nurl <noreply@nurl.app>",
      to: [email, "admin@nurl.app"],
      subject: "You're on the list! 🚀",
      html: "<h1>Thanks for joining the waiting list!</h1><p>We'll let you know when we're ready to launch. If you have any questions or would like to user test our new features before launch, email us at <a href=\"mailto:admin@nurl.app\">admin@nurl.app</a>.</p><p>In the meantime, follow us on <a href='https://twitter.com/nurlapp'>Twitter</a> for updates (or any other social platform - choose your destiny).</p><p>-- <br> Nurl Team</p>",
    });
    if (error) {
      throw new Error(error);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  try {
    const data = await resend.contacts.create({
      email,
      audienceId,
    });
    console.log("contact created", data);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
