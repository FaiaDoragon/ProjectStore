import env from 'env-var';

export const envs = {
   PORT: env.get('PORT').required().asPortNumber(),

   DB_NAME: env.get('DB_NAME').required().asString(),
   DB_PASS: env.get('DB_PASS').required().asString(),
   DB_USER: env.get('DB_USER').required().asString(),
   DB_HOST: env.get('DB_HOST').required().asString(),
   DB_PORT: env.get('DB_PORT').required().asPortNumber(),
}
