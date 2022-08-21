import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Link Shortener</title>
        <meta name="description" content="An app to shorten links" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Link <span>Shortener</span>
          </h1>
        </header>

        <main className={styles.main}>
          <section className={styles.form}>
            <label htmlFor="slug">https://my-site.vercel.app/</label>
            <input id="slug" type="text" placeholder="your-slug" />
            <button>Random</button>
            <label htmlFor="url">Destination URL:</label>
            <input id="url" type="text" placeholder="https://example.com" />

            <button>Create</button>
          </section>

          <p className={styles.result}>
            <span>Your link:</span>{' '}
            <code className={styles.code} tabIndex={0} role="button">
              https://my-site.vercel.app/your-slug
            </code>
          </p>
        </main>
      </div>

      <footer className={styles.footer}>
        Created by&nbsp;
        <a href="https://github.com/evgeniyPP" target="_blank" rel="noopener noreferrer">
          Eugene Petryankin
        </a>
      </footer>
    </>
  );
};

export default Home;
