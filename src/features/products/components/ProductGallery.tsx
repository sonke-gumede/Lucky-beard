import styled from "styled-components";
import { Section } from "../../../shared/components/Section";

type Props = {
  images: string[];
  selectedImage: string;
  productName: string;
  onSelectImage: (image: string) => void;
};

const GallerySection = styled(Section)`
  width: 50%;
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const ThumbnailButton = styled.button<{ $active: boolean }>`
  border: ${({ $active }) => ($active ? "2px solid black" : "1px solid #ccc")};
  background: none;
  padding: 0;
  cursor: pointer;
`;

export function ProductGallery({
  images,
  selectedImage,
  productName,
  onSelectImage,
}: Props) {
  return (
    <GallerySection>
      <div>
        <img src={selectedImage} alt={productName} width={600} height={600} />
      </div>

      <Thumbnails>
        {images.map((image) => (
          <ThumbnailButton
            key={image}
            $active={image === selectedImage}
            onClick={() => onSelectImage(image)}
          >
            <img src={image} alt="" width={80} height={80} />
          </ThumbnailButton>
        ))}
      </Thumbnails>
    </GallerySection>
  );
}
