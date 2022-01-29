import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PatientUsersService } from './patient-users.service';
import { PatientUserDto } from './dtos';

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
  createPatientUser(@Body() { email, password, ...restData }: PatientUserDto) {
    return this.patientUsersService.createPatientUser({
      email,
      password,
      // patientProfile: { ...restData },
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

  @Delete(':id')
  async deleteCarousel(@Param('id') id: string) {
    await this.patientUsersService.getPatientUserOrFail({ id });
    return this.patientUsersService.deletePatientUser(id);
  }
}
