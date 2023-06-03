import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";

const AdminNav = () => {
  const links = [
    {
      title: "Matches",
      linkTo: "/admin_matches",
    },
    {
      title: "Players",
      linkTo: "/admin_players",
    },
  ];

  const renderItems = () =>
    links.map((link) => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem button className="admin_nav_link">
          {link.title}
        </ListItem>
      </Link>
    ));

  return <>{renderItems()}</>;
};

export default AdminNav;
