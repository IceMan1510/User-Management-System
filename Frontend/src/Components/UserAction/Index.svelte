<!-- 
@requires component:UserForm
@requires component:Dashboard
@requires component:SideArea
@requires library:svelte-french-toast
 -->
<script>
  import UserForm from "./UserForm.svelte";
  import Dashboard from "./Table.svelte";
  import SideArea from "../Shared/SideArea/SideArea.svelte";

  import toast, { Toaster } from "svelte-french-toast";
  let block = "dashboard";
  let dataToBeUpdated = "";
  let userData = [];

  /**
   *  Retrieves the data from the backend.
   *  @param {*}.
   *  @returns {Array} Returns array of objects which contain user data.
   */
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

  /**
   *  Post the data towards the backend.
   *  @param {event} - For event broadcasts from the Table component once the add data button is clicked.
   *  @returns {JSON} The response received from the backend.
   */
  const doPost = async (e) => {
    try {
      let dataToBeAdded = e.detail;
      if (
        dataToBeAdded.fName.trim() === "" ||
        dataToBeAdded.mName.trim() === "" ||
        dataToBeAdded.lName.trim() === ""
      ) {
        toast.error(`Name fields cannot be blank`, {
          position: "bottom-center",
        });
      } else {
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
        const status = await res.status;
        console.log(response);
        console.log(status);
        if (status === 200) {
          block = "dashboard";
          toast.success(`${response}`, {
            position: "bottom-center",
          });
        } else {
          toast.error(`${response}`, {
            position: "bottom-center",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *  Delete the specific user object from the Users .
   *  @param {event} - For event broadcasts from the Table component once the delete user button is clicked.
   *  @returns {JSON} The response received from the backend.
   */
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

      toast.success(`User Data Deleted Successfully`, {
        position: "bottom-center",
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *  Send the data of specific user clicked on Table component towards UserForm component and update once it is validated.
   *  @param {event} - For event broadcasts from the Table component once the edit data button is clicked.
   *  @returns {JSON} The response received from the backend.
   */
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
      if (
        updatedData.fName.trim() === "" ||
        updatedData.mName.trim() === "" ||
        updatedData.lName.trim() === ""
      ) {
        toast.error(`Name fields cannot be blank`, {
          position: "bottom-center",
        });
      } else {
        const res = await fetch(
          "http://localhost:4000/user/" + updatedData.id,
          {
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
          }
        );
        const response = await res;
        console.log(response.status);
        console.log(await response.text());
        if (response.status === 200) {
          block = "dashboard";
          toast.success(`Data Updated For ${updatedData.fName}`, {
            position: "bottom-center",
          });
        } else {
          console.log("Reaching here");
          toast.error(`Please Enter Appropriate Data`, {
            position: "bottom-center",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  /**
   *  Handling the side area button click event broadcasts.
   *  @param {event} - For event broadcasts from the sidebar component once the any button is clicked.
   *  @returns {String} Change the blocks accordingly.
   */
  $: buttonStatusOnEvent = (event) => {
    console.log(event.detail.block);
    if (event.detail.block === "addUser") {
      block = "addUser";
    } else if (event.detail.block === "dashboard") {
      block = "dashboard";
    }
  };
</script>

<Toaster />
<div class="ActionArea">
  <SideArea on:message={buttonStatusOnEvent} />

  {#if block === "dashboard"}
    <Dashboard
      {userData}
      {fetchData}
      on:delete={deleteClick}
      on:update={updateDataSend}
    />
  {:else if block === "addUser"}
    <div class="container">
      <UserForm on:post={doPost} />
    </div>
  {:else if block === "updateUser"}
    <div class="container">
      <UserForm {dataToBeUpdated} on:update={updatingTheData} />
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
