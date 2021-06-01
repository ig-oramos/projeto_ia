import { getCustomRepository, Repository } from 'typeorm';
import { DoctorsRepository } from '../repositories/DoctorsRepository';
import { Doctor } from '../entities/Doctor';

interface IDoctorCreate {
    crm: number,
    name: string,
    specialty: string
}

class DoctorsService {
    private doctorsRepository: Repository<Doctor>;

    constructor() {
        this.doctorsRepository = getCustomRepository(DoctorsRepository);
    }

    async create({ crm, name, specialty }: IDoctorCreate) {
        const doctorExists = await this.doctorsRepository.findOne({ crm });

        if (doctorExists) return doctorExists;

        const doctor = this.doctorsRepository.create({
            crm, name, specialty
        });
        await this.doctorsRepository.save(doctor);
        return doctor;
    }

    async findByCRM(crm: number) {
        const doctor = await this.doctorsRepository.findOne({ crm });
        return doctor;
    }

    async findBySpecialty(specialty: string) {
        const doctors = await this.doctorsRepository.find({ specialty });
        return doctors;
    }
}

export { DoctorsService };