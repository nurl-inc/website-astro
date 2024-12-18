export async function POST({ request }: { request: Request }) {
  const data = await request.json();

  const recaptchaURL = "https://www.google.com/recaptcha/api/siteverify";
  const requestHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const requestBody = new URLSearchParams({
    secret: "TODO",
    response: data.recaptcha, // The token passed in from the client
  });

  const response = await fetch(recaptchaURL, {
    method: "POST",
    headers: requestHeaders,
    body: requestBody.toString(),
  });

  const responseData = await response.json();

  if (responseData.success) {
    return new Response(JSON.stringify(responseData), { status: 200 });
  } else {
    return new Response(JSON.stringify(responseData), { status: 400 });
  }
}
