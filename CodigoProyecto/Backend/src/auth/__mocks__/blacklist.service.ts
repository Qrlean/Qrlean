export const blackListServiceMock = {
    tokenIsBlacklisted: jest.fn().mockResolvedValue(true),
    tokenSetBlackList: jest.fn(),
};
