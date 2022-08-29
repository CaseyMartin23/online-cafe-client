import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

type TabContentItemProps = {
  text: string;
  href: string;
  bgImage: StaticImageData;
  bgImageAlt: string;
};

const TabContentItem: React.FC<TabContentItemProps> = ({
  text,
  href,
  bgImage,
  bgImageAlt,
}) => {
  return (
    <Link href={href}>
      <a>
        <div className="my-5 rounded-lg bg-slate-600 h-24 relative">
          <Image
            src={bgImage}
            alt={bgImageAlt}
            height={950}
            objectFit="cover"
            className="tab-content-item-bg m-0 p-0 rounded"
          />
          <div className="text-white font-bold absolute top-0 bottom-0 left-0 right-0 flex items-center pl-5">
            {text}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default TabContentItem;
