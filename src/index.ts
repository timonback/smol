import fs from "fs";
import crypto from "crypto";

import { lexer } from "./lexer";
import { smolBasic, smolFib, smolEasyTest } from "./example";
import { parser } from "./parser";
import { interpreter } from "./interpreter";

export const evaluate = (smol: string) => {
    const filename = './dist/' + crypto.createHash('md5').update(smol).digest('hex');
    console.log(`Compile code to ${filename}`)

    const tokens = lexer(smol);
    fs.writeFileSync(filename + ".tokens.txt", JSON.stringify(tokens, null, 2));

    const ast = parser(tokens);
    fs.writeFileSync(filename + ".ast.txt", JSON.stringify(ast, null, 2));

    const res = interpreter(ast, {});
    fs.writeFileSync(filename + ".res.txt", JSON.stringify(res, null, 2));
};

evaluate(smolFib);
