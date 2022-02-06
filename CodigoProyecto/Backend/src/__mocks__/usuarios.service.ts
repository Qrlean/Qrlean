import { userStub } from '../usuarios/test/stub/user.stub';
export const usuariosServiceMock = {
    create: jest.fn().mockResolvedValue(userStub),
    update: jest.fn().mockResolvedValue(userStub),
    findAll: jest.fn().mockResolvedValue([userStub]),
    findOne: jest.fn().mockResolvedValue(userStub),
    remove: jest.fn().mockResolvedValue(userStub),
    findOneByProperty: jest.fn().mockResolvedValue(userStub),
    getUsersThatNotAreInFicha: jest.fn().mockResolvedValue([userStub]),
    userPasswordUpdate: jest.fn().mockResolvedValue(userStub),
};
