import { Request, Response } from 'express';
import { DoctorsService } from '../services/DoctorsService';

class DoctorsController {

    async create(request: Request, response: Response) {
        const { crm, name, specialty } = request.body;
        const doctorsService = new DoctorsService();

        const doctorExists = await doctorsService.findByCRM(crm);
        if (doctorExists)
            return response.json(doctorExists)

        const doctor = await doctorsService.create({
            crm, name, specialty
        });

        return response.json(doctor);
    }

    async findBySpecialty(request: Request, response: Response) {
        const { specialty } = request.params;

        const doctorsService = new DoctorsService();

        const doctor = await doctorsService.findBySpecialty(specialty);
        response.json(doctor[0]);
    }
}

export { DoctorsController };