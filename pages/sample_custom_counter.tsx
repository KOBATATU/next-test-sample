import { useState } from "react";
import { useSelector } from "react-redux";
import { counterActions } from "../features/customCounter/customCounterSlice";
import { useAppDispatch, useAppSelector } from "../features/store";

//http://localhost:3000/sample_custom_counter
const SampleCustomCounter = () => {
  const [number, setNumber] = useState<number>(0);
  const dispatch = useAppDispatch();
  const customSelector = useAppSelector((state) => state.customCounter);

  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.valueAsNumber);
  };
  return (
    <div>
      <h3>Redux Integration Test</h3>
      <div>
        <button onClick={() => dispatch(counterActions.increment())}>+</button>
        <span data-testid="count-value">{customSelector.value}</span>
        <button onClick={() => dispatch(counterActions.decrement())}>-</button>
        <button
          onClick={() => dispatch(counterActions.incrementByAmount(number | 0))}
        >
          IncrementByAmount
        </button>
        <input
          type="number"
          placeholder="Enter"
          value={number}
          onChange={onChangeNumber}
        />
      </div>
    </div>
  );
};

export default SampleCustomCounter;
