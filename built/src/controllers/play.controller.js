var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Play } from '../models/play.model';
import errorHandler from './../helpers/dbErrorHandler';
import extend from 'lodash/extend';
const create = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const play = new Play(request.body);
    try {
        yield play.save();
        return response.status(200).json({
            message: 'Successfully created new play'
        });
    }
    catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
});
// TODO: Resolve return types
const playById = (request, response, next, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let play = yield Play.find(id);
        if (!play) {
            return response.status(400).json({
                error: 'Play not found'
            });
        }
        // TODO: Consider play size and moniter performace.
        request.play = play;
        next();
    }
    catch (error) {
        return response.status(400).json({
            error: 'Could not retrieve play'
        });
    }
});
const read = (request, response) => __awaiter(void 0, void 0, void 0, function* () { return response.json(request.play); });
const list = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let play = Play.find({}).select('_id name summary');
        return response.status(200).json(play);
    }
    catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
});
const update = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let play = request.play;
        // TODO: observe behaviour on very minimal request body
        play = extend(play, request.body);
        play.updated = Date.now();
        yield play.save();
        return response.status(200).json(play);
    }
    catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
});
const remove = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let play = request.play;
        const deletedPlay = yield play.remove();
        return response.status(200).json({
            message: 'Successfully deleted play: ' + deletedPlay._id
        });
    }
    catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
});
export default {
    create,
    playById,
    read,
    list,
    update,
    remove
};
