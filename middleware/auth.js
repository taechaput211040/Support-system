export default function({ store, redirect }) {
  // If the user is not authenticated
   if (!store.state.auth.key) {
     return redirect("/login");
   }
}
