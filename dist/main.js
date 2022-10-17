"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const dotenv_1 = require("dotenv");
const app_module_1 = require("./app.module");
async function start() {
    (0, dotenv_1.config)();
    const PORT = +process.env.PORT || 5001;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(PORT, () => console.log(`Server has been starten on port: ${PORT}`));
}
start();
//# sourceMappingURL=main.js.map