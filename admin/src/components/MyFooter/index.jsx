import styles from './myfooter.module.scss'

const MyFooter = (props) => {
  return (
    <div className={styles['footer-wrap']}>
      <div className={styles['link']}>
        <a
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43068102001051"
          target="_blank" rel="noreferrer"
          ><img
            src="/images/beian.png"
            width="20"
            height="20"
            alt="beian"
          />湘公网安备 43068102001051号</a
        >
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer"
          >湘ICP备2021001552号-1</a
        >
      </div>
      <div>© 2021 Randy All Rights Reserved.</div>
    </div>
  )
}

export default MyFooter
