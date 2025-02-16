import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService, Cliente } from 'src/api/services/cliente.services';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
})
export class ClienteFormComponent implements OnInit {
  cliente: Cliente = {
    Codcli: 0,
    NmCli: '',
    CpfCli: '',
    FoneCli: '',
    EmailCli: '',
    EndCli: '',
    CepCli: '',
    ComplCli: '',
    redesocial: '',
    DtUltCompra: new Date(),
  };

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.clienteService.getClienteById(id).subscribe((data) => {
        this.cliente = data;
      });
    }
  }

  saveCliente(): void {
    if (this.cliente.Codcli) {
      this.clienteService.update(this.cliente).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    } else {
      this.clienteService.create(this.cliente).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    }
  }
}
