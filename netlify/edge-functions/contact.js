import { Resend } from "resend";

export const config = { path: "/contact-thanks" };

export default async function contactNurl(req) {
  const formData = await req.formData();
  const name = formData.get("name");
  const company = formData.get("company");
  const email = formData.get("email");
  const message = formData.get("message");

  const resendKey = Netlify.env.get("RESEND_KEY");
  const audienceId = "ab7d1118-3574-48cf-b190-cc1773f5a2c7";
  const resend = new Resend(resendKey);

  try {
    const { error } = await resend.emails.send({
      from: "Nurl <noreply@nurl.app>",
      to: [email, "admin@nurl.app"],
      subject: "We got your message! 💬",
      html:
        "<h1>Thanks for contacting us!</h1><p>We value and appreciate your connection and can't wait to get in touch with you. Please allow us up to 48 hours to respond.</p><p>-- <br> Nurl Team</p> <br /><hr /> <p>Here's a copy of your message:</p><p><strong>Name:</strong> " +
        name +
        "</p><p><strong>Company:</strong> " +
        company +
        "</p><p><strong>Email:</strong> " +
        email +
        "</p><p><strong>Message:</strong> " +
        message +
        "</p>",
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
