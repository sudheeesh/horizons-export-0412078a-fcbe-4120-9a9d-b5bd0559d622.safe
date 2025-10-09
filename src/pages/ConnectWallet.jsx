// src/pages/ConnectWallet.jsx
import React, { useEffect, useState } from 'react';

export default function ConnectWallet() {
  const [account, setAccount] = useState('');
  const [providerName, setProviderName] = useState('');
  const [error, setError] = useState('');

  // SSR guard
  useEffect(() => {}, []);

  const getEthProvider = (flag) => {
    if (typeof window === 'undefined') return null;
    const eth = window.ethereum;
    if (!eth) return null;
    if (eth[flag]) return eth;
    if (eth.providers?.length) return eth.providers.find((p) => p[flag]) || null;
    return null;
  };

  // Listen for Ethereum account changes
  useEffect(() => {
    const eth = window.ethereum;
    if (!eth) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length) {
        setAccount(accounts[0]);
      } else {
        setAccount('');
        setProviderName('');
      }
    };

    eth.on('accountsChanged', handleAccountsChanged);

    return () => {
      eth.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  // Listen for Phantom account changes
  useEffect(() => {
    const sol = window.solana;
    if (!sol?.isPhantom) return;

    const handlePhantomChange = (publicKey) => {
      setAccount(publicKey?.toString() || '');
    };

    sol.on('accountChanged', handlePhantomChange);

    return () => {
      sol.removeListener('accountChanged', handlePhantomChange);
    };
  }, []);

  // Connect wallets
  const connectMetaMask = async () => {
    setError('');
    const mm = getEthProvider('isMetaMask');
    if (!mm) return window.open(`https://metamask.io/download.html`, '_blank');

    try {
      const accs = await mm.request({ method: 'eth_requestAccounts' });
      setProviderName('MetaMask');
      setAccount(accs[0]);
    } catch (e) {
      setError(e?.message || String(e));
    }
  };

  const connectCoinbase = async () => {
    setError('');
    const cb = getEthProvider('isCoinbaseWallet');
    if (!cb) return window.open('https://www.coinbase.com/wallet', '_blank');

    try {
      const accs = await cb.request({ method: 'eth_requestAccounts' });
      setProviderName('Coinbase Wallet');
      setAccount(accs[0]);
    } catch (e) {
      setError(e?.message || String(e));
    }
  };

  const connectBinance = async () => {
    setError('');
    const bnc = window.BinanceChain;
    if (!bnc) return window.open('https://www.binance.com/en/web3wallet', '_blank');

    try {
      const accs = await bnc.request({ method: 'eth_requestAccounts' });
      setProviderName('Binance Wallet');
      setAccount(accs[0]);
    } catch (e) {
      setError(e?.message || String(e));
    }
  };

  const connectPhantom = async () => {
    setError('');
    const sol = window.solana;
    if (!sol?.isPhantom) return window.open('https://phantom.app/', '_blank');

    try {
      const resp = await sol.connect();
      setProviderName('Phantom');
      setAccount(resp.publicKey.toString());
    } catch (e) {
      setError(e?.message || String(e));
    }
  };

  const disconnect = () => {
    setAccount('');
    setProviderName('');
    setError('');
    // Wallets themselves remember connection; user must switch account in wallet
  };

  // Payments
  const payWithEth = async (amount = 0.01) => {
    if (!account) return setError('Connect a wallet first');

    const ethProvider = getEthProvider('isMetaMask') || getEthProvider('isCoinbaseWallet') || window.BinanceChain;
    if (!ethProvider) return setError('No Ethereum wallet found');

    try {
      const tx = {
        from: account,
        to: '0x1234567890abcdef1234567890abcdef12345678', // Replace with your address
        value: `0x${(BigInt(Math.floor(amount * 1e18))).toString(16)}`,
      };
      const txHash = await ethProvider.request({ method: 'eth_sendTransaction', params: [tx] });
      alert(`ETH Payment sent! Tx Hash: ${txHash}`);
    } catch (err) {
      setError(err?.message || String(err));
    }
  };

  const payWithSol = async (amount = 0.01) => {
    const sol = window.solana;
    if (!sol?.isPhantom) return setError('Phantom wallet not detected');

    try {
      const { publicKey } = sol;
      const transactionUrl = `solana:${publicKey}?amount=${amount}`;
      window.location.href = transactionUrl;
    } catch (err) {
      setError(err?.message || String(err));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-900 rounded-xl text-white">
      <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button onClick={connectMetaMask} className="p-3 rounded bg-orange-500 hover:bg-orange-600">MetaMask</button>
        <button onClick={connectCoinbase} className="p-3 rounded bg-blue-500 hover:bg-blue-600">Coinbase</button>
        <button onClick={connectPhantom} className="p-3 rounded bg-purple-500 hover:bg-purple-600">Phantom</button>
        <button onClick={connectBinance} className="p-3 rounded bg-yellow-500 hover:bg-yellow-600">Binance</button>
      </div>

      {account && (
        <div className="mt-4 p-4 border border-gray-700 rounded-lg bg-gray-800">
          <p className="text-sm mb-1">Connected with {providerName}</p>
          <p className="font-mono break-all mb-3">{account}</p>
          <div className="flex gap-3 flex-wrap">
            <button onClick={disconnect} className="px-3 py-1 rounded bg-red-500 hover:bg-red-600">Disconnect</button>
            <button onClick={() => payWithEth(0.01)} className="px-3 py-1 rounded bg-green-400 hover:bg-green-500">Pay 0.01 ETH</button>
            <button onClick={() => payWithSol(0.01)} className="px-3 py-1 rounded bg-purple-400 hover:bg-purple-500">Pay 0.01 SOL</button>
          </div>
        </div>
      )}

      {error && <p className="text-red-400 mt-3">{error}</p>}
      <p className="text-gray-400 text-xs mt-4">
        On mobile, links open in your wallet browser. On desktop, connect using extensions.
      </p>
    </div>
  );
}

