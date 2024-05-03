import nodemailer from "nodemailer";
import { config } from "dotenv"; // Библиотека для работы с переменными окружения
config({ path: "./other/.env" }); // Загрузка переменных окружения из файла .env

const SMTP_HOST = process.env.SMTP_HOST || "smpt host is not working";
const SMTP_PORT = process.env.SMTP_PORT || 587;
const SMTP_USER = process.env.SMTP_USER || "smpt user is not working";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "smtp password is not working";
const SITE_URL = process.env.SITE_URL || "site url is not working";

class MailService {
    transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: false,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD
            }
        } as nodemailer.TransportOptions);
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: SMTP_USER,
            to,
            subject: "Account's activation on " + SITE_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>For actovation click on this link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
}

export default new MailService();