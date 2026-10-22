import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiTags,ApiCreatedResponse, ApiResponse, ApiBadRequestResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags("project")
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({summary:"cree un project"})
  @Post()
  @ApiCreatedResponse({description:"project cree avec succes"})
  @ApiBadRequestResponse({description:"erreur client"})
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @ApiOperation({summary:"recupere tout les project cree dans la base de donnée"})
  
  @Get()
  @ApiOkResponse({description:"projects recupere avec succes"})
  findAll() {
    return this.projectService.findAll();
  }

  @ApiOperation({summary:"recupere un poject dans la base de donnée"})
  @Get(':id')
  @ApiOkResponse({description:"project trouve avec succes"})
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @ApiOperation({summary:"modifier un porject dans la base de donnée"})
  @Patch(':id')
  @ApiOkResponse({description:"rproject modifier avec succes"})
  @ApiNotFoundResponse({description:"ce project existe pas"})
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @ApiOperation({summary:"suprime un project dans la base de donnée"})
  @Delete(':id')
  @ApiOkResponse({description:"project suprime avec succes"})
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
