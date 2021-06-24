import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryColumn, Column, JoinColumn, BaseEntity, ManyToOne, CreateDateColumn } from "typeorm";

@Entity("matchrequest")
export class MatchRequest extends BaseEntity {

    @ApiProperty({ description: "Mandatory KeySSI identifier" })
    @PrimaryColumn()
    keyssi: string;

    @ApiProperty()
    @Column({
        name: "dsudata",
        type: 'jsonb'
    })
    dsuData: any;

    @ApiProperty({ description: "Filled only after matching with the keySSI for the MatchResult object" })
    @Column({ name: "matchresult" })
    matchResult: string;
    
    @ApiProperty({ description: "keySSI ?" })
    @Column({ name: "healthinfo" })
    healthInfo: string;

    @CreateDateColumn({ name: "createdon" }) // filled by NestJS on creation
    createdOn: Date
}
