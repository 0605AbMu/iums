// Bu fayl endi faqat request log uchun middleware sifatida ishlatiladi
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} - ${req.ip} - ${res.statusCode} - ${duration}ms`);
  });
  next();
};
