export const bcryptServiceMock = {
    hash: jest.fn().mockImplementation((pass) => Promise.resolve(pass)),
    compare: jest.fn().mockResolvedValue(true),
};
