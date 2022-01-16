var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/user.model';
import errorHandler from './../helpers/dbErrorHandler';
import extend from 'lodash/extend';
const create = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User(request.body);
    try {
        yield user.save();
        return response.status(200).json({ message: 'Successfully created new user' });
    }
    catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
});
const userById = (request, response, next, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield User.findById(id);
        if (!user) {
            return response.status(400).json({ error: 'User not found' });
        }
        request.profile = user;
        next();
    }
    catch (error) {
        return response.status(400).json({
            error: 'Could not retrieve user'
        });
    }
});
const read = (request, response) => __awaiter(void 0, void 0, void 0, function* () { return response.json(request.profile); });
const list = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield User.find({});
        return response.status(200).json(users);
    }
    catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
});
const update = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = request.profile;
        user = extend(user, request.body);
        user.updated = Date.now();
        yield user.save();
        response.json(user);
    }
    catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
});
const remove = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = request.profile;
        const deletedUser = yield user.remove();
        return response.status(200).json(deletedUser);
    }
    catch (error) {
        return response.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
});
export default {
    create,
    userById,
    read,
    list,
    update,
    remove
};
