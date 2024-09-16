import * as path from 'path';
import { env } from '@/config/envConfig';

const {
  PORT,
  HOST,
  API_DOCS_KEY,
} = env;

const expressJSDocSwaggerConfig = {
  info: {
    version: '1.0.0',
    title: 'Rest API',
    description: 'API specs for the project',
    license: {
      name: 'MIT',
    },
  },
  servers: [
    {
      url: `http://${HOST}:${PORT}/api/v1/{env}`,
      description: 'Express Server',
      variables: {
        port: {
          default: PORT.toString(),
        },
        env: {
          default: env.NODE_ENV,
        },
      },
    },
  ],
  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
  baseDir: path.join(__dirname, '../../'),
  filesPattern: `${path.join(__dirname, '../../')}/src/**/*.route.ts`,
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
  exposeApiDocs: true,
  apiDocsPath: '/api-docs/swagger.json',
  notRequiredAsNullable: false,
  swaggerUiOptions: {},
  multiple: true,
};

export default expressJSDocSwaggerConfig;
