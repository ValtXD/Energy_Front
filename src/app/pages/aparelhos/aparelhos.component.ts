import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';



@Component({
  selector: 'app-aparelhos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule],
  templateUrl: './aparelhos.component.html',
  styleUrls: ['./aparelhos.component.css']
})


export class AparelhosComponent implements OnInit {
  aparelhos: any[] = [];
  ambientes: any[] = [];
  estados: any[] = [];
  bandeiras: any[] = [];

  aparelhoForm: FormGroup;
  edicaoForm: FormGroup;

  editando = false;
  idEditando: number | null = null;

  filtroNome = '';
  filtroEstado = '';
  filtroAmbiente = '';

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.aparelhoForm = this.criarForm();
    this.edicaoForm = this.criarForm();
  }

  ngOnInit(): void {
    this.carregarAparelhos()
    this.carregarAmbientes();
    this.carregarEstados();
    this.carregarBandeiras();
    this.buscar();
  }

  criarForm(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      potencia_watts: [null, [Validators.required, Validators.min(1)]],
      tempo_uso_diario_horas: [null, [Validators.required, Validators.min(1)]],
      quantidade: [null, [Validators.required, Validators.min(1)]],
      ambiente: [null, Validators.required],
      estado: [null, Validators.required],
      bandeira: [null, Validators.required],
    });
  }

  carregarAparelhos(): void {
    this.api.getAparelhos({}).subscribe({
      next: (res) => {
        this.aparelhos = res;
      },
      error: () => {
        this.aparelhos = [];
      },
    });
  }

  carregarAmbientes(): void {
    this.api.getAmbientes().subscribe({
      next: (res) => {
        this.ambientes = res;
      },
      error: () => {
        this.ambientes = [];
      },
    });
  }

  carregarEstados(): void {
    this.api.getEstados().subscribe({
      next: (res) => {
        this.estados = res;
      },
      error: () => {
        this.estados = [];
      },
    });
  }

  carregarBandeiras(): void {
    this.api.getBandeiras().subscribe({
      next: (res) => {
        this.bandeiras = res;
      },
      error: () => {
        this.bandeiras = [];
      },
    });
  }

  adicionarAparelho(): void {
    if (this.aparelhoForm.valid) {
      const dados = this.aparelhoForm.value;
      this.api.addAparelho(dados).subscribe({
        next: (res) => {
          this.aparelhos.push(res);
          this.aparelhoForm.reset();
        },
        error: () => {},
      });
    }
  }

  editarAparelho(aparelho: any): void {
    this.editando = true;
    this.idEditando = aparelho.id;
    this.edicaoForm.patchValue({
      nome: aparelho.nome,
      potencia_watts: aparelho.potencia_watts,
      tempo_uso_diario_horas: aparelho.tempo_uso_diario_horas,
      quantidade: aparelho.quantidade,
      ambiente: aparelho.ambiente.id,
      estado: aparelho.estado.id,
      bandeira: aparelho.bandeira.id,
    });
  }

  salvarEdicao(): void {
    if (this.edicaoForm.valid && this.idEditando !== null) {
      const dados = this.edicaoForm.value;
      this.api.updateAparelho(this.idEditando, dados).subscribe({
        next: (res) => {
          const index = this.aparelhos.findIndex((a) => a.id === this.idEditando);
          if (index !== -1) {
            this.aparelhos[index] = res;
          }
          this.cancelarEdicao();
        },
        error: () => {},
      });
    }
  }

  cancelarEdicao(): void {
    this.editando = false;
    this.idEditando = null;
    this.edicaoForm.reset();
  }

  deletarAparelho(id: number): void {
    this.api.deleteAparelho(id).subscribe({
      next: () => {
        this.aparelhos = this.aparelhos.filter((a) => a.id !== id);
      },
      error: () => {},
    });
  }

  buscar(): void {
    const params: any = {
      ...(this.filtroNome && { nome: this.filtroNome }),
      ...(this.filtroEstado && { estado: this.filtroEstado }),
      ...(this.filtroAmbiente && { ambiente: this.filtroAmbiente }),
    };

    this.api.getAparelhos(params).subscribe({
      next: (res) => {
        this.aparelhos = res;
      },
      error: () => {
        this.aparelhos = [];
      }
    });
  }


  limparFiltros(): void {
    this.filtroNome = '';
    this.filtroEstado = '';
    this.filtroAmbiente = '';
    this.buscar();
  }
}
