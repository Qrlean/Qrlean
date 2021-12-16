import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs').promises;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
import { Templates } from '../enum/templates.enum';
import handlebars from 'handlebars';

@Injectable()
export class HandlebarsService {
    async readHTMLFile(pathToFile: string): Promise<string> {
        return fs.readFile(pathToFile, { encoding: 'utf-8' });
    }
    async handlebarsReplace(
        template: Templates,
        replacements: any,
    ): Promise<string> {
        const pathHtml = path.resolve(__dirname, `../templates/${template}`);
        const templateCompile = handlebars.compile(
            await this.readHTMLFile(pathHtml),
        );
        return templateCompile(replacements);
    }
}
