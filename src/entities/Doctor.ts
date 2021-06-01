import { Entity, PrimaryColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('doctors')
class Doctor {
    @PrimaryColumn()
    id: string;
    @Column()
    crm: number
    @Column()
    name: string
    @Column()
    specialty: string

    constructor() {
        if (!this.id) this.id = uuid();
    }
}

export { Doctor };