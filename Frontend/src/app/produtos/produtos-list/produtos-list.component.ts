import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/api/services/produtos.services';
import { FornecedorService } from 'src/api/services/fornecedor.services';
import { NgForm } from '@angular/forms';

export interface Produto {
  id: number;
  Fornecedor_id: number;
  DsProdt: string;
  NmAbr: string;
  DtCad: Date;
  UnMedida: string;
  TpCateg: string;
  QtdEstoq: number;
  DtUltComp: Date;
  VrUltComp: number;
  DtPenultComp: Date;
  VrPenultComp: number;
  Dtvenc: Date;
}

export interface Fornecedor {
  id: number;
  NmFor: string;
}

@Component({
  selector: 'app-produto-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.css']
})
export class ProdutoListComponent implements OnInit {
  produtos: Produto[] = [];
  fornecedores: Fornecedor[] = []; 
  produto: Produto = this.novoProduto();
  isEditing: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService
  ) {}

  ngOnInit(): void {
    this.loadProdutos();
    this.loadFornecedores();
  }

  loadProdutos(): void {
    this.produtoService.getProdutos().subscribe(data => {
      this.produtos = data;
    });
  }

  loadFornecedores(): void {
    this.fornecedorService.getFornecedores().subscribe(data => {
      this.fornecedores = data;
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
    this.produtoService.getProdutoById(id).subscribe(produto => {
      this.produto = { ...produto };
      this.isEditing = true;
    });
  }
  

  resetForm(form: NgForm): void {
    form.resetForm();
    this.produto = this.novoProduto();
    this.isEditing = false;
  }

  getFornecedorNome(fornecedorId: number): string {
    const fornecedor = this.fornecedores.find(f => f.id === fornecedorId);
    return fornecedor ? fornecedor.NmFor : 'Desconhecido';
  }

  private novoProduto(): Produto {
    return {
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
      Dtvenc: new Date()
    };
  }
}
