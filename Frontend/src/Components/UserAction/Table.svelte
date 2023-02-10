<!-- 
@requires package:onMount
@requires package:svelte/transition
@requires package:createEventDispatcher
@requires library:svelte-confirm
 -->
<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { Confirm } from "svelte-confirm";

  export let userData;
  export let fetchData;
  import { fade, fly, slide, scale } from "svelte/transition";
  const dispatch = createEventDispatcher();
  /**
   *  Broadcast the delete event once the user clicks on the delete button in the table.
   *  @param {string}-The id of the user clicked.
   */
  const handleDelete = (id) => {
    dispatch("delete", id);
  };
  /**
   *  Broadcast the update event once the user clicks on the edit button in the table.
   *  @param {Object}-The object data of the user clicked.
   */
  const handleUpdate = (data) => {
    dispatch("update", data);
  };

  onMount(() => {
    fetchData();
  });
</script>

<div class="elementsContainer">
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 "
      >
        <tr>
          <th scope="col" class="px-6 py-3 "> User Name </th>
          <th scope="col" class="px-6 py-3"> Gender </th>
          <th scope="col" class="px-6 py-3"> Birthday </th>
          <th scope="col" class="px-6 py-3"> E-Mail </th>
          <th scope="col" class="px-6 py-3 text-center"> Operations </th>
        </tr>
      </thead>
      <tbody>
        {#each userData as uData}
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            transition:fly={{ x: 200, y: 0 }}
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {uData.fName}
              {uData.mName}
              {uData.lName}
            </th>
            <td class="px-6 py-4"> {uData.gender} </td>
            <td class="px-6 py-4"> {uData.dob} </td>
            <td class="px-6 py-4"> {uData.email} </td>

            <td class="px-6 py-4 text-center">
              <button
                on:click={() => {
                  handleUpdate(uData);
                }}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                >Edit</button
              >

              <!-- <button
                on:click={() => {
                  handleDelete(uData.id);
                }}
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                >Delete</button
              > -->
              <Confirm
                confirmTitle="Delete"
                cancelTitle="Cancel"
                let:confirm={confirmThis}
              >
                <button
                  viewBox="0 0 24 24"
                  on:click={() => confirmThis(handleDelete, uData.id)}
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                >
                  <path
                    fill="hsl(200, 40%, 20%)"
                    d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                  />Delete
                </button>
                <span slot="title"> Delete this user? </span>
              </Confirm>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .elementsContainer {
    position: absolute;
    overflow-y: auto;
    width: 1024px;
    height: 478px;
    margin-top: -479px;
    margin-left: 239px;
  }
</style>
