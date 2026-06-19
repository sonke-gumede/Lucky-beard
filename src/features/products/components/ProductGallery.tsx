import { Section } from "../../../shared/components/Section";

type Props = {
  images: string[];
  selectedImage: string;
  productName: string;
  onSelectImage: (image: string) => void;
};

export function ProductGallery({
  images,
  selectedImage,
  productName,
  onSelectImage,
}: Props) {
  return (
    <Section style={{ width: "50%" }}>
      <div>
        <img src={selectedImage} alt={productName} width={600} height={600} />
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        {images.map((image) => (
          <button
            key={image}
            onClick={() => onSelectImage(image)}
            style={{
              border:
                image === selectedImage ? "2px solid black" : "1px solid #ccc",
            }}
          >
            <img src={image} alt="" width={80} height={80} />
          </button>
        ))}
      </div>
    </Section>
  );
}
