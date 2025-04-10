import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';

@Controller('recruiters')
export class RecruiterController {
  constructor(private readonly recruiterService: RecruiterService) {}

  @Post()
  create(@Body() createRecruiterDto: CreateRecruiterDto) {
    return this.recruiterService.create(createRecruiterDto);
  }

  @Get()
  findAll() {
    return this.recruiterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recruiterService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecruiterDto: UpdateRecruiterDto,
  ) {
    return this.recruiterService.update(id, updateRecruiterDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recruiterService.remove(id);
  }

  @Post(':recruiterId/candidates/:candidateId')
  assignCandidate(
    @Param('recruiterId', ParseIntPipe) recruiterId: number,
    @Param('candidateId', ParseIntPipe) candidateId: number,
  ) {
    return this.recruiterService.assignCandidate(recruiterId, candidateId);
  }

  @Delete('candidates/:candidateId')
  unassignCandidate(@Param('candidateId', ParseIntPipe) candidateId: number) {
    return this.recruiterService.unassignCandidate(candidateId);
  }
} 