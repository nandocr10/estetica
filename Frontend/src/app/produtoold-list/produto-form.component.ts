import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService, Fornecedor } from 'src/api/services/fornecedor.services'
@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
})
export class FornecedorFormComponent implements OnInit {
  fornecedor: Fornecedor = {
    id: 0,
    CnpjFor: '',
    NmFor: '',
    FoneFor: '',
    EmailFor: '',
    DtCad: new Date(),
  };

  constructor(
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.fornecedorService.getFornecedorById(id).subscribe((data) => {
        this.fornecedor = data;
      });
    }
  }

  saveFornecedor(): void {
    if (this.fornecedor.id) {
      this.fornecedorService.update(this.fornecedor).subscribe(() => {
        this.router.navigate(['/fornecedores']);
      });
    } else {
      this.fornecedorService.create(this.fornecedor).subscribe(() => {
        this.router.navigate(['/fornecedores']);
      });
    }
  }
}
