import { getCustomRepository, Repository } from "typeorm";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";
import { Connection } from "../entities/Connection"

interface IConnectionCreate {
    session_id: string;
    user_id: string;
    admin_id?: string;
}

class ConnectionsService {

    private connectionsRepository: Repository<Connection>;

    constructor() {
        this.connectionsRepository = getCustomRepository(ConnectionsRepository);
    }

    async create({ session_id, user_id, admin_id }: IConnectionCreate) {
        const connection = this.connectionsRepository.create({
            session_id,
            user_id,
            admin_id,
        });

        await this.connectionsRepository.save(connection);

        return connection;
    }

    async findByUserId(user_id: string) {
        const connection = await this.connectionsRepository.findOne({ user_id });
        return connection;
    }

    async findAllWithoutAdmin() {
        const connections = await this.connectionsRepository.find({
            where: { admin_id: null },
            relations: ['user']
        });

        return connections;
    }

    async updateAdminId(user_id: string, admin_id: string) {
        await this.connectionsRepository.createQueryBuilder()
            .update(Connection)
            .set({ admin_id })
            .where("user_id = :user_id", {
                user_id
            })
            .execute();
    }

    async updateSessionId(user_id: string, session_id: string) {
        await this.connectionsRepository.createQueryBuilder()
            .update(Connection).set({ session_id })
            .where('user_id = :user_id', {
                user_id
            }).execute();
    }

}

export { ConnectionsService };