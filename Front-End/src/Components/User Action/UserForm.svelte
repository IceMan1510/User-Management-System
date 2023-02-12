<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let userDetail = "";
  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

  var validation = (field) => {
    if (field.trim() === "" || containsSpecialChars(field)) {
      return false;
    } else {
      return true;
    }
  };

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
      confirmPassword: "",
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
      confirmPassword: dataToBeUpdated.password,
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
  var validateButton = (userDetail) => {
    if (
      !validation(userDetail.fName) ||
      userDetail.fName.trim() === "" ||
      !validation(userDetail.mName) ||
      userDetail.mName.trim() === "" ||
      userDetail.lName.trim() === "" ||
      !validation(userDetail.lName) ||
      userDetail.email.trim() === "" ||
      userDetail.password !== userDetail.confirmPassword ||
      userDetail.gender.trim() === "" ||
      userDetail.address.trim() === "" ||
      userDetail.contact.trim().length !== 10
    ) {
      return true;
    } else {
      return false;
    }
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
            class={!validation(userDetail.fName)
              ? "form-control is-invalid"
              : "form-control is-valid"}
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
            class={!validation(userDetail.mName)
              ? "form-control is-invalid "
              : "form-control is-valid"}
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
            class={!validation(userDetail.lName)
              ? "form-control is-invalid "
              : "form-control is-valid"}
            required
          />
        </div>
      </div>
      <label for="email" class="fl fontLabel">
        Email ID <span class="required">*</span> :
      </label>
      <div class="emailField">
        <input
          type="email"
          required
          name="email"
          bind:value={userDetail.email}
          placeholder="Email Id"
          class={userDetail.email.trim() === ""
            ? "form-control is-invalid"
            : "form-control is-valid"}
        />
      </div>
      <div class="twoPassword">
        <div class="pwd">
          <label for="password" class="fl fontLabel">
            Password <span class="required">*</span> :</label
          >
          <input
            type="Password"
            required
            name="password"
            bind:value={userDetail.password}
            placeholder="Password"
            class={userDetail.password !== userDetail.confirmPassword ||
            userDetail.password === ""
              ? "form-control is-invalid"
              : "form-control is-valid"}
          />
        </div>
        <div class="cnfpwd">
          <label for="password" class="fl fontLabel">
            Confirm Password <span class="required">*</span> :</label
          >
          <input
            type="Password"
            required
            name="password"
            class={userDetail.password !== userDetail.confirmPassword ||
            userDetail.confirmPassword === ""
              ? "form-control is-invalid"
              : "form-control is-valid"}
            bind:value={userDetail.confirmPassword}
            placeholder="Password"
          />
        </div>
      </div>
      <div class="twoMore">
        <div class="oneTest">
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
        </div>
        <div class="gender">
          <label for="gender" class="fl fontLabel">
            Gender <span class="required">*</span> :
          </label>
          <select name="cars" class="genderBox" bind:value={userDetail.gender}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div class="twoPassword">
        <div class="pwd">
          <label for="password" class="fl fontLabel">
            Address <span class="required">*</span> :</label
          >
          <input
            type="Location"
            required
            name="Location"
            bind:value={userDetail.address}
            placeholder="Location"
            class={userDetail.address.trim() === ""
              ? "form-control is-invalid"
              : "form-control is-valid"}
          />
        </div>
        <div class="cnfpwd">
          <label for="Contact" class="fl fontLabel">
            Contact <span class="required">*</span> :</label
          >
          <input
            type="Contact"
            required
            name="Contact"
            class={userDetail.contact.length === 10
              ? "form-control is-valid"
              : "form-control is-invalid"}
            bind:value={userDetail.contact}
            placeholder="Contact"
          />
        </div>
      </div>

      <button
        class=" btn btn-primary button"
        disabled={validateButton(userDetail)}
        on:click={() => {
          if (dataToBeUpdated === undefined || dataToBeUpdated === "") {
            handlePost();
          } else {
            handleUpdate();
          }
        }}>Submit</button
      >
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
    width: 82%;
  }
  .required {
    color: red;
  }
  .button {
    display: flex;
    margin-left: 36%;
    margin-top: 10px;
  }

  .textBox {
    height: 35px;
    width: 100%;
    border: 1px solid black;
    padding-left: 20px;
  }
  .genderBox {
    height: 35px;
    width: 70%;
    border: 1px solid black;
    padding-left: 20px;
  }
  .gender {
    width: 60%;
  }
  /* .textBoxO {
    height: 35px;
    width: 317px;
    border: 1px solid black;
    padding-left: 20px;
  } */
  .name {
    height: 35px;
    border: 1px solid black;
    padding-left: 20px;
  }
  .radioB {
    display: flex;
    gap: 4px;
  }
  .twoFields {
    display: flex;
    gap: 4px;
    width: 82%;
  }
  .emailField {
    width: 82%;
  }
  .twoPassword {
    display: flex;

    gap: 4px;
    width: 82%;
  }
  .pwd {
    width: 50%;
  }
  .cnfpwd {
    width: 50%;
  }
  .add {
    width: 50%;
  }
  .twoMore {
    display: flex;
    gap: 4px;
  }
  .oneTest {
    width: 41%;
  }
</style>
