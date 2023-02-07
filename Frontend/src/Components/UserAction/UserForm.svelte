<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let userDetail = "";
  export let dataToBeUpdated;
  console.log(dataToBeUpdated);
  if (dataToBeUpdated === undefined) {
    userDetail = {
      fName: "",
      mName: "",
      lName: "",
      gender: "",
      dob: "",
      email: "",
      password: "",
      contact: "",
      address: "",
    };
  } else {
    userDetail = {
      id: dataToBeUpdated.id,
      fName: dataToBeUpdated.fName,
      mName: dataToBeUpdated.mName,
      lName: dataToBeUpdated.lName,
      gender: dataToBeUpdated.gender,
      dob: dataToBeUpdated.dob,
      email: dataToBeUpdated.email,
      password: dataToBeUpdated.password,
      contact: dataToBeUpdated.contact,
      address: dataToBeUpdated.address,
    };
  }
  const handlePost = () => {
    dispatch("post", userDetail);
  };
  const handleUpdate = () => {
    dispatch("update", userDetail);
  };
</script>

<div class="userForm">
  <div class="threeName">
    <div class="relative z-0 w-full mb-6 group">
      <input
        type="text"
        name="floating_first_name"
        id="floating_first_name"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        bind:value={userDetail.fName}
        required
      />
      <label
        for="floating_first_name"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >First name</label
      >
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input
        type="text"
        name="floating_middle_name"
        id="floating_middle_name"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        bind:value={userDetail.mName}
        required
      />
      <label
        for="floating_middle_name"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Middle name</label
      >
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input
        type="text"
        name="floating_last_name"
        id="floating_last_name"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        bind:value={userDetail.lName}
        required
      />
      <label
        for="floating_last_name"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Last name</label
      >
    </div>
  </div>

  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-6 group">
      <select
        id="countries"
        bind:value={userDetail.gender}
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      >
        <option selected>Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <label
        for="floating_last_name"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Gender</label
      >
    </div>

    <div class="relative max-w-sm">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      />
      <input
        bind:value={userDetail.dob}
        datepicker
        type="text"
        onfocus="(this.type='date')"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
        placeholder="Date Of Birth"
      />
    </div>
  </div>
  <div class="relative z-0 w-full mb-6 group">
    <input
      bind:value={userDetail.email}
      type="email"
      name="floating_email"
      id="floating_email"
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      required
    />
    <label
      for="floating_email"
      class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >Email address</label
    >
  </div>
  <div class="relative z-0 w-full mb-6 group">
    <input
      type="password"
      name="floating_password"
      id="floating_password"
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      bind:value={userDetail.password}
      required
    />
    <label
      for="floating_password"
      class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >Password</label
    >
  </div>
  <div class="relative z-0 w-full mb-6 group">
    <input
      type="location"
      name="location"
      id="location"
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      bind:value={userDetail.address}
      required
    />
    <label
      for="floating_location"
      class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >Location</label
    >
  </div>

  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-6 group">
      <input
        type="tel"
        name="floating_phone"
        id="floating_phone"
        bind:value={userDetail.contact}
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        for="floating_phone"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Phone number
      </label>
    </div>
    <div class="buttonAdj">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        on:click={() => {
          if (dataToBeUpdated === undefined) {
            handlePost();
          } else {
            handleUpdate();
          }
        }}
      >
        Submit
      </button>
    </div>
  </div>
</div>

<style>
  .userForm {
    margin-top: 54px;
    margin-left: 4px;
  }
  .threeName {
    display: flex;
    gap: 12px;
  }
</style>
