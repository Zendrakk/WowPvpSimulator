import { Component } from '@angular/core';
import { Character } from 'src/app/core/models/character';
import { Faction } from '../../core/models/faction';
import { CharacterDetailsService } from '../../core/services/character-details.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  public pageDescriptionMsg: string = "The following table displays your characters.";
  public addCharacterButtonMsg: string = "Add New Character";
  public noCharsMsg: string = "You currently have no characters.";
  public charDeletedMsg: string[] = ["Hail, friend!", "You successfully deleted a character."];
  public charNotDeletedMsg: string[] = ["Lok'Tar Ogar!", "Your character could not be deleted."];

  public isLoaded: boolean = false;
  public isSuccess: boolean = false;
  public isFailed: boolean = false;
  public isAlliance: boolean = false;
  public isHorde: boolean = false;

  public characters: Character[];
  public selectedCharacter: Character = null;
  public faction = Faction;



  constructor(
    private characterdetailsService: CharacterDetailsService
  ) {}

  ngOnInit() {
    this.isLoaded = false;
    this.characters = this.characterdetailsService.GetCharacters().sort(this.Compare);
    this.isLoaded = true;
  }
  
  public onSelect(character: Character): void {
    this.isLoaded = false;
    this.selectedCharacter = character;

    if (this.selectedCharacter.faction == 0) {
      this.isAlliance = true;
      this.isHorde = false;
    } else {
      this.isAlliance = false;
      this.isHorde = true;
    }
    this.isLoaded = true;
  }

  public DeleteCharacter(id: number): void {
    this.characterdetailsService.DeleteCharacter(id);
    this.characters = this.characters.filter(ch => ch.id != id);
    this.selectedCharacter = null;
    this.isSuccess = true;
    this.isFailed = false;
    this.isAlliance = false;
    this.isHorde = false;

    setTimeout(() => {this.isSuccess = false}, 3000);
  }

  private Compare(a: Character, b: Character) {
    const levelA = a.level;
    const levelB = b.level;
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    let comparison = 0;

    // Sort level descending
    if (levelA > levelB) {
      comparison = -1;
    } else if (levelA < levelB) {
      comparison = 1;
    } else {
      // Sort name acsending
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
    }
    return comparison;
  }
}
