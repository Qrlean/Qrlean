import { uuid } from 'uuidv4';

export const jwtServiceMock = {
    sign: jest.fn().mockImplementation(() => uuid()),
    signAsync: jest.fn().mockImplementation(() => uuid()),
    verifyAsync: jest.fn().mockImplementation(),
};
