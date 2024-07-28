import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { GrpAcessService } from 'src/api/services/grpacess.services';

@Component({
  selector: 'grpacessForm-root',
  templateUrl: './grpacessForm.component.html',
  styleUrls: ['./grpacessForm.component.css'],
})
export class GrpacessFormComponent {
  touched = false;
  id: number = null;
  name: string = '';

  constructor(
    private grpacessService: GrpAcessService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    if (id) {
      this.grpacessService.getUnityById(id).subscribe({
        next: (resp) => {
          this.id = resp.codgrp;
          this.name = resp.nomegrp;
        },
        error: (error) => {
          if (error.error.message) {
            this.snackBar.open(`${error.error.message}`, 'Error', {
              duration: 3000,
            });
          } else {
            this.snackBar.open(`Ocorreu um erro inesperado.`, 'Error', {
              duration: 3000,
            });
          }
        },
      });
    }
  }

  onChangeName(e) {
    this.name = e.target.value;
  }

  onSubmit(e) {
    e.preventDefault();
    this.touched = true;
 
    if (this.name != '' && this.id == null) {
      console.log("passou aqui novo");
      
      this.grpacessService.insert({ nomegrp: this.name }).subscribe({
        next: (resp) => {
          //pegarObjetoId() //GPT FAÇA ESTE METODO AQUI PARA PEGAR O ID DO OBJETO QUE ACABOU DE SER CRIADO E LANCE NA VARIAVEL id: number
          //this.id = resp.codgrp;
          console.log({resp} ); //ISSO PRINTA
          //console.log("this.id: "+this.id); //O RESTO É UNDEFINIED
          //console.log("nomegrp: "+resp.nomegrp);
          //console.log("codgrp: "+resp.codgrp);
          console.log(this.converterNumero(resp.codgrp));
          this.snackBar.open(`Salvo com id:${this.id}, `, 'Sucesso', {
            duration: 3000,
          });        
        },
        error: (error) => {
          if (error.error.message) {
            this.snackBar.open(`${error.error.message}`, 'Error', {
              duration: 3000,
            });
          } else {
            this.snackBar.open(`Ocorreu um erro inesperado.`, 'Error', {
              duration: 3000,
            });
          }
        },
      });
    } else if (this.name != '' && Number(this.id) > 0) {
      this.grpacessService.update({ codgrp: Number(this.id), nomegrp: this.name }).subscribe({
        next: (resp) => {
          this.snackBar.open(`Alterado com sucesso. `, 'Sucesso', {
            duration: 3000,
          });
        },
        error: (error) => {
          if (error.error.message) {
            this.snackBar.open(`${error.error.message}`, 'Error', {
              duration: 3000,
            });
          } else {
            this.snackBar.open(`Ocorreu um erro inesperado.`, 'Error', {
              duration: 3000,
            });
          }
        },
      });
    }
  }

  converterNumero(resp) {
     this.id = resp.codgrp;
  }
  reset() {
    this.touched = false;
    this.id = null;
    this.name = '';
  }
}
