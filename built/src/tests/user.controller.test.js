var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import sinon from 'sinon';
import chai from 'chai';
const expect = chai.expect;
import proxyquire from 'proxyquire';
const findByIdStub = sinon.stub();
const findStub = sinon.stub();
const controller = proxyquire('../controllers/user.controller', {
    '../models/user.model': {
        'findById': findByIdStub,
        'find': findStub
    }
});
const resetStubs = (...stubs) => {
    stubs.forEach((stub) => stub.reset());
};
describe('*** UNIT TEST USER CONTROLLER CRUD FUNCTIONS ***', () => {
    beforeEach(() => resetStubs(findByIdStub, findStub));
    it('Creates a new user', () => __awaiter(void 0, void 0, void 0, function* () { }));
    it('Reads user from persistence', () => __awaiter(void 0, void 0, void 0, function* () { }));
    it('Lists all users', () => __awaiter(void 0, void 0, void 0, function* () { }));
    it('Updates user details', () => __awaiter(void 0, void 0, void 0, function* () { }));
    it('Deletes user', () => __awaiter(void 0, void 0, void 0, function* () { }));
});
