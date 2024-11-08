import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

function App() {
  const [balance, setBalance] = useState(10000);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [history, setHistory] = useState([]);

  const predefinedAmounts = [100, 500, 1000, 5000];

  const handleWithdraw = (amount) => {
    // ตรวจสอบเงื่อนไขการถอนเงิน
    if (balance - amount < 1) {
      alert('ไม่สามารถถอนเงินจนหมดบัญชีได้ จะต้องมีเงินเหลืออย่างน้อย 1 บาท');
      return;
    }
    if (balance < amount) {
      alert('ไม่สามารถถอนเงินเกินจำนวนที่มีอยู่ในบัญชีได้');
      return;
    }

    // ดำเนินการถอนเงินและเก็บประวัติการถอน
    setBalance(balance - amount);
    setHistory([...history, { amount, remainingBalance: balance - amount }]);
  };

  const handleCustomWithdraw = () => {
    const amount = parseInt(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('กรุณาป้อนจำนวนเงินที่ต้องการถอนให้ถูกต้อง');
      return;
    }
    handleWithdraw(amount);
    setWithdrawAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        
        {/* ระบบถอนเงิน */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">ระบบถอนเงิน</h2>
          <p className="text-xl mb-4">ยอดเงินคงเหลือ: <span className="font-semibold">{balance.toLocaleString()} บาท</span></p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {predefinedAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleWithdraw(amount)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                ถอน {amount} บาท
              </button>
            ))}
          </div>

          <label className="block text-gray-700 mb-2">จำนวนเงินที่ต้องการถอน:</label>
          <input
            type="number"
            className="border rounded p-2 w-full mb-4"
            placeholder="กรอกจำนวนเงินที่ต้องการถอน"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
          <button
            onClick={handleCustomWithdraw}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            ถอนเงิน
          </button>
        </div>

        {/* ประวัติการถอนเงิน */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">ประวัติการถอนเงิน</h2>
          <ul>
            {history.map((entry, index) => (
              <li key={index} className="flex justify-between mb-2">
                <span>ถอน {entry.amount.toLocaleString()} บาท</span>
                <span className="text-gray-700">คงเหลือ: {entry.remainingBalance.toLocaleString()} บาท</span>
              </li>
            ))}
            {history.length === 0 && <li>ยังไม่มีประวัติการถอนเงิน</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
