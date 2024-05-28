 // Import your CustomSwal class

import { CustomSwal } from "../classes/swal";

export function handleNetworkError(err: any) {
  console.log(err);
  if (err.error.error[0]) {
    CustomSwal.error(err.error.error[0]);
    return;
  }
  if (err.error.error === 'Accès refusé') {
    CustomSwal.error('Accès refusé!');
  } else if (err.status === 0) {
    CustomSwal.error('Vérifiez votre connexion internet et réessayez!').then(() => {
      // window.location.reload();
    return;
    });
  } else if (err.status === 401) {
    CustomSwal.error('Opération non autorisée!');
    return;
  } else if (err.status === 403) {
    CustomSwal.error('Accès interdit!');
    return;
  } else if (err.status === 404) {
    CustomSwal.error('Page introuvable!');
    return;
  } else {
    // Handle other types of errors here
    CustomSwal.error('An error occurred while fetching data.');
  }
}
