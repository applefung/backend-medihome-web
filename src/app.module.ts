import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleTagsModule } from './article-tags/article-tags.module';
import { ArticleTopicsModule } from './article-topics/article-topics.module';
import { ArticlesModule } from './articles/articles.module';
import { CarouselsModule } from './carousels/carousels.module';
import { ClinicsModule } from './clinic/clinic.module';
import { DistrictsModule } from './districts/districts.module';
import { DoctorUsersModule } from './doctor-user/doctor-user.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientUsersModule } from './patient-users/patient-users.module';
import { RegionsModule } from './regions/regions.module';
import { SpecialtiesModule } from './specialties/specialties.module';

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
    SpecialtiesModule,
    DoctorsModule,
    DoctorUsersModule,
    ClinicsModule,
    ArticlesModule,
    ArticleTagsModule,
    ArticleTopicsModule,
    DistrictsModule,
    RegionsModule,
    PatientUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
