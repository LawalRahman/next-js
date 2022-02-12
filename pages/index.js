import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../conponents/meetups/MeetupList";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Meetup app with nextjs" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context){
//   // use if you need access to request or response
//   // if you need to
//   const req = context.req
//   const res = context.res
//   // fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_DATA
//     }
//   }
// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://admin:x5aZPk5WPjDaJxCH@cluster0.yy3n2.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollections = db.collection("meetups");

  const meetups = await meetupCollections.find().toArray();

  await client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
