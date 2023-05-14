import { Module } from '@nestjs/common';
import { ProvidersModule } from "@libs/providers";


@Module({
  imports: [
    ProvidersModule
  ],
})
export class AppModule {}
