import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { TranslocoService } from "@ngneat/transloco";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  success(message: string) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 6000,
      background: '#16a34a',
      width: 'auto',
      color: 'white',
      // text: message,
      text: message,
      animation: false,
      didRender(toast: HTMLElement) {
        toast.addEventListener('click', () => {
          Swal.close()
        })
      }
    });
  }

  error(message: string) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 6000,
      background: '#cb5452',
      width: 'auto',
      color: 'white',
      text: message,
      animation: false,
      didRender(toast: HTMLElement) {
        toast.addEventListener('click', () => {
          Swal.close()
        })
      }
    });
  }
}
