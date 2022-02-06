import { uuid } from 'uuidv4';

export const AuthServiceMock = {
    validateUser: jest.fn(),
    login: jest.fn().mockImplementation(() => uuid()),
    changePasswordRequest: jest.fn(),
    changePassword: jest.fn(),
};
