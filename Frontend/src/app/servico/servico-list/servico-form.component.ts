import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicoService, Servico } from 'src/api/services/servico.services';

@Component({
  selector: 'app-servico-form',
  templateUrl: './servico-form.component.html',
})
export class ServicoFormComponent implements OnInit {
  servico: Servico = {
    CodServ: 0,
    DsServ: '',
    DtCad: new Date(),
  };

  constructor(
    private servicoService: ServicoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.servicoService.getServicoById(id).subscribe((data) => {
        this.servico = data;
      });
    }
  }

  saveServico(): void {
    if (this.servico.CodServ) {
      this.servicoService.update(this.servico).subscribe(() => {
        this.router.navigate(['/servicos']);
      });
    } else {
      this.servicoService.create(this.servico).subscribe(() => {
        this.router.navigate(['/servicos']);
      });
    }
  }
}
