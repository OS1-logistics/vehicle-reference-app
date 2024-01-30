import { Module,  NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, CssContentTypeMiddleware, JsContentTypeMiddleware } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ParticipantService } from './participant/participant.service';
import { ParticipantModule } from './participant/participant.module';
import { VehiclesController } from './vehicles/vehicles.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    HttpModule,
    VehiclesModule,
    ParticipantModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/os1-vehicle-reference-app/api/v1/vehicles/(.*)'],
      serveRoot: '/os1-vehicle-reference-app',
    }),
  ],
  controllers: [AppController, VehiclesController],
  providers: [AppService, ParticipantService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log("Inside APP Module");
    consumer.apply(CssContentTypeMiddleware, JsContentTypeMiddleware).forRoutes('*');
  }
}
