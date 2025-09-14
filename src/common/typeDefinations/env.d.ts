namespace NodeJS {
    interface ProcessEnv {
        // Application
        PORT: number;
        // Database
        DB_PORT: number;
        DB_NAME: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;
        DB_HOST: string;
        // bucket and storage keys
        S3_SECRET_KEY: string;
        S3_ACCESS_KEY: string;
        S3_BUCKET_NAME: string;
        S3_ENDPOINT: string;
    }
}