import { Router } from 'express';

const router = Router();

router.get('/health', (_, res) => {
  return res.status(200).json({
    message: "Conection established",
    status: true,
    timeStamp: new Date(),
  });
});

export default router;