import React, { useState } from 'react';
import TradeForm from './components/TradeForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  const [trades, setTrades] = useState([]);

  const handleAddTrade = (trade) => {
    setTrades([...trades, trade]);
  };

  const totalEarnings = trades.reduce((total, trade) => {
    return trade.outcome === 'Win' ? total + trade.returnAmount - trade.amount : total;
  }, 0);

  const totalLosses = trades.reduce((total, trade) => {
    return trade.outcome === 'Lose' ? total + trade.amount : total;
  }, 0);

  const netTotal = totalEarnings - totalLosses;

  const totalWins = trades.filter(trade => trade.outcome === 'Win').length;
  const winPercentage = trades.length
    ? (totalWins / (trades.length - trades.filter(trade => trade.outcome === 'Even').length)) * 100
    : 0;

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  const getOutcomeStyle = (outcome) => {
    switch (outcome) {
      case 'Win':
        return { color: 'green' };
      case 'Lose':
        return { color: 'red' };
      case 'Even':
        return { color: 'black' };
      default:
        return {};
    }
  };

  const getSummaryStyle = (value, isLoss = false) => {
    return isLoss ? { color: 'red' } : value > 0 ? { color: 'green' } : { color: 'red' };
  };

  return (
    <div className="container">
      <h1>Binary Options Tracker</h1>
      <TradeForm onAddTrade={handleAddTrade} lastTrade={trades[trades.length - 1]} />

      <h2>Trade Summary</h2>
      <p>Total Trades: {trades.length}</p>
      <p style={getSummaryStyle(totalEarnings)}>Total Earnings: {formatCurrency(totalEarnings)}</p>
      <p style={{ color: 'red' }}>Total Losses: {formatCurrency(totalLosses)}</p> {/* Always red */}
      <p style={getSummaryStyle(winPercentage)}>
        Win Percentage: {winPercentage.toFixed(2)}%
      </p>
      <p style={getSummaryStyle(netTotal)}>Net Total: {formatCurrency(netTotal)}</p>

      <h2>Trade History</h2>
      <table>
        <thead>
          <tr>
            <th>Amount Invested</th>
            <th>Trade Type</th>
            <th>Percentage of Return</th>
            <th>Outcome</th>
            <th>Return Amount</th>
            <th>Win Amount</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <tr key={index} 
            style={{
              background: trade.outcome === 'Win'
              ? '#d4edda'
              : trade.outcome === 'Lose'
              ? '#f8d7da'
              : '#fff3cd',
            }}>
              <td>${trade.amount.toFixed(2)}</td>
              <td>
                {trade.tradeType === 'Long' ? (
                  <FontAwesomeIcon icon={faArrowUp} style={{ color: 'green' }} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDown} style={{ color: 'red' }} />
                )}
              </td>
              <td>{trade.outcome === 'Even' ? 'N/A' : `${trade.percentageReturn}%`}</td>
              <td style={getOutcomeStyle(trade.outcome)}>{trade.outcome}</td>
              <td>${trade.returnAmount.toFixed(2)}</td>
              <td
                style={{
                  color: trade.outcome === 'Win' ? 'green' : 'black',
                  fontWeight: trade.outcome === 'Win' ? 'bold' : 'normal',
                }}
              >
                {trade.outcome === 'Win' ? formatCurrency(trade.returnAmount - trade.amount) : formatCurrency(0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
