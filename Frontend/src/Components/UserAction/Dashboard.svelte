<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  const handleDelete = (id) => {
    dispatch("delete", id);
  };
  const handleUpdate = (data) => {
    dispatch("update", data);
  };
  export let userData;
  export let fetchData;
  import { fade, fly, slide, scale } from "svelte/transition";
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
              <button
                on:click={() => {
                  handleDelete(uData.id);
                }}
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                >Delete</button
              >
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
