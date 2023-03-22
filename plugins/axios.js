export default function({ $axios, redirect, app }) {
  $axios.onError(error => {
    if (error.response.status === 401) {
      // redirect("/login");
    }
  });
  $axios.onError(error => {
    if (error.response.status) {
      app.$swal({
        icon: "error",
        title: `${error.response.data.message}`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
}
