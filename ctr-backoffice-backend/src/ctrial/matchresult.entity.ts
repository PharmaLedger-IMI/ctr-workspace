import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";
import { IHashMatchResultClinicalTrial } from "./ihashmatchresultclinicaltrial.interface";

@Entity("matchresult")
export class MatchResult extends BaseEntity {

    @ApiProperty({ description: "Mandatory KeySSI identifier" })
    @PrimaryColumn()
    keyssi: string;

    @ApiProperty()
    @Column({
        name: "dsudata",
        type: 'jsonb'
    })
    dsuData: any;

    trials: IHashMatchResultClinicalTrial; // init from dsuData.trials
}
