<script>
  import { users } from "./data-users";
  export let user = {};
  const deleteUser = async () => {
    const deleteURL = `http://localhost:4000/user/` + user.id;
    let res = await fetch(deleteURL, {
      method: "DELETE",
    });
    res = await res.json();
    console.log(res);
    $users = $users.filter((item) => users.id != item.id);
  };
</script>

<div class="users">
  {user.fName}
  {user.lName}
  <button on:click={deleteUser}>Delete</button>
</div>
