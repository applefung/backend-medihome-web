import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarouselsModule } from './carousels/carousels.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env',
        '.env.local',
        '.env.development',
        '.env.production',
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const isDevelopment = configService.get('NODE_ENV') === 'development';
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          synchronize: isDevelopment,
          autoLoadEntities: isDevelopment,
          logging: isDevelopment,
        };
      },
      inject: [ConfigService],
    }),
    CarouselsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
