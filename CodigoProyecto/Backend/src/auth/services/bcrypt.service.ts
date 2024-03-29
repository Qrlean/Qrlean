import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
@Injectable()
export class BcryptService {
    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
