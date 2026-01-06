import express from "express";

import imeiRoutes from "./routes/imei.routes.js";

const app = express();

app.use(express.json());

// sob routes ektar sathe attached > /api/imei
app.use("/api/imei", imeiRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
