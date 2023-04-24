import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './resource/user/user.module';
import { CustomerModule } from './resource/customer/customer.module';
import { PreferenceModule } from './resource/preference/preference.module';
import { SettingsModule } from './config/config.module';

@Module({
  imports: [SettingsModule, CustomerModule, UserModule, PreferenceModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
