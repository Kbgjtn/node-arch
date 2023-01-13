export class InvalidRequestPayloadError extends Error {
	constructor(_name: string) {
		super(`Validation Error: ${_name}`);
		this.name = `Validation Error: ${_name}`;
		Error.captureStackTrace(this);
	}
}
