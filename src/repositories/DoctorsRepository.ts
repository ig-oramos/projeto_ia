import { EntityRepository, Repository } from 'typeorm';
import { Doctor } from '../entities/Doctor';

@EntityRepository(Doctor)
class DoctorsRepository extends Repository<Doctor> {

}

export { DoctorsRepository };