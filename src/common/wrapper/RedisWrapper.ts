import * as redis from 'redis';
import {RedisClient, ResCallbackT} from 'redis';
import {RedisConfig} from '../../Config';

export class Redis {
    private client: RedisClient;
    public constructor(config: RedisConfig) {
        this.client = redis.createClient(config);
    }
    public Auth(password: string): void {
        this.client.auth();
    }

    public async Select(dbIndex: number): Promise<boolean> {
        return new Promise<boolean>((resolver, reject) => {
            return this.client.select(dbIndex, (err: Error, res: boolean) => {
                if (err) {
                    reject(err);
                }
                resolver(res);
            });
        });
    }

    public async HSet<TValue>(key: string, value: TValue, regionName?: string): Promise<number> {
        return new Promise<number>((resolver, reject) => {
            return this.client.hset(regionName, key, JSON.stringify(value), (err: Error, res: number) => {
                if (err) {
                    reject(err);
                }
                resolver(res);
            });
        });
    }
    public async HGet<TValue>(key: string, regionName?: string): Promise<TValue> {
        return new Promise<TValue>((resolver, reject) => {
            this.client.hget(regionName, key, (err: Error, res: string) => {
                if (err) {
                    reject(err);
                }
                return resolver(JSON.parse(res));
            });
        });
    }
    public async Expire(key: string, expire: number): Promise<number> {
        return new Promise<number>((resolver, reject) => {
            this.client.expire(key, expire, (err: Error, res: number) => {
                if (err) {
                    reject(err);
                }
                return resolver(res);
            });
        });
    }
    public async HDel(key: string, regionName?: string): Promise<boolean> {
        return new Promise<boolean>((resolver, reject) => {
            this.client.hdel(regionName, key, (err: Error, res: boolean) => {
                if (err) {
                    reject(err);
                }
                return resolver(res);
            });
        });
    }
    public async HKeys(regionName?: string): Promise<Array<string>> {
        return new Promise<Array<string>>((resolver, reject) => {
            let callback: ResCallbackT<Array<string>> = (err: Error, res: Array<string>) => {
                if (err) { reject(err); }
                return resolver(res);
            };
            regionName ? this.client.hkeys(regionName, callback) : this.client.keys(callback);
        });
    }
}
