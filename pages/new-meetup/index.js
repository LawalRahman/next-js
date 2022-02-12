import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
import NewMeetupForm from "../../conponents/meetups/NewMeetupForm";

function NewMeetUpPage() {
  const router = useRouter();
  async function addMeetupHandler(meetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.replace("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add new meetup</title>
        <meta
          name="description"
          content="Add new meetup to connet to the world"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </Fragment>
  );
}

export default NewMeetUpPage;
