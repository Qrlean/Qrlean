import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const QrCode = require('qrcode');
@Injectable()
export class QrService {
    async generateQr(url: string): Promise<string> {
        return QrCode.toDataURL(url, {});
    }
}
