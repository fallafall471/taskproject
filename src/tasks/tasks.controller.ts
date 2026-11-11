import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseIntPipe } from '@nestjs/common';
import { UpdateTaskStatusDto } from './dto/status.dto';
@ApiTags("task")
@ApiBearerAuth('JWT-auth')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({summary:"cree une tache"})
  @Post()
  @ApiCreatedResponse({description:"tache cree avec succes"})
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  
  @ApiOperation({summary:"recupere toute les taches"})
  @Get()
  @ApiOkResponse({description:"taches recupere avec succes"})
  findAll() {
    return this.tasksService.findAll();
  }

  @ApiOperation({summary:"recupere une tache specifique"})
  @Get(':id')
  @ApiOkResponse({description:"tache recupere avec succes"})
  @ApiNotFoundResponse({description:"tache non trouve dans la base de donnes"})
  findOne(@Param('id',ParseIntPipe) id:number) {
    return this.tasksService.findOne(id);
  }

  @ApiOperation({summary:"modifier les tache deja cree dans la base de donnée"})
  @Patch(':id')
  @ApiOkResponse({description:"tache modifier avec succes"})
  @ApiNotFoundResponse({description:"taches non trouve dans la base de donnée"})
  update(@Param('id',ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @ApiOperation({summary:"modifier la column status dans la base de donnée"})
  @Patch(":id/status")
  @ApiOkResponse({description:"status modifier avec succes"})
  @ApiNotFoundResponse({description:"cette tache existe pas"})
  @ApiBadRequestResponse({description:"erreur au niveau du status"})
  updateStatus(@Param("id",ParseIntPipe) id:number,@Body() updateTaskStatusDto : UpdateTaskStatusDto){
    return this.tasksService.updateStatut(id,updateTaskStatusDto)
  }

  @ApiOperation({summary:"suprimme une tache specifique dans la base donée"})
  @Delete(':id')
  @ApiOkResponse({description:"taches surpimme avec succes"})
  @ApiNotFoundResponse({description:"cette tache existe pas"})
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
