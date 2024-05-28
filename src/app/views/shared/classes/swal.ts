import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

export class CustomSwal {
    // Static method to display a success alert
    static success(title: string): Promise<SweetAlertResult> {
        const options: SweetAlertOptions = {
            title,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
        };
        return Swal.fire(options);
    }

    // Static method to display an error alert
    static error(title: string): Promise<SweetAlertResult> {
        const options: SweetAlertOptions = {
            title,
            icon: 'error',
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
        };
        return Swal.fire(options);
    }

    // Static method to display a confirmation alert
    static confirm(title: string): Promise<SweetAlertResult> {
        const options: SweetAlertOptions = {
            title,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#0e8e9c',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        };
        return Swal.fire(options);
    }

    // Static method to display a warning alert
    static warning(title: string): Promise<SweetAlertResult> {
        const options: SweetAlertOptions = {
            title,
            icon: 'warning',
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
        };
        return Swal.fire(options);
    }

    // Static method to display a custom alert with additional options
    static custom(options: SweetAlertOptions): Promise<SweetAlertResult> {
        return Swal.fire(options);
    }
}
