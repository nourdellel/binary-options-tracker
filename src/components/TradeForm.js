import React, { useState, useEffect } from 'react';
import './TradeForm.css';

const TradeForm = ({ onAddTrade, lastTrade }) => {
  const [amount, setAmount] = useState(lastTrade?.amount || '');
  const [tradeType, setTradeType] = useState(lastTrade?.tradeType || 'Long');
  const [percentageReturn, setPercentageReturn] = useState(lastTrade?.percentageReturn || '');
  const [outcome, setOutcome] = useState('Win');

  useEffect(() => {
    if (lastTrade) {
      setAmount(lastTrade.amount);
      setTradeType(lastTrade.tradeType);
      setPercentageReturn(lastTrade.percentageReturn);
      setOutcome(lastTrade.outcome || 'Win');
    }
  }, [lastTrade]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && percentageReturn) {
      const returnAmount =
        outcome === 'Even'
          ? parseFloat(amount)
          : outcome === 'Win'
          ? parseFloat(amount) * (1 + parseFloat(percentageReturn) / 100)
          : 0;

      const trade = {
        amount: parseFloat(amount),
        tradeType,
        percentageReturn: parseFloat(percentageReturn),
        outcome,
        returnAmount,
      };

      onAddTrade(trade);

      setAmount(trade.amount);
      setTradeType(trade.tradeType);
      setPercentageReturn(trade.percentageReturn);
      setOutcome(trade.outcome);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="trade-form">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select value={tradeType} onChange={(e) => setTradeType(e.target.value)}>
        <option value="Long">Long</option>
        <option value="Short">Short</option>
      </select>
      <input
        type="number"
        placeholder="Percentage Return"
        value={percentageReturn}
        onChange={(e) => setPercentageReturn(e.target.value)}
        required
      />
      <select value={outcome} onChange={(e) => setOutcome(e.target.value)}>
        <option value="Win">Win</option>
        <option value="Lose">Lose</option>
        <option value="Even">Even</option>
      </select>
      <button type="submit">Add Trade</button>
    </form>
  );
};

export default TradeForm;
