import { newApp, ENVIRONMENT } from "./api/configurations";

const bootstrap = async () => {
    // this would be database connection
    const app = await newApp();
    app.listen(ENVIRONMENT.API.PORT, () => console.log("running!"));
};

bootstrap();
