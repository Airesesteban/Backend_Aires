import express from 'express';

const router = express.Router();

router.get("/loggerTest", (req, res) => {
   req.logger.debug("Mensaje debug");
   req.logger.http("Mensaje http");
   req.logger.info("Informacion");
   req.logger.warning("Alerta!");
   req.logger.error("Error");
});

export default router;