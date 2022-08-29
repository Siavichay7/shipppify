import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleDto } from './dto/vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {

  constructor(
    @InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>) { }


  async createVehicle(createVehicleDto: CreateVehicleDto) {
    const nuevoDato = await this.vehicleRepo.create(createVehicleDto);
    const guardarDato: Vehicle = await this.vehicleRepo.save(nuevoDato);
    return plainToClass(VehicleDto, guardarDato)
  }

  async findVehiclesByIdDriver(idDriver: number) {
    const vehicles: Vehicle[] = await this.vehicleRepo.find({
      where: {driverId: idDriver},
      withDeleted: false
  }, );
  return vehicles.map((vehicle: Vehicle) => plainToClass(VehicleDto, vehicle))

  }

  async updateVehicle(id: number, changes: UpdateVehicleDto) {
    const vehicle = await this.vehicleRepo.findOne({where: {id: id}});
    this.vehicleRepo.merge(vehicle, changes);
    const guardarDato: Vehicle = await this.vehicleRepo.save(vehicle);
    return plainToClass(VehicleDto, guardarDato)

  }

  async removeVehicle(id: number) {
    // return await this.vehicleRepo.remove(id)
  }
}


