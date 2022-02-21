import styles from './SingleCard.module.css'
export default function SingleCard(props){
    const handleClick=()=>{
        props.onHandleChoice(props.card)
    }
return(
  <div className={styles.card}>
     <img src={props.card.src} alt="card front" className="front" />
     <img src="./img/cover.png" alt="card back" className="back" onClick={handleClick} />
</div>
)
}