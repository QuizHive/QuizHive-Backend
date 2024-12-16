import {Response, Router} from "express";
import {readdirSync, statSync} from "fs";
import {join, resolve} from "path";
import swaggerJSDoc from "swagger-jsdoc";
import {SwaggerTheme, SwaggerThemeNameEnum} from "swagger-themes";
import swaggerUi from "swagger-ui-express";
import config from "../../config/config";

export function swaggerUISetup() {
    const options = {
        customCss: new SwaggerTheme().getBuffer(SwaggerThemeNameEnum.ONE_DARK),
        customSiteTitle: "QuizHive API Documentation",
        explorer: true,
        swaggerOptions: {
            docExpansion: "none",
            filter: true,
            showRequestHeaders: true,
        },
    };
    return swaggerUi.setup(APIDocsRouter.getJSDoc(), options);
}

export class APIDocsRouter {

    private static getAllRoutes(dir: string, filelist: string[]): string[] {

        const files = readdirSync(dir);
        filelist = filelist || [];

        files
            .map((file) => {

                // filter out .map and hidden files
                if (file.search(".map") < 0 && file.search(/^\./) < 0) {
                    if (statSync(join(dir, file)).isDirectory()) {
                        filelist = APIDocsRouter.getAllRoutes(join(dir, file), filelist);
                    } else {
                        if (file.search(".js") > 0) {
                            filelist.push(join(dir, file));
                        }
                    }
                }
            });

        return filelist;
    }

    public static getJSDoc(): object {
        const urls: string[] = [];

        APIDocsRouter.getAllRoutes(resolve(__dirname), urls);

        const options: {} = {
            apis: urls,
            swaggerDefinition: {
                openapi: "3.0.0",
                info: {
                    version: "1.0.0",
                    title: "QuizHive API documentation",
                    description: "API documentation for QuizHive",
                    license: {
                        name: "Copyright QuizHive 2025",
                        url: "https://github.com/QuizHive/QuizHive-Backend",
                    },
                },
                servers: [
                    {
                        url: `http://localhost:8080/api/v1`,
                        description: "Local Development Server",
                    },
                    {
                        url: `http://quizhive.ahmz.ir:3000/api/v1`,
                        description: "Remote Development Server",
                    },
                ],
            },
        };

        return swaggerJSDoc(options);
    }

    private router: Router = Router();

    public getRouter(): Router {
        this.router.get("/", (_: {}, response: Response) => {
            response.setHeader("Content-Type", "application/json");
            response.send(APIDocsRouter.getJSDoc());
        });
        return this.router;
    }
}
