import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, BaseEntity, ManyToOne } from "typeorm";

import { Locale } from "./locale.entity";

@Entity("appresource")
export class AppResource extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    key: string;

    @ApiProperty()
    @ManyToOne(() => Locale, { eager: true })
    @JoinColumn({ name: "locale", referencedColumnName: "code" })
    locale: Locale;

    @ApiProperty()
    @Column()
    value: string;

    @ApiProperty()
    @Column()
    help: string;
}
