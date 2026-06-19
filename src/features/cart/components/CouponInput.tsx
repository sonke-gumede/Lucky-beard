import styled from "styled-components";
import { Body } from "../../../shared/typography";
import Button from "../../../shared/components/Button";

type Props = {
  code: string;
  message: string;
  onCodeChange: (code: string) => void;
  onApply: () => void;
};

const Wrapper = styled.div`
  margin-top: 24px;
`;

export function CouponInput({ code, message, onCodeChange, onApply }: Props) {
  return (
    <Wrapper>
      <label>
        Coupon
        <input
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="Enter coupon"
        />
      </label>
      <Button onClick={onApply}>Apply</Button>
      <Body>{message}</Body>
    </Wrapper>
  );
}
