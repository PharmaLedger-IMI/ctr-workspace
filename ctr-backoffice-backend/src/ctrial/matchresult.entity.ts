import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";
import { MatchResultClinicalTrial } from "./matchresultclinicaltrial.dto";

@Entity("matchresult")
export class MatchResult extends BaseEntity {

    @ApiProperty({ description: "Mandatory KeySSI identifier" })
    @PrimaryColumn()
    keyssi: string;

    @ApiProperty({ description: "DSU data" })
    @Column({
        name: "dsudata",
        type: 'jsonb'
    })
    dsuData: any;

    trials: MatchResultClinicalTrial[]; // init from dsuData.trials
}
