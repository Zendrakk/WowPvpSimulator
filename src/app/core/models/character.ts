import { Faction } from 'src/app/core/models/faction';

export class Character {
    id!: number;
    name!: string;
    level!: number;
    raceId!: number;
    race!: string;
    classId!: number;
    class!: string;
    faction!: Faction;
}