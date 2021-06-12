import { Injectable } from '@nestjs/common';

@Injectable()
export class MatchService {
    constructor(
    ) { }

    async submit(req: any): Promise<any> {
        return { prop: "test" };
    }

}
