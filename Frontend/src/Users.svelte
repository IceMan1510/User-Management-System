<script>
  import { onMount } from "svelte";
  import { users } from "./data-users";
  import User from "./User.svelte";

  onMount(async () => {
    const url = "http://localhost:4000/user/";
    let res = await fetch(url);
    let data = await res.json();
    $users = data;
  });
</script>

<div id="users">
  {#each $users as user}
    <User {user} />
  {/each}
</div>
