import { Entity, PrimaryColumn, CreateDateColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Doctor } from './Doctor';
import { User } from './User';

@Entity('consultations')
class Consultation {
    @PrimaryColumn()
    id: string;
    @JoinColumn({ name: 'user_id' })
    @Column()
    user_id: string
    @OneToOne(() => User)
    user: User;
    @JoinColumn({ name: 'doctor_id' })
    @Column()
    doctor_id: string;
    @OneToOne(() => Doctor)
    doctor: Doctor;
    @CreateDateColumn()
    consultation_date: Date;

    constructor() {
        if (!this.id) this.id = uuid();
    }
}

export { Consultation };