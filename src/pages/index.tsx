import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ShortUniqueId from 'short-unique-id';
import styles from '../../styles/Home.module.css';

const uid = new ShortUniqueId();

const Home: NextPage = () => {
  const [slug, setSlug] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [origin, setOrigin] = useState('');
  const [showResult, setShowResult] = useState(false);

  const resultUrl = `${origin}/l/${slug}`;

  const onCreate = async () => {
    if (!url) {
      setError('No destination URL');
      return;
    }

    let currentSlug = slug;

    if (!currentSlug) {
      currentSlug = uid();
      setSlug(currentSlug);
    }

    const data = await fetch('/api/url/create', {
      method: 'POST',
      body: JSON.stringify({ slug, url })
    }).then(r => r.json());

    if (data.error) {
      setError(data.error);
      return;
    }

    setSlug(data.slug);
    setUrl(data.url);
    setShowResult(true);
  };

  const copyResult = async () => {
    await navigator.clipboard.writeText(resultUrl);
    alert('The link was copied to your clipboard');
  };

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (url) {
      setError('');
    }
  }, [url]);

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
            <label htmlFor="slug">{origin}/l/</label>
            <input
              onChange={e => setSlug(e.target.value)}
              value={slug}
              id="slug"
              type="text"
              placeholder="your-slug"
            />
            <button onClick={() => setSlug(uid())}>Random</button>

            <label htmlFor="url">Destination URL:</label>
            <input
              onChange={e => setUrl(e.target.value)}
              value={url}
              id="url"
              type="text"
              placeholder="https://example.com"
            />
            <button onClick={onCreate}>Create</button>
          </section>

          {error && <p className={styles.error}>{error}</p>}

          {showResult && (
            <p className={styles.result}>
              <span>Your link:</span>{' '}
              <code onClick={copyResult} className={styles.code} tabIndex={0} role="button">
                {resultUrl}
              </code>
            </p>
          )}
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
