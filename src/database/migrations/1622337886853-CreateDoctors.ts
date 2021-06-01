import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDoctors1622337886853 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'doctors',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'crm',
                    type: 'int'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'specialty',
                    type: 'varchar'
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('doctors');
    }

}
