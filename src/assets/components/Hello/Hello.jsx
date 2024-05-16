import styles from "./Hello.module.scss"

export const Hello = () => (
	<div className={styles.hello}>
		<h2 className={styles.hello__title}>Hello 👋🏻</h2>
		<p className={styles.hello__description}>Ask me for something</p>
		<p className={styles.hello__description}>Just type your question ... </p>
	</div>
)
