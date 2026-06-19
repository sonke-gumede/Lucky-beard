import { Body } from "../../../shared/typography";
type Props = {
  postcode: string;
  message: string;
  onPostcodeChange: (postcode: string) => void;
};

export function DeliveryEstimator({
  postcode,
  message,
  onPostcodeChange,
}: Props) {
  return (
    <div style={{ marginTop: 24 }}>
      <label>
        Check delivery
        <input
          value={postcode}
          onChange={(e) => onPostcodeChange(e.target.value)}
          placeholder="Postcode"
        />
      </label>
      <Body>{message}</Body>
    </div>
  );
}
