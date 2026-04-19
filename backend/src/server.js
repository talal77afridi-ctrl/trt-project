const app = require("./app");
const { port } = require("./config/env");
const connectDB = require("./config/db");

async function bootstrap() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Backend server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

bootstrap();
