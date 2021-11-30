import Head from 'next/head';
import { GetStaticProps } from 'next';
import { SubscribeButton } from '../components/SubscribeButton';
import styles from './home.module.scss';
import { stripe } from '../services/stripe';

interface IHomeProps {
  product: {
    priceId: string,
    amount: number,
  }
}

export default function Home({ product }: IHomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about <br/> the <span>React</span> world</h1>
          <p>
            Get access to all the publications <br/>
            <span>for {product.amount} per month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async() => {
const price = await stripe.prices.retrieve('price_1K1MgPAn33PbBaz4cVejgO8V');
// expand to list all info of the product

const product = {
  priceId: price.id,
  amount: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((price.unit_amount / 100)),

}
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24 horas
  }
};
