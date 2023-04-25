import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './resource/user/user.module';
import { CustomerModule } from './resource/customer/customer.module';
import { PreferenceModule } from './resource/preference/preference.module';
import { SettingsModule } from './config/config.module';
import { AuthModule } from './resource/auth/auth.module';
import { AuthMiddleware } from './resource/auth/auth.middleware';

@Module({
  imports: [
    SettingsModule,
    CustomerModule,
    UserModule,
    PreferenceModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
