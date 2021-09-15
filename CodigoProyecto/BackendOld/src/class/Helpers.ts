import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import util from 'util';
const readFile = util.promisify(fs.readFile);
interface Usuario {}

export class Helpers {
    static async readHTMLFile(path: string): Promise<any> {
        try {
            return await readFile(path, { encoding: 'utf-8' });
        } catch (e) {
            return Promise.reject('Error al leer el archivo html');
        }
    }
    static async jwtSign(usuario: Usuario): Promise<string> {
        try {
            return await jwt.sign({ usuario }, 'secreto', { expiresIn: '6h' });
        } catch (e) {
            return Promise.reject('Error al intentar crear el token.');
        }
    }

    static async jwtVerify(token: string): Promise<any> {
        try {
            return await jwt.verify(token, 'secreto');
        } catch (e) {
            return Promise.reject(
                'Error al intentar verificar el token , probablemente sea invalido',
            );
        }
    }
    static async enviarCorreo(
        contenido: string,
        asunto: string,
        titulo: string,
        correo: string,
    ): Promise<any> {
        try {
            let html = await this.readHTMLFile(
                path.resolve(__dirname, '../email/index.html'),
            );
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
            var template = handlebars.compile(html);
            var replacements = {
                titulo,
                contenido,
            };
            var htmlToSend = template(replacements);
            var mailOptions = {
                from: process.env.EMAIL,
                to: correo,
                subject: asunto,
                html: htmlToSend,
            };
            await transporter.sendMail(mailOptions);
            return true;
        } catch (e) {
            console.log(e);
            return Promise.reject('Error al intentar enviar el correo');
        }
    }
    // static async detectarDuplicado(
    //     plantilla: {},
    //     objeto1: {},
    //     objeto2: {},
    // ): Promise<boolean> {

    // }
}
