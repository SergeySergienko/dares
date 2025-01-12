"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT || 5000;
(0, app_1.initializeApp)().then((app) => {
    app.listen(PORT, () => {
        console.log('\x1b[36m%s\x1b[0m', `[OK] App is running on ${PORT} port...`);
        console.log('--------------------------------------------');
    });
});
