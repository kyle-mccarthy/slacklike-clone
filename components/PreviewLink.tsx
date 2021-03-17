import { useOpenGraphData } from '@app/utils/queries/opengraph';
import { FC, useMemo } from 'react';
import { re } from '@app/utils/url';

interface Props {
  url: string;
}

const PreviewLink: FC<Props> = ({ url }) => {
  const { data } = useOpenGraphData(url);

  const title = data?.ogTitle;
  const description = data?.ogDescription;
  const image = data?.ogImage?.url;
  const twitterImage = data?.twitterImage?.url;

  const src = useMemo(() => {
    if (typeof image === 'string' && image.length > 0 && re.test(image)) {
      return image;
    } else if (
      typeof twitterImage === 'string' &&
      image.length > 0 &&
      re.test(twitterImage)
    ) {
      return twitterImage;
    }
    return null;
  }, [image, twitterImage]);

  return (
    <div className="border-l-5 border-gray-300 border-opacity-25 pl-3 mt-1">
      <div className="flex">
        <div className="flex-grow">
          <div className="pt-2">
            <div>{title}</div>
            <div className="text-sm">{description}</div>
          </div>
        </div>
        {src && (
          <div className="w-1/5 ml-2">
            <img src={src} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewLink;
