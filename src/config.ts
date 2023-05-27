interface IConfig {
  PORT: number;
  HOST?: string;
  DATABASE_URL?: string;
  NEW_DOMAINS_CRON_TIMESTRING?: string;
  EXISTSING_DOMAINS_CRON_TIMESTRING?: string;
  WHOIS_URL?: string;
  WHOIS_API_KEY?: string;
  VIRUSTOTAL_URL?: string;
  VIRUSTOTAL_API_KEY?: string;
}

export const config: IConfig = {
  PORT: Number(process.env.PORT),
  HOST: process.env.HOST,
  DATABASE_URL: process.env.DATABASE_URL,
  NEW_DOMAINS_CRON_TIMESTRING: process.env.NEW_DOMAINS_CRON_TIMESTRING,
  EXISTSING_DOMAINS_CRON_TIMESTRING:
    process.env.EXISTSING_DOMAINS_CRON_TIMESTRING,
  WHOIS_URL: process.env.WHOIS_URL,
  WHOIS_API_KEY: process.env.WHOIS_API_KEY,
  VIRUSTOTAL_URL: process.env.VIRUSTOTAL_URL,
  VIRUSTOTAL_API_KEY: process.env.VIRUSTOTAL_API_KEY,
};
