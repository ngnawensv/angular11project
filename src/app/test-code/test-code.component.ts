import {Component, OnInit} from '@angular/core';
import {Person} from "../model/person";
import {Individu} from "../model/individu";
import duplicates from 'find-array-duplicates';
import Swal from 'sweetalert2';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-test-code',
  templateUrl: './test-code.component.html',
  styleUrls: ['./test-code.component.css']
})
export class TestCodeComponent implements OnInit {
  tabOfString = ['patate', 'mais', 'haricot', 'patate', 'tomate']

  listPerson: Array<Person> = [];
  listPerson1: Array<Person> = [];
  listIndividu: Array<Individu> = [];
  form:FormGroup;
  //perList:Array<Person>=[];


  constructor( private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
    //this.showErrorAlert()
    this.listPerson = [
      {id: 1, name: 'ngnawen', email: 'ngnawens@gmail.com', tel: '55011446'},
      {id: 2, name: 'mare', email: 'mare@gmail.com', tel: '55011446'},
      {id: 2, name: 'mare', email: 'mare@gmail.com', tel: '55011446'},
      {id: 4, name: 'ndinchout', email: 'ndinchout@gmail.com', tel: '55011446'},
      {id: 5, name: 'pounjingam', email: 'pounjingam@gmail.com', tel: '55011446'},
      {id: 6, name: 'samuel vermon', email: 'ngnawens@gmail.com', tel: '55011446'},
      {id: 1, name: 'ngnawen', email: 'ngnawens@gmail.com', tel: '55011446'}

    ]
    this.listPerson1 = [
      {id: 1, name: 'ngnawen', email: 'ngnawens@gmail.com', tel: '55011446'},
      {id: 2, name: 'mare', email: 'mare@gmail.com', tel: '55011446'},
      {id: 3, name: 'ndinchout', email: 'ndinchout@gmail.com', tel: '55011446'},
      {id: 4, name: 'pounjingam', email: 'pounjingam@gmail.com', tel: '55011446'}

    ]
    this.listIndividu = [
      {name: 'ngnawen'},
      {name: 'mare'},
      {name: 'ndinchout'},
      {name: 'pounjingam'},
      {name: 'samuel vermon'},
      {name: 'ngnawen'}

    ]
    /*

        console.log('###########################  BIGINNER for Individu List ###############################')
        let isUnique = this.checkIfListIndividuDuplicate(this.listIndividu)
        console.log(isUnique)
        if (isUnique) {
          console.log('listIndividu  don\'t contain duplicate\' values');
        } else {
          console.log('listIndividu contain duplicate\'s values');
        }
        console.log('############################  END BIGINNER for Individu List ###############################')


        console.log('###########################  BIGINNER for Person list ###############################')
        let isUnique1 = this.checkIfListPersonDuplicate(this.listPerson)
        console.log(isUnique1)
        if (isUnique1) {
          console.log('ListPerson  don\'t contain duplicate\'s values');
        } else {
          console.log('ListPersoncontain duplicate values');
        }
        console.log('############################  END1 for person list ###############################')


        console.log('###########################  BIGINNER for Person1 list ###############################')
        let isUnique2 = this.checkIfListPersonDuplicate(this.listPerson1)
        console.log(isUnique2)
        if (isUnique2) {
          console.log('ListPerson1 don\'t contain duplicate\'s values');
        } else {
          console.log('ListPerson1 contain duplicate values');
        }
        console.log('############################  END1 for person1 list ###############################')
    */
    // exiting method in typescript
    //console.log(duplicates(this.listPerson, 'name'));

    console.log('###########################  BIGINNER check list person duplicate ###############################')

    console.log('############################  END check list person duplicate ###############################')
  }

  get language() {
    return this.form.controls['language'];
  }
  /***
   * Les methodes
   */

  createForm(){
    this.form=this.fb.group({
      "language": ["",Validators.required]
    });
  }

//Error
  showErrorAlert(title: string,action:string) {
    Swal.fire(title, action, 'error')
  }

  // Success
  showSuccessAlert() {
    Swal.fire(' Personne Enregistrée avec succès', '', 'success')
  }
  removePerson(p:Person):void{
    this.listPerson=this.listPerson.filter(item=>this.getIndex(item)!==this.getIndex(p));
    console.log(this.listPerson);
  }


  savePerson() {
    let listPersonDuplicate = this.getListPersonDuplicate(this.listPerson)
    if (listPersonDuplicate.length != 0) {
      console.log(listPersonDuplicate);
      if(this.language.value==='fr'){
        this.showErrorAlert('La person ('.concat(listPersonDuplicate[0].name,') dupliquée'),'Svp supprimer une autre');
      }else if(this.language.value==='en') {
        this.showErrorAlert('Person ('.concat(listPersonDuplicate[0].name,') duplicate'),'Please delete another');
      }else {
        this.showErrorAlert('Langue non prise en charge','Veuillez choisir entre fr et en');
      }
    } else {
      console.log(listPersonDuplicate);
      this.showSuccessAlert();
    }
  }

  //Return list duplicate
  private getListPersonDuplicate = (per: Array<Person>): Array<Person> => {
    let perList: Array<Person> = []
    per.forEach(elt => {
      if (per.filter(item => this.getIndex(item) === this.getIndex(elt)).length > 1) {
        //if(perList.indexOf(elt)!==-1){
        perList.push(elt);
        //}
      }
    });
    return perList;
  }

  // this method return us the index from id, name and email
  private getIndex = (per: Person): string => {
    return String(per.id).concat(per.name, per.email);
  };

  //Cette methode me dit si une fonction contient des doublon ou pas
  private checkDuplicateValue(tab: Array<string>): boolean {
    const s = new Set(tab);
    return s.size === tab.length;
  }

  //Cette methode me dit si un tableau contient des doublon ou pas: Version flèchée (arrow) de la premiere
  private checkDuplicateValue1 = (tab: Array<string>): boolean => new Set(tab).size === tab.length;
  //Cette fonction flèchée permet de retourner un tableau de valeur non identique
  private toNonFindDuplicates = tab => tab.filter((item, index) => tab.indexOf(item) === index)
  //Cette fonction flèchée permet de retourner un tableau de ayant des doublons
  private toFindDuplicates = (tab: Array<String>): Array<String> => tab.filter((item, index) => tab.indexOf(item) !== index)
  /**
   * Problem: We need to verify if listPerson table contain duplicate's person based on id, name and email
   */
    //This method tell us if listPerson table contain duplicate's values or not
  private checkIfListPersonDuplicate = (lp: Array<Person>): boolean => {
    const setp = new Set(lp.map(p => this.getIndex(p)));
    console.log(setp);
    const listp = lp.map(p => this.getIndex(p));
    console.log(listp);
    return setp.size === listp.length;
  }

  //This method tell us if listPerson table contain duplicate's values or not
  private checkIfListIndividuDuplicate = (ind: Array<Individu>): boolean => new Set(ind.map(p => p.name)).size === ind.length
}
