
const RESEND_API_KEY = "re_gAVJXwjN_5ws5pAHn16CZqp6c14ctXzz2";
const RESEND_FROM = "curtaincall@rotboroughweb.com";
const TRIGGER_CODE = "0012000320";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body);
  const { email, reference } = data;

  if (reference === TRIGGER_CODE) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: email,
        subject: "Testing",
        html: "<p>Testing</p>",
      }),
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Inquiry submitted" }),
  };
};
