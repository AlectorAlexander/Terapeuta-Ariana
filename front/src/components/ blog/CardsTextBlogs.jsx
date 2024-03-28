import { useRouter } from 'next/router';
import { Button, Card, ListGroup } from "react-bootstrap";
import styles from "@/styles/blog/CardsText.module.css";
import Loading from "../Loading";
import { useContext } from 'react';
import ArianaContext from "@/context/ArianaContext";

function CardsTextBlogs({ text }) {
  const { setBlogsText } = useContext(ArianaContext);
  const router = useRouter();
  if (!text) {return <div><Loading /></div>;}
  const { _id, title, content, image } = text;

  const pageChangeToDetails = (text, _id) => {
    setBlogsText(text);
    router.push(`/blog/${_id}`);
  };

  return (
    <Card className={`animate__animated animate__flipInY ${styles.Card}`}>
      <Card.Body className={styles.CardBody}>
        <Card.Img
          alt={title}
          className={styles.CardImg}
          variant="top"
          src={image}
        />
        <h3 style={{overflow: "hidden", textAlign: "center" ,  textOverflow: "ellipsis", maxWidth: "260px", maxHeight: "60px"}}>{title}</h3>
        <ListGroup variant="flush">
          <ListGroup.Item className={styles.ListGroupItem} >  
            <div style={{overflow: "hidden", fontSize: '16px',  textOverflow: "ellipsis", maxWidth: "220px", maxHeight: "250px"}} dangerouslySetInnerHTML={{ __html: content }} /> 
          </ListGroup.Item> {/* Usar formattedPrice aqui */}
        </ListGroup>
        <Button
          className={styles.Button}
          onClick={() => pageChangeToDetails(text, _id)}
          variant="warning"
        >
          Continuar Lendo
        </Button>
      </Card.Body>
    </Card>
  );
}


export default CardsTextBlogs;