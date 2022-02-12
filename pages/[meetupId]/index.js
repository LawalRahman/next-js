import Head from "next/head";
import { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../conponents/meetups/MeetupDetail";

function Detail(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title} Detail</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:x5aZPk5WPjDaJxCH@cluster0.yy3n2.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollections = db.collection("meetups");

  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();
  await client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  // fetch data for single meetup.
  const client = await MongoClient.connect(
    "mongodb+srv://admin:x5aZPk5WPjDaJxCH@cluster0.yy3n2.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollections = db.collection("meetups");

  const selectedMeetup = await meetupCollections.findOne({
    _id: ObjectId(meetupId),
  });

  await client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
    revalidate: 10,
  };
}

export default Detail;
