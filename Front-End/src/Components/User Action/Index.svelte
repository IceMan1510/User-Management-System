<script>
  import Table from "./Table.svelte";

  import toast, { Toaster } from "svelte-french-toast";
  import UserForm from "../User Action/UserForm.svelte";
  import Header from "../Shared/Header/Header.svelte";
  let userData = [];
  let dataToBeUpdated = "";

  let block = "dashboard";
  $: buttonStatusOnEvent = (event) => {
    if (event.detail.block === "userForm") {
      block = "userForm";
      console.log(block);
    } else if (event.detail.block === "dashboard") {
      block = "dashboard";
      console.log(block);
    }
  };

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
          console.log(toast);
          toast.success(`Data Updated For ${updatedData.fName}`, {
            position: "bottom-center",
          });
        } else {
          toast.error(`Please Enter Appropriate Data`, {
            position: "bottom-center",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const doPost = async (e) => {
    // console.log(e.detail);
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
        console.log(dataToBeAdded.fName);
        console.log(dataToBeAdded.mName);
        console.log(dataToBeAdded.lName);
        console.log(dataToBeAdded.gender);
        console.log(dataToBeAdded.dob);
        console.log(dataToBeAdded.email);
        console.log(dataToBeAdded.password);
        console.log(dataToBeAdded.contact);
        console.log(dataToBeAdded.address);

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
</script>

<Toaster />
<Header on:message={buttonStatusOnEvent} />
{#if block === "dashboard"}
  <Table
    {userData}
    {fetchData}
    on:delete={deleteClick}
    on:update={updateDataSend}
  />
{:else if block === "userForm"}
  <UserForm on:post={doPost} />
{:else if block === "updateUser"}
  <UserForm {dataToBeUpdated} on:update={updatingTheData} />{/if}
