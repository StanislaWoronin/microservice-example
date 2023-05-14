import { Module } from '@nestjs/common';
import { AllExceptionFilter } from '@libs/shared/filters';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class SharedModule {}
