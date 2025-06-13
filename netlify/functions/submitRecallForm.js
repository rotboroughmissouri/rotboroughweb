const RESEND_API_KEY = "re_gAVJXwjN_5ws5pAHn16CZqp6c14ctXzz2";
const RESEND_FROM = "gerberlaw@rotboroughweb.com";
const TRIGGER_SUFFIX = "4198";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body);
  const { email, reference } = data;

  // Check if last 4 digits of reference number are "4198"
  if (reference && reference.slice(-4) === TRIGGER_SUFFIX) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: RESEND_FROM,
          to: email,
          subject: "NXHealth Recall Compensation - Next Steps",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1e3a8a;">Gerber Law Group - NXHealth Recall Case</h2>
              
              <p>Dear Potential Client,</p>
              
              <p>Thank you for submitting your diagnostic test reference number. Based on your submission, you may be eligible for compensation related to the NXHealth product recall.</p>
              
              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>A case representative will contact you within 24-48 hours</li>
                <li>Please have your reference number ready: <strong>${reference}</strong></li>
                <li>Gather any documentation related to product use or health impacts</li>
              </ul>
              
              <p><strong>Growing Minds Learning Center Partnership:</strong><br>
              If your case involves a minor, you may also be eligible for free behavioral assessment and treatment through our partnership with Growing Minds Learning Center.</p>
              
              <p>For immediate questions, please call our hotline at (555) 123-LEGAL</p>
              
              <p>Best regards,<br>
              <strong>Gerber Law Group</strong><br>
              <em>Fighting for your rights</em></p>
              
              <hr style="margin: 20px 0;">
              <p style="font-size: 12px; color: #666;">
                This email was sent in response to your NXHealth recall inquiry. If you did not submit this request, please disregard this message.
              </p>
            </div>
          `,
        }),
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Form submitted successfully" }),
  };
};