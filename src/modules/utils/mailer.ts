import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const { MAIL_USERNAME, MAIL_PASSWORD, MAIL_HOST, MAIL_PORT, SERVER_TYPE } = process.env

enum fromAddress  {
  codeGuru =  '"Code Guru" <info@codeguru.ae>'
}

/**
 * Mailer class for sending emails.
 */
class Mailer {
  private transporter: nodemailer.Transporter

  /**
   * Creates a mailer object.
   */
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: Number(MAIL_PORT),
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
      },
    })
  }

  /**
   * Sends an email. If the server type is development, it logs the email to the console instead of sending it.
   * @param { from: string, to: string, subject: string, text?: string, html?: string, attachments?: [{ filename: string; content: Buffer | string; encoding: string }] } options - The email options.
   */
  async sendEmail(options: {
    from: fromAddress
    to: string
    subject: string
    text?: string
    html?: string
    attachments?: [{ filename: string; content: Buffer | string; encoding: string }]
  }): Promise<void> {
    if (SERVER_TYPE === 'development') console.log(`Sending email to ${options.to}...`)

    try {
      const mailOptions: nodemailer.SendMailOptions = {
        from: options.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments,
      }

      await this.transporter.sendMail(mailOptions)
      if (SERVER_TYPE === 'development') console.log(`Email sent to ${options.to} successfully.`)
    } catch (error) {
      console.error('Error sending email:', error)
      throw error
    }
  }
}

const mailerInstance = new Mailer()

export { fromAddress, mailerInstance as mailer }

