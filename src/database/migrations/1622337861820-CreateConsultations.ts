import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateConsultations1622337861820 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'consultations',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'user_id',
                    type: 'uuid'
                },
                {
                    name: 'doctor_id',
                    type: 'uuid'
                },
                {
                    name: 'consultation_date',
                    type: 'timestamp'
                }
            ],
            foreignKeys: [
                {
                    name: 'fk_user',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['user_id'],
                    onDelete: 'SET NULL',
                    onUpdate: 'SET NULL'
                },
                {
                    name: 'fk_doctor',
                    referencedTableName: 'doctors',
                    referencedColumnNames: ['id'],
                    columnNames: ['doctor_id'],
                    onDelete: 'SET NULL',
                    onUpdate: 'SET NULL'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('consultations');
    }

}
