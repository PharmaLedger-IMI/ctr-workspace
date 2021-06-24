import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

export enum ClinicalTrialStatusCodes {
    DRAFT="DRA",
    DELETED="DEL",
    CANCELED="CAN",
    PUBLISHED="PUB",
    RECRUITMENT="REC",
    CLOSED="CLD"
};   
@Entity("clinicaltrialstatus")
export class ClinicalTrialStatus extends BaseEntity {

    @ApiProperty({description: "3 letter code"})
    @PrimaryColumn()
    code: string;

    @ApiProperty({description: "Description"})
    @Column()
    description: string;
}
