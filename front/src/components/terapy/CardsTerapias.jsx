import { useRouter } from 'next/router';
import { Button, Card, ListGroup } from "react-bootstrap";
import styles from "@/styles/Cards.module.css";
import Loading from "../Loading";
import { useContext } from 'react';
import ArianaContext from "@/context/ArianaContext";

function CardsTerapias({ item }) {
  const { setTerapiaDetails } = useContext(ArianaContext);
  const router = useRouter();
  if (!item) {return <div><Loading /></div>;}
  const { _id, title, price, image } = item;


  let formattedPrice = "";
  if (Number.isInteger(price)) {
    formattedPrice = `${price},00`;
  } else {
    formattedPrice = price.toString().replace('.', ',');
  }

  const pageChangeToDetails = (item, _id) => {
    setTerapiaDetails(item);
    router.push(`/terapias/${_id}`);
  };

  return (
    <Card className={`animate__animated animate__flipInY ${styles.Card}`}>
      <Card.Body className={styles.CardBody}>
        <div className={styles.title}>
          <Card.Title>{title}</Card.Title>
        </div>
        <Card.Img
          alt={title}
          className={styles.CardImg}
          variant="top"
          src={image}
        />
        <ListGroup variant="flush">
          <ListGroup.Item className={styles.ListGroupItem} >Preço: R$ {formattedPrice}</ListGroup.Item> {/* Usar formattedPrice aqui */}
        </ListGroup>
        <Button
          className={styles.Button}
          onClick={() => pageChangeToDetails(item, _id)}
          variant="warning"
        >
          Agendar
        </Button>
      </Card.Body>
    </Card>
  );
}


export default CardsTerapias;