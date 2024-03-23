import styles from "@/styles/terapy/TerapiaDetails.module.css";

const TerapiaDetails = ({item}) => {
  const { title, image, description } = item;

  return (
    <div className={styles.TerapiaDetailsContainer}>
      <img className={styles.Image} 
        src={image} 
        alt={title} />
      <h1 className={styles.Title}>{title}</h1>
      <div className={styles.Description} dangerouslySetInnerHTML={{ __html: description }}>
      </div>
    </div>
  );
};

export default TerapiaDetails;