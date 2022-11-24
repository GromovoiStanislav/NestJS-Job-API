import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
//import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter()); //Глобально на всё
  app.useGlobalFilters(new ValidationExceptionFilter()); //Глобально на всё
  //app.useGlobalPipes(new ValidationPipe()); //Глобально на всё

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  //app.setViewEngine('hbs');
  app.setViewEngine('pug');

  await app.listen(3000);
}
bootstrap();
