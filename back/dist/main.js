"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const main_module_1 = require("./modules/main.module");
const bodyParser = require("body-parser");
require("dotenv/config");
const mongoose = require("mongoose");
async function bootstrap() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL, {});
        console.log('Database connection established!');
        const app = await core_1.NestFactory.create(main_module_1.AppModule);
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        await app.listen(process.env.BPORT);
        console.log(`Application started on port ${process.env.BPORT}`);
    }
    catch (error) {
        console.error('Error while starting the application', error);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map