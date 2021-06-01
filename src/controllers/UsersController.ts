import { request, Request, Response } from "express";
import { UsersService } from "../services/UsersService";

class UsersController {

    async create(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const usersService = new UsersService();

        const users = await usersService.create(email);
        return response.json(users);

    }

    async findByEmail(request: Request, response: Response) {
        const { email } = request.body;

        const usersService = new UsersService();

        const user = await usersService.findByEmail(email);
        return response.json(user);
    }

}

export { UsersController }