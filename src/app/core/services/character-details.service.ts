import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character } from '../models/character';
import { Faction } from 'src/app/core/models/faction';

@Injectable({
  providedIn: 'root'
})
export class CharacterDetailsService {

  private endpoint: string = 'api/characterdetails';
  private characters: Character[];
  private selectedCharacter: Character;
  private firstRun: number = 0;

  constructor() { }

  public GetCharacters(): Character[] {
    if(this.firstRun == 0) {
      this.characters = this.charactersFromDB;
      this.firstRun = 1;
    }
    return (this.characters);
  }


  public SetCharacter(character: Character): void {
    this.selectedCharacter = character;
  }

  public GetCharacter(): Character {
    return this.selectedCharacter;
  }

  public DeleteCharacter(id: number): void {
    this.characters = this.characters.filter(c => c.id != id);
  }

  private charactersFromDB: Character[] = [
    { id: 1, name: 'Zendrakk', level: 60, raceId: 1, race: 'Orc', classId: 1, class: 'Warrior', faction: Faction.horde},
    { id: 2, name: 'Tempered', level: 55, raceId: 2, race: 'Undead', classId: 2, class: 'Rogue', faction: Faction.horde},
    { id: 3, name: 'Grimshaw', level: 42, raceId: 1, race: 'Orc', classId: 3, class: 'Hunter', faction: Faction.horde},
    { id: 4, name: 'Kenion', level: 60, raceId: 5, race: 'Human', classId: 2, class: 'Rogue', faction: Faction.alliance}
  ]
}
