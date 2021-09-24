import { fichaStub } from '../fichas/test/stub/ficha.stub';

export const fichasServiceMock = {
    create: jest.fn().mockResolvedValue(fichaStub),
    update: jest.fn().mockResolvedValue(fichaStub),
    findAll: jest.fn().mockResolvedValue([fichaStub]),
    findOne: jest.fn().mockResolvedValue(fichaStub),
    remove: jest.fn().mockResolvedValue(fichaStub),
    findOneByProperty: jest.fn().mockResolvedValue(fichaStub),
};
