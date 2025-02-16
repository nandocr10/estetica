import { Component, OnInit } from '@angular/core';
import { ProdutoService, Produto } from 'src/api/services/produtos.services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {
  produtos: Produto[] = [];
  produto: Produto = {
    id: 0,
    Fornecedor_id: 0,
    DsProdt: '',
    NmAbr: '',
    DtCad: new Date(),
    UnMedida: '',
    TpCateg: '',
    QtdEstoq: 0,
    DtUltComp: new Date(),
    VrUltComp: 0,
    DtPenultComp: new Date(),
    VrPenultComp: 0,
  };
  isEditing: boolean = false;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(): void {
    this.produtoService.getProdutos().subscribe(data => {
      this.produtos = data;
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.isEditing) {
        this.produtoService.update(this.produto).subscribe(() => {
          this.loadProdutos();
          this.resetForm(form);
        });
      } else {
        this.produtoService.create(this.produto).subscribe(() => {
          this.loadProdutos();
          this.resetForm(form);
        });
      }
    }
  }

  deleteProduto(id: number): void {
    this.produtoService.delete(id).subscribe(() => {
      this.loadProdutos();
    });
  }

  editProduto(id: number): void {
    const produtoToEdit = this.produtos.find(p => p.id === id);
    if (produtoToEdit) {
      this.produto = { ...produtoToEdit };
      this.isEditing = true;
    }
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.produto = {
      id: 0,
      Fornecedor_id: 0,
      DsProdt: '',
      NmAbr: '',
      DtCad: new Date(),
      UnMedida: '',
      TpCateg: '',
      QtdEstoq: 0,
      DtUltComp: new Date(),
      VrUltComp: 0,
      DtPenultComp: new Date(),
      VrPenultComp: 0,
    };
    this.isEditing = false;
  }
}
