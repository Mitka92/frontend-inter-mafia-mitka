import css from "./WaterDailyNorma.module.css";

const WaterDailyNorma = () => {
  // const dailyNorma = useSelector()
  //  const volumeToShow = dailyNorma === 0 ? "1.5 L" : `${dailyNorma} L`;
  return (
    <>
      <div className={css.container}>
        <p className={css.litres}>1.5 L</p>
        {/* {formatVolume(volumeToShow)} */}
        <p className={css.text}>My daily norma</p>
      </div>
    </>
  );
};

export default WaterDailyNorma;
