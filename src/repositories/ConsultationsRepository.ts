import { EntityRepository, Repository } from 'typeorm';
import { Consultation } from '../entities/Consultation';

@EntityRepository(Consultation)
class ConsultationsRepository extends Repository<Consultation> {

}


export { ConsultationsRepository };