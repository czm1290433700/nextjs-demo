import { FC } from "react";
import Image from "next/image";
import publicLogo from "@/public/public_logo.png";

interface ILink {
  label: string;
  link?: string;
}

interface ILinkList {
  title: string;
  list: ILink[];
}

interface IQRCode {
  image: string;
  text: string;
}

export interface IFooterProps {
  title: string;
  linkList: ILinkList[];
  qrCode: IQRCode;
  copyRight: string;
  siteNumber: string; // 站点备案号
  publicNumber: string; // 公安备案号
}

export const Footer: FC<IFooterProps> = ({
  title,
  linkList,
  qrCode,
  copyRight,
  siteNumber,
  publicNumber,
}) => {
  return (
    <div>
      <div>
        <h1>{title}</h1>
        <div>
          {linkList?.map((item, index) => {
            return (
              <div key={`linkArea${index}`}>
                <span>{item.title}</span>
                <div>
                  {item.list?.map((_item, _index) => {
                    return (
                      <div
                        onClick={(): void => {
                          window.open(
                            _item.link,
                            "blank",
                            "noopener=yes,noreferrer=yes"
                          );
                        }}
                        key={`link${_index}`}
                      >
                        {_item.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div>
          <Image src={qrCode?.image} alt={qrCode?.text}></Image>
          <div>{qrCode?.text}</div>
        </div>
        <div>
          <span>{copyRight}</span>
          <span>{siteNumber}</span>
          <div>
            <Image src={publicLogo} alt={publicNumber}></Image>
            {publicNumber}
          </div>
        </div>
      </div>
    </div>
  );
};
