import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Carousel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    url: string;
}