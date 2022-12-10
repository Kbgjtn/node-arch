export class MissingParamError extends Error {
    constructor(_name: string) {
        super(`Missing paramater: ${_name}`);
        this.name = "MissingParamError";
    }
}
