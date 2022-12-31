const nodemailer = require("nodemailer");
const cors = require("cors");

var whitelist = ["https://www.cybersaksham.co.in"];
const corsMDWare = cors({
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Something went wrong"));
    }
  },
  methods: ["POST"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function sendMail(req, res) {
  try {
    await runMiddleware(req, res, corsMDWare);

    if (req.method === "POST") {
      const { name, email, subject, message } = req.body;

      const mailUser = process.env.MAIL_USERNAME;
      const mailPass = process.env.MAIL_PASSWORD;
      const clientId = process.env.OAUTH_CLIENTID;
      const clientSecret = process.env.OAUTH_CLIENT_SECRET;
      const refreshToken = process.env.OAUTH_REFRESH_TOKEN;

      let thanks = `<div class=content style="background: #ffffff;
    background: linear-gradient(to bottom, #ffffff 0%, #e1e8ed 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#e1e8ed', GradientType=0);
    margin: 0;
    background-repeat: no-repeat;
    background-attachment: fixed;">
        <div class="wrapper-1" style="
        display: flex;
        flex-direction: column;">
            <div class="wrapper-2" style="padding: 30px;
            text-align: center;">
                <h1 style="font-family: 'Kaushan Script', cursive;
                font-size: 4em;
                letter-spacing: 3px;
                color: #5892FF;
                margin: 0;
                margin-bottom: 20px;">Thank you !</h1>
                <p style="margin: 0;
            font-size: 1.3em;
            color: #aaa;
            font-family: 'Source Sans Pro', sans-serif;
            letter-spacing: 1px;">Thanks for contacting me. </p>
                <p style="margin: 0;
            font-size: 1.3em;
            color: #aaa;
            font-family: 'Source Sans Pro', sans-serif;
            letter-spacing: 1px;">I will reply you soon.</p>
            </div>
        </div>
    </div>`;

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: mailUser,
          pass: mailPass,
          clientId: clientId,
          clientSecret: clientSecret,
          refreshToken: refreshToken,
        },
      });

      let mailOptions = {
        from: `"Saksham Bindal" <${mailUser}>`,
        to: email,
        subject: "Thanks for contact",
        html: thanks,
      };

      let mailOptions2 = {
        from: `"Saksham Bindal" <${mailUser}>`,
        to: mailUser,
        subject: subject,
        html: `Message from ${name} ${email}<br/><br/><b>${message}</b>`,
      };

      transporter.sendMail(mailOptions2, function (err, data) { });

      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          res.status(400).send({ error: "Try again" });
        } else {
          res.send({ msg: "Email sent" });
        }
      });
    } else res.status(404).json({ error: "Method not allowed" });
  } catch (e) {
    res.status(500).json({ error: "Server Error" });
  }
}
