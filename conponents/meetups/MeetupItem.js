import { useRouter } from "next/router";

import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

function MeetupItem(props) {
  const router = useRouter();

  function shwoDetailsHnadler() {
    router.push(`/${props.id}`);
  }
  // const favoriteCtxt = useContext(FavoritesContext);

  // const itemIsFavorite = favoriteCtxt.itemIsFavorite(props.id);

  // function toggleFavoriteStatusHandler() {
  //   if (itemIsFavorite) {
  //     favoriteCtxt.removeFavorite(props.id);
  //   } else {
  //     favoriteCtxt.addFavorite({
  //       id: props.id,
  //       title: props.title,
  //       description: props.description,
  //       image: props.image,
  //       address: props.address,
  //     });
  //   }
  // }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          {
            /* <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorite ? "Remove from favorites" : "Add to favorites"}
          </button> */
            <button onClick={shwoDetailsHnadler}>Show Details</button>
          }
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
