import { getCustomRepository, Repository } from 'typeorm';
import { Consultation } from '../entities/Consultation';
import { ConsultationsRepository } from '../repositories/ConsultationsRepository';

interface IConsultationCreate {
    user_id: string,
    doctor_id: string,
    consultation_date: Date
}

class ConsultationsService {
    private consultationsRepository: Repository<Consultation>;

    constructor() {
        this.consultationsRepository = getCustomRepository(ConsultationsRepository);
    }

    async create({ user_id, doctor_id, consultation_date }: IConsultationCreate) {
        const consultation = this.consultationsRepository.create({
            user_id, doctor_id, consultation_date
        });
        await this.consultationsRepository.save(consultation);
        return consultation;
    }

    async listByUser(user_id: string) {
        const list = await this.consultationsRepository.find({
            where: { user_id },
            relations: ['user', 'doctor']
        });
        return list;
    }

}

export { ConsultationsService };