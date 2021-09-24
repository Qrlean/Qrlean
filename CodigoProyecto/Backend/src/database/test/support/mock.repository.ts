export abstract class MockModel<T> {
    protected abstract entityStub: T;

    async findOne(): Promise<T> {
        return this.entityStub;
    }
    async find(): Promise<T[]> {
        return [this.entityStub];
    }
    create(): T {
        return this.entityStub;
    }
    async update(): Promise<any> {
        return { generatedMaps: [], raw: [], affected: 1 };
    }
    async remove(): Promise<T> {
        return this.entityStub;
    }
    async save(): Promise<T> {
        return this.entityStub;
    }
}
