import { uuid } from 'uuidv4';

export const AuthServiceMock = {
    login: jest.fn().mockImplementation(() => uuid()),
};
