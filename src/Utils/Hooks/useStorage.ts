import { useCallback } from "react";
import LZString from "lz-string";

interface StorageData {
    data: string;
    expireTime: number;
}

const defaultExpireTime: number = import.meta.env.VITE_BLOG_LOCAL_CACHE_EXPRID_TIME as number || 3600;

const useStorage = <T>(storageKey: string, storageExpireTime: number = defaultExpireTime * 1000) => {
    const storageHandler = useCallback(
        (type: "check" | "get" | "put", payload?: T): boolean | T | null => {
            const currentTime = Date.now();
            const storedData = localStorage.getItem(storageKey);

            switch (type) {
                case "check": {
                    if (!storedData) return false; // 没有数据
                    const parsedData: StorageData = JSON.parse(storedData);
                    if (parsedData.expireTime > currentTime) {
                        return true; // 数据有效
                    } else {
                        localStorage.removeItem(storageKey); // 删除过期数据
                        return false; // 数据已过期
                    }
                }
                case "get": {
                    if (!storedData) return null; // 没有数据
                    const parsedData: StorageData = JSON.parse(storedData);
                    if (parsedData.expireTime > currentTime) {
                        const decompressedData = LZString.decompress(parsedData.data); // 解压数据
                        return JSON.parse(decompressedData || "null"); // 解析解压后的数据
                    } else {
                        localStorage.removeItem(storageKey); // 删除过期数据
                        return null;
                    }
                }
                case "put": {
                    if (!payload) return false; // 没有提供数据
                    const expireTime = currentTime + storageExpireTime; // 设置过期时间
                    const compressedData = LZString.compress(JSON.stringify(payload)); // 压缩数据
                    const newData: StorageData = {
                        data: compressedData,
                        expireTime,
                    };
                    localStorage.setItem(storageKey, JSON.stringify(newData)); // 写入数据
                    return true;
                }
                default:
                    return null;
            }
        },
        [storageKey, storageExpireTime]
    );

    return storageHandler;
};

export default useStorage;