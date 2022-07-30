import "../styles/globals.css";
import type { AppProps, AppContext } from "next/app";
import App from "next/app";
import { Layout, ILayoutProps } from "@/components/layout";

const MyApp = (data: AppProps & ILayoutProps) => {
  const { Component, pageProps, navbarData, footerData } = data;

  return (
    <Layout navbarData={navbarData} footerData={footerData}>
      <Component {...pageProps} />
    </Layout>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  const pageProps = await App.getInitialProps(context);

  return {
    ...pageProps,
    navbarData: {},
    footerData: {
      title: "Demo",
      linkList: [
        {
          title: "了解更多",
          list: [
            {
              label: "掘金",
              link: "https://juejin.cn/user/2714061017452557",
            },
            {
              label: "知乎",
              link: "https://www.zhihu.com/people/zmAboutFront",
            },
          ],
        },
        {
          title: "联系我",
          list: [{ label: "微信" }, { label: "QQ" }],
        },
      ],
      qrCode: {
        image: "",
        text: "关注祯民讲前端微信公众号",
      },
      copyRight: "Copyright © 2021 ByteDance. 保留所有权利。",
      siteNumber: "粤ICP备XXXXXXXX号-X",
      publicNumber: "粤公网安备 xxxxxxxxxxxxxx号",
    },
  };
};

export default MyApp;
