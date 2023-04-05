import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceModule } from './api/device/device.module';
import { SiteModule } from './api/site/site.module';
import { TypeModule } from './api/type/type.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { LogService } from './services/log.service';
import { ShareModule } from './share/share.module';


@Module({
    imports: [
        ShareModule,
        ConfigModule,
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
        }),
        DeviceModule,
        SiteModule,
        TypeModule,

    ],
    controllers: [],
    providers: [LogService],
})
export class AppModule { }
