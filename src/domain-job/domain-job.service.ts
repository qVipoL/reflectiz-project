import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Domain } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import { config } from 'src/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DomainJobService {
  private readonly logger = new Logger(DomainJobService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService
  ) {}

  @Cron(config.NEW_DOMAINS_CRON_TIMESTRING)
  async updateNewDomains() {
    this.logger.debug('Updating info on new domains');

    const domains = await this.prisma.domain.findMany({
      where: {
        domainInfo: {
          equals: {},
        },
      },
    });

    await this.fetchDomainsInfoAndSave(domains);

    this.logger.debug(`Updated info on ${domains.length} new domains`);
  }

  @Cron(config.EXISTSING_DOMAINS_CRON_TIMESTRING)
  async updateExistingDomains() {
    this.logger.debug('Updating info on existing domains');

    const domains = await this.prisma.domain.findMany();

    await this.fetchDomainsInfoAndSave(domains);

    this.logger.debug(`Updated info on ${domains.length} existing domains`);
  }

  async fetchWhoIsInfo(domain: Domain) {
    const res = this.httpService.get(config.WHOIS_URL, {
      params: {
        apiKey: config.WHOIS_API_KEY,
        outputFormat: 'json',
        domainName: domain.path,
      },
    });

    return firstValueFrom(res);
  }

  async fetchVirusTotalInfo(domain: Domain) {
    const res = this.httpService.get(
      `${config.VIRUSTOTAL_URL}/${domain.path}`,
      {
        headers: {
          'x-apikey': config.VIRUSTOTAL_API_KEY,
        },
      }
    );

    return firstValueFrom(res);
  }

  async fetchDomainsInfoAndSave(domains: Domain[]) {
    return Promise.all(
      domains.map(async (domain) => {
        const domainInfo = domain.domainInfo || {};
        const virusTotal = await this.fetchVirusTotalInfo(domain);
        const whoIs = await this.fetchWhoIsInfo(domain);

        if (virusTotal.status === HttpStatus.OK) {
          Object.assign(domainInfo, {
            virusTotal: virusTotal.data,
          });
        }

        if (whoIs.status === HttpStatus.OK) {
          Object.assign(domainInfo, {
            whoIs: whoIs.data,
          });
        }

        return this.prisma.domain.update({
          where: {
            id: domain.id,
          },
          data: {
            domainInfo,
          },
        });
      })
    );
  }
}
