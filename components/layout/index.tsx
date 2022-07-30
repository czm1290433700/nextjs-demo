import { FC } from "react";
import { IFooterProps, Footer } from "../footer/index";
import { INavBarProps, NavBar } from "../navbar/index";

export interface ILayoutProps {
  navbarData: INavBarProps;
  footerData: IFooterProps;
}

export const Layout: FC<ILayoutProps & { children: JSX.Element }> = ({
  navbarData,
  footerData,
  children,
}) => {
  return (
    <div>
      <NavBar {...navbarData} />
      <main>{children}</main>
      <Footer {...footerData} />
    </div>
  );
};

// Layout.getInitialProps = (context): IProps => {
//   return {
//     navbarData: {},
//     footerData: {
//       title: "Demo",
//       linkList: [
//         {
//           title: "了解更多",
//           list: [
//             { label: "掘金", link: "https://juejin.cn/user/2714061017452557" },
//             {
//               label: "知乎",
//               link: "https://www.zhihu.com/people/zmAboutFront",
//             },
//           ],
//         },
//         {
//           title: "联系我",
//           list: [{ label: "微信" }, { label: "QQ" }],
//         },
//       ],
//       qrCode: {
//         image: "",
//         text: "关注祯民讲前端微信公众号",
//       },
//       copyRight: "Copyright © 2021 ByteDance. 保留所有权利。",
//       siteNumber: "粤ICP备XXXXXXXX号-X",
//       publicNumber: "粤公网安备 xxxxxxxxxxxxxx号",
//     },
//     children,
//   };
// };
