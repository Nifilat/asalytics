/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

export default function Home() {
  const [asalists, setAsalists] = useState([]);
  const [requestStatus, setRequestStatus] = useState("loading");
  console.log("asalists", asalists);

  const router = useRouter();

  useEffect(() => {
    async function getList() {
      try {
        const client = new ApolloClient({
          uri: "https://analytics-api.herokuapp.com/analytics",
          cache: new InMemoryCache(),
        });

        const { data } = await client.query({
          query: gql`
            query MyQuery {
              asalist {
                result {
                  assetId
                  logo
                  name
                  available
                }
              }
            }
          `,
        });

        setAsalists(data.asalist.result);
      } catch (error) {
      } finally {
        setRequestStatus("idle");
      }
    }
    getList();
  }, []);

  if (requestStatus === "loading")
    return (
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          rotate: 360,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          opacity: { duration: 0.1, delay: 0.4 },
          ease: "easeOut",
          type: "tween",
        }}
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M35.0003 64.1667C38.222 64.1667 40.8337 61.555 40.8337 58.3333C40.8337 55.1117 38.222 52.5 35.0003 52.5C31.7787 52.5 29.167 55.1117 29.167 58.3333C29.167 61.555 31.7787 64.1667 35.0003 64.1667Z"
          fill="#575757"
        />
        <path
          d="M35.0003 17.5002C38.222 17.5002 40.8337 14.8885 40.8337 11.6668C40.8337 8.44517 38.222 5.8335 35.0003 5.8335C31.7787 5.8335 29.167 8.44517 29.167 11.6668C29.167 14.8885 31.7787 17.5002 35.0003 17.5002Z"
          fill="#575757"
        />
        <path
          d="M18.5003 57.3327C21.722 57.3327 24.3337 54.721 24.3337 51.4993C24.3337 48.2777 21.722 45.666 18.5003 45.666C15.2787 45.666 12.667 48.2777 12.667 51.4993C12.667 54.721 15.2787 57.3327 18.5003 57.3327Z"
          fill="#575757"
        />
        <path
          d="M51.4993 24.3337C54.721 24.3337 57.3327 21.722 57.3327 18.5003C57.3327 15.2787 54.721 12.667 51.4993 12.667C48.2777 12.667 45.666 15.2787 45.666 18.5003C45.666 21.722 48.2777 24.3337 51.4993 24.3337Z"
          fill="#575757"
        />
        <path
          d="M11.6663 40.8361C14.8896 40.8361 17.5026 38.2231 17.5026 34.9998C17.5026 31.7766 14.8896 29.1636 11.6663 29.1636C8.44306 29.1636 5.83008 31.7766 5.83008 34.9998C5.83008 38.2231 8.44306 40.8361 11.6663 40.8361Z"
          fill="#575757"
        />
        <path
          d="M58.3333 40.8332C61.555 40.8332 64.1667 38.2215 64.1667 34.9998C64.1667 31.7782 61.555 29.1665 58.3333 29.1665C55.1117 29.1665 52.5 31.7782 52.5 34.9998C52.5 38.2215 55.1117 40.8332 58.3333 40.8332Z"
          fill="#575757"
        />
        <path
          d="M18.5003 24.3366C21.722 24.3366 24.3337 21.7249 24.3337 18.5033C24.3337 15.2816 21.722 12.6699 18.5003 12.6699C15.2787 12.6699 12.667 15.2816 12.667 18.5033C12.667 21.7249 15.2787 24.3366 18.5003 24.3366Z"
          fill="#575757"
        />
        <path
          d="M51.4993 57.3356C54.721 57.3356 57.3327 54.7239 57.3327 51.5023C57.3327 48.2806 54.721 45.6689 51.4993 45.6689C48.2777 45.6689 45.666 48.2806 45.666 51.5023C45.666 54.7239 48.2777 57.3356 51.4993 57.3356Z"
          fill="#575757"
        />
      </motion.svg>
    );
  // console.log(typeof asalists);
  return (
    <div className={styles.container}>
      <Head>
        <title>ASAlytics</title>
        <meta
          name="description"
          content="ASA - Algorand Standard Asset on the Algorand Protocol"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header} data-testid="header">
        <div>
          <img src="logo.svg" alt="logo image" /> <span>SAlytics</span>
        </div>
        <button className={styles.header_button}>ANALYZE ASAs</button>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>
          List of Algorand Standard Assets on ASAlytics
        </h1>

        <div className={styles.grid} data-testid="grid">
          {asalists.map((asalist) => {
            return (
              <div key={asalist.assetId} href="#" className={styles.card}>
                <img src={asalist.logo} alt="asset logo" />
                <p>{asalist.name}</p>

                <button
                  className={[
                    styles.button,
                    ...(asalist.available ? [styles.active] : [styles.error]),
                  ].join(" ")}
                >
                  {asalist.available ? "Available" : "Unavailable"}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

// export async function getServerSideProps() {
//   const client = new ApolloClient({
//     uri: "https://analytics-api.herokuapp.com/analytics",
//     cache: new InMemoryCache(),
//   });

//   const { data } = await client.query({
//     query: gql`
//       query MyQuery {
//         asalist {
//           result {
//             assetId
//             logo
//             name
//             available
//           }
//         }
//       }
//     `,
//   });

//   return {
//     props: {
//       asalists: data.asalist.result,
//     },
//   };
// }
