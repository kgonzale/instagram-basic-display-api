const fs = require("fs");
const path = require("path");

const formatProxy = (proxy: string) => {
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

const populateProxyList = async () => {
  const proxyFile = path.resolve("src", "proxies", "proxies.txt")
  const proxyList = [];
  const proxies = fs
    .readFileSync(proxyFile)
    .toString()
    .replace(/(\r|\r)/gm, "")
    .split("\n")
    .filter((str: string) => /\S/.test(str));
  for (let i = 0; i < proxies.length; i++) {
    proxyList.push(formatProxy(proxies[i]));
  }
  return proxyList;
};

export { populateProxyList };
