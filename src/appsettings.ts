import {config} from './dal';

class AppSettings {
    HTTPS_ENABLED = this.HTTPS_SERVER_CERT && this.HTTPS_SERVER_KEY_PATH;
    PORT = this.HTTPS_ENABLED ? 443 : 80;
    HTTPS_SERVER_KEY_PATH: string = '';
    HTTPS_SERVER_CERT: string = '';
    APP_BASE: string = '/';
    DOCS: string = '/docs';
    WWW: string = '/www';
    OAUTH2: string = '127.0.0.1:8081';
    AUDIT: string = '127.0.0.1:8082';
    CACHE: string = '127.0.0.1:8083';
    DB: config = {
        //driver: '',
        user: 'sa',
        password: 'irtt',
        server: 'localhost\\SQLEXPRESS',
        //port: 3044,
        domain: '',
        database: 'Natarajan',
        // connectionTimeout: 0,
        // requestTimeout: 0,
        // stream: true,
        // options: { encrypt: false },
        // pool: {
        //     min: 0,
        //     max: 0,
        //     idleTimeoutMillis: 0
        // }
    };
}

const Settings: AppSettings = new AppSettings();
export = Settings;
