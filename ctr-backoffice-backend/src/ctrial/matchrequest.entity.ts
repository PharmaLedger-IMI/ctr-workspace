import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryColumn, Column, JoinColumn, BaseEntity, CreateDateColumn, OneToOne } from "typeorm";
import { MatchResult } from "./matchresult.entity";

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

    @ApiProperty({ description: "Filled only after creating the MatchResult object." })
    @OneToOne(() => MatchResult, { eager: true, nullable: true })
    @JoinColumn({name: "matchresult"})
    matchResult?: MatchResult;
    
    @ApiProperty({ description: "keySSI ?" })
    @Column({ name: "healthinfo" })
    healthInfo: string;

    @CreateDateColumn({ name: "createdon" }) // filled by NestJS on creation
    createdOn: Date
}
