<script>
  import AddUser from "./UserForm.svelte";
  import Dashboard from "../UserAction/Dashboard.svelte";
  import { Confirm } from "svelte-confirm";
  let block = "dashboard";
  let dataToBeUpdated = "";
  let userData = [];

  //Getting the data

  const fetchData = async () => {
    try {
      const url = "http://localhost:4000/user/";
      const res = await fetch(url, {
        method: "GET",
      });
      userData = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  //Posting the data

  const doPost = async (e) => {
    try {
      let dataToBeAdded = e.detail;

      const res = await fetch("http://localhost:4000/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fName: dataToBeAdded.fName,
          mName: dataToBeAdded.mName,
          lName: dataToBeAdded.lName,
          gender: dataToBeAdded.gender,
          dob: dataToBeAdded.dob,
          email: dataToBeAdded.email,
          password: dataToBeAdded.password,
          contact: dataToBeAdded.contact,
          address: dataToBeAdded.address,
        }),
      });
      const response = await res.text();
      console.log(response);
      block = "dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  // Deleting the data

  var deleteClick = async (e) => {
    try {
      const res = await fetch("http://localhost:4000/user/" + e.detail, {
        method: "DELETE",
      });
      const response = await res.text();
      console.log(response);

      var delId = "";
      for (let i = 0; i < userData.length; i++) {
        if (userData[i].id === e.detail) {
          delId = i;
        }
      }
      userData.splice(delId, 1);
      userData = userData;
    } catch (error) {
      console.log(error);
    }
  };

  //Updating the data
  var updateDataSend = async (e) => {
    try {
      console.log(e.detail);
      block = "updateUser";
      dataToBeUpdated = e.detail;
    } catch (error) {
      console.log(error);
    }
  };
  var updatingTheData = async (e) => {
    try {
      let updatedData = e.detail;
      console.log(updatedData);
      const res = await fetch("http://localhost:4000/user/" + updatedData.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fName: updatedData.fName,
          mName: updatedData.mName,
          lName: updatedData.lName,
          gender: updatedData.gender,
          dob: updatedData.dob,
          email: updatedData.email,
          password: updatedData.password,
          contact: updatedData.contact,
          address: updatedData.address,
        }),
      });
      const response = await res.text();
      console.log(response);
      block = "dashboard";
    } catch (error) {
      console.log(error);
    }
  };
</script>

<div class="ActionArea">
  <div class="SideArea">
    <aside class="w-64 " aria-label="Sidebar">
      <div
        class="w-60 py-40 px-3 m-0 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800 "
      >
        <ul class="space-y-2">
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path
                  d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
                /></svg
              >
              <span
                class="ml-3"
                on:click={() => {
                  block = "dashboard";
                }}>Dashboard</span
              >
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                /></svg
              >
              <span
                class="flex-1 ml-3 whitespace-nowrap"
                on:click={() => {
                  block = "addUser";
                }}
              >
                Add User</span
              >
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            />
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            />
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            />
          </li>
        </ul>
      </div>
    </aside>
  </div>

  {#if block === "dashboard"}
    <Dashboard
      {userData}
      {fetchData}
      on:delete={deleteClick}
      on:update={updateDataSend}
    />
  {:else if block === "addUser"}
    <div class="container">
      <AddUser on:post={doPost} />
    </div>
  {:else if block === "updateUser"}
    <div class="container">
      <AddUser {dataToBeUpdated} on:update={updatingTheData} />
    </div>
  {/if}
</div>

<style>
  .container {
    position: absolute;
    width: 970px;
    height: 432px;
    margin-top: -520px;
    margin-left: 239px;
  }
</style>
