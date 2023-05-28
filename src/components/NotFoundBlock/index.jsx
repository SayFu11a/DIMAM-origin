import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className="content">
      <div className="container">
        <div className={styles.root}>
          <h1>
            <span>😕</span>
            <br />
            Ничего не найдено
          </h1>
          <p>К сожалению данная старница отсутсвует в нашем интернет-магазине</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundBlock;
