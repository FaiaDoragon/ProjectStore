import env from 'env-var';

// Lee todas las env y las almacena en el obj
// con su tipo de valor
export const envs = {
   PORT: env.get('PORT').required().asPortNumber(),
   JWT_SEED: env.get('JWT_SEED').required().asString(),

   DB_NAME: env.get('DB_NAME').required().asString(),
   DB_PASS: env.get('DB_PASS').required().asString(),
   DB_USER: env.get('DB_USER').required().asString(),
   DB_HOST: env.get('DB_HOST').required().asString(),
   DB_PORT: env.get('DB_PORT').required().asPortNumber(),
}
