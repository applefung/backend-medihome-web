import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import dayjs from 'dayjs';
import { PatientUsersService } from './patient-users.service';
import { PatientUserDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('carousels')
export class PatientUsersController {
  constructor(private readonly patientUsersService: PatientUsersService) {}

  @Get()
  getPatientUsers() {
    return this.patientUsersService.getPatientUsers();
  }

  @Get(':id')
  getPatientUser(@Param('id') id: string) {
    return this.patientUsersService.getPatientUser({ id });
  }

  @Post()
  createPatientUser(
    @Body() { email, password, dateOfBirth, ...restData }: PatientUserDto,
  ) {
    return this.patientUsersService.createPatientUser({
      email,
      password,
      patientProfile: {
        dateOfBirth: dayjs(dateOfBirth).toDate(),
        ...restData,
      },
    });
  }

  @Patch(':id')
  async updatePatientUser(
    @Param('id') id: string,
    @Body() data: PatientUserDto,
  ) {
    await this.patientUsersService.getPatientUserOrFail({ id });
    return this.patientUsersService.updatPatientUser(id, data);
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.patientUsersService.getPatientUserOrFail({ id });
    return this.patientUsersService.updateAvatar(id, file);
  }

  @Delete(':id')
  async deleteCarousel(@Param('id') id: string) {
    await this.patientUsersService.getPatientUserOrFail({ id });
    return this.patientUsersService.deletePatientUser(id);
  }
}
