export class InvalidParamError extends Error {
    constructor(_name: string) {
        super(`Invalid paramater: ${_name}`);
        this.name = "InvalidParamError";
    }
}
