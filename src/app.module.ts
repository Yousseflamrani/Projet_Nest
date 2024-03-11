// src/app.module.ts

import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { StaticModule } from './static/static.module';

@Module({
  imports: [TasksModule, StaticModule],
})
export class AppModule {}
