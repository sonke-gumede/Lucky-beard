import { Body } from "../../../shared/typography";

type Props = {
  code: string;
  message: string;
  onCodeChange: (code: string) => void;
  onApply: () => void;
};

export function CouponInput({ code, message, onCodeChange, onApply }: Props) {
  return (
    <div style={{ marginTop: 24 }}>
      <label>
        Coupon
        <input
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="Enter coupon"
        />
      </label>
      <button onClick={onApply}>Apply</button>
      <Body>{message}</Body>
    </div>
  );
}
