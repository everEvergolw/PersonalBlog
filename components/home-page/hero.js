import Image from 'next/image';

import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/Jiahao.png'
          alt='An image showing Jiahao'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Jiahao</h1>
      <p>
        I blog about full stack development - especially frontend frameworks like
        React. 
      </p>
    </section>
  );
}

export default Hero;