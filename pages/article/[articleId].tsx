import type { NextPage } from "next";
import styles from "./styles.module.scss";

interface IProps {
  title: string;
  author: string;
  description: string;
  createTime: string;
  content: string;
}

const Article: NextPage<IProps> = ({
  title,
  author,
  description,
  createTime,
  content,
}) => {
  return (
    <div className={styles.article}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.info}>
        作者：{author} | 创建时间: {createTime}
      </div>
      <div className={styles.description}>{description}</div>
      <div>{content}</div>
    </div>
  );
};

Article.getInitialProps = (context) => {
  const { articleId } = context.query;
  return {
    title: `文章${articleId}`,
    author: "zhenmin",
    description: `a description for 文章${articleId}`,
    createTime: "2022/8/16",
    content: "文章内容",
  };
};

export default Article;
