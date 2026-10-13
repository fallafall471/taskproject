import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { Project } from './project/entities/project.entity';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }),

TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('DATABASE_HOST'),
    port: +configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USERNAME'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    entities: [Project],
    synchronize: true,
  }),
  inject: [ConfigService],
}),

ProjectModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
