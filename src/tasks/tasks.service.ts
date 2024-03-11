// src/tasks/tasks.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private id = 0;

  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = { id: ++this.id, completed: false, ...createTaskDto };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return task;
  }

  complete(id: number): Task {
    const task = this.findOne(id);
    task.completed = true;
    return task;
  }
}
