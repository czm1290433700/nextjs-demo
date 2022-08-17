import type { NextPage } from "next";
import styles from "./index.module.scss";
import cName from "classnames";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@/stores/theme";
// import { Pagination } from "@douyinfe/semi-ui";

interface IProps {
  title: string;
  description: string;
  articles: {
    list: {
      label: string;
      info: string;
      link: string;
    }[];
    total: number;
  };
}

const Home: NextPage<IProps> = ({ title, description, articles }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    mainRef.current?.classList.remove(styles.withAnimation);
    window.requestAnimationFrame(() => {
      mainRef.current?.classList.add(styles.withAnimation);
    });
  }, [theme]);

  return (
    <div className={styles.container}>
      <main
        className={cName([styles.main, styles.withAnimation])}
        ref={mainRef}
      >
        <h1 className={styles.title}>{title}</h1>

        <p className={styles.description}>{description}</p>

        <div className={styles.grid}>
          {articles?.list?.map((item, index) => {
            return (
              <div
                key={index}
                className={styles.card}
                onClick={(): void => {
                  window.open(
                    item.link,
                    "blank",
                    "noopener=yes,noreferrer=yes"
                  );
                }}
              >
                <h2>{item.label} &rarr;</h2>
                <p>{item.info}</p>
              </div>
            );
          })}
          {/* <Pagination total={articles?.total} pageSize={6} /> */}
        </div>
      </main>
    </div>
  );
};

Home.getInitialProps = (context) => {
  return {
    title: "Hello SSR!",
    description: "A Demo for 《SSR 实战：官网开发指南》",
    articles: {
      list: [
        {
          label: "文章1",
          info: "A test for article1",
          link: "http://localhost:3000/article/1",
        },
        {
          label: "文章2",
          info: "A test for article2",
          link: "http://localhost:3000/article/2",
        },
        {
          label: "文章3",
          info: "A test for article3",
          link: "http://localhost:3000/article/3",
        },
        {
          label: "文章4",
          info: "A test for article4",
          link: "http://localhost:3000/article/4",
        },
        {
          label: "文章5",
          info: "A test for article5",
          link: "http://localhost:3000/article/5",
        },
        {
          label: "文章6",
          info: "A test for article6",
          link: "http://localhost:3000/article/6",
        },
      ],
      total: 12,
    },
  };
};

export default Home;
