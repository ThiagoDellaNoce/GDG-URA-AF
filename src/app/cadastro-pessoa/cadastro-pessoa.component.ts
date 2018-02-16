import { FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {

  pessoas: Observable<any[]>;
  // pessoas: Array<any>;

  constructor(private angularFire: AngularFireDatabase) { }

  ngOnInit() {
    this.pessoas = this.angularFire.list('pessoas').valueChanges();
    // this.pessoas = new Array<any>();
   }

  form_submit(f: NgForm) {
    this.angularFire.list('pessoas').push(
      {
        nome: f.form.controls.nome.value,
        sobrenome: f.form.controls.sobrenome.value
      }
    ).then((t: any) => console.log('dados gravados: ' + t.key)), // tslint:disable-next-line:no-unused-expression
    (e: any) => console.log(e.message);

    f.controls.nome.setValue('');
    f.controls.sobrenome.setValue('');
    // this.pessoas.push({
    //   nome: f.form.controls.nome.value,
    //   sobrenome: f.form.controls.sobrenome.value
    // });
    // console.log(this.pessoas);

  }
}
