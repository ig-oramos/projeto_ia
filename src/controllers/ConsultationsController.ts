import { Request, Response } from 'express';
import { ConsultationsRepository } from '../repositories/ConsultationsRepository';
import { ConsultationsService } from '../services/ConsultationsService';

class ConsultationsController {
    async create(request: Request, response: Response) {
        const { user_id, consultation_date, doctor_id } = request.body;

        const consultationsService = new ConsultationsService();

        const consultation = await consultationsService.create({
            user_id, consultation_date, doctor_id
        });

        return response.json(consultation);
    }
}

export { ConsultationsController };