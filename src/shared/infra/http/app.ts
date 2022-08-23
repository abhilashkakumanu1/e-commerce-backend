import express from "express";
import cors from "cors";

const PORT = 3000;

const corsOptions = {
    origin: "*",
};

const app = express();

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Health check route
app.get("/health-check", (_, res) => {
    res.send("Working!");
});

const startServer = async () => {
    // Start server
    app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
};

startServer();
