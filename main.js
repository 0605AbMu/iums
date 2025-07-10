require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

const cookieParser = require("cookie-parser");
const logger = require('./utils/logger');
const requestLogger = require('./middleware/logger');
const app = express();
app.use(express.json());
app.use(cookieParser());

// Global request logger
app.use(requestLogger);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MongoDB ulash
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info("MongoDB connected"))
  .catch((err) => logger.error("MongoDB error: " + err));

// Auth route-lar
app.use("/api/auth", require("./routes/auth"));

// Default / uchun /api-docs ga redirect
app.get('/', (req, res) => res.redirect('/api-docs'));
// Faqat users route uchun adminAuth
const adminAuth = require("./middleware/adminAuth");
app.use(require("./routes/users"));


// Swagger
const swaggerFile = path.join(__dirname, "config", "swagger.json");
if (fs.existsSync(swaggerFile)) {
  const swaggerDocument = require(swaggerFile);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// 404 Not Found handler (eng oxirida)
app.use((req, res, next) => {
  res.status(404);
  // Agar view so'rovi bo'lsa, 404 sahifa render qilinadi
  if (req.accepts("html")) {
    return res.render("404");
  }
  // Agar API so'rovi bo'lsa, JSON qaytariladi
  if (req.accepts("json")) {
    return res.json({ success: false, message: "URL not found", data: null });
  }
  // Default: plain text
  res.type("txt").send("404: Not found");
});

// Global error handler
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
