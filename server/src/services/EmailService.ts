import * as nodemailer from "nodemailer";

export class EmailService {
	private transporter?: nodemailer.Transporter;

	// this function decide if we use SMTP server in production or fake one in dev mode
	private async initialize() {
		// dev mode
		if (process.env.NODE_ENV !== "production") {
			await this.createTestAccount();
		} else {
			// Production configuration
			this.transporter = nodemailer.createTransport({
				host: process.env.SMTP_HOST,
				port: Number(process.env.SMTP_PORT) || 587,
				secure: true,
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASS,
				},
			});
		}
	}

	// Create fake mail account on Ethereal.com and give credentials with a console info, if we are in dev mode
	private async createTestAccount() {
		const testAccount = await nodemailer.createTestAccount();

		this.transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false,
			auth: {
				user: testAccount.user,
				pass: testAccount.pass,
			},
		});

		console.info("Credentials Ethereal Email :", {
			user: testAccount.user,
			pass: testAccount.pass,
			previewUrl: "https://ethereal.email",
		});
	}

	private async ensureTransporter() {
		if (!this.transporter) {
			await this.initialize();
		}
	}

	// this function create and send content for the reset password email.
	async sendPasswordResetEmail(
		email: string,
		resetToken: string,
	): Promise<boolean> {
		try {
			await this.ensureTransporter();

			if (!this.transporter) {
				throw new Error("Failed to initialize email transporter");
			}

			const resetUrl = `${process.env.FRONTEND_URL}/new-password?token=${resetToken}`;

			const mailOptions = {
				from: `"PawPlanner" <${process.env.SMTP_FROM || "noreply@pawplanner.com"}>`,
				to: email,
				subject: "Réinitialisation de votre mot de passe PawPlanner",
				text: `
          Bonjour,
          Vous avez demandé la réinitialisation de votre mot de passe PawPlanner.
          Pour réinitialiser votre mot de passe, cliquez sur le lien suivant :
          ${resetUrl}
          Ce lien est valable pendant 15 minutes.
          Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.
          L'équipe PawPlanner
        `,
				html: `
  <body
    style="
      font-family: 'Helvetica Neue', Arial, sans-serif;
      margin: 0;
      padding: 30px 20px;
      max-width: 650px;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 10px;
        outline: 20px solid #04272f;
      "
    >
      <div style="text-align: center; margin-bottom: 30px">
        <img
          src="https://i.postimg.cc/D0JT9J81/logo-pawplanner-symbole-cote-bleu-nuit-1.png"
          alt="PawPlanner"
          style="width: 250px"
        />
      </div>
      <h2
        style="
          color: #04272f;
          text-align: center;
          font-size: 28px;
          margin-bottom: 30px;
        "
      >
        Réinitialisation de mot de passe
      </h2>
      <p style="color: #04272f; font-size: 16px; line-height: 1.6">Bonjour,</p>
      <p style="color: #04272f; font-size: 16px; line-height: 1.6">
        Une demande de réinitialisation de mot de passe a été effectuée pour
        votre compte PawPlanner.
      </p>
      <div style="text-align: center; margin: 40px 0">
        <a
          href="${resetUrl}"
          style="
            background-color: #ffa84e;
            color: #04272f;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 10px;
            font-weight: bold;
            display: inline-block;
            text-transform: uppercase;
            letter-spacing: 1px;
          "
          >Réinitialiser mon mot de passe</a
        >
      </div>
      <p style="color: #8cc871; font-size: 14px; text-align: center">
        Ce lien expire dans 15 minutes.
      </p>
      <div
        style="
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #04272f;
          text-align: center;
        "
      >
        <p style="color: #04272f; font-size: 14px">
          Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
        </p>
        <p style="color: #ffa84e; margin-top: 20px">L'équipe PawPlanner</p>
      </div>
    </div>
  </body>
        `,
			};

			const info = await this.transporter.sendMail(mailOptions);

			if (process.env.NODE_ENV !== "production") {
				console.info(
					"URL de prévisualisation:",
					nodemailer.getTestMessageUrl(info),
				);
			}

			return true;
		} catch (error) {
			console.error("Erreur lors de l'envoi de l'email:", error);
			return false;
		}
	}
}
