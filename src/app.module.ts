import { Module } from '@nestjs/common';
import { ProvidersModule } from '@libs/providers';
import { SharedModule } from '@libs/shared';

@Module({
  imports: [ProvidersModule, SharedModule],
})
export class AppModule {}
