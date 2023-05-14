import { Module } from '@nestjs/common';
import { ProvidersModule } from '@libs/providers';
import { SharedModule } from '@libs/shared';
import { DomainsModule } from './domains/domains.module';
import { ApiModule } from './api';

@Module({
  imports: [ProvidersModule, SharedModule, DomainsModule, ApiModule],
})
export class AppModule {}
