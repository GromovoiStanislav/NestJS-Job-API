import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
  UseFilters,
  HttpException,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobDTO } from './dtos/job.dto';
import { Job } from './interfaces/job.interface';
//import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ValidationExceptionFilter } from '../filters/validation-exception.filter';
import { JobData } from '../decorators/jobdata.decorator';

@Controller('jobs')
//@UsePipes(ValidationPipe) //На уровне контроллера
//@UseFilters(HttpExceptionFilter)//На уровне контроллера
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  //@UseFilters(HttpExceptionFilter)//На уровне ендпоинта
  find(@Param('id') id) {
    return this.jobsService
      .find(id)
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException('Job Not Found', HttpStatus.NOT_FOUND);
        }
      })
      .catch(() => {
        throw new HttpException('Job Not Found', HttpStatus.NOT_FOUND);
      });
  }

  @Post()
  //@UsePipes(ValidationPipe)
  //@UseFilters(ValidationExceptionFilter) //На уровне ендпоинта
  //На уровне параметра @Body(ValidationPipe)
  create(@JobData(ValidationPipe) jobData: JobDTO): Promise<Job> {
    return this.jobsService.create(jobData);
  }

  @Patch()
  patch(@JobData('title') title: string): string {
    return title;
  }

  @Put(':id')
  update(@Param('id') id, @Body() job: JobDTO): Promise<Job> {
    return this.jobsService.update(id, job);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Job> {
    return this.jobsService.delete(id);
  }
}
