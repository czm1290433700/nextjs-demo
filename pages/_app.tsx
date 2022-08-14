import type { AppProps, AppContext } from "next/app";
import App from "next/app";
import { Layout, ILayoutProps } from "@/components/layout";
import Head from "next/head";
import axios from "axios";
import { getIsMobile, LOCALDOMAIN } from "@/utils";
import { ThemeContextProvider } from "@/stores/theme";
import { UserAgentProvider } from "@/stores/userAgent";
import "./global.scss";

const MyApp = (data: AppProps & ILayoutProps & { isMobile: boolean }) => {
  const { Component, pageProps, navbarData, footerData, isMobile } = data;

  return (
    <div>
      <Head>
        <title>{`A Demo for 《深入浅出SSR官网开发指南》(${
          isMobile ? "移动端" : "pc端"
        })`}</title>
        <meta
          name="description"
          content={`A Demo for 《深入浅出SSR官网开发指南》(${
            isMobile ? "移动端" : "pc端"
          })`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeContextProvider>
        <UserAgentProvider>
          <Layout navbarData={navbarData} footerData={footerData}>
            <Component {...pageProps} />
          </Layout>
        </UserAgentProvider>
      </ThemeContextProvider>
    </div>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  const pageProps = await App.getInitialProps(context);
  const { data = {} } = await axios.get(`${LOCALDOMAIN}/api/layout`);

  return {
    ...pageProps,
    ...data,
    isMobile: getIsMobile(context),
  };
};

export default MyApp;
