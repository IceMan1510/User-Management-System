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

<main>
  <h1>Registration Form</h1>
  <div class="container">
    <div class="formContainer">
      <div class="threeNames">
        <div class="one">
          <label for="firstName" class="fl fontLabel">
            First Name <span class="required">*</span> :
          </label>
          <!-- svelte-ignore a11y-autofocus -->
          <input
            type="text"
            name="firstName"
            class="name"
            bind:value={userDetail.fName}
            placeholder="First Name"
            autofocus="on"
            required
          />
        </div>
        <div class="two">
          <label for="middleName" class="fl fontLabel">
            Middle Name : <span class="required">*</span></label
          >
          <input
            type="text"
            name="LastName"
            bind:value={userDetail.mName}
            placeholder="Middle Name"
            class="name"
            required
          />
        </div>
        <div class="three">
          <label for="lastName" class="fl fontLabel">
            Last Name <span class="required">*</span> :
          </label>
          <input
            type="text"
            name="firstName"
            bind:value={userDetail.lName}
            placeholder="Last Name"
            class="name"
            required
          />
        </div>
      </div>
      <label for="email" class="fl fontLabel">
        Email ID <span class="required">*</span> :
      </label>
      <input
        type="email"
        required
        name="email"
        bind:value={userDetail.email}
        placeholder="Email Id"
        class="textBox"
      />
      <label for="password" class="fl fontLabel">
        Password <span class="required">*</span> :</label
      >
      <input
        type="Password"
        required
        name="password"
        bind:value={userDetail.password}
        placeholder="Password"
        class="textBox"
      />
      <label for="dateOfBirth" class="fl fontLabel">
        Date Of Birth <span class="required">*</span>:
      </label>
      <input
        type="date"
        name="dateOfBirth"
        class="textBox"
        bind:value={userDetail.dob}
        placeholder="dd-mm-yyyy"
        onfocus="(this.type='date')"
        min="1990-01-01"
        max="2005-12-31"
        required
      />
      <div class="twoFields">
        <div>
          <label for="address" class="fl fontLabel">
            Address <span class="required">*</span> :
          </label>
          <input
            type="text"
            name="address"
            bind:value={userDetail.address}
            placeholder="Address"
            class="textBoxO"
            required
          />
        </div>
        <div>
          <label for="contact" class="fl fontLabel">
            Contact <span class="required">*</span> :
          </label>
          <input
            type="text"
            name="Contact"
            bind:value={userDetail.contact}
            placeholder="Mobile Number"
            class="textBoxO"
            required
          />
        </div>
      </div>
      <div class="radioB">
        <label for="gender" class="fl fontLabel">
          Gender <span class="required">*</span> :
        </label>
        <div>
          <input
            type="radio"
            name="Gender"
            value="Male"
            bind:group={userDetail.gender}
            required
          />
          Male &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        </div>
        <div>
          <input
            type="radio"
            name="Gender"
            value="Female"
            bind:group={userDetail.gender}
            required
          />
          Female &nbsp; &nbsp; &nbsp; &nbsp;
        </div>
        <div>
          <input
            type="radio"
            name="Gender"
            value="Other"
            bind:group={userDetail.gender}
            required
          />
          Other
        </div>
      </div>
      <div class="button">
        <input
          type="Submit"
          name="Submit"
          class="btn btn-primary"
          value="SUBMIT"
          on:click={() => {
            if (dataToBeUpdated === undefined || dataToBeUpdated === "") {
              handlePost();
            } else {
              handleUpdate();
            }
          }}
        />
      </div>
    </div>
  </div>
</main>

<style>
  h1 {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    color: rgb(32, 99, 155);
    margin-top: 20px;
    margin-bottom: -30px;
  }
  .fontLabel {
    font-size: 15px;
    color: rgb(32, 99, 155);
    font-weight: bold;
  }
  .container {
    margin-top: 50px;
  }
  .formContainer {
    width: 70%;
    margin-left: 250px;
  }
  .threeNames {
    display: flex;
    gap: 4px;
  }
  .required {
    color: red;
  }
  .button {
    display: flex;
    margin-left: 34%;
    margin-top: 10px;
  }

  .textBox {
    height: 35px;
    width: 635px;
    border: 1px solid black;
    padding-left: 20px;
  }
  .textBoxO {
    height: 35px;
    width: 317px;
    border: 1px solid black;
    padding-left: 20px;
  }
  .name {
    height: 35px;
    border: 1px solid black;
    padding-left: 20px;
  }
  .radioB {
    display: flex;
    gap: 8px;
  }
  .twoFields {
    display: flex;
    gap: 4px;
  }
</style>
