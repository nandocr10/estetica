import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  selectedImage: string | ArrayBuffer | null = null;

  @Output() imageSelected = new EventEmitter<string>();

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.imageSelected.emit(this.selectedImage as string);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
