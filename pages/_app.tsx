import type { AppProps, AppContext } from "next/app";
import App from "next/app";
import { Layout, ILayoutProps } from "@/components/layout";
import Head from "next/head";
import axios from "axios";
import { getIsMobile, getIsSupportWebp, LOCALDOMAIN } from "@/utils";
import { ThemeContextProvider } from "@/stores/theme";
import { UserAgentProvider } from "@/stores/userAgent";
import { LanguageContextProvider } from "@/stores/language";
import "./global.scss";

export interface IComponentProps {
  isMobile?: boolean;
  isSupportWebp?: boolean;
}

const MyApp = (
  data: AppProps & ILayoutProps & { isMobile: boolean; isSupportWebp: boolean }
) => {
  const {
    Component,
    pageProps,
    navbarData,
    footerData,
    isMobile,
    isSupportWebp,
  } = data;

  return (
    <div>
      <Head>
        <title>{`A Demo for 《SSR 实战：官网开发指南》(${
          isMobile ? "移动端" : "pc端"
        })`}</title>
        <meta
          name="description"
          content={`A Demo for 《SSR 实战：官网开发指南》(${
            isMobile ? "移动端" : "pc端"
          })`}
        />
        <meta name="viewport" content="user-scalable=no" />
        <meta name="viewport" content="initial-scale=1,maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LanguageContextProvider>
        <ThemeContextProvider>
          <UserAgentProvider>
            <Layout navbarData={navbarData} footerData={footerData}>
              <Component
                {...pageProps}
                isMobile={isMobile}
                isSupportWebp={isSupportWebp}
              />
            </Layout>
          </UserAgentProvider>
        </ThemeContextProvider>
      </LanguageContextProvider>
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
    isSupportWebp: getIsSupportWebp(context),
  };
};

export default MyApp;
