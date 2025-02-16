import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfissionalService, Profissional } from 'src/api/services/profissional.services';

@Component({
  selector: 'app-profissional-form',
  templateUrl: './profissional-form.component.html',
})
export class ProfissionalFormComponent implements OnInit {
  profissional: Profissional = {
    CodProf: 0,  // Inicialize com 0 ou deixe como null se preferir
    NmProf: '',
    CpfProf: '',
    DocReg: '',
    FoneProf: '',
    EmailProf: '',
    AtivProfi: '',
    DtCad: new Date() // Pode ser opcional
  };

  constructor(
    private profissionalService: ProfissionalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.profissionalService.getProfissionalById(id).subscribe((data) => {
        this.profissional = data;
      });
    }
  }

  saveProfissional(): void {
    if (this.profissional.CodProf) {
      // Atualiza o profissional existente
      this.profissionalService.update(this.profissional).subscribe(() => {
        this.router.navigate(['/profissionais']);
      });
    } else {
      // Cria um novo profissional
      this.profissionalService.create(this.profissional).subscribe(() => {
        this.router.navigate(['/profissionais']);
      });
    }
  }
}
