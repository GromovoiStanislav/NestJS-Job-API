import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
    }),

    JobsModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/jobs'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
