import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UnityService } from 'src/api/services/unity.services';

@Component({
  selector: 'unityForm-root',
  templateUrl: './unityForm.component.html',
  styleUrls: ['./unityForm.component.css'],
})
export class UnityFormComponent {
  touched = false;
  id: Number = null
  name: string = '';

  constructor(
    private unityService: UnityService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    if (id) {
      this.unityService.getUnityById(id).subscribe({
        next: (resp) => {
          this.id = resp.id;
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
      console.log("passou aqui");
      this.unityService.insert({ nomegrp: this.name }).subscribe({
        next: (resp) => {
          this.snackBar.open(`Salvo com id:${resp.id}. `, 'Sucesso', {
            duration: 3000,
          });
          //this.unityService.getUnityById(1)

          // Adicione a lógica para obter o objeto pelo ID e imprimir no console
          this.unityService.getUnityById(1).subscribe({
            next: (unity) => {
              var unityID: Number = 0; // Supondo que a resposta tenha um array results
              unityID = Number(unity.id);
              console.log('Objeto Unity obtido:', unity);
              console.log('Objeto Unity obtido:', unityID);
              this.id = Number(unityID[0]);
            },
            error: (error) => {
              console.error('Erro ao obter o objeto Unity:', error);
            }
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
      this.unityService.update({ id: this.id, nomegrp: this.name }).subscribe({
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

  reset() {
    this.touched = false;
    this.id = null;
    this.name = '';
  }
}
