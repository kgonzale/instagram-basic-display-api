"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateProxyList = void 0;
const fs = require("fs");
const path = require("path");
const formatProxy = (proxy) => {
    if (/^http/.test(proxy)) {
        const [schema, subnet, port, user, pass] = proxy.split(":");
        const sub = subnet.replace(/\//g, "");
        if (user && pass) {
            return `${schema}://${user}:${pass}@${sub}:${port}`;
        }
        return `${schema}://${sub}:${port}`;
    }
    const [ip, port, user, pass] = proxy.split(":");
    if (user && pass) {
        return `http://${user}:${pass}@${ip}:${port}`;
    }
    return `http://${ip}:${port}`;
};
const populateProxyList = () => __awaiter(void 0, void 0, void 0, function* () {
    const proxyFile = path.resolve("src", "proxies", "proxies.txt");
    const proxyList = [];
    const proxies = fs
        .readFileSync(proxyFile)
        .toString()
        .replace(/(\r|\r)/gm, "")
        .split("\n")
        .filter((str) => /\S/.test(str));
    for (let i = 0; i < proxies.length; i++) {
        proxyList.push(formatProxy(proxies[i]));
    }
    return proxyList;
});
exports.populateProxyList = populateProxyList;
//# sourceMappingURL=proxies.js.map