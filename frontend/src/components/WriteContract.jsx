import { useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { writeContract } from '@wagmi/core';
import { parseEther } from 'viem';

import { abi } from '../abi/FundMe.js';
import { config } from '../context/Web3Provider';

const contractAddress = '0xd7Ca4e99F7C171B9ea2De80d3363c47009afaC5F';

export default function WriteContract() {
    const [depositeAmount, setDepositeAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [message, setMessage] = useState('');
    const account = useAccount();

    // Read contract
    const { data: counter } = useReadContract({
        abi,
        address: contractAddress,
        functionName: 'getCounter',
    });

    const { data: balance } = useReadContract({
        abi,
        address: contractAddress,
        functionName: 'getBalance',
    });

    // Handle deposit
    const handleDeposit = async () => {
        try {
            const tx = await writeContract(config, {
                abi,
                address: contractAddress,
                functionName: 'deposit',
                value: parseEther(depositeAmount),
            });
            setMessage(`Deposited ${depositeAmount} ETH to contract`);
            setMessage(`Transaction hash: ${tx.hash}`);
            setDepositeAmount('');
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    // Handle withdraw
    const handleWithDraw = async () => {
        try {
            const tx = await writeContract(config, {
                abi,
                address: contractAddress,
                functionName: 'withdraw',
                args: [parseEther(withdrawAmount)],
            });
            setMessage(`Withdrawal transaction sent: ${tx.hash}`);
            setWithdrawAmount('');
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    // Handle counter increment
    const handleIncrement = async () => {
        try {
            const tx = await writeContract(config, {
                abi,
                address: contractAddress,
                functionName: 'incrementCounter',
            });
            setMessage(`Increment transaction sent: ${tx.hash}`);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Fund Me Contract</h2>

            {/* Counter Section */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-700">Counter</h3>
                <p className="text-lg font-medium text-gray-900">Current Value: {counter?.toString() || '0'}</p>
                <button
                    onClick={handleIncrement}
                    className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                    Increment
                </button>
            </div>

            {/* Deposit Section */}
            <div className="mb-6 p-4 bg-green-100 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-700">Deposit ETH</h3>
                <input
                    type="number"
                    placeholder="Amount"
                    value={depositeAmount}
                    onChange={(e) => setDepositeAmount(e.target.value)}
                    min="0"
                    step="0.01"
                    className="mt-2 w-full p-2 border rounded-lg focus:ring focus:ring-green-300"
                />
                <button
                    onClick={handleDeposit}
                    className="mt-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition w-full"
                >
                    Deposit
                </button>
            </div>

            {/* Withdraw Section */}
            <div className="mb-6 p-4 bg-red-100 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-700">Withdraw ETH</h3>
                <p className="text-lg font-medium text-gray-900">Current Balance: {balance ? parseEther(balance.toString()) : '0'} ETH</p>
                <input
                    type="number"
                    placeholder="Amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    min="0"
                    step="0.01"
                    className="mt-2 w-full p-2 border rounded-lg focus:ring focus:ring-red-300"
                />
                <button
                    onClick={handleWithDraw}
                    className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition w-full"
                >
                    Withdraw
                </button>
            </div>

            {/* Message Section */}
            {message && (
                <div className="mt-4 p-3 bg-gray-200 text-gray-900 rounded-lg shadow-sm text-center">
                    {message}
                </div>
            )}
        </div>
    );
}
