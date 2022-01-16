import express from 'express';
import playCtrl from '../controllers/play.controller';
const router = express.Router();
router.route('/api/plays')
    .get(playCtrl.list)
    .post(playCtrl.create);
router.route('/api/plays/:playId')
    .get(playCtrl.read)
    .put(playCtrl.update)
    .delete(playCtrl.remove);
router.param('playId', playCtrl.playById);
export default router;
