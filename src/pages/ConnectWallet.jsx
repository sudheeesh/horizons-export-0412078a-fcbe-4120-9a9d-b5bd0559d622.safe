// src/pages/ConnectWallet.jsx
import React, { useEffect, useState } from 'react';

export default function ConnectWallet() {
  const [account, setAccount] = useState('');
  const [providerName, setProviderName] = useState('');
  const [error, setError] = useState('');

  // SSR guard
  useEffect(() => {}, []);

  const dappUrl = () => (typeof window !== 'undefined' ? window.location.href : '');
  const hostNoProtocol = () => dappUrl().replace(/^https?:\/\//, '');

  const getEthProvider = (flag) => {
    if (typeof window === 'undefined') return null;
    const eth = window.ethereum;
    if (!eth) return null;
    if (eth[flag]) return eth;
    if (eth.providers?.length) return eth.providers.find((p) => p[flag]) || null;
    return null;
  };

  // ----------- Wallet Connectors -----------

  const connectMetaMask = async () => {
    setError('');
    const mm = getEthProvider('isMetaMask');
    if (mm) {
      try {
        const accs = await mm.request({ method: 'eth_requestAccounts' });
        setProviderName('MetaMask');
        setAccount(accs[0] || '');
      } catch (e) {
        setError(e?.message || String(e));
      }
    } else {
      window.open(`https://link.metamask.io/dapp/${hostNoProtocol()}`, '_blank');
    }
  };

  const connectCoinbase = async () => {
    setError('');
    const cb = getEthProvider('isCoinbaseWallet');
    if (cb) {
      try {
        const accs = await cb.request({ method: 'eth_requestAccounts' });
        setProviderName('Coinbase Wallet');
        setAccount(accs[0] || '');
      } catch (e) {
        setError(e?.message || String(e));
      }
    } else {
      const url = encodeURIComponent(dappUrl());
      window.open(`https://go.cb-w.com/dapp?cb_url=${url}`, '_blank');
    }
  };

  const connectBinance = async () => {
    setError('');
    const bnc = typeof window !== 'undefined' ? window.BinanceChain : null;
    if (bnc?.request) {
      try {
        const accs = await bnc.request({ method: 'eth_requestAccounts' });
        setProviderName('Binance Wallet');
        setAccount(accs[0] || '');
      } catch (e) {
        setError(e?.message || String(e));
      }
    } else {
      const prov = getEthProvider('isBinance') || getEthProvider('isTrust') || getEthProvider('isToshi');
      if (prov) {
        try {
          const accs = await prov.request({ method: 'eth_requestAccounts' });
          setProviderName('Binance/Injected');
          setAccount(accs[0] || '');
          return;
        } catch (e) {
          setError(e?.message || String(e));
          return;
        }
      }
      window.open('https://www.binance.com/en/web3wallet', '_blank');
    }
  };

  const connectPhantom = async () => {
    setError('');
    const sol = typeof window !== 'undefined' ? window.solana : null;
    if (sol?.isPhantom) {
      try {
        const resp = await sol.connect();
        setProviderName('Phantom');
        setAccount(resp?.publicKey?.toString?.() || '');
      } catch (e) {
        setError(e?.message || String(e));
      }
    } else {
      // open Phantom mobile deeplink
      const url = encodeURIComponent(dappUrl());
      window.open(`https://phantom.app/ul/browse/${url}?ref=${url}`, '_blank');
    }
  };

  const disconnect = () => {
    setAccount('');
    setProviderName('');
    setError('');
  };

  // ----------- Payments -----------

  const payWithEth = async () => {
    setError('');
    if (!account) return setError('Connect a wallet first');

    const ethProvider = getEthProvider('isMetaMask') || getEthProvider('isCoinbaseWallet') || window.BinanceChain;
    if (!ethProvider) return setError('No Ethereum wallet found');

    try {
      const recipient = '0x1234567890abcdef1234567890abcdef12345678';
      const amountInEth = '0.01';
      const tx = {
        from: account,
        to: recipient,
        value: `0x${(BigInt(Math.floor(parseFloat(amountInEth) * 1e18))).toString(16)}`,
      };

      const txHash = await ethProvider.request({ method: 'eth_sendTransaction', params: [tx] });
      alert(`ETH Payment sent! Tx Hash: ${txHash}`);
    } catch (err) {
      setError(err?.message || String(err));
    }
  };

  const payWithBTC = () => {
    const invoiceUrl = 'https://btcpay.example.com/invoice?id=YOUR_INVOICE_ID';
    window.open(invoiceUrl, '_blank');
  };

  // ----------- JSX -----------

  return (
    <div style={{ maxWidth: 720, margin: '48px auto', padding: 24, borderRadius: 16, background: '#0b1220', color: '#fff' }}>
      <h2 style={{ fontSize: 24, marginBottom: 16 }}>Choisis ton wallet</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 12 }}>
        <button onClick={connectMetaMask} style={{ padding: '12px 16px', borderRadius: 10 }}>MetaMask</button>
        <button onClick={connectCoinbase} style={{ padding: '12px 16px', borderRadius: 10 }}>Coinbase Wallet</button>
        <button onClick={connectPhantom} style={{ padding: '12px 16px', borderRadius: 10 }}>Phantom</button>
        <button onClick={connectBinance} style={{ padding: '12px 16px', borderRadius: 10 }}>Binance Wallet</button>
      </div>

      {account && (
        <div style={{ marginTop: 16 }}>
          <div style={{ opacity: 0.8, fontSize: 13 }}>{providerName} connecté</div>
          <div style={{ fontFamily: 'monospace', marginTop: 6 }}>{account}</div>

          <button onClick={disconnect} style={{ marginTop: 10, padding: '8px 12px', borderRadius: 8 }}>Déconnecter</button>

          <button onClick={payWithEth} style={{ marginTop: 10, padding: '10px 16px', borderRadius: 8, background: '#4ade80', color: '#000' }}>
            Pay 0.01 ETH
          </button>

          <button onClick={payWithBTC} style={{ marginTop: 10, padding: '10px 16px', borderRadius: 8, background: '#f7931a', color: '#000' }}>
            Pay with Bitcoin
          </button>
        </div>
      )}

      {error && <div style={{ color: '#fda4a4', marginTop: 12 }}>{error}</div>}

      <div style={{ opacity: 0.6, fontSize: 12, marginTop: 18 }}>
        Sur mobile, les liens ouvrent ton site dans le navigateur intégré du wallet. Sur desktop, l’extension connecte.
      </div>
    </div>
  );
}
