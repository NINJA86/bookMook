"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const db_1 = __importDefault(require("./lib/db"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/api/book', book_route_1.default);
const startServer = async () => {
    await (0, db_1.default)();
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
};
startServer();
