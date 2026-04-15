import app from "./src/app";
import { connectDB } from "./src/config/database";
import { createServer } from "http";

const port = Number(process.env.PORT ?? 3000);
const httpServer = createServer(app);

async function bootstrap() {
    try {
        await connectDB();
        httpServer.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

void bootstrap();

