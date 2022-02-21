import styles from './SingleCard.module.css'
export default function SingleCard(props){
    const handleClick=()=>{
        props.onHandleChoice(props.card)
    }
return(
  <div className={styles.card}>
      <div className={ `${props.flipped && styles.flipped}`}>
     <img src={props.card.src} alt="card front" className={styles.front} />
     <img src="./img/cover.png" alt="card back" className={styles.back} onClick={handleClick} />
     </div>
</div>
)
}