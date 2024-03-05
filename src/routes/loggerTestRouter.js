import express from 'express';

const router = express.Router();

router.get("/loggerTest", (req, res) => {
   req.logger.warn("Error");
});

export default router;