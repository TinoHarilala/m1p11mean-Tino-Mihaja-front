import {Injectable} from "@angular/core";
import Swal from "sweetalert2";
import {TranslocoService} from "@ngneat/transloco";

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
      color: 'white',
      // text: message,
      text: message,
      animation: false,
      didRender(toast: HTMLElement){
        toast.addEventListener('click', ()=>{
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
      color: 'white',
      text: message,
      animation: false,
      didRender(toast: HTMLElement){
        toast.addEventListener('click', ()=>{
          Swal.close()
        })
      }
    });
  }

  info(message: string) {
    Swal.fire({
      toast: true, position: 'top', showConfirmButton: false, closeButtonHtml: '<button class="swal2-close" style="color: white;">&times;</button>', showCloseButton: true, timer: 15000, background: '#2563eb',
      color: 'white', title: 'Info!', text: message, icon: 'info', iconColor: 'white',
      showClass: {
        popup: "animate__animated animate__zoomInDown",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOutUp",
      },
      didOpen: (toast) => {
        toast.style.height = '80px';
      },
    });
  }

  warn(message: string) {
    Swal.fire({
      toast: true, position: 'top', showConfirmButton: false, showCloseButton: true, closeButtonHtml: '<button class="swal2-close" style="color: white;">&times;</button>', timer: 15000, background: '#f59e0b',
      color: 'white', title: 'warn!', text: message, icon: 'warning', iconColor: 'white',
      showClass: {
        popup: "animate__animated animate__zoomInDown",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOutUp",
      },
      didOpen: (toast) => {
        toast.style.height = '80px';
      },
    });
  }
}
