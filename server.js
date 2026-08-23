const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFile } = require("child_process");

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || "127.0.0.1";
const ROOT = __dirname;
const QUOTE_CACHE_MS = Number(process.env.QUOTE_CACHE_MS || 5 * 60 * 1000);
const VALUATION_CACHE_MS = Number(process.env.VALUATION_CACHE_MS || 6 * 60 * 60 * 1000);
const EMPTY_VALUATION_RETRY_MS = Number(process.env.EMPTY_VALUATION_RETRY_MS || 5 * 60 * 1000);
const MACRO_CACHE_MS = Number(process.env.MACRO_CACHE_MS || 5 * 60 * 1000);
const QUOTE_BASE =
  "https://push2.eastmoney.com/api/qt/clist/get?po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=b:MK0021,b:MK0022,b:MK0023&fields=f12,f13,f14,f2,f3,f5,f6,f8,f23";
const KLINE_URL =
  "https://push2his.eastmoney.com/api/qt/stock/kline/get?ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&klt=101&fqt=1&beg=0&end=20500101&lmt=140";
const FUND_SEARCH_URL = "https://fund.eastmoney.com/js/fundcode_search.js";
const ULIST_URL =
  "https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&invt=2&ut=bd1d9ddb04089700cf9c27f6f7426281&fields=f12,f13,f14,f2,f3,f5,f6,f8,f23";
const LEGU_BASE_URL = "https://www.legulegu.com";
const VALUATION_CACHE_FILE = path.join(ROOT, ".etf-valuation-cache.json");
const KLINE_CACHE_FILE = path.join(ROOT, ".etf-kline-cache.json");
const LEGU_VALUATION_RULES = [
  { pattern: /中证A500|A500/i, code: "000510.CSI", name: "中证A500", metric: "PE" },
  { pattern: /中证A50|A50/i, code: "930050.CSI", name: "中证A50", metric: "PE" },
  { pattern: /沪深300|HS300/i, code: "000300.SH", name: "沪深300", metric: "PE" },
  { pattern: /上证50/i, code: "000016.SH", name: "上证50", metric: "PE" },
  { pattern: /上证180/i, code: "000010.SH", name: "上证180", metric: "PE" },
  { pattern: /上证380/i, code: "000009.SH", name: "上证380", metric: "PE" },
  { pattern: /中证A100|A100/i, code: "000903.SH", name: "中证A100", metric: "PE" },
  { pattern: /中证800|800ETF/i, code: "000906.SH", name: "中证800", metric: "PE" },
  { pattern: /中证500/i, code: "000905.SH", name: "中证500", metric: "PE" },
  { pattern: /中证1000/i, code: "000852.SH", name: "中证1000", metric: "PE" },
  { pattern: /深证100|深100/i, code: "399330.SZ", name: "深证100", metric: "PE" },
  { pattern: /创业板50/i, code: "399673.SZ", name: "创业板50", metric: "PE" },
  { pattern: /科创创业50|科创创业|双创50|双创/i, code: "399673.SZ", name: "创业板50", metric: "PE", proxy: true },
  { pattern: /科创100|科创200|科创综指|科创新材料|科创成长|科创信息|科创增强|科创新能源/i, code: "000688.SH", name: "科创50", metric: "PE", proxy: true },
  { pattern: /科创50|科创板50/i, code: "000688.SH", name: "科创50", metric: "PE" },
  { pattern: /深证50/i, code: "399330.SZ", name: "深证100", metric: "PE", proxy: true },
  { pattern: /深成|深证成指/i, code: "399330.SZ", name: "深证100", metric: "PE", proxy: true },
  { pattern: /上证指数/i, code: "000016.SH", name: "上证50", metric: "PE", proxy: true },
  { pattern: /中证2000|国证2000/i, code: "000852.SH", name: "中证1000", metric: "PE", proxy: true },
  { pattern: /500增强|500等权/i, code: "000905.SH", name: "中证500", metric: "PE", proxy: true },
  { pattern: /1000增强/i, code: "000852.SH", name: "中证1000", metric: "PE", proxy: true },
  { pattern: /深300|中小100|深证主板50/i, code: "399330.SZ", name: "深证100", metric: "PE", proxy: true },
  { pattern: /基本面|质量|核心50|漂亮50|央视50|超大盘|上证中盘|上证综指|上证580|上证增强|战略新兴|创新100/i, code: "000300.SH", name: "沪深300", metric: "PE", proxy: true },
  { pattern: /创50|创业综指|创100|创业大盘|创中盘/i, code: "399673.SZ", name: "创业板50", metric: "PE", proxy: true },
  { pattern: /大盘价值|大盘成长|价值ETF|成长ETF|民企300|民企ETF|A股ETF|新经济|180治理/i, code: "000300.SH", name: "沪深300", metric: "PE", proxy: true },
  { pattern: /MSCI中国|ESG|可持续|责任ETF/i, code: "000300.SH", name: "沪深300", metric: "PE", proxy: true },
  { pattern: /白酒|酒ETF|酒\b/i, code: "399997.SZ", name: "中证白酒", metric: "PE" },
  { pattern: /消费龙头/i, code: "931068.CSI", name: "消费龙头", metric: "PE" },
  { pattern: /消费50/i, code: "931139.CSI", name: "CS消费50", metric: "PE" },
  { pattern: /食品|饮料|主要消费|消费(?!电子)|家电/i, code: "000932.SH", name: "800消费", metric: "PE" },
  { pattern: /医疗|医疗器械/i, code: "399989.SZ", name: "中证医疗", metric: "PE" },
  { pattern: /医药|创新药|生物医药/i, code: "000933.SH", name: "中证医药", metric: "PE" },
  { pattern: /半导体|芯片/i, code: "h21081.CSI", name: "中证半导全收益", metric: "PE" },
  { pattern: /机床/i, code: "H30531.CSI", name: "精工制造", metric: "PE", proxy: true },
  { pattern: /大数据|传媒|游戏|5G|教育|互联网|计算机|金融科技|物联网|信息安全|集成电路|科技龙头|科技先锋|科技100|科技50|科技ETF|创科技|影视/i, code: "000998.CSI", name: "中证TMT", metric: "PE", proxy: true },
  { pattern: /信息技术|云计算|软件|人工智能|AI|TMT|消费电子|电子|通信|数字经济|信创/i, code: "000998.CSI", name: "中证TMT", metric: "PE" },
  { pattern: /新能源车|新能源汽车|电池|汽车/i, code: "399417.SZ", name: "新能源车", metric: "PE" },
  { pattern: /光伏|储能/i, code: "399417.SZ", name: "新能源车", metric: "PE", proxy: true },
  { pattern: /军工|国防|航空航天|航天|卫星|通用航空/i, code: "399967.SZ", name: "中证军工", metric: "PE" },
  { pattern: /航空(?!航天)/i, code: "399967.SZ", name: "中证军工", metric: "PE", proxy: true },
  { pattern: /现金流|自由现金流/i, code: "932365.CSI", name: "中证现金流", metric: "PE" },
  { pattern: /精工制造|高端制造|高端制|工程机械|机械|工业母机|机器人|工业互联网/i, code: "H30531.CSI", name: "精工制造", metric: "PE", proxy: true },
  { pattern: /石油天然气|石油|油气|化工|资源|有色|稀有金属|矿业|黄金股|石化|材料|建材/i, code: "000805.CSI", name: "A股资源", metric: "PB", proxy: true },
  { pattern: /稀土|新材料/i, code: "000805.CSI", name: "A股资源", metric: "PB", proxy: true },
  { pattern: /大宗商品/i, code: "000979.CSI", name: "大宗商品", metric: "PB", proxy: true },
  { pattern: /证券|券商/i, code: "000914.SH", name: "300金融", metric: "PB", proxy: true },
  { pattern: /银行/i, code: "399986.CSI", name: "中证银行", metric: "PB" },
  { pattern: /保险|金融地产|金融/i, code: "000992.SH", name: "金融地产", metric: "PB", proxy: true },
  { pattern: /房地产|地产/i, code: "000992.SH", name: "金融地产", metric: "PB", proxy: true },
  { pattern: /煤炭/i, code: "399998.SZ", name: "中证煤炭", metric: "PB" },
  { pattern: /钢铁/i, code: "399440.SZ", name: "国证钢铁", metric: "PB" },
  { pattern: /红利低波/i, code: "h30269.CSI", name: "红利低波", metric: "PB" },
  { pattern: /红利质量/i, code: "931468.CSI", name: "红利质量", metric: "PB" },
  { pattern: /国企红利|央企红利|红利国企/i, code: "000824.SH", name: "中证国企红利", metric: "PB" },
  { pattern: /深证红利/i, code: "399324.SZ", name: "深证红利", metric: "PB" },
  { pattern: /上证红利/i, code: "000015.SH", name: "上证红利", metric: "PB" },
  { pattern: /中证红利|红利|高股息|股息|低波/i, code: "000922.CSI", name: "中证红利", metric: "PB" },
  { pattern: /央企科创|央企改革|国企改革/i, code: "000510.CSI", name: "中证A500", metric: "PE", proxy: true },
  { pattern: /央企|国企/i, code: "000510.CSI", name: "中证A500", metric: "PE", proxy: true },
  { pattern: /畜牧|养殖|农牧|农业|粮食/i, code: "000932.SH", name: "800消费", metric: "PE", proxy: true },
  { pattern: /家用电器|家电|生物科技|疫苗|中药|药ETF/i, code: "000932.SH", name: "800消费", metric: "PE", proxy: true },
  { pattern: /养老|国货|消电/i, code: "000932.SH", name: "800消费", metric: "PE", proxy: true },
  { pattern: /旅游/i, code: "000932.SH", name: "800消费", metric: "PE", proxy: true },
  { pattern: /电网设备|电力|绿电|公用事业|碳中和|低碳|绿色能源|新能源|智能车|智能电动车|智能驾驶|高端装备|智能制造|专精特新|产业升级|物流|交运|交通运输|基建|一带一路|电信|能源ETF|船舶|环保|成渝|湖北|长三角|湾区|湾创|上海国企|张江|浙江国资|G60|浙商|长江保护/i, code: "000906.SH", name: "中证800", metric: "PE", proxy: true },
  { pattern: /创业板/i, code: "399673.SZ", name: "创业板50", metric: "PE", proxy: true }
];
const LEGU_MARKET_VALUATION_RULES = [
  { pattern: /恒生中国企业|港股.*国企|H股/i, slug: "hscei", name: "恒生中国企业", metric: "PE" },
  { pattern: /恒生金融|港股通金融|金融ETF.*港股|港股.*金融/i, slug: "hsi", name: "恒生指数", metric: "PE", proxy: true },
  { pattern: /恒生地产|港股.*地产/i, slug: "hsp", name: "恒生地产", metric: "PE" },
  { pattern: /恒生公共|港股.*公用/i, slug: "hsu", name: "恒生公共", metric: "PE" },
  { pattern: /恒生工商/i, slug: "hsci", name: "恒生工商", metric: "PE" },
  { pattern: /恒生科技|港股通科技|港股科技|港股通互联网|恒生互联网|中概|港股通信息技术|生物科技|港股通医疗|港股通消费|港股通汽车|港股通创新药/i, slug: "hsi", name: "恒生指数", metric: "PE", proxy: true },
  { pattern: /沪港深|香港大盘|港股|恒生/i, slug: "hsi", name: "恒生指数", metric: "PE", proxy: true },
  { pattern: /标普|S&P|SP500|美国|纳斯达克|NASDAQ|日经|德国|法国|韩国|沙特|东南亚/i, slug: "sandp", name: "标普500", metric: "PE", proxy: true }
];
let etfCache = null;
let etfCacheAt = null;
let valuationCache = loadPersistedValuationCache();
let valuationCacheAt = valuationCache?.cachedAt || 0;
let valuationIndexCache = loadPersistedValuationIndexes();
let leguCookieCache = null;
let leguCookieCacheAt = 0;
let macroCache = null;
let macroCacheAt = 0;
const historicalValuationCache = new Map();
let klineCache = loadPersistedKlineCache();
let klinePersistTimer = null;
const KLINE_CACHE_MS = Number(process.env.KLINE_CACHE_MS || 24 * 60 * 60 * 1000);

function loadPersistedValuationCache() {
  try {
    const payload = JSON.parse(fs.readFileSync(VALUATION_CACHE_FILE, "utf8"));
    if (!Array.isArray(payload?.entries) || !payload.entries.length) return null;
    const map = new Map(payload.entries);
    map.cachedAt = Number(payload.cachedAt || 0);
    return map;
  } catch (_) {
    return null;
  }
}

function loadPersistedValuationIndexes() {
  try {
    const payload = JSON.parse(fs.readFileSync(VALUATION_CACHE_FILE, "utf8"));
    return new Map(Array.isArray(payload?.indexEntries) ? payload.indexEntries : []);
  } catch (_) {
    return new Map();
  }
}

function persistValuationCache(map) {
  if (!(map instanceof Map) || !map.size) return;
  try {
    fs.writeFileSync(VALUATION_CACHE_FILE, JSON.stringify({
      cachedAt: Date.now(),
      entries: [...map.entries()],
      indexEntries: [...valuationIndexCache.entries()]
    }));
  } catch (_) {
    // A read-only package directory should not block live quotes or valuations.
  }
}

function loadPersistedKlineCache() {
  try {
    const payload = JSON.parse(fs.readFileSync(KLINE_CACHE_FILE, "utf8"));
    const entries = Array.isArray(payload?.entries) ? payload.entries : [];
    return new Map(entries.filter(([secid, value]) => /^[01]\.\d{6}$/.test(secid || "") && value?.body && Number.isFinite(value?.time)));
  } catch (_) {
    return new Map();
  }
}

function persistKlineCacheSoon() {
  if (klinePersistTimer) return;
  klinePersistTimer = setTimeout(() => {
    klinePersistTimer = null;
    try {
      fs.writeFileSync(KLINE_CACHE_FILE, JSON.stringify({ cachedAt: Date.now(), entries: [...klineCache.entries()] }));
    } catch (_) {
      // Cache persistence is optional; live K-line requests still work without it.
    }
  }, 500);
}

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(body);
}

function curlText(url) {
  return new Promise((resolve, reject) => {
    execFile("curl", [
    "--http1.1",
    "--retry",
    "3",
    "--retry-delay",
    "1",
    "-A",
    "Mozilla/5.0",
    "-e",
    "https://quote.eastmoney.com/",
    "-sL",
    url
    ], { timeout: 30000, maxBuffer: 12 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || `${error.message} (code ${error.code || "unknown"})`));
        return;
      }
      resolve(stdout);
    });
  });
}

function curlTextWithHeaders(url, headers = {}) {
  const args = ["--http1.1", "--retry", "1", "--retry-delay", "1"];
  for (const [name, value] of Object.entries(headers)) {
    args.push("-H", `${name}: ${value}`);
  }
  args.push("-sL", url);
  return new Promise((resolve, reject) => {
    execFile("curl", args, { timeout: 12000, maxBuffer: 12 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || `${error.message} (code ${error.code || "unknown"})`));
        return;
      }
      resolve(stdout);
    });
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseChineseNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const text = String(value).replace(/,/g, "").trim();
  if (!text || text === "-") return null;
  const match = text.match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  const number = Number(match[0]);
  if (!Number.isFinite(number)) return null;
  if (text.includes("万亿")) return number * 1000000000000;
  if (text.includes("亿")) return number * 100000000;
  if (text.includes("万")) return number * 10000;
  return number;
}

function parsePercent(value) {
  const number = parseChineseNumber(value);
  return number === null ? null : number;
}

function roundTo(value, digits = 2) {
  if (!Number.isFinite(value)) return null;
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function valuationLevel(percentile) {
  if (!Number.isFinite(percentile)) return "";
  if (percentile <= 30) return "低估";
  if (percentile <= 70) return "适中";
  return "高估";
}

function percentileRank(rows, key, latest) {
  const values = rows
    .map((row) => Number(row?.[key]))
    .filter((value) => Number.isFinite(value) && value > 0)
    .sort((a, b) => a - b);
  if (!values.length || !Number.isFinite(latest)) return null;
  const lowerOrEqual = values.filter((value) => value <= latest).length;
  return (lowerOrEqual / values.length) * 100;
}

function shanghaiDateKey(offsetDays = 0) {
  const date = new Date(Date.now() + offsetDays * 24 * 60 * 60 * 1000);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${lookup.year}-${lookup.month}-${lookup.day}`;
}

function md5(text) {
  return crypto.createHash("md5").update(text).digest("hex");
}

function cookieHeader(setCookies = []) {
  return setCookies.map((item) => String(item).split(";")[0]).filter(Boolean).join("; ");
}

async function fetchTextWithTimeout(url, options = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return {
      ok: response.ok,
      status: response.status,
      text: await response.text(),
      headers: response.headers
    };
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeDateKey(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")) ? String(value) : "";
}

function latestFredObservation(csv, targetDate = "") {
  const limit = normalizeDateKey(targetDate) || "9999-12-31";
  const lines = String(csv || "").trim().split(/\r?\n/);
  for (let index = lines.length - 1; index > 0; index -= 1) {
    const [date, raw] = lines[index].split(",");
    const value = Number(raw);
    if (/^\d{4}-\d{2}-\d{2}$/.test(date || "") && date <= limit && Number.isFinite(value)) {
      return { value, date };
    }
  }
  return null;
}

async function loadFredMetric(id, label, unit, sourceUrl, targetDate = "") {
  const url = `https://fred.stlouisfed.org/graph/fredgraph.csv?id=${encodeURIComponent(id)}`;
  const response = await fetchTextWithTimeout(url, { headers: { "User-Agent": "Mozilla/5.0" } }, 12000);
  if (!response.ok) throw new Error(`FRED HTTP ${response.status}`);
  const observation = latestFredObservation(response.text, targetDate);
  if (!observation) throw new Error("FRED 未返回有效观察值");
  return { id, label, unit, ...observation, source: "FRED", sourceUrl };
}

async function loadEastmoneyMacroMetric(secid, id, label, unit, sourceUrl) {
  const url = `https://push2.eastmoney.com/api/qt/stock/get?fltt=2&invt=2&fields=f43,f57,f58&secid=${encodeURIComponent(secid)}`;
  const row = JSON.parse(await curlText(url))?.data;
  const value = Number(row?.f43);
  if (!Number.isFinite(value)) throw new Error("东方财富未返回有效行情");
  return {
    id,
    label,
    unit,
    value,
    date: new Date().toISOString(),
    source: "东方财富全球市场公开行情",
    sourceUrl
  };
}

async function loadEastmoneyMacroHistoryMetric(secid, id, label, unit, sourceUrl, targetDate) {
  const end = normalizeDateKey(targetDate).replace(/-/g, "") || "20500101";
  const url = `https://push2his.eastmoney.com/api/qt/stock/kline/get?ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&klt=101&fqt=1&beg=0&end=${end}&lmt=400&secid=${encodeURIComponent(secid)}`;
  const lines = JSON.parse(await curlText(url))?.data?.klines || [];
  const latest = [...lines].reverse().map((line) => String(line).split(",")).find((parts) => {
    const value = Number(parts[2]);
    return /^\d{4}-\d{2}-\d{2}$/.test(parts[0] || "") && parts[0] <= targetDate && Number.isFinite(value);
  });
  if (!latest) throw new Error(`东方财富未返回 ${targetDate} 的历史行情`);
  return {
    id,
    label,
    unit,
    value: Number(latest[2]),
    date: latest[0],
    source: "东方财富全球市场历史行情",
    sourceUrl
  };
}

async function loadGoldApiMetric() {
  const sourceUrl = "https://api.gold-api.com/price/XAU";
  // Gold API is reachable from the local curl transport but intermittently rejects Node fetch.
  const payload = JSON.parse(await curlTextWithHeaders(sourceUrl, {
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json"
  }));
  const value = Number(payload?.price);
  if (!Number.isFinite(value)) throw new Error("Gold API 未返回有效行情");
  return {
    id: "XAU",
    label: "黄金/美元",
    unit: "美元/盎司",
    value,
    date: payload.updatedAt || new Date().toISOString(),
    source: "Gold API 现货报价（东方财富失败时备用）",
    sourceUrl
  };
}

function parseShibor3m(html) {
  const text = stripHtml(html).replace(/\s+/g, " ");
  const matches = [...text.matchAll(/(?:Shibor\s*)?3M[^\d]{0,80}(\d+\.\d{1,4})/gi)];
  for (const match of matches) {
    const value = Number(match[1]);
    if (Number.isFinite(value) && value > 0 && value < 20) return value;
  }
  return null;
}

function findShibor3mRecord(value) {
  if (!value || typeof value !== "object") return null;
  if (Array.isArray(value)) {
    for (const item of value) {
      const record = findShibor3mRecord(item);
      if (record) return record;
    }
    return null;
  }
  const descriptor = Object.entries(value)
    .filter(([key]) => /term|tenor|period|name|code/i.test(key))
    .map(([, item]) => String(item))
    .join(" ");
  if (/(^|[^\d])3M([^\d]|$)|3个月|三个月/i.test(descriptor)) {
    for (const [key, raw] of Object.entries(value)) {
      if (!/rate|value|price|shibor|last|close/i.test(key)) continue;
      const number = Number(raw);
      if (Number.isFinite(number) && number > 0 && number < 20) return { value: number, record: value };
    }
  }
  for (const item of Object.values(value)) {
    const record = findShibor3mRecord(item);
    if (record) return record;
  }
  return null;
}

function parseShibor3mHistory(payload) {
  const columns = payload?.data?.columns;
  const csv = payload?.data?.csv;
  if (!Array.isArray(columns) || typeof csv !== "string") return [];
  const dateIndex = columns.indexOf("date");
  const valueIndex = columns.indexOf("3M");
  if (dateIndex < 0 || valueIndex < 0) return [];
  const rows = csv.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => {
    const cells = line.split(",");
    const value = Number(cells[valueIndex]);
    const date = String(cells[dateIndex] || "").trim();
    return { date, value };
  }).filter((row) => /^\d{4}-\d{2}-\d{2}$/.test(row.date) && Number.isFinite(row.value));
  return rows.sort((a, b) => a.date.localeCompare(b.date));
}

async function loadShibor3mHistory() {
  const sourceUrl = "https://www.chinamoney.com.cn/chinese/bkshiborhischart/index.html?term=3M-3M";
  const response = await fetchTextWithTimeout(
    "https://www.chinamoney.com.cn/ags/ms/cm-u-bk-shibor/ShiborChrt?lang=CN",
    {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": sourceUrl,
        "Origin": "https://www.chinamoney.com.cn",
        "X-Requested-With": "XMLHttpRequest"
      }
    },
    25000
  );
  if (!response.ok) throw new Error(`SHIBOR 历史接口 HTTP ${response.status}`);
  const rows = parseShibor3mHistory(JSON.parse(response.text));
  if (rows.length < 21) throw new Error("SHIBOR 历史接口未返回足够的 3M 交易日数据");
  return { rows, sourceUrl };
}

async function loadShibor3m(targetDate = "") {
  const requestedDate = normalizeDateKey(targetDate);
  const sourceUrl = "https://www.chinamoney.com.cn/chinese/bkshibor/";
  const historicalMode = Boolean(requestedDate && requestedDate < shanghaiDateKey());
  if (historicalMode) {
    const history = await loadShibor3mHistory();
    const latestHistory = [...history.rows].reverse().find((row) => row.date <= requestedDate);
    if (!latestHistory) throw new Error(`SHIBOR 历史接口未返回 ${requestedDate} 及以前的数据`);
    const latestIndex = history.rows.findIndex((row) => row.date === latestHistory.date);
    const changeFrom = (tradingDays) => {
      if (latestIndex < tradingDays) return null;
      return Math.round((latestHistory.value - history.rows[latestIndex - tradingDays].value) * 1000) / 10;
    };
    return {
      id: "SHIBOR3M",
      label: "SHIBOR 3M",
      unit: "%",
      value: latestHistory.value,
      date: latestHistory.date,
      source: "全国银行间同业拆借中心 / 中国货币网（历史）",
      sourceUrl,
      historySourceUrl: history.sourceUrl,
      historyDate: latestHistory.date,
      change5dBp: changeFrom(5),
      change20dBp: changeFrom(20),
      historyError: null
    };
  }
  const quotePromise = fetchTextWithTimeout(
    "https://www.chinamoney.com.cn/r/cms/www/chinamoney/data/shibor/shibor.json",
    {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": sourceUrl,
        "Origin": "https://www.chinamoney.com.cn",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json"
      },
      body: "{}"
    },
    12000
  );
  const [quoteResult, historyResult] = await Promise.allSettled([quotePromise, loadShibor3mHistory()]);
  const history = historyResult.status === "fulfilled" ? historyResult.value : null;
  const latestHistory = history?.rows.at(-1);
  let payload = null;
  let record = null;
  if (quoteResult.status === "fulfilled") {
    const response = quoteResult.value;
    if (response.ok) {
      payload = JSON.parse(response.text);
      record = findShibor3mRecord(payload);
    }
  }
  const value = record?.value ?? latestHistory?.value ?? null;
  if (value === null) throw new Error("SHIBOR 报价与历史接口均未返回 3M 数值");
  const changeFrom = (tradingDays) => {
    if (!history || history.rows.length <= tradingDays) return null;
    return Math.round((latestHistory.value - history.rows.at(-(tradingDays + 1)).value) * 1000) / 10;
  };
  return {
    id: "SHIBOR3M",
    label: "SHIBOR 3M",
    unit: "%",
    value,
    date: String(payload?.data?.showDateCN || payload?.showDateCN || latestHistory?.date || shanghaiDateKey()),
    source: "全国银行间同业拆借中心 / 中国货币网",
    sourceUrl,
    historySourceUrl: history?.sourceUrl,
    historyDate: latestHistory?.date || null,
    change5dBp: changeFrom(5),
    change20dBp: changeFrom(20),
    historyError: historyResult.status === "rejected" ? historyResult.reason?.message || "历史数据暂不可用" : null
  };
}

async function loadMacroSnapshot(targetDate = "") {
  const requestedDate = normalizeDateKey(targetDate);
  const historicalMode = Boolean(requestedDate && requestedDate < shanghaiDateKey());
  const now = Date.now();
  if (!historicalMode && macroCache && now - macroCacheAt < MACRO_CACHE_MS) return { ...macroCache, cached: true };
  const fredDefinitions = [
    ["DGS10", "美国10年债", "%", "https://fred.stlouisfed.org/series/DGS10"],
    ["DFII10", "10Y TIPS实际利率", "%", "https://fred.stlouisfed.org/series/DFII10"],
    ["DEXCHUS", "USD/CNY", "", "https://fred.stlouisfed.org/series/DEXCHUS"]
  ];
  const loaders = [
    historicalMode
      ? loadEastmoneyMacroHistoryMetric("100.UDI", "DXY", "美元指数", "", "https://quote.eastmoney.com/globalfuture/100.UDI.html", requestedDate)
        .catch(() => loadFredMetric("DTWEXBGS", "广义美元指数（DXY替代）", "", "https://fred.stlouisfed.org/series/DTWEXBGS", requestedDate))
      : loadEastmoneyMacroMetric("100.UDI", "DXY", "美元指数", "", "https://quote.eastmoney.com/globalfuture/100.UDI.html")
        .catch(() => loadFredMetric("DTWEXBGS", "广义美元指数（DXY替代）", "", "https://fred.stlouisfed.org/series/DTWEXBGS")),
    ...fredDefinitions.map(([id, label, unit, sourceUrl]) => loadFredMetric(id, label, unit, sourceUrl, requestedDate)),
    historicalMode
      ? loadEastmoneyMacroHistoryMetric("122.XAU", "XAU", "黄金/美元", "美元/盎司", "https://quote.eastmoney.com/globalfuture/122.XAU.html", requestedDate)
        .catch(() => loadFredMetric("GOLDAMGBD228NLBM", "黄金/美元", "美元/盎司", "https://fred.stlouisfed.org/series/GOLDAMGBD228NLBM", requestedDate))
      : loadEastmoneyMacroMetric("122.XAU", "XAU", "黄金/美元", "美元/盎司", "https://quote.eastmoney.com/globalfuture/122.XAU.html")
        .catch(() => loadGoldApiMetric()),
    loadShibor3m(requestedDate)
  ];
  const keys = ["DXY", ...fredDefinitions.map(([id]) => id), "XAU", "SHIBOR3M"];
  const settled = await Promise.allSettled(loaders);
  const metrics = {};
  const errors = {};
  for (const [index, result] of settled.entries()) {
    const key = keys[index];
    if (result.status === "fulfilled") metrics[key] = result.value;
    else errors[key] = result.reason?.message || "数据源暂不可用";
  }
  const snapshot = { updatedAt: new Date().toISOString(), requestedDate: requestedDate || shanghaiDateKey(), historical: historicalMode, metrics, errors, cached: false };
  if (!historicalMode) {
    macroCache = snapshot;
    macroCacheAt = now;
  }
  return snapshot;
}

async function loadFundSearchEtfs() {
  const text = await curlText(FUND_SEARCH_URL);
  const jsonText = text.replace(/^\uFEFF?var r = /, "").replace(/;\s*$/, "");
  const funds = JSON.parse(jsonText);
  return funds
    .filter((item) => {
      const code = String(item[0] || "");
      const name = String(item[2] || "");
      const type = String(item[3] || "");
      return /ETF/i.test(`${name}${type}`) && !/联接|连接/.test(name) && /^(5\d{5}|1[56]\d{4})$/.test(code);
    })
    .map((item) => ({
      code: String(item[0]),
      market: guessMarket(item[0]),
      name: String(item[2] || item[0])
    }));
}

async function proxyKline(res, secid) {
  const cached = klineCache.get(secid);
  const now = Date.now();
  if (cached && now - cached.time < KLINE_CACHE_MS) {
    send(res, 200, cached.body, "application/json; charset=utf-8");
    return;
  }
  try {
    const body = JSON.stringify(await loadTencentKline(secid));
    klineCache.set(secid, { time: now, body });
    persistKlineCacheSoon();
    send(res, 200, body, "application/json; charset=utf-8");
  } catch (error) {
    if (cached) {
      send(res, 200, cached.body, "application/json; charset=utf-8");
      return;
    }
    send(res, 502, JSON.stringify({ error: error.message }), "application/json; charset=utf-8");
  }
}

async function proxyKlines(res, secids) {
  const now = Date.now();
  const validSecids = secids
    .split(",")
    .map((item) => item.trim())
    .filter((item) => /^[01]\.\d{6}$/.test(item))
    .slice(0, 80);
  if (!validSecids.length) {
    send(res, 400, JSON.stringify({ error: "Invalid secids" }), "application/json; charset=utf-8");
    return;
  }

  const items = [];
  const missing = [];
  for (const secid of validSecids) {
    const cached = klineCache.get(secid);
    if (cached && now - cached.time < KLINE_CACHE_MS) {
      try {
        const payload = JSON.parse(cached.body);
        if ((payload.data?.klines || []).length >= 20) {
          items.push({ secid, ...(payload.data || {}), source: payload.source || "缓存" });
        } else {
          missing.push(secid);
        }
      } catch (_) {
        missing.push(secid);
      }
    } else {
      missing.push(secid);
    }
  }

  let error = "";
  if (missing.length) {
    let cursor = 0;
    const workers = Array.from({ length: Math.min(12, missing.length) }, async () => {
      while (cursor < missing.length) {
        const secid = missing[cursor];
        cursor += 1;
        try {
          const payload = await loadTencentKline(secid);
          const body = JSON.stringify(payload);
          klineCache.set(secid, { time: now, body });
          persistKlineCacheSoon();
          if ((payload.data?.klines || []).length >= 20) {
            items.push({ secid, ...(payload.data || {}), source: payload.source });
          }
        } catch (err) {
          error = err.message;
        }
      }
    });
    await Promise.all(workers);
  }

  send(res, 200, JSON.stringify({
    rc: 0,
    rt: 0,
    source: "腾讯/新浪日K线",
    cached: items.length - missing.length,
    requested: validSecids.length,
    loaded: items.length,
    error,
    data: { items }
  }), "application/json; charset=utf-8");
}

async function loadTencentKline(secid) {
  const [market, code] = secid.split(".");
  const symbol = `${market === "0" ? "sz" : "sh"}${code}`;
  const url = `https://proxy.finance.qq.com/ifzqgtimg/appstock/app/fqkline/get?param=${symbol},day,,,140,qfq`;
  let rows = [];
  try {
    const payload = JSON.parse(await curlTextWithHeaders(url, {
      "User-Agent": "Mozilla/5.0",
      "Referer": "https://gu.qq.com/"
    }));
    const data = payload?.data?.[symbol] || {};
    rows = data.qfqday || data.day || [];
  } catch (_) {
    rows = await loadSinaKlineRows(symbol);
  }
  if (!Array.isArray(rows) || rows.length < 20) throw new Error(`日K线无数据：${secid}`);
  return {
    rc: 0,
    rt: 0,
    source: "腾讯/新浪日K线",
    data: {
      code,
      name: "",
      klines: rows.map((row) => {
        if (Array.isArray(row)) return `${row[0]},${row[1]},${row[2]},${row[3]},${row[4]},${row[5] || 0},0,0,0,0,0`;
        return `${row.day},${row.open},${row.close},${row.high},${row.low},${row.volume || 0},0,0,0,0,0`;
      })
    }
  };
}

async function loadSinaKlineRows(symbol) {
  const callback = `var_${symbol}`;
  const url = `https://quotes.sina.cn/cn/api/jsonp_v2.php/${callback}=/CN_MarketDataService.getKLineData?symbol=${symbol}&scale=240&ma=no&datalen=140`;
  const text = await curlTextWithHeaders(url, {
    "User-Agent": "Mozilla/5.0",
    "Referer": "https://finance.sina.com.cn/"
  });
  const match = text.match(/\((\[.*\])\)/s);
  if (!match) throw new Error(`新浪日K线无数据：${symbol}`);
  return JSON.parse(match[1]);
}

async function proxyEtfList(res, searchParams = new URLSearchParams()) {
  const now = Date.now();
  if (etfCache && now - Date.parse(etfCacheAt || 0) < QUOTE_CACHE_MS) {
    send(res, 200, JSON.stringify({ ...etfCache, cached: true }), "application/json; charset=utf-8");
    return;
  }
  try {
    if (searchParams.get("source") === "em") {
      const { first, total, diff } = await loadEastmoneyEtfList();
      etfCache = { ...first, source: "东方财富公开行情", data: { ...first.data, total, diff }, cachedAt: new Date().toISOString(), stale: false };
    } else {
      const { total, diff } = await loadTencentEtfList();
      etfCache = {
        rc: 0,
        rt: 0,
        source: "腾讯完整行情",
        sourceNote: "行情采用 a-stock-data 路线：腾讯优先；估值采用乐咕乐股指数 PE/PB 历史序列，按跟踪指数映射到 ETF",
        data: { total, diff },
        cachedAt: new Date().toISOString(),
        stale: false
      };
    }
    etfCacheAt = etfCache.cachedAt;
    send(res, 200, JSON.stringify(etfCache), "application/json; charset=utf-8");
  } catch (error) {
    try {
      const { first, total, diff } = await loadEastmoneyEtfList();
      etfCache = { ...first, source: "东方财富公开行情兜底", data: { ...first.data, total, diff }, cachedAt: new Date().toISOString(), stale: false, primaryError: error.message };
      etfCacheAt = etfCache.cachedAt;
      send(res, 200, JSON.stringify(etfCache), "application/json; charset=utf-8");
    } catch (fallbackError) {
      if (etfCache) {
        send(res, 200, JSON.stringify({ ...etfCache, stale: true, cachedAt: etfCacheAt, error: error.message, fallbackError: fallbackError.message }), "application/json; charset=utf-8");
        return;
      }
      send(res, 502, JSON.stringify({ error: error.message, fallbackError: fallbackError.message }), "application/json; charset=utf-8");
    }
  }
}

async function loadTencentEtfList() {
  const funds = await loadFundSearchEtfs();
  const fundMap = new Map(funds.map((item) => [item.code, item]));
  const valuationMap = valuationCache && Date.now() - valuationCacheAt < VALUATION_CACHE_MS
    ? valuationCache
    : new Map();
  if (!valuationCache || Date.now() - valuationCacheAt >= VALUATION_CACHE_MS) {
    try {
      const freshMap = await loadLeguEtfValuations(funds);
      if (freshMap.size) {
        valuationMap.clear();
        for (const [code, valuation] of freshMap) valuationMap.set(code, valuation);
      }
    } catch (_) {
      // Quotes should stay usable even if the daily valuation source is temporarily slow.
    }
  }
  const symbols = funds.map((item) => `${item.market === 0 ? "sz" : "sh"}${item.code}`);
  const diff = [];
  for (let i = 0; i < symbols.length; i += 120) {
    const chunk = symbols.slice(i, i + 120).join(",");
    try {
      const text = await curlText(`https://qt.gtimg.cn/q=${chunk}`);
      diff.push(...parseTencentQuotes(text, fundMap, valuationMap));
    } catch (_) {
      // Keep partial rows; this is a last-resort quote source.
    }
  }
  if (!diff.length) throw new Error("腾讯行情兜底未返回有效数据");
  return { total: funds.length, diff };
}

function valuationRuleForName(name) {
  const text = String(name || "");
  const marketRule = LEGU_MARKET_VALUATION_RULES.find((rule) => rule.pattern.test(text));
  if (marketRule) return { ...marketRule, kind: "market" };
  return LEGU_VALUATION_RULES.find((rule) => rule.pattern.test(text)) || null;
}

function valuationMissingReason(name) {
  const text = String(name || "");
  if (/货币|现金|债|国开债|地方债|短融|日日鑫|天天金|添利|财富宝|日利|添益|快线|快钱/i.test(text)) return "债券/货币不适用PE/PB";
  if (/黄金|金ETF|上海金|商品|豆粕|能源化工|有色金属期货/i.test(text)) return "商品类不适用PE/PB";
  if (/港股|恒生|中概|纳指|纳斯达克|标普|道琼斯|巴西|亚太|日本|东证|新兴亚洲|德国|日经|沙特|东南亚|法国|韩国|美国/i.test(text)) return "需港股/海外估值源";
  if (/证券|券商/.test(text)) return "待接入券商指数估值";
  if (/创业板/.test(text) && !/创业板50/.test(text)) return "待接入创业板指数估值";
  if (/光伏|储能/.test(text)) return "待接入光伏/储能指数估值";
  if (/有色|稀土|化工|建材|机械|工业|石油|电力|绿电/.test(text)) return "待接入周期指数估值";
  if (/农业|养殖|畜牧|粮食/.test(text)) return "待接入农业指数估值";
  if (/芯片|半导体|电子|通信/.test(text)) return "待接入科技细分指数估值";
  return "待匹配指数估值源";
}

async function loadLeguCookie() {
  const now = Date.now();
  if (leguCookieCache && now - leguCookieCacheAt < 30 * 60 * 1000) return leguCookieCache;
  const response = await fetchTextWithTimeout(`${LEGU_BASE_URL}/stockdata/index-basic?indexCode=000300.SH`, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  }, 3000);
  if (!response.ok) throw new Error(`乐咕估值源不可用（HTTP ${response.status}）`);
  const cookies = typeof response.headers.getSetCookie === "function"
    ? response.headers.getSetCookie()
    : [response.headers.get("set-cookie")].filter(Boolean);
  leguCookieCache = cookieHeader(cookies);
  leguCookieCacheAt = now;
  return leguCookieCache;
}

async function loadLeguIndexSeries(rule, cookie) {
  const tokenDates = [shanghaiDateKey(0), shanghaiDateKey(-1)];
  for (const dateKey of tokenDates) {
    const token = md5(dateKey);
    for (const endpoint of ["index-basic-pe", "index-basic"]) {
      const url = `${LEGU_BASE_URL}/api/stockdata/${endpoint}?indexCode=${encodeURIComponent(rule.code)}&token=${token}`;
      try {
        const response = await fetchTextWithTimeout(url, {
          headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/json, text/plain, */*",
            "Referer": `${LEGU_BASE_URL}/stockdata/sz50-ttm-lyr`,
            "Cookie": cookie
          }
        });
        if (!response.ok || !response.text) continue;
        const payload = JSON.parse(response.text);
        const rows = Array.isArray(payload?.data) ? payload.data : [];
        if (rows.length) return rows;
      } catch (_) {
        // Try the compatible endpoint or the previous trading-day signature.
      }
    }
  }
  return [];
}

async function loadLeguMarketSeries(rule, cookie) {
  const response = await fetchTextWithTimeout(`${LEGU_BASE_URL}/stockdata/market/${rule.slug}`, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Referer": LEGU_BASE_URL,
      "Cookie": cookie
    }
  });
  const rows = parseLeguMarketRows(response.text);
  if (rows.length) return rows;
  return parseLeguMarketHead(response.text);
}

function parseLeguMarketRows(html) {
  const rows = [];
  const tableRows = String(html || "").match(/<tr[\s\S]*?<\/tr>/g) || [];
  for (const row of tableRows) {
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)]
      .map((match) => stripHtml(match[1]));
    if (cells.length < 3) continue;
    const date = parseLeguDate(cells[0]);
    const close = parseChineseNumber(cells[1]);
    const pe = parseChineseNumber(cells[2]);
    if (date && pe && pe > 0) rows.push({ date, close, marketPe: pe });
  }
  return rows.reverse();
}

function parseLeguMarketHead(html) {
  const date = stripHtml((String(html || "").match(/data-view-head-updated-time[^>]*>([\s\S]*?)<\/span>/) || [])[1] || "");
  const values = [...String(html || "").matchAll(/metric-value[^>]*>([\s\S]*?)<\/span>/g)]
    .map((match) => parseChineseNumber(stripHtml(match[1])))
    .filter((value) => value !== null);
  const pe = values.length >= 2 ? values[1] : null;
  return date && pe ? [{ date, marketPe: pe }] : [];
}

function stripHtml(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}

function parseLeguDate(value) {
  const text = String(value || "").trim();
  const zh = text.match(/(\d{4})年(\d{1,2})月(?:\d{1,2}日)?/);
  if (zh) return `${zh[1]}-${String(zh[2]).padStart(2, "0")}`;
  const iso = text.match(/\d{4}-\d{1,2}(?:-\d{1,2})?/);
  return iso ? iso[0].replace(/-(\d)(?=-|$)/g, "-0$1") : "";
}

function metricKeyForRule(rule) {
  return rule.metric === "PB" ? "addPb" : "addTtmPe";
}

function rowsThroughDate(rows, targetDate = "") {
  const requestedDate = normalizeDateKey(targetDate);
  return requestedDate ? rows.filter((row) => normalizeDateKey(row?.date) && row.date <= requestedDate) : rows;
}

function valuationFromLeguSeries(rule, rows, targetDate = "") {
  const eligibleRows = rowsThroughDate(rows, targetDate);
  const key = metricKeyForRule(rule);
  const fallbackKey = rule.metric === "PB" ? "pb" : "ttmPe";
  const latest = [...eligibleRows].reverse().find((row) => {
    const value = Number(row?.[key] || row?.[fallbackKey]);
    return Number.isFinite(value) && value > 0;
  });
  if (!latest) return null;
  const value = Number(latest[key] || latest[fallbackKey]);
  const percentile = percentileRank(eligibleRows, key, value) ?? percentileRank(eligibleRows, fallbackKey, value);
  if (percentile === null) return null;
  return {
    pb: rule.metric === "PB" ? roundTo(value) : null,
    pe: rule.metric === "PE" ? roundTo(value) : null,
    metric: rule.metric,
    value: roundTo(value),
    level: valuationLevel(percentile),
    percentile: roundTo(percentile, 1),
    belowTime: roundTo(100 - percentile, 1),
    date: latest.date || "",
    indexId: rule.code,
    indexName: rule.name,
    proxy: Boolean(rule.proxy),
    source: rule.proxy ? "乐咕乐股指数估值（代理）" : "乐咕乐股指数估值"
  };
}

function valuationFromLeguMarketSeries(rule, rows, targetDate = "") {
  const eligibleRows = rowsThroughDate(rows, targetDate);
  const latest = [...eligibleRows].reverse().find((row) => {
    const value = Number(row?.marketPe);
    return Number.isFinite(value) && value > 0;
  });
  if (!latest) return null;
  const value = Number(latest.marketPe);
  const percentile = percentileRank(eligibleRows, "marketPe", value);
  return {
    pb: null,
    pe: roundTo(value),
    metric: "PE",
    value: roundTo(value),
    level: percentile === null ? "" : valuationLevel(percentile),
    percentile: percentile === null ? null : roundTo(percentile, 1),
    belowTime: percentile === null ? null : roundTo(100 - percentile, 1),
    date: latest.date || "",
    indexId: `market/${rule.slug}`,
    indexName: rule.name,
    proxy: Boolean(rule.proxy),
    source: rule.proxy ? "乐咕乐股港股/海外估值（代理）" : "乐咕乐股港股/海外估值"
  };
}

function leguRuleKey(rule) {
  return rule.kind === "market" ? `market:${rule.slug}` : `index:${rule.code}`;
}

function valuationForRule(valuation, rule) {
  if (!valuation) return null;
  return {
    ...valuation,
    indexId: rule.kind === "market" ? `market/${rule.slug}` : rule.code,
    indexName: rule.name,
    metric: rule.metric || valuation.metric,
    proxy: Boolean(rule.proxy),
    source: (rule.kind === "market"
      ? (rule.proxy ? "乐咕乐股港股/海外估值（代理）" : "乐咕乐股港股/海外估值")
      : (rule.proxy ? "乐咕乐股指数估值（代理）" : "乐咕乐股指数估值"))
      + (valuation.stale ? "（最近有效缓存）" : "")
  };
}

async function loadLeguEtfValuations(funds, targetDate = "") {
  const requestedDate = normalizeDateKey(targetDate);
  const historicalMode = Boolean(requestedDate && requestedDate < shanghaiDateKey());
  if (historicalMode && historicalValuationCache.has(requestedDate)) return historicalValuationCache.get(requestedDate);
  const now = Date.now();
  if (historicalMode) return loadLeguHistoricalEtfValuations(funds, requestedDate);
  const cacheTtl = valuationCache?.size ? VALUATION_CACHE_MS : EMPTY_VALUATION_RETRY_MS;
  if (valuationCache && now - valuationCacheAt < cacheTtl) return valuationCache;

  // A valuation source outage must not erase the last usable PE/PB history map.
  const previousCache = valuationCache;
  const previousCacheAt = valuationCacheAt;

  const matchedFunds = funds
    .map((fund) => ({ fund, rule: valuationRuleForName(fund.name) }))
    .filter((item) => item.rule);
  const neededRules = [...new Map(matchedFunds.map((item) => [leguRuleKey(item.rule), item.rule])).values()];
  const map = new Map();
  const cachedMap = new Map();
  for (const { fund, rule } of matchedFunds) {
    const cached = valuationForRule(valuationIndexCache.get(leguRuleKey(rule)), rule);
    if (cached) cachedMap.set(fund.code, cached);
  }
  if (!neededRules.length) {
    valuationCache = map;
    valuationCacheAt = now;
    return map;
  }

  let cookie;
  try {
    cookie = await loadLeguCookie();
  } catch (_) {
    if (cachedMap.size) return cachedMap;
    if (previousCache?.size) return previousCache;
    throw new Error("乐咕估值源暂时不可用");
  }
  const valuationByIndex = new Map();
  let cursor = 0;
  const workers = Array.from({ length: Math.min(4, neededRules.length) }, async () => {
    while (cursor < neededRules.length) {
      const rule = neededRules[cursor];
      cursor += 1;
      try {
        const rows = rule.kind === "market"
          ? await loadLeguMarketSeries(rule, cookie)
          : await loadLeguIndexSeries(rule, cookie);
        const valuation = rule.kind === "market"
          ? valuationFromLeguMarketSeries(rule, rows)
          : valuationFromLeguSeries(rule, rows);
        if (valuation) valuationByIndex.set(leguRuleKey(rule), valuation);
      } catch (_) {
        // Keep other index valuations available when one code is temporarily unavailable.
      }
    }
  });
  await Promise.all(workers);

  for (const [key, valuation] of valuationByIndex) valuationIndexCache.set(key, valuation);

  for (const { fund, rule } of matchedFunds) {
    const valuation = valuationByIndex.get(leguRuleKey(rule)) || valuationIndexCache.get(leguRuleKey(rule));
    const resolved = valuationForRule(valuation, rule);
    if (resolved) map.set(fund.code, resolved);
  }

  for (const [code, valuation] of cachedMap) {
    if (!map.has(code)) map.set(code, valuation);
  }

  if (map.size) {
    valuationCache = map;
    valuationCacheAt = now;
    persistValuationCache(map);
    return map;
  }

  if (previousCache?.size) {
    valuationCache = previousCache;
    valuationCacheAt = previousCacheAt;
    return previousCache;
  }

  valuationCache = map;
  valuationCacheAt = now;
  return map;
}

async function loadLeguHistoricalEtfValuations(funds, requestedDate) {
  const matchedFunds = funds
    .map((fund) => ({ fund, rule: valuationRuleForName(fund.name) }))
    .filter((item) => item.rule);
  const neededRules = [...new Map(matchedFunds.map((item) => [leguRuleKey(item.rule), item.rule])).values()];
  if (!neededRules.length) return new Map();

  const cookie = await loadLeguCookie();
  const valuationByIndex = new Map();
  let cursor = 0;
  const workers = Array.from({ length: Math.min(2, neededRules.length) }, async () => {
    while (cursor < neededRules.length) {
      const rule = neededRules[cursor];
      cursor += 1;
      try {
        const rows = rule.kind === "market"
          ? await loadLeguMarketSeries(rule, cookie)
          : await loadLeguIndexSeries(rule, cookie);
        const valuation = rule.kind === "market"
          ? valuationFromLeguMarketSeries(rule, rows, requestedDate)
          : valuationFromLeguSeries(rule, rows, requestedDate);
        if (valuation) valuationByIndex.set(leguRuleKey(rule), valuation);
      } catch (_) {
        // A missing historical index must remain missing rather than borrowing today's valuation.
      }
      await sleep(350);
    }
  });
  await Promise.all(workers);

  const map = new Map();
  for (const { fund, rule } of matchedFunds) {
    const valuation = valuationByIndex.get(leguRuleKey(rule));
    if (!valuation) continue;
    const resolved = valuationForRule(valuation, rule);
    if (resolved) {
      resolved.source = `${resolved.source}（历史截面）`;
      map.set(fund.code, resolved);
    }
  }
  historicalValuationCache.set(requestedDate, map);
  return map;
}

async function loadJisiluEtfValuations() {
  const now = Date.now();
  if (valuationCache && now - valuationCacheAt < VALUATION_CACHE_MS) return valuationCache;
  const map = new Map();
  for (let page = 1; page <= 50; page += 1) {
    const url = `https://www.jisilu.cn/data/etf/etf_list/?___jsl=LST___t=${now}&rp=100&page=${page}`;
    const text = await curlTextWithHeaders(url, {
      "User-Agent": "Mozilla/5.0",
      "Referer": "https://www.jisilu.cn/data/etf/"
    });
    const payload = JSON.parse(text);
    const rows = payload?.rows || [];
    for (const row of rows) {
      const cell = row.cell || {};
      const code = String(cell.fund_id || row.id || "");
      const pb = parseChineseNumber(cell.pb);
      const pe = parseChineseNumber(cell.pe);
      if (/^\d{6}$/.test(code)) {
        map.set(code, {
          pb: pb && pb > 0 ? pb : null,
          pe: pe && pe > 0 ? pe : null,
          indexId: String(cell.index_id || ""),
          indexName: String(cell.index_nm || ""),
          source: "集思录ETF估值"
        });
      }
    }
    const total = Number(payload?.total || 0);
    if (!rows.length || page * 100 >= total) break;
  }
  valuationCache = map;
  valuationCacheAt = now;
  return map;
}

function parseTencentQuotes(text, fundMap, valuationMap = new Map()) {
  const rows = [];
  const pattern = /v_([a-z]{2}\d{6})="([^"]*)";/g;
  let match;
  while ((match = pattern.exec(text))) {
    const parts = match[2].split("~");
    const code = parts[2];
    const fund = fundMap.get(code);
    const valuation = valuationMap.get(code) || {};
    const price = parseChineseNumber(parts[3]);
    const pe = valuation.pe || parseChineseNumber(parts[39]);
    const pb = valuation.pb || ((parseChineseNumber(parts[46]) || 0) > 0 ? parseChineseNumber(parts[46]) : null);
    const metric = valuation.metric || (pb ? "PB" : (pe && pe > 0 ? "PE" : ""));
    const valuationValue = valuation.value || (
      metric === "PB" ? pb : (metric === "PE" ? pe : (pb || pe || null))
    );
    if (!fund || price === null || price <= 0) continue;
    rows.push({
      f12: code,
      f13: fund.market,
      f14: fund.name,
      f2: price,
      f3: parsePercent(parts[32]) ?? 0,
      f5: parseChineseNumber(parts[36]) ?? 0,
      f6: (parseChineseNumber(parts[37]) ?? 0) * 10000,
      f8: parsePercent(parts[38]) ?? 0,
      f23: pb || "-",
      pe: pe && pe > 0 ? pe : null,
      valuationMetric: metric,
      valuationValue,
      valuationLevel: valuation.level || "",
      valuationPct: valuation.percentile ?? null,
      valuationBelowTime: valuation.belowTime ?? null,
      valuationSource: valuation.source || "",
      valuationDate: valuation.date || "",
      valuationProxy: Boolean(valuation.proxy),
      valuationMissingReason: valuation.source ? "" : valuationMissingReason(fund.name),
      indexId: valuation.indexId || "",
      indexName: valuation.indexName || ""
    });
  }
  return rows;
}

async function loadEastmoneyEtfList() {
  try {
    const pz = 300;
    const first = JSON.parse(await curlText(`${QUOTE_BASE}&pn=1&pz=${pz}&_=${Date.now()}`));
    const total = Number(first?.data?.total || 0);
    const diff = [...(first?.data?.diff || [])];
    const pages = Math.ceil(total / pz);
    for (let pn = 2; pn <= pages; pn += 1) {
      const page = JSON.parse(await curlText(`${QUOTE_BASE}&pn=${pn}&pz=${pz}&_=${Date.now()}`));
      diff.push(...(page?.data?.diff || []));
    }
    if (diff.length >= Math.min(total, 1000)) return { first, total, diff };
    return loadEtfListFromFundSearch(first, total);
  } catch (_) {
    return loadEtfListFromFundSearch(null, 0);
  }
}

async function loadEtfListFromFundSearch(first, reportedTotal) {
  const funds = await loadFundSearchEtfs();
  const secids = funds.map((item) => `${item.market}.${item.code}`);
  const diff = [];
  for (let i = 0; i < secids.length; i += 20) {
    const chunk = secids.slice(i, i + 20).join(",");
    try {
      const payload = JSON.parse(await curlText(`${ULIST_URL}&secids=${encodeURIComponent(chunk)}&_=${Date.now()}`));
      diff.push(...(payload?.data?.diff || []));
    } catch (_) {
      // Eastmoney occasionally closes larger quote requests; keep partial rows instead of blanking the page.
    }
  }
  if (!diff.length) throw new Error("东方财富 ETF 兜底行情未返回有效数据");
  return {
    first: first || { rc: 0, rt: 11, data: {} },
    total: Math.max(reportedTotal || 0, diff.length),
    diff
  };
}

function guessMarket(code) {
  return String(code).startsWith("15") || String(code).startsWith("16") ? 0 : 1;
}

function serveFile(res, filePath) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(res, 404, "Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const types = {
      ".html": "text/html; charset=utf-8",
      ".png": "image/png",
      ".js": "text/javascript; charset=utf-8",
      ".css": "text/css; charset=utf-8"
    };
    send(res, 200, data, types[ext] || "application/octet-stream");
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/api/etfs") {
    proxyEtfList(res, url.searchParams);
    return;
  }

  if (url.pathname === "/api/macro") {
    const date = normalizeDateKey(url.searchParams.get("date"));
    loadMacroSnapshot(date)
      .then((snapshot) => send(res, 200, JSON.stringify(snapshot), "application/json; charset=utf-8"))
      .catch((error) => send(res, 502, JSON.stringify({ error: error.message }), "application/json; charset=utf-8"));
    return;
  }

  if (url.pathname === "/api/valuations") {
    const date = normalizeDateKey(url.searchParams.get("date"));
    if (!date || date >= shanghaiDateKey()) {
      send(res, 400, JSON.stringify({ error: "Historical date required" }), "application/json; charset=utf-8");
      return;
    }
    loadFundSearchEtfs()
      .then((funds) => loadLeguEtfValuations(funds, date))
      .then((valuations) => send(res, 200, JSON.stringify({ date, data: Object.fromEntries(valuations), source: "乐咕乐股历史指数估值" }), "application/json; charset=utf-8"))
      .catch((error) => send(res, 502, JSON.stringify({ error: error.message }), "application/json; charset=utf-8"));
    return;
  }

  if (url.pathname === "/api/kline") {
    const secid = url.searchParams.get("secid");
    if (!/^[01]\.\d{6}$/.test(secid || "")) {
      send(res, 400, JSON.stringify({ error: "Invalid secid" }), "application/json; charset=utf-8");
      return;
    }
    proxyKline(res, secid);
    return;
  }

  if (url.pathname === "/api/klines") {
    const secids = url.searchParams.get("secids") || "";
    proxyKlines(res, secids);
    return;
  }

  if (url.pathname === "/" || url.pathname === "/china-etf-dashboard.html") {
    serveFile(res, path.join(ROOT, "china-etf-dashboard.html"));
    return;
  }

  const safePath = path.normalize(url.pathname).replace(/^(\.\.[/\\])+/, "");
  serveFile(res, path.join(ROOT, safePath));
});

server.listen(PORT, HOST, () => {
  console.log(`China ETF dashboard: http://${HOST}:${PORT}/investment-decision-radar.html`);
});
