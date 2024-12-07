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
          <h2>Réinitialisation de mot de passe</h2>
          <p>Bonjour,</p>
          <p>Vous avez demandé la réinitialisation de votre mot de passe PawPlanner.</p>
          <p>Pour réinitialiser votre mot de passe, cliquez sur le bouton ci-dessous :</p>
          <p>
            <a href="${resetUrl}"
               style="background-color: #4CAF50; color: white; padding: 14px 20px; text-decoration: none; border-radius: 4px;">
              Réinitialiser mon mot de passe
            </a>
          </p>
          <p>Ce lien est valable pendant 15 minutes.</p>
          <p>Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.</p>
          <p>L'équipe PawPlanner</p>
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
