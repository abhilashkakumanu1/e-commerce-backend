import morgan from "morgan";
import { NODE_ENV } from "../../../../config";

export const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    {
        skip: () => NODE_ENV === "production",
    }
);
