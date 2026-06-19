import styled from "styled-components";
import { Body } from "../../../shared/typography";

type Props = {
  postcode: string;
  message: string;
  onPostcodeChange: (postcode: string) => void;
};

const Wrapper = styled.div`
  margin-top: 24px;
`;

export function DeliveryEstimator({
  postcode,
  message,
  onPostcodeChange,
}: Props) {
  return (
    <Wrapper>
      <label>
        Check delivery
        <input
          value={postcode}
          onChange={(e) => onPostcodeChange(e.target.value)}
          placeholder="Postcode"
        />
      </label>
      <Body>{message}</Body>
    </Wrapper>
  );
}
