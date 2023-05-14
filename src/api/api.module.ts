import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers';
import { ResolversModule } from './resolvers';
import { AuthModule } from '../../libs/auth/src';

@Module({
  imports: [ControllersModule, AuthModule, ResolversModule],
})
export class ApiModule {}
