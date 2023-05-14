import { Module } from '@nestjs/common';
import { appDataSource } from "@libs/providers/typeorm/typeorm.config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forRoot(appDataSource.options)],
})
export class TypeormModule {}
